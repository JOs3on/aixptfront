/**
 * POST /api/chat — Vercel serverless function (Node runtime).
 *
 * Keeps GEMINI_API_KEY server-side, resolves the niche system prompt, and
 * forwards the conversation to Gemini. The reply is post-processed so the
 * demo always answers in two short sentences maximum.
 *
 * Request body:
 *   { niche: 'concessionnaire' | 'dentaire' | 'hvac',
 *     clientName?: string,
 *     messages: [{ role: 'user' | 'assistant', content: string }] }
 *
 * Response:
 *   { reply: string, model: string, appointment: boolean }
 */

import { getNicheConfig } from '../src/data/niches/index';

export const maxDuration = 30;

/** Cheapest model first; fallbacks are only used if Gemini is overloaded. */
const DEFAULT_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3.8-flash',
];

const GEMINI_INTERACTIONS_URL = 'https://generativelanguage.googleapis.com/v1beta/interactions';
const MAX_MESSAGES = 16;
const MAX_CHARS_PER_MESSAGE = 1000;
const REQUEST_TIMEOUT_MS = 9500;
const TOTAL_DEADLINE_MS = 22_000;

type ChatRole = 'user' | 'assistant';
interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface InteractionStep {
  type?: string;
  content?: Array<{ type?: string; text?: string }>;
}
interface InteractionResponse {
  steps?: InteractionStep[];
  error?: { code?: string; message?: string; status?: string };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 30;
const rateHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateHits.get(ip);
  if (!entry || entry.resetAt < now) {
    rateHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function getClientIp(req: any): string {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress ?? 'unknown';
}

function readBody(req: any): Promise<unknown> {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      try {
        return Promise.resolve(JSON.parse(req.body));
      } catch {
        return Promise.reject(new Error('INVALID_JSON'));
      }
    }
    return Promise.resolve(req.body);
  }

  return new Promise((resolve, reject) => {
    let raw = '';
    let size = 0;
    req.on('data', (chunk: Buffer | string) => {
      size += chunk.length;
      if (size > 100_000) {
        reject(new Error('PAYLOAD_TOO_LARGE'));
        req.destroy();
        return;
      }
      raw += chunk.toString();
    });
    req.on('end', () => {
      if (!raw.trim()) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('INVALID_JSON'));
      }
    });
    req.on('error', reject);
  });
}

function send(res: any, status: number, payload: Record<string, unknown>): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .slice(-MAX_MESSAGES)
    .map((message): ChatMessage | null => {
      if (!message || typeof message !== 'object') return null;
      const candidate = message as { role?: unknown; content?: unknown };
      if (candidate.role !== 'user' && candidate.role !== 'assistant') return null;
      if (typeof candidate.content !== 'string') return null;
      const content = candidate.content.trim().slice(0, MAX_CHARS_PER_MESSAGE);
      if (!content) return null;
      return { role: candidate.role, content };
    })
    .filter((message): message is ChatMessage => message !== null);
}

function modelsToTry(): string[] {
  const configured = (process.env.GEMINI_MODEL ?? '').trim();
  const extraFallbacks = (process.env.GEMINI_MODEL_FALLBACKS ?? '')
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean);

  const chain = configured ? [configured, ...extraFallbacks] : [...extraFallbacks, ...DEFAULT_MODELS];
  return Array.from(new Set(chain));
}

/** Interactions API input: our history is stateless, so we replay each turn. */
function toInteractionInput(messages: ChatMessage[]): unknown[] {
  return messages.map((message) =>
    message.role === 'assistant'
      ? {
          type: 'model_output',
          content: [{ type: 'text', text: message.content }],
        }
      : { type: 'user_input', content: message.content },
  );
}

async function requestInteraction(
  model: string,
  apiKey: string,
  systemInstruction: string,
  messages: ChatMessage[],
  timeoutMs: number,
  withThinkingLevel: boolean,
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const generationConfig: Record<string, unknown> = {
    max_output_tokens: 160,
    temperature: 0.7,
  };
  // Flash-lite does not need reasoning tokens for a two-sentence reply.
  if (withThinkingLevel) generationConfig.thinking_level = 'minimal';

  try {
    const response = await fetch(GEMINI_INTERACTIONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        model,
        store: false,
        system_instruction: systemInstruction,
        input: toInteractionInput(messages),
        generation_config: generationConfig,
      }),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => ({}))) as InteractionResponse;

    if (!response.ok || data.error) {
      const error = new Error(data.error?.message ?? `Gemini HTTP ${response.status}`);
      (error as Error & { status?: number }).status = response.status || 503;
      throw error;
    }

    const text =
      data.steps
        ?.filter((step) => step.type === 'model_output')
        .flatMap((step) => step.content ?? [])
        .filter((part) => part.type === 'text' && part.text)
        .map((part) => part.text)
        .join(' ')
        .trim() ?? '';

    if (!text) throw new Error('EMPTY_RESPONSE');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

async function callGemini(
  model: string,
  apiKey: string,
  systemInstruction: string,
  messages: ChatMessage[],
  timeoutMs: number,
): Promise<string> {
  try {
    return await requestInteraction(model, apiKey, systemInstruction, messages, timeoutMs, true);
  } catch (error) {
    // Some older/future model revisions reject `thinking_level`; retry once
    // without it rather than losing the fallback model entirely.
    const status = (error as Error & { status?: number }).status;
    if (status !== 400) throw error;

    return requestInteraction(
      model,
      apiKey,
      systemInstruction,
      messages,
      Math.max(3500, timeoutMs - 1500),
      false,
    );
  }
}

/** Removes markdown/emoji noise and hard-caps the reply at two sentences. */
export function sanitizeReply(raw: string): string {
  let text = raw
    .replace(/\r/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\s*(?:[-–—•*]|\d+[.)])\s+/gm, '')
    .replace(/[*_#`>]/g, '')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

  text = text
    .replace(/^(Maxime|Camille|Alex|Assistant|Conseiller|Coordonnateur|Coordonnatrice)\s*:\s*/i, '')
    .replace(/^["“«]+|["”»]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Keep at most two sentence-ending groups. Decimals use commas in French,
  // so a period is a reliable sentence boundary here.
  const sentences = text.match(/[^.!?…]+[.!?…]+(?:["»”’)]+)?/g);
  if (sentences && sentences.length > 2) {
    text = sentences.slice(0, 2).join(' ').trim();
  } else if (!sentences && text.length > 220) {
    text = `${text.slice(0, 220).replace(/\s+\S*$/, '')}…`;
  }

  return text;
}

const APPOINTMENT_RE =
  /(c['’]est noté|rendez-vous (?:est )?confirmé|vous êtes attendu|texto de confirmation|je vous confirme (?:le|votre) (?:rendez-vous|essai))/i;
const PHONE_RE = /(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?){2}\d{4}/;

function detectAppointment(reply: string, messages: ChatMessage[]): boolean {
  if (!APPOINTMENT_RE.test(reply)) return false;
  // Only show the confirmation badge once the visitor has shared a phone number.
  return messages.some((message) => message.role === 'user' && PHONE_RE.test(message.content));
}

function friendlyUpstreamError(status: number): string {
  if (status === 429) {
    return 'Je reçois beaucoup de demandes en ce moment, pouvez-vous réessayer dans une minute ?';
  }
  return 'Je suis un peu ralenti, pouvez-vous réessayer dans quelques secondes ?';
}

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */

export default async function handler(req: any, res: any): Promise<void> {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Allow', 'POST, OPTIONS');
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    send(res, 405, { error: 'method_not_allowed' });
    return;
  }

  const apiKey = (process.env.GEMINI_API_KEY ?? '').trim();
  if (!apiKey) {
    send(res, 503, {
      error: 'missing_api_key',
      reply: 'Le démo est momentanément indisponible, réessayez dans quelques minutes.',
    });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    send(res, 429, {
      error: 'rate_limited',
      reply: 'Trop de messages en peu de temps, réessayez dans quelques minutes.',
    });
    return;
  }

  let body: any;
  try {
    body = await readBody(req);
  } catch (error) {
    const code = (error as Error).message === 'PAYLOAD_TOO_LARGE' ? 413 : 400;
    send(res, code, { error: 'invalid_body' });
    return;
  }

  const messages = normalizeMessages(body?.messages);
  if (messages.length === 0) {
    send(res, 400, { error: 'messages_required' });
    return;
  }

  const niche = typeof body?.niche === 'string' ? body.niche : 'concessionnaire';
  const clientName = typeof body?.clientName === 'string' ? body.clientName : '';
  const config = getNicheConfig(niche, clientName);

  const models = modelsToTry();
  const deadline = Date.now() + TOTAL_DEADLINE_MS;
  let lastStatus = 0;
  let lastError = '';

  for (const model of models) {
    const remaining = deadline - Date.now();
    if (remaining < 2500) break;
    const timeoutMs = Math.min(REQUEST_TIMEOUT_MS, remaining - 500);

    try {
      const raw = await callGemini(model, apiKey, config.systemInstruction, messages, timeoutMs);
      const reply = sanitizeReply(raw);
      if (!reply) throw new Error('EMPTY_AFTER_SANITIZE');

      send(res, 200, {
        reply,
        model,
        appointment: detectAppointment(reply, messages),
      });
      return;
    } catch (error) {
      const err = error as Error & { status?: number };
      lastStatus = err.status ?? 0;
      lastError = err.message;
      console.error(`[api/chat] ${model} failed (${lastStatus || 'network'}): ${lastError}`);

      // Authentication/quota errors will not be fixed by another model.
      if (lastStatus === 401 || lastStatus === 403) break;
    }
  }

  send(res, lastStatus >= 500 || lastStatus === 0 ? 502 : lastStatus || 502, {
    error: 'upstream_unavailable',
    reply: friendlyUpstreamError(lastStatus),
  });
}

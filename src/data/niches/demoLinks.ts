import { NICHE_IDS, resolveNicheId } from './public';
import type { NicheId } from './types';

/**
 * Public URL slugs for the live demos.
 *
 * Keep these stable: they are the links the sales AI agent sends to prospects.
 * The internal `NicheId` stays singular (`concessionnaire`), while the URL uses
 * the wording prospects search for (`concessionnaires`).
 */
export const NICHE_URL_SLUGS: Record<NicheId, string> = {
  concessionnaire: 'concessionnaires',
  dentaire: 'dentaire',
  hvac: 'hvac',
  avocat: 'avocats',
};

const SLUG_TO_NICHE: Record<string, NicheId> = Object.entries(
  NICHE_URL_SLUGS,
).reduce(
  (map, [id, slug]) => {
    map[slug] = id as NicheId;
    map[id] = id as NicheId;
    return map;
  },
  {} as Record<string, NicheId>,
);

/** Voice demos that have a Vapi assistant provisioned. */
export const VOICE_NICHE_IDS: NicheId[] = ['concessionnaire', 'dentaire', 'hvac'];

/** Chatbot demos. Lawyers are chat-only until a voice line is provisioned. */
export const CHAT_NICHE_IDS: NicheId[] = [...NICHE_IDS];

export type DemoKind = 'voice' | 'chat';

export const DEMO_BASE_PATHS: Record<DemoKind, string> = {
  voice: '/assistant-vocal',
  chat: '/agents-conversationnels',
};

/**
 * Short, format-explicit URLs for the sales team. These open a focused demo
 * page instead of the full service page:
 *   /demo/voice/hvac
 *   /demo/chat/avocats
 */
export const DEMO_SHORT_BASE_PATHS: Record<DemoKind, string> = {
  voice: '/demo/voice',
  chat: '/demo/chat',
};

export function nicheUrlSlug(id: NicheId): string {
  return NICHE_URL_SLUGS[id];
}

/**
 * Resolves a URL segment to a niche. Explicit slugs win, then the existing
 * keyword heuristics keep old links such as `/sandbox/groupe-auto` working.
 */
export function resolveNicheFromUrl(raw?: string | null): NicheId | undefined {
  if (!raw) return undefined;
  const value = decodeURIComponent(raw).trim().toLowerCase();
  if (!value) return undefined;

  if (SLUG_TO_NICHE[value]) return SLUG_TO_NICHE[value];

  const compact = value.replace(/[_\s]+/g, '-');
  if (SLUG_TO_NICHE[compact]) return SLUG_TO_NICHE[compact];

  return resolveNicheId(value);
}

export function buildDemoPath(
  kind: DemoKind,
  id: NicheId,
  clientSlug?: string | null,
): string {
  const base = `${DEMO_BASE_PATHS[kind]}/${nicheUrlSlug(id)}`;
  return clientSlug ? `${base}/${clientSlug}` : base;
}

export function buildDemoUrl(
  kind: DemoKind,
  id: NicheId,
  clientSlug?: string | null,
): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.aixpt.ca';
  return `${origin}${buildDemoPath(kind, id, clientSlug)}`;
}

export function buildShortDemoPath(
  kind: DemoKind,
  id: NicheId,
  clientSlug?: string | null,
): string {
  const base = `${DEMO_SHORT_BASE_PATHS[kind]}/${nicheUrlSlug(id)}`;
  return clientSlug ? `${base}/${clientSlug}` : base;
}

export function buildShortDemoUrl(
  kind: DemoKind,
  id: NicheId,
  clientSlug?: string | null,
): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.aixpt.ca';
  return `${origin}${buildShortDemoPath(kind, id, clientSlug)}`;
}

export interface DemoCatalogEntry {
  id: NicheId;
  label: string;
  industry: string;
  /** Full service page with the demo anchored at #demo. */
  chatPath: string;
  voicePath: string;
  /** Focused demo page for sales links. */
  shortChatPath: string;
  shortVoicePath: string;
  voiceDemoAvailable: boolean;
}

/**
 * Shared catalogue for the `/demo` hub and for the sales AI agent. It contains
 * no prompts or private data — only public URLs and labels.
 */
export const DEMO_CATALOG: DemoCatalogEntry[] = [
  {
    id: 'concessionnaire',
    label: 'Concessionnaire automobile',
    industry: 'Automobile',
    chatPath: buildDemoPath('chat', 'concessionnaire'),
    voicePath: buildDemoPath('voice', 'concessionnaire'),
    shortChatPath: buildShortDemoPath('chat', 'concessionnaire'),
    shortVoicePath: buildShortDemoPath('voice', 'concessionnaire'),
    voiceDemoAvailable: true,
  },
  {
    id: 'dentaire',
    label: 'Clinique dentaire',
    industry: 'Dentaire',
    chatPath: buildDemoPath('chat', 'dentaire'),
    voicePath: buildDemoPath('voice', 'dentaire'),
    shortChatPath: buildShortDemoPath('chat', 'dentaire'),
    shortVoicePath: buildShortDemoPath('voice', 'dentaire'),
    voiceDemoAvailable: true,
  },
  {
    id: 'hvac',
    label: 'Chauffage & climatisation',
    industry: 'CVC / HVAC',
    chatPath: buildDemoPath('chat', 'hvac'),
    voicePath: buildDemoPath('voice', 'hvac'),
    shortChatPath: buildShortDemoPath('chat', 'hvac'),
    shortVoicePath: buildShortDemoPath('voice', 'hvac'),
    voiceDemoAvailable: true,
  },
  {
    id: 'avocat',
    label: 'Cabinet juridique',
    industry: 'Juridique',
    chatPath: buildDemoPath('chat', 'avocat'),
    voicePath: buildDemoPath('voice', 'avocat'),
    shortChatPath: buildShortDemoPath('chat', 'avocat'),
    shortVoicePath: buildShortDemoPath('voice', 'avocat'),
    voiceDemoAvailable: false,
  },
];

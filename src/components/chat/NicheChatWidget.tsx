import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUp,
  Car,
  CheckCircle2,
  Database,
  RotateCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Thermometer,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NichePublicConfig } from '@/data/niches/types';

interface NicheChatWidgetProps {
  niche: NichePublicConfig;
  /** Brand displayed in the header and used server-side in the system prompt. */
  clientTitle?: string;
  className?: string;
  /** Height preset: embedded in the sandbox or used as a standalone demo. */
  variant?: 'embedded' | 'full';
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
  appointment?: boolean;
  isError?: boolean;
}

const ICONS = {
  car: Car,
  stethoscope: Stethoscope,
  thermometer: Thermometer,
  scale: Scale,
} as const;

const now = () => new Date();

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const formatTime = (date: Date) =>
  date.toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' });

interface RetrievalContext {
  /** Label shown while the assistant "queries" the source. */
  label: string;
  /** Small data-source tag displayed under the progress bar. */
  source: string;
}

const DEFAULT_RETRIEVAL: RetrievalContext = {
  label: 'Recherche dans la base de données…',
  source: 'Base de données',
};

/** Lowercase + strip accents so "coûte" matches "coute". */
const deaccent = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const hasAny = (text: string, needles: string[]) =>
  needles.some((needle) => text.includes(needle));

/**
 * Maps the visitor's question to a realistic retrieval step, so the typing
 * indicator reads like the assistant is pulling the answer from a real system
 * (inventory, agenda, rates, patient files, etc.) instead of a generic spinner.
 */
const RETRIEVAL_RULES: Record<
  string,
  Array<{ needles: string[]; context: RetrievalContext }>
> = {
  concessionnaire: [
    {
      needles: ['financement', 'taux', 'interet', 'credit', 'paiement', 'mensualite', 'location'],
      context: { label: 'Vérification des taux de financement…', source: 'Financement' },
    },
    {
      needles: ['prix', 'coute', 'cout', 'taxes', 'frais', 'tout inclus', 'rabais', 'promo'],
      context: { label: 'Recherche dans l’inventaire et les prix…', source: 'Inventaire · Prix' },
    },
    {
      needles: ['essai', 'essayer', 'test drive', 'creneau', 'rendez-vous', 'rendez vous', 'samedi', 'dimanche'],
      context: { label: 'Consultation de l’agenda des essais routiers…', source: 'Agenda' },
    },
    {
      needles: ['echange', 'reprise', 'valeur de mon', 'vendre mon', 'troquer'],
      context: { label: 'Calcul de la valeur de reprise…', source: 'Reprise' },
    },
    {
      needles: ['disponible', 'inventaire', 'stock', 'encore', 'vehicule', 'vus', 'modele', 'couleur'],
      context: { label: 'Recherche dans l’inventaire…', source: 'Inventaire' },
    },
  ],
  dentaire: [
    {
      needles: ['urgence', 'douleur', 'rage de dent', 'mal', 'infection', 'casse'],
      context: { label: 'Vérification des plages d’urgence…', source: 'Agenda · Urgences' },
    },
    {
      needles: ['assurance', 'sun life', 'desjardins', 'reclamation', 'ramq', 'couverture'],
      context: { label: 'Vérification auprès des assureurs…', source: 'Assurances' },
    },
    {
      needles: ['nouveau patient', 'nouveaux patients', 'premiere visite', 'examen'],
      context: { label: 'Vérification des dossiers patients…', source: 'Dossiers patients' },
    },
    {
      needles: ['horaire', 'ouvert', 'ferme', 'samedi', 'dimanche', 'soir'],
      context: { label: 'Consultation des horaires et disponibilités…', source: 'Agenda' },
    },
    {
      needles: ['prix', 'coute', 'cout', 'tarif', 'combien', 'nettoyage', 'soins'],
      context: { label: 'Récupération de la grille de tarifs…', source: 'Tarifs' },
    },
  ],
  hvac: [
    {
      needles: ['urgence', 'panne', 'arrete', 'chaud', 'froid', 'fonctionne plus', 'brise', 'souffle'],
      context: { label: 'Priorisation de l’appel d’urgence…', source: 'Dispatch' },
    },
    {
      needles: ['zone', 'desservez', 'ville', 'secteur', 'deplacement', 'region'],
      context: { label: 'Validation de la zone desservie…', source: 'Zones desservies' },
    },
    {
      needles: ['diagnostic', 'prix', 'coute', 'cout', 'tarif', 'frais', 'combien'],
      context: { label: 'Recherche des tarifs de diagnostic…', source: 'Tarifs' },
    },
    {
      needles: ['entretien', 'annuel', 'contrat', 'forfait'],
      context: { label: 'Consultation des forfaits d’entretien…', source: 'Forfaits' },
    },
    {
      needles: ['remplacer', 'remplacement', 'fournaise', 'soumission', 'evaluation', 'installer'],
      context: { label: 'Préparation d’une évaluation…', source: 'Soumissions' },
    },
  ],
  avocat: [
    {
      needles: ['urgence', 'cour', 'saisie', 'violence', 'garde', 'danger', 'audience'],
      context: { label: 'Vérification des délais et urgences…', source: 'Dossiers · Urgences' },
    },
    {
      needles: ['separation', 'divorce', 'garde', 'pension', 'famille', 'enfant'],
      context: { label: 'Qualification du dossier familial…', source: 'Dossiers' },
    },
    {
      needles: ['honoraire', 'prix', 'coute', 'cout', 'tarif', 'consultation', 'combien'],
      context: { label: 'Récupération des honoraires de consultation…', source: 'Honoraires' },
    },
    {
      needles: ['document', 'papier', 'acte', 'jugement', 'entente', 'releve'],
      context: { label: 'Vérification des documents requis…', source: 'Documents' },
    },
    {
      needles: ['rendez-vous', 'consultation', 'disponible', 'rencontre', 'visio', 'telephone'],
      context: { label: 'Consultation de l’agenda des consultations…', source: 'Agenda' },
    },
  ],
};

const getRetrievalContext = (nicheId: string, rawText: string): RetrievalContext => {
  const text = deaccent(rawText);
  const rules = RETRIEVAL_RULES[nicheId] ?? [];
  return rules.find((rule) => hasAny(text, rule.needles))?.context ?? DEFAULT_RETRIEVAL;
};

/** Keep the retrieval indicator visible long enough to read, even on fast replies. */
const MIN_TYPING_MS = 1100;

export const NicheChatWidget: React.FC<NicheChatWidgetProps> = ({
  niche,
  clientTitle,
  className,
  variant = 'embedded',
}) => {
  const brand = clientTitle?.trim() || niche.defaultClientTitle;

  const openingMessage = useMemo(
    () => niche.openingMessage.replace(niche.defaultClientTitle, brand),
    [niche.openingMessage, niche.defaultClientTitle, brand],
  );

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: createId(),
      role: 'assistant',
      content: openingMessage,
      createdAt: now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const Icon = ICONS[niche.icon];
  const hasUserMessage = hasSent || messages.some((message) => message.role === 'user');

  const lastUserMessage = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index].role === 'user') return messages[index].content;
    }
    return null;
  }, [messages]);

  const retrieval = useMemo(
    () => (lastUserMessage ? getRetrievalContext(niche.id, lastUserMessage) : DEFAULT_RETRIEVAL),
    [lastUserMessage, niche.id],
  );

  const thinkingLabel =
    thinkingStep === 0 ? 'Connexion à la base de données…' : retrieval.label;

  // Scroll only the conversation panel, and only after the visitor has sent a
  // message. Calling scrollIntoView() on mount scrolls the whole page down.
  useEffect(() => {
    if (!hasSent) return;
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping, hasSent]);

  useEffect(() => {
    if (!isTyping) {
      setThinkingStep(0);
      return;
    }

    const interval = window.setInterval(
      () => setThinkingStep((step) => (step + 1) % 2),
      650,
    );
    return () => window.clearInterval(interval);
  }, [isTyping]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const resizeTextarea = () => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = 'auto';
    element.style.height = `${Math.min(element.scrollHeight, 112)}px`;
  };

  const resetConversation = () => {
    requestIdRef.current += 1;
    abortRef.current?.abort();
    setMessages([
      {
        id: createId(),
        role: 'assistant',
        content: openingMessage,
        createdAt: now(),
      },
    ]);
    setInput('');
    setIsTyping(false);
    setThinkingStep(0);
    setHasSent(false);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isTyping) return;

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: text,
      createdAt: now(),
    };

    // History includes the new user message, capped to the last 16 turns.
    const history = [...messages, userMessage]
      .filter((message) => !message.isError)
      .slice(-16)
      .map((message) => ({ role: message.role, content: message.content }));

    setMessages((current) => [...current, userMessage]);
    setInput('');
    setHasSent(true);
    setIsTyping(true);
    setThinkingStep(0);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const startedAt = Date.now();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 25_000);

    let content = 'Je suis un peu ralenti, pouvez-vous réessayer dans quelques secondes ?';
    let appointment = false;
    let isError = false;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: niche.id,
          clientName: brand,
          messages: history,
        }),
        signal: controller.signal,
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        appointment?: boolean;
        error?: string;
      };

      content =
        data.reply ??
        'Je suis un peu ralenti, pouvez-vous réessayer dans quelques secondes ?';
      appointment = Boolean(data.appointment);
      isError = !response.ok;
    } catch (error) {
      const aborted = (error as Error).name === 'AbortError';
      content = aborted
        ? 'La réponse prend plus de temps que prévu, pouvez-vous réessayer ?'
        : 'Je n’arrive pas à me connecter, pouvez-vous réessayer dans un instant ?';
      isError = true;
    } finally {
      clearTimeout(timeout);
    }

    // Let the data-retrieval indicator stay on screen long enough to be read.
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_TYPING_MS) {
      await new Promise((resolve) => setTimeout(resolve, MIN_TYPING_MS - elapsed));
    }

    // Ignore stale responses (e.g. the conversation was reset mid-flight).
    if (requestId !== requestIdRef.current) return;

    if (abortRef.current === controller) abortRef.current = null;
    setIsTyping(false);
    setMessages((current) => [
      ...current,
      {
        id: createId(),
        role: 'assistant',
        content,
        createdAt: now(),
        appointment,
        isError,
      },
    ]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  return (
    <section
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded-[28px] border border-white/10',
        'bg-[#0c0c10] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(154,107,255,0.06)]',
        variant === 'embedded' ? 'h-[744px] max-h-[82vh]' : 'h-[calc(100vh-11rem)] min-h-[520px]',
        className,
      )}
      aria-label={`Assistant virtuel ${brand}`}
    >
      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9a6bff]/60 to-transparent" />

      {/* Header */}
      <header className="relative flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3.5 sm:px-5">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a97cff] to-[#6c3df0] shadow-[0_8px_20px_-6px_rgba(154,107,255,0.8)]">
          <Icon className="h-5 w-5 text-white" strokeWidth={1.9} />
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-[#0c0c10] bg-emerald-400" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-[14px] font-semibold tracking-tight text-white">
              {brand}
            </h3>
            <span className="hidden shrink-0 rounded-md border border-[#9a6bff]/25 bg-[#9a6bff]/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#c4a9ff] sm:inline">
              Démo
            </span>
          </div>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-zinc-400">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            {niche.availabilityLabel}
          </p>
        </div>

        {hasUserMessage && (
          <button
            type="button"
            onClick={resetConversation}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-zinc-400 transition hover:border-white/15 hover:text-white"
            aria-label="Recommencer la conversation"
            title="Recommencer la conversation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </header>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="relative flex-1 space-y-4 overflow-y-auto px-4 py-5 [scrollbar-color:rgba(255,255,255,0.14)_transparent] [scrollbar-width:thin] sm:px-5"
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        style={{
          backgroundImage:
            'radial-gradient(120% 70% at 50% 0%, rgba(154,107,255,0.09), transparent 62%)',
        }}
      >
        {messages.map((message) => {
          const isUser = message.role === 'user';

          return (
            <div key={message.id} className="flex flex-col">
              <div className={cn('flex w-full gap-2.5', isUser ? 'justify-end' : 'justify-start')}>
                {!isUser && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#9a6bff]/25 bg-[#9a6bff]/15">
                    <Sparkles className="h-3.5 w-3.5 text-[#c4a9ff]" />
                  </div>
                )}

                <div className={cn('max-w-[82%] sm:max-w-[78%]', isUser && 'items-end')}>
                  <div
                    className={cn(
                      'whitespace-pre-wrap break-words px-3.5 py-2.5 text-[13px] leading-[1.55]',
                      isUser
                        ? 'rounded-2xl rounded-br-md bg-[#7c4dff] text-white shadow-[0_10px_24px_-12px_rgba(124,77,255,0.9)]'
                        : 'rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.055] text-zinc-200',
                      message.isError && 'border-amber-400/20 bg-amber-400/[0.06] text-amber-100/90',
                    )}
                  >
                    {message.content}
                  </div>

                  <div
                    className={cn(
                      'mt-1 flex items-center gap-1.5 px-1 text-[9.5px] text-zinc-500',
                      isUser ? 'justify-end' : 'justify-start',
                    )}
                  >
                    <span>{formatTime(message.createdAt)}</span>
                    {!isUser && <span className="text-zinc-600">·</span>}
                    {!isUser && <span>{message.isError ? 'Connexion instable' : niche.agentName}</span>}
                  </div>

                  {message.appointment && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-300">
                      <CheckCircle2 className="h-3 w-3" />
                      Rendez-vous pré-enregistré
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {!hasUserMessage && !isTyping && (
          <div className="space-y-2 pt-1">
            <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Essayez une question
            </p>
            <div className="flex flex-col gap-2">
              {niche.suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void sendMessage(question)}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-left text-[12px] leading-snug text-zinc-300 transition hover:border-[#9a6bff]/40 hover:bg-[#9a6bff]/10 hover:text-white"
                >
                  <span>{question}</span>
                  <ArrowUp className="h-3.5 w-3.5 shrink-0 rotate-45 text-zinc-600 transition group-hover:text-[#c4a9ff]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#9a6bff]/25 bg-[#9a6bff]/15">
              <Sparkles className="h-3.5 w-3.5 text-[#c4a9ff]" />
            </div>

            <div className="w-full max-w-[86%] overflow-hidden rounded-2xl rounded-bl-md border border-[#9a6bff]/20 bg-white/[0.055] px-3.5 py-3 shadow-[0_12px_30px_-20px_rgba(154,107,255,0.9)]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#9a6bff]/25 bg-[#9a6bff]/15">
                  <span className="absolute inset-0 animate-ping rounded-md bg-[#9a6bff]/20 [animation-duration:1.8s]" />
                  <Database className="relative h-3 w-3 text-[#c4a9ff]" />
                </span>

                <span className="min-w-0 flex-1 text-[11.5px] font-medium leading-snug text-zinc-200">
                  {thinkingLabel}
                </span>

                <span className="ml-auto flex shrink-0 items-center gap-1">
                  <span className="h-1 w-1 animate-bounce rounded-full bg-[#c4a9ff] [animation-delay:-0.3s]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-[#c4a9ff] [animation-delay:-0.15s]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-[#c4a9ff]" />
                </span>
              </div>

              <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.07]">
                <div className="animate-chat-db-shimmer h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#9a6bff] to-transparent" />
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="truncate">{retrieval.source}</span>
                <span className="ml-auto shrink-0 font-medium normal-case tracking-normal text-zinc-600">
                  Lecture seule
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Composer */}
      <div className="border-t border-white/[0.07] bg-[#0a0a0e]/90 p-3 sm:p-3.5">
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-2 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-1.5 transition focus-within:border-[#9a6bff]/45 focus-within:bg-white/[0.05]"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              resizeTextarea();
            }}
            onKeyDown={handleKeyDown}
            rows={1}
            maxLength={1000}
            placeholder={niche.inputPlaceholder}
            aria-label="Votre message"
            className="max-h-28 min-h-[38px] flex-1 resize-none bg-transparent px-2.5 py-2 text-[13px] leading-snug text-white outline-none placeholder:text-zinc-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#9a6bff] text-white shadow-[0_8px_20px_-8px_rgba(154,107,255,0.9)] transition hover:bg-[#8a5cef] active:scale-95 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-zinc-500 disabled:shadow-none"
            aria-label="Envoyer le message"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.4} />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between px-1">
          <span className="flex items-center gap-1.5 text-[9.5px] text-zinc-500">
            <ShieldCheck className="h-3 w-3" />
            Assistant IA
          </span>
          <span className="text-[9.5px] font-semibold tracking-[0.16em] text-zinc-600">AIXPT</span>
        </div>
      </div>
    </section>
  );
};

export default NicheChatWidget;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Sparkles } from 'lucide-react';
import { NicheChatWidget } from '../chat/NicheChatWidget';
import { NicheSwitcher } from '../demo/NicheSwitcher';
import { PUBLIC_NICHES, resolveClientTitle } from '../../data/niches/public';
import { buildShortDemoPath, resolveNicheFromUrl } from '../../data/niches/demoLinks';

/**
 * Focused chatbot demo page used by the sales team.
 * URL: /demo/chat/:nicheSlug[/:clientSlug]
 *
 * The full service page remains /agents-conversationnels/:nicheSlug. This page
 * keeps the prospect on the demo itself, with no marketing sections in the way.
 */
export const ChatDemoPage: React.FC = () => {
  const { nicheSlug, clientSlug } = useParams<{
    nicheSlug?: string;
    clientSlug?: string;
  }>();

  const nicheId = resolveNicheFromUrl(nicheSlug) ?? 'concessionnaire';
  const niche = PUBLIC_NICHES[nicheId];
  const clientTitle = resolveClientTitle(nicheId, clientSlug);
  const sharePath = buildShortDemoPath('chat', nicheId, clientSlug);

  return (
    <div className="min-h-screen bg-background pt-28 pb-16 text-foreground">
      <Helmet>
        <title>{`Démo chatbot — ${niche.name} | AIXPT`}</title>
        <meta
          name="description"
          content={`Démo de chatbot IA pour ${niche.name.toLowerCase()}. Posez une question comme un vrai client.`}
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/demo"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Toutes les démos
        </Link>

        <div className="mx-auto mb-8 mt-8 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
            <MessageCircle className="h-3.5 w-3.5" />
            Démo chatbot · {niche.name}
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            Testez le chatbot IA
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Posez une question comme le ferait un vrai client. Le chatbot répond, qualifie la
            demande et propose un rendez-vous.
          </p>
        </div>

        <NicheSwitcher
          kind="chat"
          activeNiche={nicheId}
          pathMode="short"
          className="mb-5"
        />

        <div id="demo" className="scroll-mt-24">
          <NicheChatWidget
            key={`${nicheId}-${clientTitle}`}
            niche={niche}
            clientTitle={clientTitle}
            className="shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)]"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-card/70 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Lien à partager
            </p>
            <p className="mt-1 break-all font-mono text-[11px] text-zinc-400">
              aixpt.ca{sharePath}
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-brand-hover"
          >
            Parler à un expert
          </Link>
        </div>

        <p className="mt-4 text-center text-[11px] text-zinc-500">
          Utilisez un prénom et un numéro fictifs. Les conversations de démonstration ne servent
          qu'à tester l'expérience.
        </p>
      </div>
    </div>
  );
};

export default ChatDemoPage;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Car,
  HeartPulse,
  MessageCircle,
  Phone,
  Scale,
  Sparkles,
  Thermometer,
} from 'lucide-react';
import { DEMO_CATALOG, buildShortDemoUrl } from '../../data/niches/demoLinks';
import { PUBLIC_NICHES } from '../../data/niches/public';
import { VAPI_DEMOS } from '../../lib/vapi';
import { CopyLinkButton } from '../demo/CopyLinkButton';

const NICHE_ICONS = {
  car: Car,
  stethoscope: HeartPulse,
  thermometer: Thermometer,
  scale: Scale,
} as const;

/**
 * Demo hub: one place to choose which niche + format to send a prospect.
 * Kept noindex — the SEO pages are the vertical landing pages.
 */
export const DemoHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pt-28 pb-20 text-foreground">
      <Helmet>
        <title>Démos IA — choisir une démo | AIXPT</title>
        <meta
          name="description"
          content="Choisissez la démo IA à envoyer à un prospect : réceptionniste vocale ou chatbot, par secteur."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand/70" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Démos AIXPT
            </span>
            <span className="h-px w-8 bg-brand/70" />
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
            Choisissez la démo à envoyer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Chaque carte est un lien direct, déjà réglé sur le bon secteur. Copiez-le dans votre
            courriel ou ouvrez-le pour vérifier avant de l'envoyer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DEMO_CATALOG.map((entry) => {
            const niche = PUBLIC_NICHES[entry.id];
            const Icon = NICHE_ICONS[niche.icon];
            const voiceDemo = VAPI_DEMOS[entry.id];
            const voiceAvailable = entry.voiceDemoAvailable && Boolean(voiceDemo.agentId);

            return (
              <div
                key={entry.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/70 p-6 transition-all duration-300 hover:border-brand/40 hover:bg-card"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 blur-3xl" />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                        {entry.industry}
                      </p>
                      <h2 className="font-display text-xl font-semibold text-white">
                        {entry.label}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {/* Voice */}
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                        <Phone className="h-3.5 w-3.5 text-brand" />
                        Démo vocale
                      </div>
                      {voiceAvailable ? (
                        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                          Disponible
                        </span>
                      ) : (
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                          Bientôt
                        </span>
                      )}
                    </div>

                    {voiceAvailable ? (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Link
                          to={`${entry.shortVoicePath}#demo`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-brand-hover"
                        >
                          Ouvrir
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                        <CopyLinkButton url={`${buildShortDemoUrl('voice', entry.id)}#demo`} />
                        {voiceDemo.phoneEnabled && (
                          <a
                            href={`tel:${voiceDemo.phoneNumber}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px] text-zinc-300 transition hover:border-emerald-400/40 hover:text-emerald-300"
                          >
                            <Phone className="h-3 w-3" />
                            {voiceDemo.formattedPhoneNumber}
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                        Ce secteur est offert en clavardage pour l'instant.
                      </p>
                    )}
                    <p className="mt-2 font-mono text-[9px] text-zinc-600">
                      aixpt.ca{entry.shortVoicePath}
                    </p>
                  </div>

                  {/* Chat */}
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                        <MessageCircle className="h-3.5 w-3.5 text-brand" />
                        Démo clavardage
                      </div>
                      <span className="rounded-full border border-brand/25 bg-brand/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-brand">
                        Disponible
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Link
                        to={`${entry.shortChatPath}#demo`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-brand-hover"
                      >
                        Ouvrir
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                      <CopyLinkButton url={`${buildShortDemoUrl('chat', entry.id)}#demo`} />
                    </div>
                    <p className="mt-2 font-mono text-[9px] text-zinc-600">
                      aixpt.ca{entry.shortChatPath}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-card/70 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
            <div>
              <h2 className="font-display text-lg font-semibold text-white">
                Personnaliser le nom du client
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Ajoutez le nom du prospect à la fin de l'URL, par exemple{' '}
                <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-zinc-300">
                  /demo/chat/dentaire/clinique-xyz
                </code>
                . Le nom s'affiche dans la démo et dans le clavardage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

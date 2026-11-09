import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, HeartPulse, MessageCircle, Phone, Scale, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PUBLIC_NICHES } from '@/data/niches/public';
import {
  CHAT_NICHE_IDS,
  VOICE_NICHE_IDS,
  buildDemoPath,
  buildShortDemoPath,
  type DemoKind,
} from '@/data/niches/demoLinks';
import type { NicheId } from '@/data/niches/types';
import { CopyLinkButton } from './CopyLinkButton';

const NICHE_ICONS = {
  car: Car,
  stethoscope: HeartPulse,
  thermometer: Thermometer,
  scale: Scale,
} as const;

interface NicheSwitcherProps {
  kind: DemoKind;
  activeNiche: NicheId;
  className?: string;
  showCopyLink?: boolean;
  /** Keep `/demo/chat/...` links on short demo pages. */
  pathMode?: 'pretty' | 'short';
}

/**
 * Segmented niche control for the live demos. Every option is a real URL, so
 * the current tab can be copied and emailed to a prospect.
 */
export const NicheSwitcher: React.FC<NicheSwitcherProps> = ({
  kind,
  activeNiche,
  className,
  showCopyLink = true,
  pathMode = 'pretty',
}) => {
  const location = useLocation();
  const ids = kind === 'voice' ? VOICE_NICHE_IDS : CHAT_NICHE_IDS;
  const pathFor = (id: NicheId) =>
    pathMode === 'short' ? buildShortDemoPath(kind, id) : buildDemoPath(kind, id);
  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${location.pathname}#demo`
      : `https://www.aixpt.ca${location.pathname}#demo`;

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#101014]/90 p-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 inline-flex items-center gap-1.5 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
          {kind === 'voice' ? <Phone className="h-3 w-3" /> : <MessageCircle className="h-3 w-3" />}
          Secteur
        </span>

        {ids.map((id) => {
          const niche = PUBLIC_NICHES[id];
          const Icon = NICHE_ICONS[niche.icon];
          const active = id === activeNiche;

          return (
            <Link
              key={id}
              to={`${pathFor(id)}#demo`}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition',
                active
                  ? 'border-brand/50 bg-brand/15 text-white'
                  : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200',
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {niche.name}
            </Link>
          );
        })}
      </div>

      {showCopyLink && (
        <CopyLinkButton
          url={currentUrl}
          label="Copier ce lien"
          className="self-start sm:self-auto"
        />
      )}
    </div>
  );
};

export default NicheSwitcher;

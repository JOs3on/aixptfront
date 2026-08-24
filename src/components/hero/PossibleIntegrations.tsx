import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Logo {
  id: string;
  name: string;
  image?: string;
  className?: string;
}

interface PossibleIntegrationsProps {
  heading?: string;
  description?: string;
  logos?: Logo[];
  className?: string;
}

const PossibleIntegrations: React.FC<PossibleIntegrationsProps> = ({
  heading = 'Intégrations Possibles',
  description = 'Nos agents se branchent aux logiciels que votre entreprise utilise déjà, chaque jour. Votre écosystème, connecté sans friction.',
  logos = [
    { id: 'cdk-global', name: 'CDK Global', image: '/CDKglobal.png' },
    { id: 'slack', name: 'Slack', image: '/Slack.png' },
    { id: 'google', name: 'Google', image: '/Gsuite.png' },
    { id: 'office365', name: 'Office 365', image: '/Office365.png' },
    { id: 'pbs', name: 'PBS', image: '/PBSSystems.png' },
    { id: 'dealertrack', name: 'Dealertrack', image: '/Dealertrack.png' },
    { id: 'salesforce', name: 'Salesforce', image: '/Salesforce.png' },
    { id: 'xero', name: 'Xero', image: '/Xero.png' },
    { id: 'docusign', name: 'DocuSign', image: '/DocuSign.png' },
    { id: 'apicustom', name: 'Sur mesure', image: '/api.png' },
    { id: 'more', name: 'Et encore plus...', image: '/encoreplus.png' },
  ],
  className,
}) => {
  const prefersReduced = useReducedMotion();

  const generateLogoSVG = (name: string) => {
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <svg
        width="120"
        height="40"
        viewBox="0 0 120 40"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="120"
          height="40"
          rx="6"
          fill="rgba(0, 0, 0, 0.05)"
          stroke="#9a6bff"
          strokeWidth="1"
        />
        <text
          x="60"
          y="25"
          textAnchor="middle"
          fill="#333333"
          fontSize="14"
          fontFamily="Arial, sans-serif"
          fontWeight="600"
        >
          {initials}
        </text>
      </svg>
    );
  };

  const renderChip = (logo: Logo, isDuplicate: boolean) => (
    <li
      key={isDuplicate ? `${logo.id}-dup` : logo.id}
      aria-hidden={isDuplicate || undefined}
      className="flex-shrink-0"
    >
      <div className="flex h-20 w-[150px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/95 px-3 shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:border-brand/40 sm:h-24 sm:w-[170px]">
        <div className="flex h-9 w-full items-center justify-center sm:h-11">
          {logo.image ? (
            <img
              src={logo.image}
              alt={logo.name}
              loading="lazy"
              decoding="async"
              className={cn(
                'h-full max-h-9 w-auto object-contain mix-blend-multiply sm:max-h-11',
                logo.className
              )}
            />
          ) : (
            generateLogoSVG(logo.name)
          )}
        </div>
        <p className="w-full truncate text-center text-xs font-semibold text-gray-800">
          {logo.name}
        </p>
      </div>
    </li>
  );

  // Duplicated list powers the seamless -50% loop
  const track = [...logos, ...logos];

  return (
    <section
      className={cn(
        'relative -mt-56 overflow-hidden px-4 pb-20 pt-16 md:pb-28 md:pt-24',
        className
      )}
    >
      {/* Header */}
      <div className="mx-auto w-full max-w-6xl text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-brand/70" />
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            Un écosystème connecté
          </span>
          <span className="h-px w-8 bg-brand/70" />
        </div>
        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>

      {/* Marquee — fades live INSIDE this container so they only span the chip
          row and never paint over the mountains during the -mt-56 overlap. */}
      <div className="relative mt-10 w-full md:mt-14">
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-28"
        />

        {prefersReduced ? (
          /* Static grid fallback for reduced-motion users */
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {logos.map((logo) => renderChip(logo, false))}
          </ul>
        ) : (
          <ul className="flex w-max animate-marquee gap-4">
            {track.map((logo, i) => renderChip(logo, i >= logos.length))}
          </ul>
        )}
      </div>

      <p className="mt-8 px-4 text-center text-xs text-muted-foreground">
        Et des centaines d'autres logiciels, via API sur mesure.
      </p>
    </section>
  );
};

export default PossibleIntegrations;

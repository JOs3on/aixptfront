import React from 'react';

/**
 * BrandIcons — custom hand-drawn line icons for AIXPT.
 * Deliberately not the stock "AI" glyphs (no lightning bolts, no chips).
 * Geometric, 1.5px stroke, round caps — drawn to match the design system.
 * All icons inherit `currentColor` and accept a className for sizing.
 */

interface IconProps {
  className?: string;
}

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Network of connected nodes — autonomous agents / automation. */
export const AutomationFlow: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="12" cy="4.5" r="2.25" />
    <circle cx="4.5" cy="19.5" r="2.25" />
    <circle cx="19.5" cy="19.5" r="2.25" />
    <path d="M11.2 6.4 5.3 17.6" />
    <path d="M12.8 6.4 18.7 17.6" />
  </svg>
);

/** Orbit around a core — 24/7 coverage, always on. */
export const OrbitCoverage: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="3.5" r="1.75" fill="currentColor" stroke="none" />
  </svg>
);

/** Two modules joined edge-to-edge — transparent integration. */
export const IntegrationNodes: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <rect x="3" y="7.5" width="9" height="9" rx="2.5" />
    <rect x="12" y="7.5" width="9" height="9" rx="2.5" />
  </svg>
);

/** Lens with a target — audit, finding the leaks. */
export const AuditScan: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="10.5" cy="10.5" r="6.25" />
    <path d="m20.5 20.5-4.7-4.7" />
    <circle cx="10.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/** Building blocks — design & construction. */
export const BuildBlocks: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <rect x="4" y="10" width="9" height="9" rx="2" />
    <rect x="11" y="5" width="9" height="9" rx="2" />
  </svg>
);

/** Upward arrow from a ground line — launch. */
export const LaunchArrow: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 20V7" />
    <path d="m6 13 6-6 6 6" />
    <path d="M5 20.5h14" />
  </svg>
);

/** Audio waveform — voice, live response. */
export const WaveformBars: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M4.5 12h1.5" />
    <path d="M8.75 8.5v7" />
    <path d="M12 5.5v13" />
    <path d="M15.25 9v6" />
    <path d="M19.5 12H18" />
  </svg>
);

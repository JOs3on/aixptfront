import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface LogoProps {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}

/**
 * Site logo — AIXPT mark (logo2.png, black matted out at build time into
 * logo2-transparent.png) + text wordmark, so it sits cleanly on any surface.
 */
export const Logo: React.FC<LogoProps> = ({ className, markClassName, textClassName }) => {
  return (
    <Link
      to="/"
      aria-label="AIXPT — Accueil"
      className={cn('flex flex-shrink-0 items-center gap-2.5', className)}
    >
      <img
        src="/logo2-transparent.png"
        alt=""
        aria-hidden="true"
        className={cn('h-9 w-auto object-contain md:h-10', markClassName)}
      />
      <span
        className={cn(
          'font-display text-xl font-semibold tracking-[-0.02em] text-white',
          textClassName
        )}
      >
        AIXPT
      </span>
    </Link>
  );
};

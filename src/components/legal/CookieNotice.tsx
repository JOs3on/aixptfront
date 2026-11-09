import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'aixpt_cookie_notice_v1';

/**
 * Lightweight cookie/local-storage notice.
 *
 * AIXPT currently uses only essential mechanisms (preferences + PWA cache), so
 * this is an information notice, not a consent wall. If advertising or
 * analytics cookies are added later, replace this with a real consent manager
 * that blocks non-essential cookies until the visitor opts in.
 */
export const CookieNotice: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // Storage can be blocked in private mode; showing the notice is harmless.
    }

    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'acknowledged');
    } catch {
      // Ignore storage failures.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4">
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto flex w-full max-w-3xl flex-col gap-3 rounded-2xl border border-white/15 bg-[#111116]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-4 sm:p-5"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
          <Cookie className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">Témoins et données locales</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Ce site n'utilise pas de témoins publicitaires ou de suivi. Seuls des mécanismes
            essentiels au fonctionnement et à vos préférences sont utilisés.{' '}
            <Link
              to="/politique-de-confidentialite#cookies"
              onClick={dismiss}
              className="font-medium text-brand underline-offset-2 hover:text-white hover:underline"
            >
              En savoir plus
            </Link>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-hover"
          >
            Compris
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Fermer l'avis sur les témoins"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-white/20 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieNotice;

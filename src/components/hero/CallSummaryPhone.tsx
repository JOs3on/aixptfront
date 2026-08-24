import React from 'react';
import { CalendarCheck2, CheckCircle2, Database } from 'lucide-react';

/**
 * Compact phone — the "call handled" state, distinct from the live-call
 * mockup in PhoneAgentSection (that one shows the call in progress).
 */
export const CallSummaryPhone: React.FC = () => (
  <div className="relative mx-auto w-[240px] sm:w-[260px]">
    <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-brand/15 blur-[70px]" />
    <div className="relative rounded-[2.4rem] border border-white/10 bg-[#15151a] p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
      <div className="relative overflow-hidden rounded-[1.9rem] bg-gradient-to-b from-[#17171d] to-[#0c0c10] px-5 pb-6 pt-4">
        {/* Notch */}
        <div className="absolute left-1/2 top-2.5 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        {/* Status bar */}
        <div className="flex items-center justify-between font-mono text-[9px] text-foreground/50">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>

        <div className="mt-10 text-center">
          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <h4 className="font-display text-lg font-semibold text-white">Appel traité</h4>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            42 s · 24/7
          </p>

          <div className="mt-6 space-y-2 text-left">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              <CalendarCheck2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
              <span className="text-[11px] text-foreground/80">Réservation confirmée — 19 h 30</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              <Database className="h-4 w-4 flex-shrink-0 text-brand" />
              <span className="text-[11px] text-foreground/80">CRM mis à jour automatiquement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

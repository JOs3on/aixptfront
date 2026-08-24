import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Phone, CalendarCheck2, Database } from 'lucide-react';

const SCRIPT: { role: 'caller' | 'agent'; text: string }[] = [
  { role: 'caller', text: "Bonjour, j'aimerais réserver une table pour quatre." },
  { role: 'agent', text: 'Bien sûr ! À quelle heure préférez-vous ?' },
  { role: 'caller', text: '19 h 30, si possible.' },
  { role: 'agent', text: 'Parfait — table pour 4 à 19 h 30. Une occasion spéciale ?' },
  { role: 'caller', text: "C'est un anniversaire." },
  { role: 'agent', text: "C'est noté. La confirmation arrive par texto." },
];

const BARS = [0, 1, 2, 3, 4];

/**
 * LiveCallPhone — the full "call in progress" phone mockup.
 * Plays a sliding-window live transcript while in view; pauses off-screen.
 * Self-contained so it can be embedded anywhere (section or page).
 */
export const LiveCallPhone: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [count, setCount] = useState(3);

  // Sliding window of the last 3 transcript messages, replaying while visible
  useEffect(() => {
    if (prefersReduced || !inView) return;
    const id = setInterval(() => {
      setCount((c) => (c >= SCRIPT.length ? 3 : c + 1));
    }, 1800);
    return () => clearInterval(id);
  }, [prefersReduced, inView]);

  const visible = SCRIPT.slice(count - 3, count);

  return (
    <div ref={ref} className="relative mx-auto w-[300px] sm:w-[320px]">
      {/* Glow behind the phone */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 rounded-full bg-brand/20 blur-[90px]"
      />

      <div className="relative rounded-[3rem] border border-white/10 bg-[#15151a] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
        <div className="relative overflow-hidden rounded-[2.4rem] bg-gradient-to-b from-[#17171d] to-[#0c0c10]">
          {/* Notch */}
          <div className="absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* Status bar */}
          <div className="flex items-center justify-between px-7 pb-2 pt-3 font-mono text-[10px] text-foreground/50">
            <span>9:41</span>
            <span>●●●●●</span>
          </div>

          {/* Call header */}
          <div className="px-6 pt-6 text-center">
            <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9a6bff] to-[#7a4bff] shadow-[0_8px_24px_rgba(154,107,255,0.4)]">
              <Phone className="h-7 w-7 text-white" />
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                {!prefersReduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                )}
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400" />
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold text-white">
              Agent Vocal AIXPT
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Boulangerie Martin · Appel entrant
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              En direct
            </div>
          </div>

          {/* Waveform */}
          <div className="mt-6 flex h-10 items-center justify-center gap-1.5">
            {BARS.map((i) => (
              <motion.span
                key={i}
                className="w-1.5 rounded-full bg-gradient-to-t from-[#9a6bff] to-[#c4a6ff]"
                animate={
                  prefersReduced || !inView
                    ? { height: 14 }
                    : { height: [6, 26, 10, 30, 14, 6] }
                }
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.12,
                }}
              />
            ))}
          </div>

          {/* Live transcript */}
          <div className="mx-5 mt-5 min-h-[170px] space-y-2.5">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((m, i) => (
                <motion.div
                  key={`${m.role}-${count - visible.length + i}`}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.role === 'caller'
                      ? 'mr-auto rounded-bl-md border border-white/5 bg-[#232329] text-foreground/90'
                      : 'ml-auto rounded-br-md bg-gradient-to-r from-[#9a6bff] to-[#7a4bff] text-white'
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* System status */}
          <div className="mx-5 my-5 space-y-2">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              <CalendarCheck2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
              <span className="text-[11px] text-foreground/80">
                Réservation confirmée — 19 h 30
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              <Database className="h-4 w-4 flex-shrink-0 text-brand" />
              <span className="text-[11px] text-foreground/80">
                CRM mis à jour automatiquement
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCallPhone;

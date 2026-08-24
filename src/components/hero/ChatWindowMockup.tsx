import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Scale } from 'lucide-react';

interface FlowEvent {
  kind: 'msg' | 'system';
  role?: 'client' | 'agent';
  text: string;
  think?: number;
}

const FLOW: FlowEvent[] = [
  { kind: 'msg', role: 'client', text: "Bonjour, j'aurais besoin d'aide pour une séparation." },
  { kind: 'msg', role: 'agent', text: 'Je comprends. Depuis combien de temps êtes-vous mariés ?', think: 900 },
  { kind: 'msg', role: 'client', text: '12 ans, avec deux enfants.' },
  { kind: 'msg', role: 'agent', text: 'Merci. Je vous propose une consultation avec Me Bergeron, mercredi à 14 h.', think: 1000 },
  { kind: 'system', text: 'Profil qualifié — dossier divorce' },
  { kind: 'system', text: 'Consultation proposée — mer. 14 h · CRM mis à jour' },
];

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const ChatWindowMockup: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const [revealed, setRevealed] = useState(prefersReduced ? FLOW.length : 0);
  const [typing, setTyping] = useState(false);
  const [isDone, setIsDone] = useState(prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setRevealed(FLOW.length);
      setIsDone(true);
      return;
    }
    if (!inView) {
      setRevealed(0);
      setTyping(false);
      setIsDone(false);
      return;
    }

    let alive = true;
    const run = async () => {
      await sleep(500);
      if (!alive) return;
      while (alive) {
        setIsDone(false);
        setTyping(false);
        for (let i = 0; i < FLOW.length; i++) {
          if (!alive) return;
          const ev = FLOW[i];
          if (ev.kind === 'msg' && ev.role === 'agent') {
            setTyping(true);
            await sleep(ev.think ?? 900);
            if (!alive) return;
            setTyping(false);
          }
          setRevealed(i + 1);
          await sleep(ev.kind === 'system' ? 800 : 500);
        }
        if (!alive) return;
        setIsDone(true);
        await sleep(4200);
        if (!alive) return;
        setRevealed(0);
        setIsDone(false);
        setTyping(false);
        await sleep(600);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [inView, prefersReduced]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0f] shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          chatbot — web · Cabinet Lefebvre
        </span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">38 s</span>
      </div>

      {/* Conversation */}
      <div className="min-h-[250px] space-y-2.5 px-4 py-4">
        {FLOW.slice(0, revealed).map((ev, i) =>
          ev.kind === 'system' ? (
            <motion.div
              key={`sys-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2.5 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2.5"
            >
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
              <span className="text-[11px] leading-relaxed text-foreground/80">{ev.text}</span>
            </motion.div>
          ) : (
            <motion.div
              key={`msg-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                ev.role === 'agent'
                  ? 'ml-auto rounded-br-md bg-gradient-to-r from-[#9a6bff] to-[#7a4bff] text-white'
                  : 'mr-auto rounded-bl-md border border-white/5 bg-[#232329] text-foreground/90'
              }`}
            >
              {ev.text}
            </motion.div>
          )
        )}

        {/* Typing indicator */}
        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-16 items-center justify-center gap-1.5 rounded-2xl rounded-bl-md bg-gradient-to-r from-[#9a6bff] to-[#7a4bff] px-3.5 py-3"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-white"
                animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Footer status */}
      <div className="flex items-center justify-between border-t border-white/5 px-4 py-2.5">
        <span
          className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider ${
            isDone ? 'text-emerald-300' : 'text-brand'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isDone ? 'bg-emerald-400' : 'animate-pulse bg-brand'}`} />
          {isDone ? 'Qualification terminée' : 'Qualification en cours'}
        </span>
        <Scale className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default ChatWindowMockup;

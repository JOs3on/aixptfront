import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';
import { CheckCircle2, FileText } from 'lucide-react';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * SiteSeoMockup — browser window showing a freshly shipped website AND the
 * SEO machinery behind it: #1 Google result, live SEO score, llms.txt/GEO.
 * Loops while in view; static full state under reduced motion.
 */
const SiteSeoMockup: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const [result, setResult] = useState(prefersReduced);
  const [score, setScore] = useState(prefersReduced ? 97 : 0);
  const [seoReady, setSeoReady] = useState(prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setResult(true);
      setScore(97);
      setSeoReady(true);
      return;
    }
    if (!inView) {
      setResult(false);
      setScore(0);
      setSeoReady(false);
      return;
    }

    let alive = true;
    const run = async () => {
      await sleep(600);
      if (!alive) return;
      while (alive) {
        setResult(false);
        setSeoReady(false);
        setScore(0);
        await sleep(400);
        if (!alive) return;
        // Google result slides in
        setResult(true);
        await sleep(900);
        if (!alive) return;
        // SEO score counts up
        animate(0, 97, {
          duration: 1.5,
          ease: 'easeOut',
          onUpdate: (v) => setScore(Math.round(v)),
        });
        await sleep(1600);
        if (!alive) return;
        // GEO confirmation
        setSeoReady(true);
        await sleep(4200);
        if (!alive) return;
        setResult(false);
        setSeoReady(false);
        setScore(0);
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
          site-web — cabinetjoly.ca
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-brand">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              score >= 97 ? 'bg-emerald-400' : 'animate-pulse bg-brand'
            }`}
          />
          SEO {score}/100
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-[1.15fr_1fr]">
        {/* Site preview */}
        <div className="rounded-lg border border-white/5 bg-gradient-to-b from-[#15151c] to-[#0e0e13] p-4">
          {/* Nav */}
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 rounded-md bg-gradient-to-br from-[#9a6bff] to-[#7a4bff]" />
            <span className="h-1.5 w-10 rounded-full bg-white/10" />
            <span className="h-1.5 w-8 rounded-full bg-white/10" />
            <span className="ml-auto h-4 w-14 rounded-full border border-brand/30 bg-brand/10" />
          </div>
          {/* Headline */}
          <div className="mt-4 space-y-2">
            <span className="block h-2.5 w-3/4 rounded-full bg-white/25" />
            <span className="block h-2.5 w-1/2 rounded-full bg-white/15" />
            <span className="block h-2 w-2/3 rounded-full bg-white/10" />
          </div>
          {/* Hero image placeholder */}
          <div className="relative mt-4 h-20 overflow-hidden rounded-lg bg-gradient-to-br from-[#9a6bff]/25 via-[#7a4bff]/10 to-transparent">
            <span className="absolute right-4 top-3 h-6 w-6 rounded-full bg-white/15" />
            <span className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-2 left-4 h-px w-1/3 bg-white/20" />
          </div>
          {/* Feature cards */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="space-y-1.5 rounded-md border border-white/5 bg-white/[0.03] p-2"
              >
                <span className="block h-1.5 w-6 rounded-full bg-white/15" />
                <span className="block h-1 w-full rounded-full bg-white/10" />
                <span className="block h-1 w-2/3 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        {/* SEO panel */}
        <div className="flex flex-col gap-3">
          {/* Google result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-lg border border-white/5 bg-white/[0.03] p-3"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[8px] font-bold text-emerald-300">
                  #1
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#9a6bff] to-[#7a4bff] text-[7px] font-bold text-white">
                  C
                </span>
                <span className="truncate font-mono text-[9px] text-emerald-300">
                  cabinetjoly.ca
                </span>
              </div>
              <p className="mt-1.5 text-[11px] font-semibold text-white">
                Cabinet Joly — Notaire à Montréal
              </p>
              <div className="mt-1.5 space-y-1">
                <span className="block h-1 w-full rounded-full bg-white/10" />
                <span className="block h-1 w-2/3 rounded-full bg-white/10" />
              </div>
            </motion.div>
          )}

          {/* SEO score */}
          <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
                Score SEO
              </span>
              <span className="font-mono text-sm font-bold text-brand">
                {score}/100
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#7a4bff] to-[#9a6bff]"
                animate={{ width: `${score}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>
          </div>

          {/* GEO / llms.txt */}
          {seoReady && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2.5"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                <span className="text-[10px] text-foreground/80">
                  llms.txt publié · GEO prêt
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer status */}
      <div className="flex items-center justify-between border-t border-white/5 px-4 py-2.5">
        <span
          className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider ${
            seoReady ? 'text-emerald-300' : 'text-brand'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              seoReady ? 'bg-emerald-400' : 'animate-pulse bg-brand'
            }`}
          />
          {seoReady ? 'Position #1 — Google & moteurs IA' : 'Indexation en cours'}
        </span>
        <FileText className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default SiteSeoMockup;

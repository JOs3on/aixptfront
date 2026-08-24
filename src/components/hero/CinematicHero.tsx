import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ScrollScrubCanvas } from '../effects/ScrollScrubCanvas';

const FRAME_COUNT = 67;
const frameUrl = (index: number) =>
  `/mountain-frames/frame_${String(index).padStart(4, '0')}.webp`;
const lastFrameUrl = frameUrl(FRAME_COUNT);

interface CinematicHeroProps {
  headline: string;
  /** Exact substring of `headline` rendered in the brand accent. */
  accent?: string;
  subtitle: string;
  ctaText: string;
  kicker?: string;
  secondaryCtaText?: string;
  proofLine?: string;
  onOpenConsultation?: () => void;
}

/** Splits `text` around the first occurrence of `accent`. */
const splitAccent = (text: string, accent?: string) => {
  if (!accent) return { before: text, accent: '', after: '' };
  const idx = text.indexOf(accent);
  if (idx === -1) return { before: text, accent: '', after: '' };
  return {
    before: text.slice(0, idx),
    accent,
    after: text.slice(idx + accent.length),
  };
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  headline,
  accent,
  subtitle,
  ctaText,
  kicker = "Agence d'automatisation IA — Québec",
  secondaryCtaText = 'Voir nos solutions',
  proofLine = 'Appel gratuit · Sans contrat · En ligne en 2 semaines',
  onOpenConsultation,
}) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { before, accent: accentPart, after } = splitAccent(headline, accent);

  // Copy fades and drifts up while the mountain pan-out plays — the scroll
  // drives both the imagery and the text, so the flight feels intentional.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <section
      ref={heroRef}
      aria-label="Présentation"
      className="relative"
      style={{ height: '260dvh' }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-background">
        {/* Static fallback — mobile, while frames load, and reduced motion */}
        <img
          src={lastFrameUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center sm:object-[calc(50%_+_260px)_center]"
        />

        {/* Scroll-scrubbed frame sequence — desktop only for performance */}
        {!prefersReducedMotion && (
          <ScrollScrubCanvas
            targetRef={heroRef}
            totalFrames={FRAME_COUNT}
            frameUrl={frameUrl}
            className="absolute inset-0 hidden h-full w-full sm:block"
          />
        )}

        {/* Violet ambient glow behind the copy */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_28%_42%,rgba(154,107,255,0.22),transparent_70%)]"
        />

        {/* Dark scrim — strongest behind the copy, letting the imagery breathe on the right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,12,0.9)_0%,rgba(10,10,12,0.66)_38%,rgba(10,10,12,0.24)_68%,rgba(10,10,12,0.05)_100%)]"
        />

        {/* Film grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grain opacity-[0.07] mix-blend-overlay"
        />

        {/* Bottom fade into the next section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background via-background/30 to-transparent"
        />

        {/* Copy */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 pb-20 pt-24 sm:px-8">
          <motion.div
            variants={containerVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
            style={prefersReducedMotion ? undefined : { opacity: copyOpacity, y: copyY }}
            className="w-full max-w-2xl text-left"
          >
            {/* Kicker */}
            <motion.div
              variants={itemVariants}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-brand/70" />
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-brand sm:text-xs">
                {kicker}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(2.6rem,5.6vw,4.9rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white"
            >
              {before}
              {accentPart && <span className="text-brand">{accentPart}</span>}
              {after}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70 md:text-xl"
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button
                onClick={onOpenConsultation}
                className="group h-12 rounded-full bg-brand px-7 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
              >
                {ctaText}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Link
                to="/services"
                className="group inline-flex h-12 items-center justify-center gap-2 px-4 text-base font-medium text-foreground/80 transition-colors duration-300 hover:text-white"
              >
                <span className="relative">
                  {secondaryCtaText}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-white/60 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </span>
              </Link>
            </motion.div>

            {/* Proof line */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-xs"
            >
              {proofLine.split(' · ').map((part, i) => (
                <React.Fragment key={part}>
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-brand/60" />}
                  <span>{part}</span>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-foreground/40"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CinematicHero;

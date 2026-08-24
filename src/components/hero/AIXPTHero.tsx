import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AutomationFlow, OrbitCoverage, IntegrationNodes } from '../icons/BrandIcons';
import { Link } from 'react-router-dom';
import { CinematicHero } from './CinematicHero';
import PhoneAgentSection from './PhoneAgentSection';
import PossibleIntegrations from './PossibleIntegrations';
import UseCasesSection from './UseCasesSection';
import HowItWorksSection from './HowItWorksSection';
import FAQSection from './FAQSection';

interface AIXPTHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onOpenConsultation?: () => void;
}

const DEFAULT_TITLE = "L'IA qui travaille pendant que vous dormez.";
const ACCENT_PHRASE = 'travaille pendant que vous dormez';

const pains = [
  {
    title:
      "Vos appels manqués deviennent des rendez-vous chez le concurrent.",
    description:
      "Chaque appel sans réponse est un client qui appelle ailleurs — et qui n'appelle presque jamais deux fois.",
  },
  {
    title: "Vos suivis s'éteignent dans l'oubli.",
    description:
      "Sans relance automatique, la majorité des prospects n'obtiennent jamais de réponse. Une demande sur deux se perd dans les 24 heures.",
  },
  {
    title: 'Vos équipes croulent sous les tâches répétitives.',
    description:
      "Saisies, rappels, classement : des heures englouties chaque semaine — pendant que vos concurrents automatisent.",
  },
];

export const AIXPTHero: React.FC<AIXPTHeroProps> = ({
  title = DEFAULT_TITLE,
  subtitle = 'Récupérez vos leads perdus, répondez aux appels 24/7 et synchronisez tous vos systèmes — avec des agents IA qui travaillent pour vous, sans lever le petit doigt.',
  ctaText = 'Réserver une consultation',
  onOpenConsultation = () => console.log('Open consultation'),
}) => {
  const features = [
    {
      icon: <AutomationFlow className="h-8 w-8" />,
      title: 'Automatisation Intelligente',
      description:
        "Déployez des agents IA qui apprennent et s'adaptent à vos processus métier",
    },
    {
      icon: <OrbitCoverage className="h-8 w-8" />,
      title: 'Réponse 24/7',
      description:
        'Chaque appel, chaque message — traité instantanément, même quand vos bureaux sont fermés',
    },
    {
      icon: <IntegrationNodes className="h-8 w-8" />,
      title: 'Intégration Transparente',
      description:
        'Connectez-vous sans effort à vos outils et workflows existants',
    },
  ];

  const [featureA, featureB, featureC] = features;

  return (
    <div className="relative w-full bg-background text-foreground">
      <CinematicHero
        headline={title}
        accent={ACCENT_PHRASE}
        subtitle={subtitle}
        ctaText={ctaText}
        onOpenConsultation={onOpenConsultation}
      />

      <div className="relative z-10">
        {/* Social proof — integrations marquee (anatomy slot #2, right after hero) */}
        <PossibleIntegrations />

        {/* Product proof — live AI call phone mockup */}
        <PhoneAgentSection />

        {/* Pain section — le coût de l'attente (agitation before the pitch) */}
        <section className="relative border-y border-white/5 bg-[#0d0d10] py-20 md:py-28">
          <div className="mx-auto w-full max-w-5xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-brand/70" />
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                  Le coût de l'attente
                </span>
                <span className="h-px w-8 bg-brand/70" />
              </div>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
                Sans automatisation, chaque opportunité{' '}
                <span className="text-brand">s'échappe</span>.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Trois fuites silencieuses qui coûtent plus cher que vous ne le
                croyez.
              </p>
            </motion.div>

            <div className="mt-14 space-y-14 md:mt-20 md:space-y-20">
              {pains.map((pain, index) => (
                <motion.div
                  key={pain.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid grid-cols-1 items-baseline gap-4 md:grid-cols-[64px_1fr_1.4fr] md:gap-10"
                >
                  <span className="font-sans text-sm font-semibold tracking-[0.08em] text-brand/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-white md:text-2xl">
                    {pain.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {pain.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="mt-16 text-center md:mt-20"
            >
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 text-base font-medium text-foreground/80 transition-colors duration-300 hover:text-white"
              >
                <span className="relative">
                  Voir comment on automatise
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </span>
                <ArrowRight className="h-4 w-4 text-brand transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Value proposition cards — benefits */}
        <section className="relative mx-auto w-full max-w-6xl px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-brand/70" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Pourquoi AIXPT
              </span>
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
              Vos opérations, amplifiées par l'IA.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Des agents qui répondent, analysent et exécutent — reliés à vos
              outils existants, jour et nuit.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[featureA, featureB].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group rounded-xl border border-white/10 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card md:p-8"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 text-brand">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}

            {/* Wide integration card — asymmetric, breaks the uniform 3-grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-xl border border-white/10 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card md:col-span-2 md:flex md:items-center md:gap-10 md:p-8"
            >
              <div className="mb-5 flex-shrink-0 md:mb-0">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 text-brand">
                  {featureC.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">
                  {featureC.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {featureC.description}
                </p>
              </div>
              {/* Static connector — vos outils → agents AIXPT → vos systèmes */}
              <div aria-hidden="true" className="hidden items-center gap-3 xl:flex">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
                  Vos outils
                </span>
                <span className="h-px w-10 bg-brand/50" />
                <span className="rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-brand">
                  Agents AIXPT
                </span>
                <span className="h-px w-10 bg-brand/50" />
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
                  Vos systèmes
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How it works — 3-step process */}
        <HowItWorksSection />

        {/* FAQ — objection handling before the final CTA */}
        <FAQSection />

        {/* Use cases + final CTA */}
        <UseCasesSection onOpenConsultation={onOpenConsultation} />
      </div>
    </div>
  );
};

export default AIXPTHero;

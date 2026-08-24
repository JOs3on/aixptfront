import React from 'react';
import { motion } from 'framer-motion';
import { AuditScan, BuildBlocks, LaunchArrow } from '../icons/BrandIcons';

const steps = [
  {
    icon: <AuditScan className="h-5 w-5" />,
    step: '01',
    title: 'Audit',
    description:
      "On cartographie vos processus et on quantifie les fuites : appels manqués, suivis oubliés, heures perdues en tâches répétitives.",
  },
  {
    icon: <BuildBlocks className="h-5 w-5" />,
    step: '02',
    title: 'Conception',
    description:
      "On construit vos agents IA et on les branche à vos outils existants — CRM, téléphonie, agenda, email — sans chambouler vos équipes.",
  },
  {
    icon: <LaunchArrow className="h-5 w-5" />,
    step: '03',
    title: 'Lancement & optimisation',
    description:
      "On déploie, on surveille et on optimise en continu. Un humain reste dans la boucle pour les décisions sensibles.",
  },
];

const HowItWorksSection: React.FC = () => {
  return (
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
            Comment ça marche
          </span>
        </div>
        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
          De l'audit au déploiement, en trois temps.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Pas de magie noire : un processus clair, cadré, et piloté avec vous à
          chaque étape.
        </p>
      </motion.div>

      <div className="relative mt-14 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
        {/* Connector line behind the step markers (desktop only) */}
        <div
          aria-hidden="true"
          className="absolute left-[16%] right-[16%] top-6 hidden h-px bg-gradient-to-r from-brand/0 via-brand/40 to-brand/0 md:block"
        />
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand/30 bg-[#121214] text-brand">
              {step.icon}
            </div>
            <div className="mb-2 flex items-baseline gap-3">
              <span className="font-sans text-sm font-semibold tracking-[0.08em] text-brand/80">
                {step.step}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-white md:text-2xl">
                {step.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;

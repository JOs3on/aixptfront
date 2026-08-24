import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Combien de temps prend un déploiement ?',
    a: "En général deux à quatre semaines entre l'audit et le lancement, selon le nombre de systèmes à connecter. Vous gardez la main à chaque étape du processus.",
  },
  {
    q: 'Est-ce que vos agents s\'intègrent à nos outils ?',
    a: "Oui. Nous connectons la majorité des CRM, plannings, logiciels de téléphonie, suites email et plateformes métier — ou via API sur mesure si votre outil n'est pas standard.",
  },
  {
    q: 'Faut-il changer notre façon de travailler ?',
    a: "Non. Les agents s'adaptent à vos processus existants, pas l'inverse. Vos équipes gardent le contrôle et la supervision sur chaque scénario.",
  },
  {
    q: 'Que se passe-t-il si l\'agent se trompe ?',
    a: 'Chaque action est journalisée et traçable. Les scénarios sensibles incluent une validation humaine, et tout cas incertain remonte automatiquement à vos équipes.',
  },
  {
    q: 'Est-ce pertinent pour une PME ?',
    a: "La plupart de nos clients sont des PME qui manquent d'heures, pas de volume. La consultation initiale est gratuite et sans engagement — on évalue ensemble le retour sur investissement avant de lancer quoi que ce soit.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-20 md:py-28">
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
            Questions fréquentes
          </span>
          <span className="h-px w-8 bg-brand/70" />
        </div>
        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
          Les réponses avant la décision.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Tout ce que vous voulez savoir avant de nous confier un premier projet.
        </p>
      </motion.div>

      <div className="mx-auto mt-12 max-w-3xl space-y-3 md:mt-14">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                isOpen ? 'border-brand/30 bg-card/80' : 'border-white/10 bg-card/70 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
              >
                <span
                  className={`font-display text-base font-semibold tracking-[-0.01em] transition-colors duration-300 md:text-lg ${
                    isOpen ? 'text-brand' : 'text-white'
                  }`}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-brand' : 'text-muted-foreground'
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-label={faq.q}
                    initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6 md:pb-6 md:text-base">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;

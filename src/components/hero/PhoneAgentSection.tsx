import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck2, Database, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { LiveCallPhone } from './LiveCallPhone';
import { WaveformBars } from '../icons/BrandIcons';

const bullets = [
  {
    icon: <WaveformBars className="h-5 w-5" />,
    title: 'Réponse en moins de 2 sonneries',
    description: 'Aucun appel perdu, même aux heures de pointe.',
  },
  {
    icon: <CalendarCheck2 className="h-5 w-5" />,
    title: 'Réservation directe',
    description: 'Rendez-vous posé dans votre agenda, sans intervention.',
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: 'Systèmes synchronisés',
    description: 'CRM, facturation et rappels mis à jour automatiquement.',
  },
];

export const PhoneAgentSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-20 pb-20 md:pt-28 md:pb-28">
      {/* Ambient violet glow — anchored below the section's top padding. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-56 bg-[radial-gradient(ellipse_70%_70%_at_50%_25%,rgba(154,107,255,0.12),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-4 lg:grid-cols-2 lg:gap-10">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-brand/70" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              L'agent AIXPT en action
            </span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
            Un agent vocal qui{' '}
            <span className="text-brand">répond, qualifie et réserve</span>.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            À chaque appel, l'agent AIXPT décroche, répond aux questions,
            qualifie le client et met à jour vos systèmes — en 30 secondes,
            24 h/24, même quand vos bureaux sont fermés.
          </p>

          <ul className="mt-8 space-y-4">
            {bullets.map((b, i) => (
              <motion.li
                key={b.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-start gap-4"
              >
                <span className="mt-0.5 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 text-brand">
                  {b.icon}
                </span>
                <span>
                  <span className="block text-base font-semibold text-white">
                    {b.title}
                  </span>
                  <span className="block text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              onClick={() => navigate('/assistant-vocal')}
              className="group h-12 rounded-full bg-brand px-7 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
            >
              Découvrir l'assistant vocal
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Link
              to="/services"
              className="group inline-flex h-12 items-center justify-center px-4 text-base font-medium text-foreground/80 transition-colors duration-300 hover:text-white"
            >
              <span className="relative">
                Voir tous les services
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-white/60 transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <LiveCallPhone />
        </motion.div>
      </div>
    </section>
  );
};

export default PhoneAgentSection;

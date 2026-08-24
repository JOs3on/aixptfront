import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MessageSquarePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatWindowMockup from './ChatWindowMockup';
import InboxMockup from './InboxMockup';
import SiteSeoMockup from './SiteSeoMockup';
import { CallSummaryPhone } from './CallSummaryPhone';

interface UseCase {
  id: string;
  title: string;
  industry: string;
  description: string;
  keywords: string[];
  to: string;
}

const useCases: UseCase[] = [
  {
    id: 'assistant-vocal',
    title: 'Agent Vocal IA',
    industry: 'Concessions automobiles',
    description:
      "Transformez les appels clients en rendez-vous instantanés et mises à jour CRM — 24 h/24, même quand vos bureaux sont fermés.",
    keywords: ['Appels 24/7', 'Rendez-vous instantanés', 'CRM mis à jour'],
    to: '/assistant-vocal',
  },
  {
    id: 'chatbot',
    title: 'Chatbot IA',
    industry: 'Cabinets juridiques',
    description:
      'Qualification rapide des clients et collecte intelligente vers une base de données toujours à jour, directement depuis votre site.',
    keywords: ['Qualification rapide', 'Collecte intelligente', 'Base de données à jour'],
    to: '/agents-conversationnels',
  },
  {
    id: 'agent-email',
    title: 'Agent Email IA Complexe',
    industry: 'Hôtels',
    description:
      'Gestion avancée des emails clients : tri intelligent, routage vers CRM et envois personnalisés, sans intervention humaine.',
    keywords: ['Segmentation automatique', 'Réservations directes', 'Envois intelligents'],
    to: '/emails-automatises',
  },
  {
    id: 'creation-sites-web',
    title: 'Création de Sites Web',
    industry: 'PME · Commerces locaux',
    description:
      "Des sites rapides, élégants et visibles : SEO et GEO intégrés dès la conception — un site qu'on trouve, pas juste qu'on voit.",
    keywords: ['SEO & GEO inclus', 'Position #1 Google', 'Vitesse optimisée'],
    to: '/creation-sites-web',
  },
];



interface UseCasesSectionProps {
  onOpenConsultation?: () => void;
}

const UseCasesSection = ({ onOpenConsultation }: UseCasesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-full overflow-hidden border-t border-white/5 bg-[#0d0d10] px-4 py-20 md:py-28"
    >
      <div className="container relative z-10 mx-auto w-full max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3 md:mb-5">
            <span className="h-px w-8 bg-brand/70" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Cas d'usage IA
            </span>
            <span className="h-px w-8 bg-brand/70" />
          </div>

          <h2 className="mb-5 px-2 font-display text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl md:mb-7 md:text-4xl lg:text-5xl">
            <span className="text-white">Des agents qui </span>
            <span className="text-brand">travaillent pour vous</span>
          </h2>
          <p className="mx-auto mb-8 max-w-3xl px-4 text-sm text-foreground/70 sm:text-base md:mb-12 md:text-lg">
            Chaque agent AIXPT est conçu pour un flux métier précis : répondre,
            qualifier, réserver, synchroniser — puis rendre des comptes.
          </p>
        </motion.div>

        {/* Showcase rows — alternating copy / artifact */}
        <div className="mx-auto max-w-6xl space-y-20 md:space-y-28">
          {useCases.map((uc, index) => {
            const artifact =
              uc.id === 'assistant-vocal' ? (
                <CallSummaryPhone />
              ) : uc.id === 'chatbot' ? (
                <ChatWindowMockup />
              ) : uc.id === 'agent-email' ? (
                <InboxMockup />
              ) : (
                <SiteSeoMockup />
              );

            const copy = (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-brand" />
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                    {uc.industry}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white md:text-4xl">
                  {uc.title}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                  {uc.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {uc.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/70"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <Link
                  to={uc.to}
                  className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-white"
                >
                  <span className="relative">
                    En savoir plus
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </span>
                  <ArrowRight className="h-4 w-4 text-brand transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );

            const artifactMotion = (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {artifact}
              </motion.div>
            );

            return (
              <div
                key={uc.id}
                className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14"
              >
                {/* Artifact flips sides every row */}
                {index % 2 === 1 ? (
                  <>
                    {artifactMotion}
                    {copy}
                  </>
                ) : (
                  <>
                    {copy}
                    {artifactMotion}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 border-t border-white/10 px-4 pt-6 text-center md:mt-20 md:pt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="mx-auto mb-5 flex items-center justify-center gap-2 text-foreground/50">
            <MessageSquarePlus className="h-4 w-4" />
            <span className="text-sm">Votre secteur n'est pas dans la liste ?</span>
          </div>
          <button
            className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)] md:px-10 md:py-4 md:text-base lg:text-lg"
            onClick={onOpenConsultation}
          >
            <span>Personnaliser vos solutions</span>{' '}
            <ArrowRight className="ml-2 inline-flex h-4 w-4 md:h-5 md:w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;

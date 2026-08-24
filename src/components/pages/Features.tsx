import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mic, Mail, MessageCircle, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface FeaturesProps {
  onOpenConsultation: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
  const features = [
    {
      id: 'assistant-vocal',
      title: 'Assistant Vocal 24/7',
      description:
        "Chaque appel, chaque information — synchronisés sans effort. Propulsé par l'intelligence artificielle.",
      icon: Mic,
    },
    {
      id: 'emails-automatises',
      title: "Personnalisation d'Emails Automatisée",
      description: 'Prospection personnalisée. En pilote automatique.',
      icon: Mail,
    },
    {
      id: 'agents-conversationnels',
      title: 'Agents Conversationnels IA',
      description: 'Des conversations fluides, gestion des relations clients en automatique.',
      icon: MessageCircle,
    },
    {
      id: 'creation-sites-web',
      title: 'Création de site web sur mesure',
      description:
        "Un design remarquable, une fonctionnalité fluide — avec optimisation SEO dès la conception pour vous faire trouver.",
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 text-foreground">
      <Helmet>
        <title>Services IA AIXPT au Québec - Automatisation et IA pour PME et grandes entreprises</title>
        <meta name="description" content="Découvrez nos solutions d'intelligence artificielle au Québec pour transformer votre entreprise. Services d'automatisation IA à Montréal et province: assistants vocaux, agents conversationnels, création web." />
        <meta name="keywords" content="services IA Québec, automatisation Montréal AIXPT, agents conversationnels Québec, création sites web IA province, SEO Québec" />
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand/70" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Nos services
            </span>
            <span className="h-px w-8 bg-brand/70" />
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
            <span className="text-brand">Services</span>
            <br />
            <span className="text-white">au Québec — AIXPT</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-muted-foreground">
            Nos solutions d'intelligence artificielle conçues pour transformer votre entreprise
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group rounded-xl border border-white/10 bg-card/70 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 text-brand">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
                  {feature.title}
                </h3>
                <p className="mb-6 mt-3 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>

                <Button
                  onClick={() => navigate(`/${feature.id}`)}
                  className="w-full rounded-full bg-brand text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_8px_24px_rgba(154,107,255,0.35)]"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="rounded-xl border border-white/10 bg-card/70 p-8">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
              Prêt à automatiser vos opérations ?
            </h3>
            <p className="mb-6 mt-3 text-muted-foreground">
              Découvrez comment nos solutions IA peuvent transformer votre activité
            </p>
            <Button
              onClick={onOpenConsultation}
              className="rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
            >
              Demander une Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

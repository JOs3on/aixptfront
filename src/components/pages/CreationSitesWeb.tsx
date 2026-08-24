import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Globe, Palette, Code, Smartphone, CheckCircle, ArrowLeft,
  Search, Gauge, MapPin, Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface CreationSitesWebProps {
  onOpenConsultation: () => void;
}

export const CreationSitesWeb: React.FC<CreationSitesWebProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();

  const seo = [
    {
      icon: <Search className="h-5 w-5" />,
      title: 'SEO on-page',
      description: 'Titres, balises meta, hiérarchie et contenu optimisés pour vos mots-clés.',
    },
    {
      icon: <Gauge className="h-5 w-5" />,
      title: 'SEO technique',
      description: 'Vitesse de chargement, mobile-first et indexation soignées dès le départ.',
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'SEO local',
      description: 'Fiche Google Business, avis et ancrage local pour les recherches près de vous.',
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'GEO — visibilité IA',
      description: "llms.txt et structure de données pour être cité par les IA (ChatGPT, Gemini…).",
    },
  ];

  const functionalities = [
    'Design responsive et moderne',
    'Optimisation SEO avancée dès la conception',
    'Intégration CMS personnalisé',
    'Performance et vitesse optimisées',
    'Sécurité renforcée',
    'Maintenance et support continu',
  ];

  const advantages = [
    'Augmentation du trafic organique',
    "Amélioration de l'expérience utilisateur",
    'Conversion optimisée',
    'Compatibilité multi-appareils',
    'Évolutivité et flexibilité',
    'ROI mesurable et durable',
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 text-foreground">
      <Helmet>
        <title>Création Sites Web Sur Mesure au Québec - AIXPT</title>
        <meta name="description" content="Création de sites web sur mesure au Québec par AIXPT Montréal. Design moderne, optimisation SEO et GEO pour PME de la province et Montréal." />
        <meta name="keywords" content="création sites web Québec, développement web Montréal AIXPT, sites responsive Québec, SEO web province, agence web IA Québec" />
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/services')}
            variant="ghost"
            className="text-brand hover:text-white hover:bg-brand/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux Services
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-brand/30 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 p-6">
              <Globe className="h-12 w-12 text-brand" />
            </div>
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
            <span className="text-brand">Création de Sites Web</span>
            <br />
            <span className="text-white">Sur Mesure au Québec — AIXPT</span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-xl text-muted-foreground">
            Un design remarquable, une fonctionnalité fluide. Votre vision, notre expertise.
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 rounded-xl border border-white/10 bg-card/70 p-8"
        >
          <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">Description</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Nous créons des sites web exceptionnels qui allient esthétique moderne et performance
            technique. Chaque projet est conçu sur mesure pour refléter votre identité de marque
            tout en offrant une expérience utilisateur optimale. De la conception à la mise en ligne,
            nous vous accompagnons pour créer une présence digitale qui convertit —{' '}
            <span className="text-foreground">
              et que l'on trouve : l'optimisation SEO fait partie intégrante de chaque projet.
            </span>
          </p>
        </motion.div>

        {/* SEO inclus — section dédiée */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand/70" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                SEO inclus dans chaque projet
              </span>
              <span className="h-px w-8 bg-brand/70" />
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Votre site trouvé, pas juste vu.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Un beau site sans visibilité ne convertit pas. Chaque site AIXPT est optimisé
              pour Google — et pour les moteurs de recherche IA.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {seo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="rounded-xl border border-white/10 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 text-brand">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Functionalities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-xl border border-white/10 bg-card/70 p-8"
          >
            <div className="mb-6 flex items-center">
              <Code className="mr-3 h-8 w-8 text-brand" />
              <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">Services</h2>
            </div>

            <ul className="space-y-4">
              {functionalities.map((functionality, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start text-muted-foreground"
                >
                  <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                  <span>{functionality}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Advantages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-xl border border-white/10 bg-card/70 p-8"
          >
            <div className="mb-6 flex items-center">
              <Palette className="mr-3 h-8 w-8 text-brand" />
              <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">Avantages</h2>
            </div>

            <ul className="space-y-4">
              {advantages.map((advantage, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start text-muted-foreground"
                >
                  <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                  <span>{advantage}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="rounded-xl border border-white/10 bg-card/70 p-8">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
              Prêt à créer votre présence digitale ?
            </h3>
            <p className="mb-6 mt-3 text-muted-foreground">
              Découvrez comment nous pouvons transformer votre vision en réalité web
            </p>
            <Button
              onClick={onOpenConsultation}
              className="rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
            >
              <Smartphone className="mr-2 h-5 w-5" />
              Discuter de Mon Projet
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

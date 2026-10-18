import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { metaFor, SITE_URL } from '../../seo/meta';
import { Users, Lightbulb, Heart, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AutomationFlow } from '../icons/BrandIcons';

const values = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Innovation',
    description:
      "On ne se contente pas de suivre les tendances — on construit des solutions qui n'existaient pas hier.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Excellence',
    description:
      'Chaque agent, chaque intégration est conçue avec une rigueur qui fait la différence sur le terrain.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Collaboration',
    description:
      "On ne livre pas un produit puis on disparaît. On travaille avec vous, dans vos outils, à votre rythme.",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Ancrage local',
    description:
      'Basés au Québec, on connaît le marché, la réglementation et les défis — et les opportunités — de la province.',
  },
];

export const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{metaFor('/apropos')!.title}</title>
        <meta name="description" content={metaFor('/apropos')!.description} />
        <meta
          name="keywords"
          content="AIXPT, automatisation IA, Québec, intelligence artificielle, PME Québec"
        />
        <link rel="canonical" href={`${SITE_URL}/apropos`} />
      </Helmet>

      <div className="min-h-screen bg-background pb-16 pt-24 text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand/70" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                À propos
              </span>
              <span className="h-px w-8 bg-brand/70" />
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
              <span className="text-white">On rend l'IA </span>
              <span className="text-brand">accessible</span>
              <br />
              <span className="text-white">aux entreprises d'ici.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              AIXPT est né d'un constat simple : l'automatisation ne devrait pas être
              réservée aux grandes entreprises. On crée des agents IA qui travaillent
              pour les PME du Québec — 24 h/24, sans complexité inutile.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-16 overflow-hidden rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/15 via-[#7a4bff]/5 to-transparent p-8 text-center md:p-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-20 rounded-full bg-brand/5 blur-[120px]"
            />
            <div className="relative z-10">
              <span className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 text-brand">
                <AutomationFlow className="h-7 w-7" />
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-white">
                Notre mission
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                On croit qu'un cabinet comptable, une clinique dentaire ou un hôtel
                méritent les mêmes outils qu'une multinationale. Notre mission :
                déployer des agents IA qui répondent aux appels, trient les emails,
                qualifient les prospects et mettent à jour vos systèmes — sans que
                vous ayez à embaucher une équipe technique.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <div className="mb-8 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand/70" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Nos valeurs
              </span>
              <span className="h-px w-8 bg-brand/70" />
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-xl border border-white/10 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 text-brand">
                    {value.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-16 overflow-hidden rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/15 via-[#7a4bff]/5 to-transparent p-8 text-center md:p-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-20 rounded-full bg-brand/5 blur-[120px]"
            />
            <div className="relative z-10">
              <span className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 text-brand">
                <MapPin className="h-7 w-7" />
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] text-white">
                Basés au Québec
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                On est fiers d'opérer depuis la province de Québec — de Montréal
                à Québec. Cette proximité nous permet de comprendre les réalités
                des entreprises d'ici : la réglementation, le marché local, le
                tissu économique régional. Nos solutions sont pensées pour les PME
                québécoises, avec un service en français.
              </p>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="mx-auto max-w-xl rounded-xl border border-white/10 bg-card/70 p-8">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
                Prêt à automatiser sans sacrifier la qualité ?
              </h3>
              <p className="mb-6 mt-3 text-muted-foreground">
                On commence par un appel gratuit. Pas de contrat, pas d'engagement.
              </p>
              <Link
                to="/contact"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-8 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
              >
                Nous contacter{' '}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
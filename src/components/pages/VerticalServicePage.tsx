import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { metaFor, SITE_URL } from '../../seo/meta';

export interface VerticalPageConfig {
  path: string;
  eyebrow: string;
  h1Lead: string;
  h1Accent: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  problems: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  functionalities: string[];
  advantages: string[];
  faq: { q: string; a: string }[];
  demoPath: string;
  demoLabel: string;
  serviceType: string;
  keywords: string;
}

interface VerticalServicePageProps {
  config: VerticalPageConfig;
  onOpenConsultation: () => void;
}

/**
 * Shared template for the sector landing pages. Keeping the SEO content in one
 * component avoids drift between the auto/dental pages and the new lawyer/HVAC
 * pages while still allowing unique copy and schema per page.
 */
export const VerticalServicePage: React.FC<VerticalServicePageProps> = ({
  config,
  onOpenConsultation,
}) => {
  const navigate = useNavigate();
  const meta = metaFor(config.path)!;
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 text-foreground">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={config.keywords} />
        <link rel="canonical" href={`${SITE_URL}${config.path}`} />
        <script type="application/ld+json" key="service-schema">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: config.eyebrow,
            serviceType: config.serviceType,
            provider: { '@type': 'Organization', name: 'AIXPT', url: SITE_URL },
            areaServed: { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
            url: `${SITE_URL}${config.path}`,
            description: meta.description,
          })}
        </script>
        <script type="application/ld+json" key="faq-schema">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: config.faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          })}
        </script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-brand/30 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 p-6">
              <Icon className="h-12 w-12 text-brand" />
            </div>
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
            <span className="text-brand">{config.h1Lead}</span>
            <br />
            <span className="text-white">{config.h1Accent}</span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-xl text-muted-foreground">
            {config.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 rounded-xl border border-white/10 bg-card/70 p-8"
        >
          <p className="text-lg leading-relaxed text-muted-foreground">{config.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover">
              <Link to={config.demoPath}>
                {config.demoLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              onClick={onOpenConsultation}
              variant="outline"
              className="rounded-full border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/5"
            >
              <Sparkles className="mr-2 h-4 w-4 text-brand" />
              Réserver 15 minutes
            </Button>
          </div>
        </motion.div>

        {/* Problems */}
        <div className="mb-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {config.problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-xl border border-white/10 bg-card/70 p-6"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
                {problem.icon}
              </div>
              <h2 className="font-display text-lg font-semibold text-white">{problem.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="rounded-xl border border-white/10 bg-card/70 p-8"
          >
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
              Ce que fait l'agent
            </h2>
            <ul className="mt-6 space-y-4">
              {config.functionalities.map((item) => (
                <li key={item} className="flex items-start text-muted-foreground">
                  <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="rounded-xl border border-white/10 bg-card/70 p-8"
          >
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
              Ce que ça change
            </h2>
            <ul className="mt-6 space-y-4">
              {config.advantages.map((item) => (
                <li key={item} className="flex items-start text-muted-foreground">
                  <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Questions fréquentes
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Les réponses aux questions que les entreprises de ce secteur nous posent le plus
              souvent.
            </p>
          </div>

          <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-xl border border-white/10 bg-card/70">
            {config.faq.map((item) => (
              <details key={item.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-white">
                  {item.q}
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-brand transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="rounded-xl border border-white/10 bg-card/70 p-8">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
              Voyons si ça a du sens pour votre entreprise
            </h2>
            <p className="mx-auto mb-6 mt-3 max-w-xl text-muted-foreground">
              En 15 minutes, on regarde vos volumes, vos processus et on vous dit franchement si
              l'automatisation est rentable — sans engagement.
            </p>
            <Button
              onClick={onOpenConsultation}
              className="rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Planifier une consultation diagnostic (15 min)
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

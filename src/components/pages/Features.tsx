import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { metaFor, SITE_URL } from '../../seo/meta';
import {
  ArrowRight,
  Calendar,
  Car,
  Check,
  Clock,
  Database,
  Globe,
  HeartPulse,
  Mail,
  MessageCircle,
  Phone,
  Scale,
  Sparkles,
  Thermometer,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { CallSummaryPhone } from '../hero/CallSummaryPhone';
import ChatWindowMockup from '../hero/ChatWindowMockup';

interface FeaturesProps {
  onOpenConsultation: () => void;
}

const sectors = [
  {
    title: 'Concessionnaires automobiles',
    description: 'Appels 24/7, qualification des leads et rendez-vous au service.',
    icon: Car,
    to: '/receptionniste-ia-concessionnaires-automobiles',
  },
  {
    title: 'Cliniques et cabinets',
    description: 'Prise de rendez-vous, questions fréquentes et rappels automatiques.',
    icon: HeartPulse,
    to: '/chatbot-ia-clinique',
  },
  {
    title: 'Cabinets juridiques',
    description: 'Intake, qualification des dossiers et prise de consultation.',
    icon: Scale,
    to: '/chatbot-ia-avocats',
  },
  {
    title: 'Chauffage et climatisation',
    description: 'Urgences, zones desservies et agenda des techniciens.',
    icon: Thermometer,
    to: '/receptionniste-ia-chauffage-climatisation',
  },
];

const process = [
  {
    number: '01',
    title: 'Audit de 15 minutes',
    description:
      'On regarde vos appels, vos messages et vos processus. On vous dit franchement si l\'automatisation est rentable.',
    icon: Clock,
  },
  {
    number: '02',
    title: 'Pilote sur un flux',
    description:
      'On déploie un agent sur un seul flux (appels du soir, questions fréquentes, intake) et on mesure les résultats.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Déploiement et intégrations',
    description:
      'On branche l\'agent à votre agenda, votre CRM et vos outils, puis on étend ce qui fonctionne.',
    icon: Database,
  },
];

const faq = [
  {
    q: 'Combien de temps prend la mise en place ?',
    a: 'Un pilote prend généralement de quelques jours à quelques semaines, selon les intégrations. On commence par un seul flux pour mesurer les gains avant d\'étendre.',
  },
  {
    q: 'Les agents répondent-ils en français et en anglais ?',
    a: 'Oui. Les agents vocaux et les chatbots détectent la langue du client et répondent en français québécois ou en anglais.',
  },
  {
    q: 'Est-ce que ça s\'intègre à mes outils ?',
    a: 'Oui, selon votre environnement : agenda, CRM, téléphonie, courriel et bases de connaissances. On valide les intégrations pendant l\'audit.',
  },
  {
    q: 'Que se passe-t-il si l\'IA ne sait pas répondre ?',
    a: 'Elle transfère à un humain ou prend un message détaillé, puis notifie l\'équipe. Elle ne doit jamais inventer une réponse ou un prix.',
  },
  {
    q: 'Est-ce que je dois changer mon site web ou mon numéro de téléphone ?',
    a: 'Non. On peut ajouter le chatbot à votre site existant et brancher l\'agent vocal sur votre ligne actuelle ou une nouvelle ligne dédiée.',
  },
];

export const Features: React.FC<FeaturesProps> = ({ onOpenConsultation }) => {
  const meta = metaFor('/services')!;

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 text-foreground">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta
          name="keywords"
          content="services IA Québec, automatisation Montréal AIXPT, agents conversationnels Québec, création sites web IA province, SEO Québec"
        />
        <link rel="canonical" href={`${SITE_URL}/services`} />
        <script type="application/ld+json" key="services-schema">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Service',
                name: 'Réceptionniste IA et assistant vocal',
                serviceType: 'Agent vocal IA',
                provider: { '@type': 'Organization', name: 'AIXPT', url: SITE_URL },
                areaServed: { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
                url: `${SITE_URL}/assistant-vocal`,
              },
              {
                '@type': 'Service',
                name: 'Chatbot IA et agents conversationnels',
                serviceType: 'Agent conversationnel IA',
                provider: { '@type': 'Organization', name: 'AIXPT', url: SITE_URL },
                areaServed: { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
                url: `${SITE_URL}/agents-conversationnels`,
              },
              {
                '@type': 'FAQPage',
                mainEntity: faq.map((item) => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#15121f] via-[#0d0d12] to-[#0d0d12] p-6 sm:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/20 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#00d9f5]/10 blur-[110px]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-brand/70" />
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                  Nos services
                </span>
              </div>

              <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
                <span className="text-white">Des agents IA qui</span>
                <br />
                <span className="text-brand">répondent, qualifient et réservent.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Réceptionniste vocale 24/7, chatbot pour votre site web et automatisation de vos
                suivis — conçus pour les entreprises du Québec.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="rounded-full bg-brand px-6 py-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
                >
                  <Link to="/demo">
                    Choisir une démo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  onClick={onOpenConsultation}
                  variant="outline"
                  className="rounded-full border-white/15 bg-transparent px-6 py-5 text-sm font-semibold text-white hover:bg-white/5"
                >
                  <Calendar className="mr-2 h-4 w-4 text-brand" />
                  Réserver 15 minutes
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-zinc-500">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Déploiement au Québec
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Français et anglais
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Intégrations CRM et agenda
                </span>
              </div>
            </div>

            {/* Agent console visual */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#0c0c10]/90 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300">
                      Agents en ligne
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">24/7</span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-white">Appel d'urgence capté</p>
                      <p className="text-[10px] text-zinc-500">Créneau proposé · 21 h 14</p>
                    </div>
                    <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                      Traité
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-white">Question répondue</p>
                      <p className="text-[10px] text-zinc-500">Chatbot · 12 secondes</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                      24/7
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-white">Rendez-vous confirmé</p>
                      <p className="text-[10px] text-zinc-500">CRM mis à jour automatiquement</p>
                    </div>
                    <span className="rounded-full border border-brand/25 bg-brand/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
                      Synchronisé
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[10px] text-zinc-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Database className="h-3 w-3 text-brand" />
                    Données synchronisées
                  </span>
                  <span className="font-mono">AIXPT</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service 01 — Voice */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mb-16 grid items-center gap-10 rounded-[2rem] border border-white/10 bg-card/70 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.18em] text-brand">01</span>
              <span className="h-px w-8 bg-brand/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Réceptionniste IA
              </span>
            </div>

            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Chaque appel devient une occasion.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Votre agent vocal répond 24/7, qualifie la demande, propose un créneau et met à jour
              votre CRM. Il gère les appels du soir, du samedi et les débordements — sans file
              d'attente.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                'Réponse à 100 % des appels, même après les heures',
                'Qualification : urgence, besoin, zone, budget',
                'Prise de rendez-vous et synchronisation CRM',
                'Transfert intelligent vers un humain',
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <Check className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover">
                <Link to="/assistant-vocal#demo">
                  Tester la démo vocale
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/assistant-vocal"
                className="inline-flex items-center px-2 py-3 text-sm font-medium text-foreground/70 transition hover:text-white"
              >
                Détails du service
                <ArrowRight className="ml-1.5 h-4 w-4 text-brand" />
              </Link>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[#0c0c10] p-6">
            <CallSummaryPhone />
          </div>
        </motion.section>

        {/* Service 02 — Chatbot */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mb-16 grid items-center gap-10 rounded-[2rem] border border-white/10 bg-card/70 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14"
        >
          <div className="order-2 rounded-[1.75rem] border border-white/10 bg-[#0c0c10] p-6 lg:order-1">
            <ChatWindowMockup />
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.18em] text-brand">02</span>
              <span className="h-px w-8 bg-brand/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Chatbot IA
              </span>
            </div>

            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Votre site répond avant vous.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Le chatbot accueille vos visiteurs, répond aux questions fréquentes, qualifie les
              demandes et propose un rendez-vous. Il connaît vos services, vos horaires et vos
              règles — et transfère à un humain quand c'est nécessaire.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                'Réponses instantanées, 24/7, en français et en anglais',
                'Qualification et collecte des coordonnées',
                'Prise de rendez-vous et rappels automatiques',
                'Escalade vers un humain pour les cas sensibles',
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <Check className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover">
                <Link to="/agents-conversationnels#demo">
                  Tester le chatbot
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/agents-conversationnels"
                className="inline-flex items-center px-2 py-3 text-sm font-medium text-foreground/70 transition hover:text-white"
              >
                Détails du service
                <ArrowRight className="ml-1.5 h-4 w-4 text-brand" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Secondary services */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-brand/50" />
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white md:text-3xl">
              Pour compléter l'écosystème
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Link
              to="/creation-sites-web"
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Création de sites web
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Sites rapides, modernes et optimisés SEO/GEO dès la conception — pour être trouvé,
                  pas seulement vu.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                  Voir le service
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>

            <Link
              to="/emails-automatises"
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Courriels et suivis automatisés
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Séquences personnalisées, relances et tri de la boîte courriel — pour ne plus
                  perdre un suivi.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                  Voir le service
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Sectors */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Solutions par secteur
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Des configurations pensées pour les réalités de votre industrie — avec une démo à
              essayer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <Link
                  key={sector.to}
                  to={sector.to}
                  className="group rounded-2xl border border-white/10 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{sector.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {sector.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                    Voir la solution
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-20 rounded-[2rem] border border-white/10 bg-[#0d0d10] p-6 sm:p-10"
        >
          <div className="mb-8 max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-brand/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Comment ça marche
              </span>
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Un pilote, des preuves, puis on étend.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {process.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-[0.18em] text-brand">
                      {step.number}
                    </span>
                    <Icon className="h-5 w-5 text-brand/70" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Questions fréquentes
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Ce que les entreprises nous demandent avant de commencer.
            </p>
          </div>

          <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-card/70">
            {faq.map((item) => (
              <details key={item.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-white">
                  {item.q}
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-brand transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-brand/25 bg-gradient-to-br from-brand/15 via-card/70 to-card/70 p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/20 blur-[100px]" />
            <div className="relative">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white md:text-3xl">
                Prêt à automatiser vos opérations ?
              </h2>
              <p className="mx-auto mb-6 mt-3 max-w-xl text-muted-foreground">
                Commencez par une démo ou réservez 15 minutes pour évaluer ce qui a du sens pour
                votre entreprise.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild className="rounded-full bg-brand px-8 py-4 text-base font-semibold text-white hover:bg-brand-hover">
                  <Link to="/demo">
                    Choisir une démo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  onClick={onOpenConsultation}
                  variant="outline"
                  className="rounded-full border-white/15 bg-transparent px-8 py-4 text-base font-semibold text-white hover:bg-white/5"
                >
                  <Calendar className="mr-2 h-4 w-4 text-brand" />
                  Demander une consultation
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

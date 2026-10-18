import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { metaFor, SITE_URL } from '../../seo/meta';
import {
  HeartPulse, Calendar, CheckCircle, ArrowLeft,
  MessageCircle, Bot, Clock, Bell, ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface ChatbotIACliniqueProps {
  onOpenConsultation: () => void;
}

export const ChatbotIAClinique: React.FC<ChatbotIACliniqueProps> = ({
  onOpenConsultation,
}) => {
  const navigate = useNavigate();

  const useCases = [
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Prise de rendez-vous 24/7',
      description:
        'Le patient choisit un créneau, confirme et reçoit sa confirmation — sans appeler la réception.',
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: 'Réponses aux questions fréquentes',
      description:
        'Heures, honoraires, assurance, préparation d\'un examen : réponses instantanées et exactes.',
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: 'Rappels automatiques',
      description:
        'Rappels de rendez-vous pour réduire les absences et libérer des créneaux précieux.',
    },
    {
      icon: <Bot className="h-5 w-5" />,
      title: 'Tri et orientation des demandes',
      description:
        'Collecte les informations du patient et les transmet à la bonne personne, sans ressaisie.',
    },
  ];

  const functionalities = [
    'Chatbot sur votre site web et vos pages de rendez-vous',
    'Réserve, modifie ou annule des rendez-vous',
    'Répond aux questions administratives courantes',
    'Rappels et confirmations automatiques',
    'Recueille les informations du patient avant la visite',
    'Transfère à un humain quand c\'est nécessaire',
  ];

  const advantages = [
    'Réception moins sollicitée pour les questions répétitives',
    'Moins de rendez-vous manqués grâce aux rappels',
    'Plus de créneaux remplis, même hors heures d\'ouverture',
    'Expérience patient fluide et moderne',
    'Information sensible traitée avec des règles strictes',
    'Déploiement rapide et sans bouleverser vos outils',

  ];

  const faq = [
    {
      q: 'Le chatbot respecte-t-il la confidentialité des patients ?',
      a: 'Oui. Nous concevons le chatbot pour respecter les exigences de confidentialité des renseignements de santé au Québec. Les règles, accès et journalisation sont configurés selon votre réalité clinique.',
    },
    {
      q: 'Peut-il s\'intégrer à notre agenda et à notre système ?',
      a: 'Oui. Le chatbot se branche à votre logiciel de prise de rendez-vous et à vos autres outils pour créer et gérer les rendez-vous sans double saisie.',
    },
    {
      q: 'Que se passe-t-il pour une question urgente ou médicale ?',
      a: 'Le chatbot est configuré pour ne pas donner de conseil médical. Il oriente vers la bonne ressource ou transfère immédiatement à la réception selon vos consignes.',
    },
    {
      q: 'Est-ce adapté à une petite clinique ?',
      a: 'Oui. Le chatbot convient autant à un cabinet solo qu\'à une clinique multi-praticiens. On l\'ajuste à vos services et à votre volume d\'appels.',
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 text-foreground">
      <Helmet>
        <title>{metaFor('/chatbot-ia-clinique')!.title}</title>
        <meta name="description" content={metaFor('/chatbot-ia-clinique')!.description} />
        <meta
          name="keywords"
          content="chatbot IA clinique, chatbot prise de rendez-vous clinique, agent conversationnel clinique Québec, automatisation clinique, chatbot cabinet médical"
        />
        <link rel="canonical" href={`${SITE_URL}/chatbot-ia-clinique`} />
        <script type="application/ld+json" key="service-schema">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Chatbot IA pour cliniques et cabinets',
            serviceType: 'Chatbot IA et agent conversationnel',
            provider: { '@type': 'Organization', name: 'AIXPT', url: SITE_URL },
            areaServed: { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
            url: `${SITE_URL}/chatbot-ia-clinique`,
            description: metaFor('/chatbot-ia-clinique')!.description,
          })}
        </script>
        <script type="application/ld+json" key="faq-schema">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          })}
        </script>
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
              <HeartPulse className="h-12 w-12 text-brand" />
            </div>
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
            <span className="text-brand">Chatbot IA pour</span>
            <br />
            <span className="text-white">cliniques et cabinets — AIXPT</span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-xl text-muted-foreground">
            Prise de rendez-vous, réponses aux questions et rappels automatiques — pour alléger
            votre réception et mieux servir vos patients.
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 rounded-xl border border-white/10 bg-card/70 p-8"
        >
          <p className="text-lg leading-relaxed text-muted-foreground">
            Votre réception passe ses journées au téléphone pendant que des patients attendent une
            réponse. Le chatbot IA d'AIXPT prend en charge les demandes courantes sur votre site :
            il prend les rendez-vous, répond aux questions fréquentes et envoie les rappels
            automatiquement. Votre équipe se concentre sur les patients, pas sur le téléphone —{' '}
            <span className="text-foreground">
              et vos créneaux se remplissent même en dehors des heures d'ouverture.
            </span>
          </p>
        </motion.div>

        {/* Use cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Conçu pour le quotidien d'une clinique.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Les tâches répétitives qui saturent votre réception, automatisées avec soin.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item, index) => (
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
              <MessageCircle className="mr-3 h-8 w-8 text-brand" />
              <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
                Ce que fait votre chatbot
              </h2>
            </div>

            <ul className="space-y-4">
              {functionalities.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start text-muted-foreground"
                >
                  <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                  <span>{item}</span>
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
              <ShieldCheck className="mr-3 h-8 w-8 text-brand" />
              <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
                Les bénéfices pour votre clinique
              </h2>
            </div>

            <ul className="space-y-4">
              {advantages.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start text-muted-foreground"
                >
                  <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16"
        >
          <div className="mb-8 flex items-center">
            <Clock className="mr-3 h-8 w-8 text-brand" />
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="rounded-xl border border-white/10 bg-card/70 p-6"
              >
                <h3 className="text-base font-semibold text-white">{item.q}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="rounded-xl border border-white/10 bg-card/70 p-8">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
              Allégez votre réception dès ce mois-ci.
            </h3>
            <p className="mb-6 mt-3 text-muted-foreground">
              Voyez le chatbot IA en action sur des scénarios de votre clinique.
            </p>
            <Button
              onClick={onOpenConsultation}
              className="rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Demander une Démonstration
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

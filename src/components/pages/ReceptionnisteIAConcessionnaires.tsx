import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { metaFor, SITE_URL } from '../../seo/meta';
import {
  Car, Phone, Calendar, CheckCircle, ArrowLeft,
  Users, Clock, TrendingUp, MessagesSquare,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface ReceptionnisteIAConcessionnairesProps {
  onOpenConsultation: () => void;
}

export const ReceptionnisteIAConcessionnaires: React.FC<
  ReceptionnisteIAConcessionnairesProps
> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();

  const problems = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Appels manqués en heures de pointe',
      description:
        "Vos conseillers sont en rendez-vous : les appels d'achat et de service sonnent dans le vide.",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Demandes après les heures',
      description:
        'Un client prêt à acheter appelle à 20h. Sans réponse, il rappelle la concession voisine.',
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Rendez-vous de service perdus',
      description:
        "Prise de rendez-vous manuelle, doubles réservations et rappels oubliés font perdre des heures d'atelier.",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Leads non qualifiés',
      description:
        "Temps perdu à trier les appels : votre équipe ne sait pas quels clients sont prêts à acheter.",
    },
  ];

  const functionalities = [
    'Répond à 100 % des appels entrants, 24/7',
    'Qualifie les intentions : achat, service, financement',
    'Prend les rendez-vous directement à l\'agenda de l\'atelier',
    'Transfère les appels chauds au bon conseiller',
    'Relance automatique des demandes non abouties',
    'Notification immédiate par texto ou courriel à l\'équipe',
  ];

  const advantages = [
    'Zéro appel manqué — même le dimanche et les jours fériés',
    'Plus de rendez-vous de service et d\'essais routiers',
    'Meilleure expérience client dès le premier contact',
    'Fini le temps perdu au téléphone pour vos conseillers',
    'Données de chaque appel captées pour vos suivis',
    'Une fraction du coût d\'un service de réception',
  ];

  const faq = [
    {
      q: 'Dans quelles langues la réceptionniste IA répond-elle ?',
      a: 'En français et en anglais, avec détection automatique de la langue du client dès les premières secondes de l\'appel.',
    },
    {
      q: 'S\'intègre-t-elle à notre système de gestion ?',
      a: 'Oui. Nous branchons la réceptionniste IA à vos outils de prise de rendez-vous et de suivi de leads (agenda de service, CRM concessionnaire) pour créer les rendez-vous et enregistrer les informations au bon endroit.',
    },
    {
      q: 'Que se passe-t-il si l\'appel est complexe ?',
      a: 'L\'IA transfère l\'appel à un conseiller en direct ou prend un message détaillé, puis notifie l\'équipe par texto ou courriel.',
    },
    {
      q: 'Combien de temps pour la mettre en place ?',
      a: 'Un déploiement typique prend de quelques jours à quelques semaines selon vos intégrations. Nous commençons par un seul numéro (ex. le service) pour mesurer les gains avant d\'étendre.',
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 text-foreground">
      <Helmet>
        <title>{metaFor('/receptionniste-ia-concessionnaires-automobiles')!.title}</title>
        <meta
          name="description"
          content={metaFor('/receptionniste-ia-concessionnaires-automobiles')!.description}
        />
        <meta
          name="keywords"
          content="réceptionniste IA concessionnaire, agent vocal concession automobile Québec, réception appels IA, prise de rendez-vous service IA, téléphoniste virtuel concessionnaire"
        />
        <link
          rel="canonical"
          href={`${SITE_URL}/receptionniste-ia-concessionnaires-automobiles`}
        />
        <script type="application/ld+json" key="service-schema">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Réceptionniste IA pour concessionnaires automobiles',
            serviceType: 'Réceptionniste IA et agent vocal IA',
            provider: { '@type': 'Organization', name: 'AIXPT', url: SITE_URL },
            areaServed: { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
            url: `${SITE_URL}/receptionniste-ia-concessionnaires-automobiles`,
            description: metaFor('/receptionniste-ia-concessionnaires-automobiles')!.description,
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
              <Car className="h-12 w-12 text-brand" />
            </div>
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
            <span className="text-brand">Réceptionniste IA pour</span>
            <br />
            <span className="text-white">concessionnaires automobiles — AIXPT</span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-xl text-muted-foreground">
            Répondez à tous vos appels, qualifiez chaque lead et remplissez l'agenda de votre
            service — 24 heures sur 24, au Québec.
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
            Chaque appel sans réponse à votre concession est un client qui appelle ailleurs. La
            réceptionniste IA d'AIXPT répond instantanément à vos appels entrants, y compris en
            heures de pointe et après la fermeture. Elle identifie le besoin du client, prend les
            rendez-vous de service et transmet les bons leads à vos conseillers —{' '}
            <span className="text-foreground">
              sans embaucher, et sans jamais manquer un appel.
            </span>
          </p>
        </motion.div>

        {/* Problems */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Le téléphone vous coûte des ventes.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Les concessionnaires perdent chaque semaine des ventes et des rendez-vous faute de
              réponse téléphonique.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((item, index) => (
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
              <Phone className="mr-3 h-8 w-8 text-brand" />
              <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
                Ce que fait votre réceptionniste IA
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
              <TrendingUp className="mr-3 h-8 w-8 text-brand" />
              <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">
                Pourquoi les concessionnaires choisissent AIXPT
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
            <MessagesSquare className="mr-3 h-8 w-8 text-brand" />
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
              Arrêtez de perdre des appels. Commencez à vendre.
            </h3>
            <p className="mb-6 mt-3 text-muted-foreground">
              Réservez une démonstration de la réceptionniste IA adaptée à votre concession.
            </p>
            <Button
              onClick={onOpenConsultation}
              className="rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
            >
              <Phone className="mr-2 h-5 w-5" />
              Demander une Démonstration
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

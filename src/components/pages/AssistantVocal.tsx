import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mic, Phone, Clock, Brain, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { LiveCallPhone } from '../hero/LiveCallPhone';

interface AssistantVocalProps {
  onOpenConsultation: () => void;
}

export const AssistantVocal: React.FC<AssistantVocalProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
  const functionalities = [
    "Réception d'appels automatisée 24h/24",
    'Reconnaissance vocale avancée',
    'Traitement du langage naturel',
    'Intégration CRM en temps réel',
    'Transfert intelligent vers agents humains',
    'Enregistrement et analyse des conversations',
  ];

  const advantages = [
    'Réduction des coûts opérationnels de 60%',
    'Amélioration de la satisfaction client',
    'Disponibilité continue sans interruption',
    'Réponses cohérentes et professionnelles',
    'Collecte automatique de données clients',
    'Évolutivité instantanée selon la demande',
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 text-foreground">
      <Helmet>
        <title>Assistant Vocal IA 24/7 au Québec - AIXPT</title>
        <meta name="description" content="Assistant vocal IA 24/7 pour entreprises au Québec par AIXPT Montréal. Gestion automatisée des appels, reconnaissance vocale pour PME de la province." />
        <meta name="keywords" content="assistant vocal Québec, IA vocale Montréal, réception appels IA AIXPT, service client IA Québec, reconnaissance vocale automatisée" />
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
              <Mic className="h-12 w-12 text-brand" />
            </div>
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
            <span className="text-brand">Assistant Vocal</span>
            <br />
            <span className="text-white">24/7 au Québec — AIXPT</span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-xl text-muted-foreground">
            Chaque appel, chaque information — synchronisés sans effort. Propulsé par l'intelligence artificielle.
          </p>
        </motion.div>

        {/* Description + artifact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 grid grid-cols-1 items-center gap-12 rounded-xl border border-white/10 bg-card/70 p-8 lg:grid-cols-2"
        >
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-white">Description</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Notre assistant vocal IA révolutionne la gestion des appels entrants en offrant une
              expérience client exceptionnelle 24h/24 et 7j/7. Grâce à des technologies de pointe en
              reconnaissance vocale et traitement du langage naturel, votre entreprise peut maintenir
              une présence professionnelle constante, même en dehors des heures d'ouverture.
            </p>
          </div>
          <LiveCallPhone />
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
              <Brain className="mr-3 h-8 w-8 text-brand" />
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
              Prêt à transformer votre service client ?
            </h3>
            <p className="mb-6 mt-3 text-muted-foreground">
              Découvrez comment notre assistant vocal peut révolutionner votre entreprise
            </p>
            <Button
              onClick={onOpenConsultation}
              className="rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
            >
              <Clock className="mr-2 h-5 w-5" />
              Demander une Démonstration
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

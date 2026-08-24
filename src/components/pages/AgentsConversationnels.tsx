import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Users, Sparkles, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import ChatWindowMockup from '../hero/ChatWindowMockup';

interface AgentsConversationnelsProps {
  onOpenConsultation: () => void;
}

export const AgentsConversationnels: React.FC<AgentsConversationnelsProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
  const functionalities = [
    'Conversations naturelles multi-langues',
    'Apprentissage continu des interactions',
    'Intégration omnicanale (chat, email, SMS)',
    'Escalade intelligente vers agents humains',
    'Base de connaissances dynamique',
    'Analytics conversationnels avancés',
  ];

  const advantages = [
    'Réduction du temps de réponse de 90%',
    'Support client 24h/24 et 7j/7',
    'Satisfaction client améliorée',
    'Réduction de la charge de travail des équipes',
    'Résolution automatique de 80% des requêtes',
    'Collecte intelligente de feedback client',
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 text-foreground">
      <Helmet>
        <title>Agents Conversationnels IA au Québec - AIXPT Montréal</title>
        <meta name="description" content="Découvrez nos agents conversationnels IA au Québec. Automatisez le support client avec des chatbots intelligents par AIXPT, basés à Montréal pour les entreprises locales." />
        <meta name="keywords" content="agents conversationnels Québec, chatbots IA Montréal, support client IA, automatisation Québec, IA conversationnelle AIXPT" />
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
              <MessageCircle className="h-12 w-12 text-brand" />
            </div>
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
            <span className="text-brand">Agents Conversationnels</span>
            <br />
            <span className="text-white">IA au Québec — AIXPT</span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-xl text-muted-foreground">
            Des conversations fluides, gestion des relations clients en automatique.
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
              Nos agents conversationnels IA redéfinissent l'expérience client en offrant des
              interactions naturelles et personnalisées à grande échelle. Capables de comprendre le
              contexte et les nuances, ils fournissent un support instantané tout en apprenant
              continuellement pour améliorer leurs réponses.
            </p>
          </div>
          <ChatWindowMockup />
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
              <Users className="mr-3 h-8 w-8 text-brand" />
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
              Prêt à automatiser votre support client ?
            </h3>
            <p className="mb-6 mt-3 text-muted-foreground">
              Découvrez comment nos agents IA peuvent transformer votre service client
            </p>
            <Button
              onClick={onOpenConsultation}
              className="rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Voir une Démonstration
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

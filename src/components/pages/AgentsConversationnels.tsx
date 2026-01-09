import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Bot, Users, Sparkles, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface AgentsConversationnelsProps {
  onOpenConsultation: () => void;
}

export const AgentsConversationnels: React.FC<AgentsConversationnelsProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
  const functionalities = [
    "Conversations naturelles multi-langues",
    "Apprentissage continu des interactions",
    "Intégration omnicanale (chat, email, SMS)",
    "Escalade intelligente vers agents humains",
    "Base de connaissances dynamique",
    "Analytics conversationnels avancés"
  ];

  const advantages = [
    "Réduction du temps de réponse de 90%",
    "Support client 24h/24 et 7j/7",
    "Satisfaction client améliorée",
    "Réduction de la charge de travail des équipes",
    "Résolution automatique de 80% des requêtes",
    "Collecte intelligente de feedback client"
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <Helmet>
        <title>Agents Conversationnels IA au Québec - AIXPT Montréal</title>
        <meta name="description" content="Découvrez nos agents conversationnels IA au Québec. Automatisez le support client avec des chatbots intelligents par AIXPT, basés à Montréal pour les entreprises locales." />
        <meta name="keywords" content="agents conversationnels Québec, chatbots IA Montréal, support client IA, automatisation Québec, IA conversationnelle AIXPT" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="text-green-400 hover:text-green-300 hover:bg-green-400/10"
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
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full p-6">
              <MessageCircle className="h-16 w-16 text-green-400" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Agents Conversationnels
            </span>
            <br />
            <span className="text-white">IA au Québec - AIXPT</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Des conversations fluides, gestion des relations clients en automatique.
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Nos agents conversationnels IA redéfinissent l'expérience client en offrant des interactions
            naturelles et personnalisées à grande échelle. Capables de comprendre le contexte et les
            nuances, ils fournissent un support instantané tout en apprenant continuellement pour
            améliorer leurs réponses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Functionalities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-8"
          >
            <div className="flex items-center mb-6">
              <MessageCircle className="h-8 w-8 text-green-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Services</h2>
            </div>

            <ul className="space-y-4">
              {functionalities.map((functionality, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start text-gray-300"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
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
            className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-emerald-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Avantages</h2>
            </div>

            <ul className="space-y-4">
              {advantages.map((advantage, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start text-gray-300"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
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
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à Automatiser Votre Support Client ?
            </h3>
            <p className="text-gray-300 mb-6">
              Découvrez comment nos agents IA peuvent transformer votre service client
            </p>
            <Button
              onClick={onOpenConsultation}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
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
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mic, Phone, Clock, Brain, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface AssistantVocalProps {
  onNavigate: (page: string) => void;
  onOpenConsultation: () => void;
}

export const AssistantVocal: React.FC<AssistantVocalProps> = ({ onNavigate, onOpenConsultation }) => {
  const functionalities = [
    "Réception d'appels automatisée 24h/24",
    "Reconnaissance vocale avancée",
    "Traitement du langage naturel",
    "Intégration CRM en temps réel",
    "Transfert intelligent vers agents humains",
    "Enregistrement et analyse des conversations"
  ];

  const advantages = [
    "Réduction des coûts opérationnels de 60%",
    "Amélioration de la satisfaction client",
    "Disponibilité continue sans interruption",
    "Réponses cohérentes et professionnelles",
    "Collecte automatique de données clients",
    "Évolutivité instantanée selon la demande"
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <Helmet>
        <title>Assistant Vocal IA 24/7 au Québec - AIXPT</title>
        <meta name="description" content="Assistant vocal IA 24/7 pour entreprises au Québec par AIXPT Montréal. Gestion automatisée des appels, reconnaissance vocale pour PME de la province." />
        <meta name="keywords" content="assistant vocal Québec, IA vocale Montréal, réception appels IA AIXPT, service client IA Québec, reconnaissance vocale automatisée" />
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
            onClick={() => onNavigate('fonctionnalites')}
            variant="ghost"
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
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
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-full p-6">
              <Mic className="h-16 w-16 text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Assistant Vocal
            </span>
            <br />
            <span className="text-white">24/7 au Québec - AIXPT</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Chaque appel, chaque information — synchronisés sans effort. Propulsé par l'intelligence artificielle.
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Notre assistant vocal IA révolutionne la gestion des appels entrants en offrant une expérience 
            client exceptionnelle 24h/24 et 7j/7. Grâce à des technologies de pointe en reconnaissance 
            vocale et traitement du langage naturel, votre entreprise peut maintenir une présence 
            professionnelle constante, même en dehors des heures d'ouverture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Functionalities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Phone className="h-8 w-8 text-blue-400 mr-3" />
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
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
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
            className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Brain className="h-8 w-8 text-cyan-400 mr-3" />
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
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
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
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à Transformer Votre Service Client ?
            </h3>
            <p className="text-gray-300 mb-6">
              Découvrez comment notre assistant vocal peut révolutionner votre entreprise
            </p>
            <Button
              onClick={onOpenConsultation}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
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
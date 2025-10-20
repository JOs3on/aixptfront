import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Globe, Palette, Code, Smartphone, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface CreationSitesWebProps {
  onNavigate: (page: string) => void;
  onOpenConsultation: () => void;
}

export const CreationSitesWeb: React.FC<CreationSitesWebProps> = ({ onNavigate, onOpenConsultation }) => {
  const functionalities = [
    "Design responsive et moderne",
    "Optimisation SEO avancée",
    "Intégration CMS personnalisé",
    "Performance et vitesse optimisées",
    "Sécurité renforcée",
    "Maintenance et support continu"
  ];

  const advantages = [
    "Augmentation du trafic organique",
    "Amélioration de l'expérience utilisateur",
    "Conversion optimisée",
    "Compatibilité multi-appareils",
    "Évolutivité et flexibilité",
    "ROI mesurable et durable"
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <Helmet>
        <title>Création Sites Web Sur Mesure au Québec - AIXPT</title>
        <meta name="description" content="Création de sites web sur mesure au Québec par AIXPT Montréal. Design moderne, optimisation SEO pour PME de la province et Montréal." />
        <meta name="keywords" content="création sites web Québec, développement web Montréal AIXPT, sites responsive Québec, SEO web province, agence web IA Québec" />
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
            className="text-orange-400 hover:text-orange-300 hover:bg-orange-400/10"
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
            <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-full p-6">
              <Globe className="h-16 w-16 text-orange-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Création de Sites Web
            </span>
            <br />
            <span className="text-white">Sur Mesure au Québec - AIXPT</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Un design remarquable, une fonctionnalité fluide. Votre vision, notre expertise.
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Nous créons des sites web exceptionnels qui allient esthétique moderne et performance 
            technique. Chaque projet est conçu sur mesure pour refléter votre identité de marque 
            tout en offrant une expérience utilisateur optimale. De la conception à la mise en ligne, 
            nous vous accompagnons pour créer une présence digitale qui convertit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Functionalities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Code className="h-8 w-8 text-orange-400 mr-3" />
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
                  <CheckCircle className="h-5 w-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
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
            className="bg-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Palette className="h-8 w-8 text-red-400 mr-3" />
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
                  <CheckCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
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
          <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à Créer Votre Présence Digitale ?
            </h3>
            <p className="text-gray-300 mb-6">
              Découvrez comment nous pouvons transformer votre vision en réalité web
            </p>
            <Button
              onClick={onOpenConsultation}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
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
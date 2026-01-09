import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Target, Zap, TrendingUp, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface EmailsAutomatisesProps {
  onOpenConsultation: () => void;
}

export const EmailsAutomatises: React.FC<EmailsAutomatisesProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
  const functionalities = [
    "Segmentation automatique des prospects",
    "Personnalisation dynamique du contenu",
    "Optimisation des heures d'envoi",
    "A/B testing automatisé",
    "Suivi des performances en temps réel",
    "Intégration CRM et analytics"
  ];

  const advantages = [
    "Augmentation du taux d'ouverture de 40%",
    "Amélioration du ROI marketing",
    "Gain de temps considérable",
    "Ciblage précis et personnalisé",
    "Automatisation complète des campagnes",
    "Optimisation continue des performances"
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
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
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-400/10"
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
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full p-6">
              <Mail className="h-16 w-16 text-purple-400" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Emails Automatisés
            </span>
            <br />
            <span className="text-white">Personnalisés</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Prospection personnalisée. En pilote automatique.
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Transformez votre stratégie email marketing avec notre système d'automatisation intelligent.
            Notre IA analyse le contexte client pour créer des courriels ciblés personalisés
            qui convertissent. Chaque email est optimisé pour maximiser l'engagement et générer des
            résultats mesurables.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Functionalities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Mail className="h-8 w-8 text-purple-400 mr-3" />
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
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
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
            className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="h-8 w-8 text-pink-400 mr-3" />
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
                  <CheckCircle className="h-5 w-5 text-pink-400 mr-3 mt-0.5 flex-shrink-0" />
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
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à Booster Vos Conversions ?
            </h3>
            <p className="text-gray-300 mb-6">
              Découvrez comment automatiser votre prospection email avec l'IA
            </p>
            <Button
              onClick={onOpenConsultation}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Zap className="mr-2 h-5 w-5" />
              Commencer Maintenant
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mic, Mail, MessageCircle, Globe, ArrowRight, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface FeaturesProps {
  onOpenConsultation: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
  const features = [
    {
      id: 'assistant-vocal',
      title: 'Assistant Vocal 24/7',
      description: 'Chaque appel, chaque information — synchronisés sans effort. Propulsé par l\'intelligence artificielle.',
      icon: Mic,
      gradient: 'from-blue-600 to-cyan-600',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400'
    },
    {
      id: 'emails-automatises',
      title: 'Personalisation d\'Emails Automatisée',
      description: 'Prospection personnalisée. En pilote automatique.',
      icon: Mail,
      gradient: 'from-purple-600 to-pink-600',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400'
    },
    {
      id: 'agents-conversationnels',
      title: 'Agents Conversationnels IA',
      description: 'Des conversations fluides, gestion des relations clients en automatique.',
      icon: MessageCircle,
      gradient: 'from-green-600 to-emerald-600',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400'
    },
    {
      id: 'analyste-automatique-360',
      title: 'Analyste Automatique 360°',
      description: 'Transformez vos données brutes en rapports, présentations & feuilles de calcul — en un clic.',
      icon: BarChart3,
      gradient: 'from-indigo-600 to-purple-600',
      borderColor: 'border-indigo-500/30',
      iconColor: 'text-indigo-400'
    },
    {
      id: 'creation-sites-web',
      title: 'Création de site web sur mesure',
      description: 'Un design remarquable, une fonctionnalité fluide. Votre vision, notre expertise.',
      icon: Globe,
      gradient: 'from-orange-600 to-red-600',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-400'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <Helmet>
        <title>Services IA AIXPT au Québec - Automatisation et IA pour PME et grandes entreprises</title>
        <meta name="description" content="Découvrez nos solutions d'intelligence artificielle au Québec pour transformer votre entreprise. Services d'automatisation IA à Montréal et province: assistants vocaux, agents conversationnels, création web." />
        <meta name="keywords" content="services IA Québec, automatisation Montréal AIXPT, agents conversationnels Québec, création sites web IA province, analyste automatique 360 Québec" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Services
            </span>
            <br />
            <span className="text-white">au Québec - AIXPT</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez nos solutions d'intelligence artificielle conçues pour transformer votre entreprise
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`bg-gray-900/50 backdrop-blur-sm border ${feature.borderColor} rounded-lg p-8 hover:bg-gray-800/50 transition-all duration-300 group`}
              >
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-r ${feature.gradient}/20 border ${feature.borderColor} rounded-full p-4 mr-4`}>
                    <IconComponent className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <Button
                  onClick={() => navigate(`/${feature.id}`)}
                  className={`bg-gradient-to-r ${feature.gradient} hover:${feature.gradient} text-white px-6 py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105 w-full`}
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            );
          })}
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
              Prêt à Révolutionner Votre Entreprise ?
            </h3>
            <p className="text-gray-300 mb-6">
              Découvrez comment nos solutions IA peuvent transformer votre activité
            </p>
            <Button
              onClick={onOpenConsultation}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Demander une Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
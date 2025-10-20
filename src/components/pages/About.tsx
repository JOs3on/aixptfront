import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Bot, Users, Award, Globe, Lightbulb, Heart, MapPin } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { number: "500+", label: "Entreprises Transformées" },
    { number: "10M+", label: "Tâches Automatisées" },
    { number: "99.9%", label: "Temps de Disponibilité" },
    { number: "24/7", label: "Support Expert" }
  ];

  const values = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "Nous repoussons constamment les limites de ce qui est possible avec l'IA"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Excellence",
      description: "Chaque solution est conçue avec une attention méticuleuse aux détails"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaboration",
      description: "Nous travaillons main dans la main avec nos clients pour leur succès"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Impact Global",
      description: "Notre mission est de démocratiser l'accès à l'intelligence artificielle"
    }
  ];

  return (
    <>
      <Helmet>
        <title>À Propos d'AIXPT - Automatisation IA au Québec</title>
        <meta name="description" content="Découvrez AIXPT, pionniers de l'automatisation intelligente basés au Québec. Nos solutions IA transforment les entreprises avec innovation et excellence." />
        <meta name="keywords" content="AIXPT, automatisation IA, Québec, intelligence artificielle, PME Québec" />
      </Helmet>
      <div className="min-h-screen bg-black text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">À Propos d'</span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AIXPT - Québec
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Pionniers de l'automatisation intelligente basés au Québec, nous façonnons l'avenir du travail 
              en rendant l'intelligence artificielle accessible à toutes les entreprises.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-8 mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Bot className="h-16 w-16 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-center text-white mb-6">Notre Mission</h2>
            <p className="text-lg text-gray-300 text-center leading-relaxed max-w-4xl mx-auto">
              Chez AIXPT, nous croyons que l'intelligence artificielle ne devrait pas être réservée 
              aux géants technologiques. Notre mission est de démocratiser l'IA en créant des solutions 
              d'automatisation intelligentes qui permettent à chaque entreprise, quelle que soit sa taille, 
              de prospérer dans l'économie numérique.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-white mb-12">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 hover:border-blue-400/40 transition-all duration-300"
                >
                  <div className="text-blue-400 mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Québec Location Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg p-8 mb-16 text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <MapPin className="h-16 w-16 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Basés au Québec</h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              AIXPT est fièrement basé dans la province de Québec, au cœur du Canada. 
              De Montréal à Québec, nous tirons notre inspiration de l'innovation et de la culture technologique florissante de cette région, 
              permettant à nos solutions IA d'être parfaitement adaptées aux entreprises d'ici et d'ailleurs.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};
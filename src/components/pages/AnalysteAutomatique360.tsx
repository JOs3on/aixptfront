import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { BarChart3, Database, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface AnalysteAutomatique360Props {
  onNavigate: (page: string) => void;
  onOpenConsultation: () => void;
}

export const AnalysteAutomatique360: React.FC<AnalysteAutomatique360Props> = ({ onNavigate, onOpenConsultation }) => {
  const functionalities = [
    "Connexion aux bases clients / CRM / ERP / tableurs",
    "Importation & structuration de données «lousses»",
    "Recherche et enrichissement de données en ligne (ex. données de concurrents)",
    "Analyse automatique : calculs, modèles statistiques, agrégations",
    "Génération de rapports / mémos / résumés interprétatifs",
    "Création de présentations visuelles alignées à vos templates",
    "Construction de feuilles de calcul / dashboards (Excel, Google Sheets)",
    "Suggestions visuelles intelligentes : graphiques, layouts, comparatifs",
    "Intégrations multiples (CRM, outils marketing, API externes)",
    "Workflows automatisés : planification hebdo/mensuelle, déclencheurs via événements"
  ];

  const advantages = [
    "Gain de temps massif : des heures — voire des jours — économisés",
    "Décisions éclairées : visualisations et insights immédiatement exploitables",
    "Cohérence et fiabilité : rapports toujours bien formatés, sans erreurs humaines",
    "Alignement stratégique : marketing, ventes, direction utilisent la même vue consolidée",
    "Avantage concurrentiel : analyses comparatives avec le marché et concurrents",
    "Scalabilité sans embauche : augmentez le volume sans recruter davantage",
    "Flexibilité et contrôle : modifiez des paramètres de style, fréquence, profondeur",
    "Sécurité et conformité : gestion des permissions, audit, accessibilité contrôlée"
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <Helmet>
        <title>Analyste Automatique 360° IA au Québec - AIXPT Montréal</title>
        <meta name="description" content="Analyste automatique 360° IA au Québec par AIXPT. Transformez données en rapports et analyses intelligentes pour entreprises à Montréal et province du Québec." />
        <meta name="keywords" content="analyste automatique Québec, IA analyse données Montréal, rapports IA AIXPT, automatisation analytics Québec, dashboards IA" />
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
            className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-400/10"
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
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-full p-6">
              <BarChart3 className="h-16 w-16 text-indigo-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Analyste Automatique
            </span>
            <br />
            <span className="text-white">360° au Québec - AIXPT</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transformez vos données brutes en rapports, présentations & feuilles de calcul — en un clic.
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-indigo-500/20 rounded-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Notre solution d'analyse automatisée 360° libère votre équipe de la lourde tâche de compiler des chiffres, mettre en forme des présentations ou corriger des feuilles de calcul. Elle connecte vos bases de données internes, importe des données externes (concurrents, marché), et génère des rapports professionnels, des présentations visuelles ainsi que des feuilles de calcul enrichies — le tout avec un simple prompt ou déclencheur automatique.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Functionalities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-indigo-500/20 rounded-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Database className="h-8 w-8 text-indigo-400 mr-3" />
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
                  <FileText className="h-5 w-5 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
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
              <FileText className="h-8 w-8 text-purple-400 mr-3" />
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
                  <FileText className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
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
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à Automatiser Vos Analyses ?
            </h3>
            <p className="text-gray-300 mb-6">
              Découvrez comment notre analyste automatique peut transformer vos données en insights actionnables
            </p>
            <Button
              onClick={onOpenConsultation}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Demander une Démonstration
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
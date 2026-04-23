import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    nomComplet: '',
    adresseCourriel: '',
    nomEntreprise: '',
    problemes: '',
    informationsSupplementaires: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(import.meta.env.VITE_MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-gray-900 border border-blue-500/20 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            {showSuccess ? 'Merci pour votre demande !' : 'Formulaire de contact'}
          </h2>
          <button
            onClick={() => {
              if (showSuccess) {
                setShowSuccess(false);
                onClose();
              } else {
                onClose();
              }
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {showSuccess ? (
          <div className="text-center space-y-6 py-8">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Votre demande a été envoyée avec succès !
              </h3>
              <p className="text-gray-300 mb-4">
                Vous serez contacté(e) dans un délai de 24-48 heures.
              </p>
              <p className="text-sm text-gray-400">
                Pour les affaires urgentes, veuillez écrire à <a href="mailto:jarias@aixpt.ca" className="text-blue-400 hover:underline">jarias@aixpt.ca</a> ou appeler au 418-800-5085.
              </p>
            </div>
            <Button
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3"
            >
              Fermer
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations Personnelles */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
              Informations Personnelles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom complet <span className="text-red-400">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Jean Dupont"
                  value={formData.nomComplet}
                  onChange={(e) => handleInputChange('nomComplet', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Adresse courriel <span className="text-red-400">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="jean@entreprise.com"
                  value={formData.adresseCourriel}
                  onChange={(e) => handleInputChange('adresseCourriel', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nom de l'entreprise <span className="text-red-400">*</span>
              </label>
              <Input
                type="text"
                placeholder="Entreprise Inc."
                value={formData.nomEntreprise}
                onChange={(e) => handleInputChange('nomEntreprise', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400"
                required
              />
            </div>
          </div>

          {/* Informations sur le Projet */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
              Informations sur le Projet
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Quels problèmes spécifiques cherchez-vous à résoudre ? <span className="text-red-400">*</span>
              </label>
              <Textarea
                placeholder="Décrivez vos défis actuels et les résultats souhaités"
                value={formData.problemes}
                onChange={(e) => handleInputChange('problemes', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400 min-h-[120px]"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Informations supplémentaires
              </label>
              <Textarea
                placeholder="Optionnel : partagez d'autres détails pertinents sur votre projet ou vos besoins"
                value={formData.informationsSupplementaires}
                onChange={(e) => handleInputChange('informationsSupplementaires', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400 min-h-[120px]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${isSubmitting ? 'bg-gray-600 cursor-not-allowed text-gray-300' : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'}`}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Réserver votre consultation'}
            {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
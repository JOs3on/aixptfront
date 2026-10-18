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
        className="relative rounded-2xl border border-white/10 bg-popover p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {showSuccess ? 'Demande reçue !' : 'Réserver une consultation diagnostic (15 min)'}
            </h2>
            {!showSuccess && (
              <p className="text-sm text-muted-foreground mt-1">
                Une brève discussion sans pression pour analyser la gestion de vos appels et voir si une automatisation est rentable pour votre entreprise.
              </p>
            )}
          </div>
          <button
            onClick={() => {
              if (showSuccess) {
                setShowSuccess(false);
                onClose();
              } else {
                onClose();
              }
            }}
            className="text-muted-foreground hover:text-white transition-colors ml-4 self-start"
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
              <p className="text-foreground/80 mb-4">
                Vous serez contacté(e) dans un délai de 24-48 heures.
              </p>
              <p className="text-sm text-muted-foreground">
                Pour les affaires urgentes, veuillez écrire à <a href="mailto:jarias@aixpt.ca" className="text-brand hover:underline">jarias@aixpt.ca</a> ou appeler au 418-800-5085.
              </p>
            </div>
            <Button
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
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
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Nom complet <span className="text-red-400">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Jean Dupont"
                  value={formData.nomComplet}
                  onChange={(e) => handleInputChange('nomComplet', e.target.value)}
                  className="bg-card border-white/10 text-white placeholder:text-foreground/40 focus:border-brand"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Adresse courriel <span className="text-red-400">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="jean@entreprise.com"
                  value={formData.adresseCourriel}
                  onChange={(e) => handleInputChange('adresseCourriel', e.target.value)}
                  className="bg-card border-white/10 text-white placeholder:text-foreground/40 focus:border-brand"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Nom de l'entreprise <span className="text-red-400">*</span>
              </label>
              <Input
                type="text"
                placeholder="Entreprise Inc."
                value={formData.nomEntreprise}
                onChange={(e) => handleInputChange('nomEntreprise', e.target.value)}
                className="bg-card border-white/10 text-white placeholder:text-foreground/40 focus:border-brand"
                required
              />
            </div>
          </div>

          {/* Informations sur le Projet */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
              Votre Situation Actuelle
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Quel est votre enjeu principal avec vos appels ou demandes web ? <span className="text-red-400">*</span>
              </label>
              <Textarea
                placeholder="Ex: appels manqués le soir et fin de semaine, débordement au rush du samedi, délais de réponse aux formulaires..."
                value={formData.problemes}
                onChange={(e) => handleInputChange('problemes', e.target.value)}
                className="bg-card border-white/10 text-white placeholder:text-foreground/40 focus:border-brand min-h-[100px]"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Informations supplémentaires
              </label>
              <Textarea
                placeholder="Optionnel : volume d'appels approximatif, logiciels utilisés, etc."
                value={formData.informationsSupplementaires}
                onChange={(e) => handleInputChange('informationsSupplementaires', e.target.value)}
                className="bg-card border-white/10 text-white placeholder:text-foreground/40 focus:border-brand min-h-[80px]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-full px-8 py-4 text-base font-semibold transition-all duration-300 ${isSubmitting ? 'cursor-not-allowed bg-muted text-muted-foreground' : 'bg-brand text-white hover:bg-brand-hover'}`}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Planifier ma consultation diagnostic (15 min)'}
            {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
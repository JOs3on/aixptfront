import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface ContactPageProps {
  onOpenConsultation: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
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
      const response = await fetch('https://hook.us2.make.com/7veoaqbfj1iiuyrjuqto17n6onrfktwt', {
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

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <Helmet>
        <title>Contactez AIXPT - Services IA et Automatisation au Québec</title>
        <meta name="description" content="Contactez AIXPT au Québec pour des solutions d'automatisation IA et services intelligents. Obtenez une consultation gratuite avec notre équipe basée à Montréal." />
        <meta name="keywords" content="contact AIXPT, IA Québec, automatisation entreprise, services IA Montréal, consultation IA, support AIXPT" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Hero/Intro Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contactez AIXPT au Québec - Services IA
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Prêt à transformer votre entreprise avec l&apos;IA ? Discutons de vos besoins.
          </p>
          <Button onClick={onOpenConsultation} className="mt-8">
            Planifier une Consultation
          </Button>
        </section>

        {/* Contact Details Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Détails de Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gray-900 border border-gray-700 rounded-lg">
              <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Email Principal</h3>
              <a href="mailto:jarias@aixpt.ca" className="text-blue-400 hover:text-blue-300 block text-sm">
                jarias@aixpt.ca
              </a>
            </div>
            <div className="text-center p-6 bg-gray-900 border border-gray-700 rounded-lg">
              <Phone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Téléphone</h3>
              <a href="tel:4188005085" className="text-blue-400 hover:text-blue-300 block text-sm">
                418-800-5085
              </a>
            </div>
            <div className="text-center p-6 bg-gray-900 border border-gray-700 rounded-lg">
              <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Support Email</h3>
              <a href="mailto:support@aixpt.ca" className="text-blue-400 hover:text-blue-300 block text-sm">
                support@aixpt.ca
              </a>
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Services Liés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Création de Sites Web
              </h3>
              <p className="text-gray-300 mb-4">
                Sites web modernes et performants optimisés pour l'IA.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/creation-sites-web')}
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
              >
                En Savoir Plus <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Assistant Vocal
              </h3>
              <p className="text-gray-300 mb-4">
                Intégrez un assistant vocal intelligent à votre entreprise.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/assistant-vocal')}
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
              >
                En Savoir Plus <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Agents Conversationnels
              </h3>
              <p className="text-gray-300 mb-4">
                Chatbots IA pour améliorer l'expérience client.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/agents-conversationnels')}
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
              >
                En Savoir Plus <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Formulaire de Contact
          </h2>
          {showSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8 bg-gray-900 rounded-lg p-8 max-w-md mx-auto"
            >
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Votre demande a été envoyée avec succès !
                </h3>
                <p className="text-gray-300 mb-4">
                  Vous serez contacté(e) dans un délai de 24-48 heures.
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Pour les affaires urgentes, veuillez écrire à <a href="mailto:jarias@aixpt.ca" className="text-blue-400 hover:underline">jarias@aixpt.ca</a> ou appeler au 418-800-5085.
                </p>
                <Button
                  onClick={() => {
                    setShowSuccess(false);
                    setFormData({
                      nomComplet: '',
                      adresseCourriel: '',
                      nomEntreprise: '',
                      problemes: '',
                      informationsSupplementaires: ''
                    });
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Envoyer un autre message
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto bg-gray-900 rounded-lg p-8 border border-gray-700 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom Complet *
                </label>
                <Input
                  type="text"
                  value={formData.nomComplet}
                  onChange={(e) => handleInputChange('nomComplet', e.target.value)}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Adresse Courriel *
                </label>
                <Input
                  type="email"
                  value={formData.adresseCourriel}
                  onChange={(e) => handleInputChange('adresseCourriel', e.target.value)}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom de l'Entreprise
                </label>
                <Input
                  type="text"
                  value={formData.nomEntreprise}
                  onChange={(e) => handleInputChange('nomEntreprise', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Problèmes ou Besoins
                </label>
                <Textarea
                  value={formData.problemes}
                  onChange={(e) => handleInputChange('problemes', e.target.value)}
                  rows={4}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Informations Supplémentaires
                </label>
                <Textarea
                  value={formData.informationsSupplementaires}
                  onChange={(e) => handleInputChange('informationsSupplementaires', e.target.value)}
                  rows={3}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le Message'}
              </Button>
            </motion.form>
          )}
        </section>
      </motion.div>
    </div>
  );
};
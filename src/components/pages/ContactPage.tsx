import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { metaFor, SITE_URL } from '../../seo/meta';
import { Mail, Phone, ArrowRight, CheckCircle, MessageSquareText } from 'lucide-react';
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
    informationsSupplementaires: '',
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error("Erreur lors de l'envoi");
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background pb-16 pt-24 text-foreground">
      <Helmet>
        <title>{metaFor('/contact')!.title}</title>
        <meta name="description" content={metaFor('/contact')!.description} />
        <meta
          name="keywords"
          content="contact AIXPT, IA Québec, automatisation entreprise, services IA Montréal, consultation IA"
        />
        <link rel="canonical" href={`${SITE_URL}/contact`} />
      </Helmet>

      <div className="mx-auto max-w-6xl px-4">
        {/* Hero / Intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand/70" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Nous contacter
            </span>
            <span className="h-px w-8 bg-brand/70" />
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-white md:text-6xl">
            Parlons de votre{' '}
            <span className="text-brand">projet IA</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Que vous vouliez automatiser vos appels, vos emails ou votre site web,
            on vous écoute — sans engagement.
          </p>
          <Button
            onClick={onOpenConsultation}
            className="mt-8 h-12 rounded-full bg-brand px-8 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
          >
            <MessageSquareText className="mr-2 h-4 w-4" />
            Réserver une consultation
          </Button>
        </motion.div>

        {/* Contact Details */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand/70" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Coordonnées
            </span>
            <span className="h-px w-8 bg-brand/70" />
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                icon: <Mail className="h-8 w-8" />,
                title: 'Courriel principal',
                value: 'jarias@aixpt.ca',
                href: 'mailto:jarias@aixpt.ca',
              },
              {
                icon: <Phone className="h-8 w-8" />,
                title: 'Téléphone',
                value: '418-800-5085',
                href: 'tel:4188005085',
              },
              {
                icon: <Mail className="h-8 w-8" />,
                title: 'Support',
                value: 'support@aixpt.ca',
                href: 'mailto:support@aixpt.ca',
              },
            ].map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-xl border border-white/10 bg-card/70 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card"
              >
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-[#9a6bff]/25 to-[#7a4bff]/10 text-brand">
                  {item.icon}
                </span>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm text-brand transition-colors duration-300 group-hover:text-brand-hover">
                  {item.value}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Services */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand/70" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Nos services
            </span>
            <span className="h-px w-8 bg-brand/70" />
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: 'Création de Sites Web',
                desc: 'Sites modernes optimisés SEO et GEO — un site qu\'on trouve.',
                to: '/creation-sites-web',
              },
              {
                title: 'Assistant Vocal IA',
                desc: "Répondez aux appels 24/7 avec un agent qui qualifie et réserve.",
                to: '/assistant-vocal',
              },
              {
                title: 'Agents Conversationnels',
                desc: "Chatbots IA pour qualifier, conseiller et convertir vos visiteurs.",
                to: '/agents-conversationnels',
              },
            ].map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group cursor-pointer rounded-xl border border-white/10 bg-card/70 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card"
                onClick={() => navigate(svc.to)}
              >
                <h3 className="text-lg font-semibold text-white">{svc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {svc.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition-all duration-300 group-hover:gap-2">
                  En savoir plus <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand/70" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Formulaire
            </span>
            <span className="h-px w-8 bg-brand/70" />
          </div>

          {showSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-md rounded-xl border border-white/10 bg-card/70 p-8 text-center"
            >
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-400" />
              <h3 className="font-display text-xl font-semibold text-white">
                Votre demande a bien été envoyée.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Notre équipe vous répond sous 24–48 heures. Pour une urgence,
                écrivez à{' '}
                <a
                  href="mailto:jarias@aixpt.ca"
                  className="text-brand underline transition-colors hover:text-brand-hover"
                >
                  jarias@aixpt.ca
                </a>{' '}
                ou appelez au{' '}
                <a
                  href="tel:4188005085"
                  className="text-brand underline transition-colors hover:text-brand-hover"
                >
                  418-800-5085
                </a>
                .
              </p>
              <Button
                onClick={() => {
                  setShowSuccess(false);
                  setFormData({
                    nomComplet: '',
                    adresseCourriel: '',
                    nomEntreprise: '',
                    problemes: '',
                    informationsSupplementaires: '',
                  });
                }}
                className="mt-6 rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)]"
              >
                Envoyer un autre message
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="mx-auto max-w-md space-y-5 rounded-xl border border-white/10 bg-card/70 p-8"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                  Nom complet *
                </label>
                <Input
                  type="text"
                  value={formData.nomComplet}
                  onChange={(e) => handleInputChange('nomComplet', e.target.value)}
                  required
                  className="border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground/60 focus:border-brand/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                  Adresse courriel *
                </label>
                <Input
                  type="email"
                  value={formData.adresseCourriel}
                  onChange={(e) => handleInputChange('adresseCourriel', e.target.value)}
                  required
                  className="border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground/60 focus:border-brand/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                  Entreprise
                </label>
                <Input
                  type="text"
                  value={formData.nomEntreprise}
                  onChange={(e) => handleInputChange('nomEntreprise', e.target.value)}
                  className="border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground/60 focus:border-brand/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                  Vos besoins ou défis
                </label>
                <Textarea
                  value={formData.problemes}
                  onChange={(e) => handleInputChange('problemes', e.target.value)}
                  rows={4}
                  className="border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground/60 focus:border-brand/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                  Informations complémentaires
                </label>
                <Textarea
                  value={formData.informationsSupplementaires}
                  onChange={(e) =>
                    handleInputChange('informationsSupplementaires', e.target.value)
                  }
                  rows={3}
                  className="border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground/60 focus:border-brand/40"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-brand py-2.5 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_10px_30px_rgba(154,107,255,0.35)] disabled:opacity-50"
              >
                {isSubmitting ? 'Envoi en cours…' : 'Envoyer'}
              </Button>
            </motion.form>
          )}
        </motion.section>
      </div>
    </div>
  );
};
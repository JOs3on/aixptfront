import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Logo } from './Logo';

interface FooterProps {
  onOpenConsultation?: () => void;
}

const navigation = [
  { id: '/', label: 'Accueil' },
  { id: '/services', label: 'Services' },
  { id: '/apropos', label: 'À propos' },
  { id: '/contact', label: 'Contact' },
];

const services = [
  { id: '/assistant-vocal', label: 'Assistant vocal IA' },
  { id: '/emails-automatises', label: 'Emails automatisés' },
  { id: '/agents-conversationnels', label: 'Agents conversationnels' },
  { id: '/creation-sites-web', label: 'Création de sites web' },
  { id: '/receptionniste-ia-concessionnaires-automobiles', label: 'IA pour concessionnaires' },
  { id: '/chatbot-ia-clinique', label: 'Chatbot pour cliniques' },
];

const headingClass =
  'font-sans text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50';

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0d0d10]">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand + CTA */}
          <div>
            <Logo markClassName="h-11 w-11 md:h-12 md:w-12" textClassName="text-2xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              L'IA qui travaille pendant que vous dormez. Agents vocaux, emails
              automatisés et intégrations sur mesure pour les entreprises du
              Québec.
            </p>
            <Button
              onClick={onOpenConsultation}
              className="mt-6 h-10 rounded-full bg-brand px-6 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_8px_24px_rgba(154,107,255,0.35)]"
            >
              Réserver une consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <div>
            <h3 className={headingClass}>Navigation</h3>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.id}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={headingClass}>Services</h3>
            <ul className="mt-5 space-y-3">
              {services.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.id}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={headingClass}>Contact</h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="tel:+14188005085"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-white"
                >
                  <Phone className="h-4 w-4 flex-shrink-0 text-brand" />
                  418-800-5085
                </a>
              </li>
              <li>
                <a
                  href="mailto:jarias@aixpt.ca"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-white"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 text-brand" />
                  jarias@aixpt.ca
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0 text-brand" />
                Québec, Canada
              </li>
              <li>
                <a
                  href="https://portal.aixpt.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-white"
                >
                  Accéder au portail
                  <ExternalLink className="h-3.5 w-3.5 text-brand" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} AIXPT — Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground">
            Automatisation intelligente · Québec, Canada
          </p>
        </div>
      </div>
    </footer>
  );
};

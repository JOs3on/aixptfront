import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { ConsultationModal } from '../modals/ConsultationModal';
import { Logo } from './Logo';

interface NavbarProps {
  isConsultationOpen: boolean;
  onConsultationToggle: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isConsultationOpen,
  onConsultationToggle
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparent over the hero, solid once the page scrolls — no glass,
  // no backdrop-blur: the bar earns its background instead of blurring one.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: '/', label: 'Accueil' },
    { id: '/services', label: 'Services' },
    { id: '/contact', label: 'Nous Contacter' },
    { id: '/apropos', label: 'À propos' },
  ];

  const solid = scrolled || isMenuOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid
            ? 'border-b border-white/10 bg-[#0b0b0e]/95 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
            : 'border-b border-transparent bg-gradient-to-b from-black/60 via-black/30 to-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo — transparent mark + wordmark (no baked black box) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-shrink-0 items-center"
            >
              <Logo />
            </motion.div>

            {/* Desktop navigation + actions */}
            <div className="ml-auto hidden items-center space-x-8 md:flex">
              <div className="relative flex items-center space-x-7">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.id}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors duration-200 ${
                        isActive ? 'text-brand' : 'text-foreground/70 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <a
                  href="https://portal.aixpt.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap text-xs font-medium text-foreground/70 transition-colors duration-200 hover:text-white lg:text-sm"
                >
                  Portail
                </a>

                <Button
                  onClick={() => onConsultationToggle(true)}
                  className="h-10 whitespace-nowrap rounded-full bg-brand px-5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_8px_24px_rgba(154,107,255,0.35)]"
                >
                  <Calendar className="mr-1.5 h-4 w-4 lg:mr-2" />
                  <span className="hidden lg:inline">Réserver une consultation</span>
                  <span className="lg:hidden">Consultation</span>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground/80 transition-colors hover:text-white"
                aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-white/10 py-4 md:hidden"
              >
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.id}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `text-left text-sm font-medium transition-colors duration-200 ${
                          isActive ? 'text-brand' : 'text-foreground/70 hover:text-white'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}

                  <a
                    href="https://portal.aixpt.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left text-sm font-medium text-foreground/70 transition-colors duration-200 hover:text-white"
                  >
                    Accéder au Portail
                  </a>

                  <Button
                    onClick={() => {
                      onConsultationToggle(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full rounded-full bg-brand px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-brand-hover"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Réserver une consultation
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => onConsultationToggle(false)}
      />
    </>
  );
};

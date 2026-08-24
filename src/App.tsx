import { useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/layout/Navbar';
import { AIXPTHero } from './components/hero/AIXPTHero';
import { Features } from './components/pages/Features';
import { About } from './components/pages/About';
import { AssistantVocal } from './components/pages/AssistantVocal';
import { EmailsAutomatises } from './components/pages/EmailsAutomatises';
import { AgentsConversationnels } from './components/pages/AgentsConversationnels';
import { CreationSitesWeb } from './components/pages/CreationSitesWeb';
import { ContactPage } from './components/pages/ContactPage';
import ReflectShowcase from './components/ReflectShowcase';
import AIIntelligenceBridge from './components/AIIntelligenceBridge';
import { Sandbox } from './components/pages/Sandbox';
import { VoiceflowWidget } from './components/layout/VoiceflowWidget';
import { Footer } from './components/layout/Footer';
import SynaraClone from '../synara-clone/SynaraClone';


/** Scrolls back to the top on every route change — pages must open at the top. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const location = useLocation();
  const isSandbox = location.pathname.startsWith('/sandbox');
  const isStandalone = location.pathname.startsWith('/synara-clone');

  return (
    <div className="min-h-screen overflow-x-clip w-full max-w-full">
      <ScrollToTop />
      {!isSandbox && !isStandalone && (
        <Navbar
          isConsultationOpen={isConsultationOpen}
          onConsultationToggle={setIsConsultationOpen}
        />
      )}
      {!isSandbox && !isStandalone && <VoiceflowWidget />}
      <div className="w-full max-w-full overflow-x-clip">
        <Routes>
            <Route path="/" element={
              <>
                <Helmet>
                  <title>AIXPT - L'IA qui travaille pendant que vous dormez.</title>
                  <meta name="description" content="Pionniers de l'automatisation intelligente basés au Québec, nous créons des solutions IA pour transformer les entreprises." />
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Organization",
                      "name": "AIXPT",
                      "description": "Pionniers de l'automatisation intelligente basés au Québec, nous créons des solutions IA pour transformer les entreprises.",
                      "url": "https://aixpt.com",
                      "logo": "https://aixpt.com/logo2.png",
                      "address": {
                        "@type": "PostalAddress",
                        "addressRegion": "Québec",
                        "addressCountry": "CA",
                        "addressLocality": "Montréal"
                      },
                      "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+1-555-123-4567",
                        "contactType": "customer service",
                        "email": "info@aixpt.com",
                        "areaServed": "Québec, Canada"
                      },
                      "sameAs": [
                        "https://twitter.com/aixpt",
                        "https://linkedin.com/company/aixpt"
                      ]
                    })}
                  </script>
                </Helmet>
                <AIXPTHero
                  title="L'IA qui travaille pendant que vous dormez."
                  subtitle="Récupérez vos leads perdus, répondez aux appels 24/7 et synchronisez tous vos systèmes — avec des agents IA qui travaillent pour vous, sans lever le petit doigt."
                  ctaText="Réserver une consultation"
                  onOpenConsultation={() => setIsConsultationOpen(true)}
                />
              </>
            } />
            <Route path="/services" element={<Features onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/apropos" element={<About />} />
            <Route path="/contact" element={<ContactPage onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/assistant-vocal" element={<AssistantVocal onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/emails-automatises" element={<EmailsAutomatises onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/agents-conversationnels" element={<AgentsConversationnels onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/creation-sites-web" element={<CreationSitesWeb onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            {/* Analyste 360 is not currently offered — redirect to the services page */}
            <Route path="/analyste-automatique-360" element={<Navigate to="/services" replace />} />

            <Route path="/test-reflect" element={<div className="pt-24"><ReflectShowcase /></div>} />
            <Route path="/bridge" element={<div className="pt-24"><AIIntelligenceBridge /></div>} />

            <Route path="/sandbox/:clientName" element={<Sandbox />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/synara-clone" element={<SynaraClone />} />


            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </div>
      {!isSandbox && !isStandalone && (
        <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
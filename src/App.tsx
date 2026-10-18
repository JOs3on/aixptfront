import { useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { metaFor, SITE_URL } from './seo/meta';
import { Navbar } from './components/layout/Navbar';
import { AIXPTHero } from './components/hero/AIXPTHero';
import { Features } from './components/pages/Features';
import { About } from './components/pages/About';
import { AssistantVocal } from './components/pages/AssistantVocal';
import { EmailsAutomatises } from './components/pages/EmailsAutomatises';
import { AgentsConversationnels } from './components/pages/AgentsConversationnels';
import { CreationSitesWeb } from './components/pages/CreationSitesWeb';
import { ReceptionnisteIAConcessionnaires } from './components/pages/ReceptionnisteIAConcessionnaires';
import { ChatbotIAClinique } from './components/pages/ChatbotIAClinique';
import { ContactPage } from './components/pages/ContactPage';
import ReflectShowcase from './components/ReflectShowcase';
import AIIntelligenceBridge from './components/AIIntelligenceBridge';
import { Sandbox } from './components/pages/Sandbox';
import { VapiDemoPage } from './components/pages/VapiDemoPage';
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
                  <title>{metaFor('/')!.title}</title>
                  <meta name="description" content={metaFor('/')!.description} />
                  <link rel="canonical" href={`${SITE_URL}/`} />
                </Helmet>
                <AIXPTHero
                  title="AIXPT — L'IA qui travaille pendant que vous dormez."
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
            <Route path="/receptionniste-ia-concessionnaires-automobiles" element={<ReceptionnisteIAConcessionnaires onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/chatbot-ia-clinique" element={<ChatbotIAClinique onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            {/* Analyste 360 is not currently offered — redirect to the services page */}
            <Route path="/analyste-automatique-360" element={<Navigate to="/services" replace />} />

            <Route path="/test-reflect" element={<div className="pt-24"><ReflectShowcase /></div>} />
            <Route path="/bridge" element={<div className="pt-24"><AIIntelligenceBridge /></div>} />

            <Route path="/sandbox/:clientName" element={<Sandbox />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/demo/:clientName" element={<VapiDemoPage />} />
            <Route path="/demo" element={<VapiDemoPage />} />
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
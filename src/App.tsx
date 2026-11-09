import { useEffect, useLayoutEffect, useState } from 'react';
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
import { DemoHub } from './components/pages/DemoHub';
import { ChatDemoPage } from './components/pages/ChatDemoPage';
import { ChatbotIAAvocats } from './components/pages/ChatbotIAAvocats';
import { ReceptionnisteIAChauffageClimatisation } from './components/pages/ReceptionnisteIAChauffageClimatisation';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { CookieNotice } from './components/legal/CookieNotice';
import { Footer } from './components/layout/Footer';
import SynaraClone from '../synara-clone/SynaraClone';


/** Scrolls back to the top on every route change — pages must open at the top. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // Stop the browser from restoring the previous scroll position on reload.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, '');
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      });
      return;
    }

    window.scrollTo(0, 0);
    // A second pass catches pages whose layout settles after the first paint.
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, [pathname, hash]);

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
            <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
            <Route path="/assistant-vocal" element={<AssistantVocal onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/assistant-vocal/:nicheSlug" element={<AssistantVocal onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/assistant-vocal/:nicheSlug/:clientSlug" element={<AssistantVocal onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/emails-automatises" element={<EmailsAutomatises onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/agents-conversationnels" element={<AgentsConversationnels onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/agents-conversationnels/:nicheSlug" element={<AgentsConversationnels onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/agents-conversationnels/:nicheSlug/:clientSlug" element={<AgentsConversationnels onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/creation-sites-web" element={<CreationSitesWeb onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/receptionniste-ia-concessionnaires-automobiles" element={<ReceptionnisteIAConcessionnaires onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/chatbot-ia-clinique" element={<ChatbotIAClinique onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/chatbot-ia-avocats" element={<ChatbotIAAvocats onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/receptionniste-ia-chauffage-climatisation" element={<ReceptionnisteIAChauffageClimatisation onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            {/* Analyste 360 is not currently offered — redirect to the services page */}
            <Route path="/analyste-automatique-360" element={<Navigate to="/services" replace />} />

            <Route path="/test-reflect" element={<div className="pt-24"><ReflectShowcase /></div>} />
            <Route path="/bridge" element={<div className="pt-24"><AIIntelligenceBridge /></div>} />

            <Route path="/demo" element={<DemoHub />} />
            <Route path="/demo/voice/:nicheSlug" element={<VapiDemoPage />} />
            <Route path="/demo/voice/:nicheSlug/:clientSlug" element={<VapiDemoPage />} />
            <Route path="/demo/chat/:nicheSlug" element={<ChatDemoPage />} />
            <Route path="/demo/chat/:nicheSlug/:clientSlug" element={<ChatDemoPage />} />
            {/* Legacy short voice link: /demo/dentaire */}
            <Route path="/demo/:nicheSlug" element={<VapiDemoPage />} />
            <Route path="/demo/:nicheSlug/:clientSlug" element={<VapiDemoPage />} />
            <Route path="/sandbox/:clientName" element={<Sandbox />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/synara-clone" element={<SynaraClone />} />


            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </div>
      {!isSandbox && !isStandalone && (
        <>
          <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
          <CookieNotice />
        </>
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
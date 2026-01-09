import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/layout/Navbar';
import { AIXPTHero } from './components/hero/AIXPTHero';
import { Features } from './components/pages/Features';
import { About } from './components/pages/About';
import { AssistantVocal } from './components/pages/AssistantVocal';
import { EmailsAutomatises } from './components/pages/EmailsAutomatises';
import { AgentsConversationnels } from './components/pages/AgentsConversationnels';
import { CreationSitesWeb } from './components/pages/CreationSitesWeb';
import { AnalysteAutomatique360 } from './components/pages/AnalysteAutomatique360';
import { ContactPage } from './components/pages/ContactPage';

function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen overflow-x-hidden w-full max-w-full">
        <Navbar
          isConsultationOpen={isConsultationOpen}
          onConsultationToggle={setIsConsultationOpen}
        />
        <div className="w-full max-w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={
              <>
                <Helmet>
                  <title>AIXPT - L'automatisation IA qui propulse vos affaires.</title>
                  <meta name="description" content="Pionniers de l'automatisation intelligente basés au Québec, nous créons des solutions IA pour transformer les entreprises." />
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Organization",
                      "name": "AIXPT",
                      "description": "Pionniers de l'automatisation intelligente basés au Québec, nous créons des solutions IA pour transformer les entreprises.",
                      "url": "https://aixpt.com",
                      "logo": "https://aixpt.com/logoaixpt.png",
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
                  title="L'automatisation IA qui propulse vos affaires."
                  subtitle="Transformez votre entreprise avec des solutions d'automatisation IA de pointe qui évoluent avec vos ambitions et révolutionnent votre façon de travailler"
                  ctaText="Commencer Votre Voyage IA"
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
            <Route path="/analyste-automatique-360" element={<AnalysteAutomatique360 onOpenConsultation={() => setIsConsultationOpen(true)} />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
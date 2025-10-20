import React from 'react';
import { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState('accueil');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleCtaClick = () => {
    console.log("Démarrage du voyage IA avec AIXPT...");
    // Ici vous pourriez rediriger vers une page d'inscription ou ouvrir un modal
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'fonctionnalites':
        return <Features onNavigate={setCurrentPage} onOpenConsultation={() => setIsConsultationOpen(true)} />;
      case 'apropos':
        return <About />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} onOpenConsultation={() => setIsConsultationOpen(true)} />;
      case 'assistant-vocal':
        return <AssistantVocal onNavigate={setCurrentPage} onOpenConsultation={() => setIsConsultationOpen(true)} />;
      case 'emails-automatises':
        return <EmailsAutomatises onNavigate={setCurrentPage} onOpenConsultation={() => setIsConsultationOpen(true)} />;
      case 'agents-conversationnels':
        return <AgentsConversationnels onNavigate={setCurrentPage} onOpenConsultation={() => setIsConsultationOpen(true)} />;
      case 'creation-sites-web':
        return <CreationSitesWeb onNavigate={setCurrentPage} onOpenConsultation={() => setIsConsultationOpen(true)} />;
      case 'analyste-automatique-360':
        return <AnalysteAutomatique360 onNavigate={setCurrentPage} onOpenConsultation={() => setIsConsultationOpen(true)} />;
      default:
        return (
          <>
            <Helmet>
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
              onCtaClick={handleCtaClick}
              onNavigate={setCurrentPage}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden w-full max-w-full">
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isConsultationOpen={isConsultationOpen}
        onConsultationToggle={setIsConsultationOpen}
      />
      <div className="w-full max-w-full overflow-x-hidden">
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default App;
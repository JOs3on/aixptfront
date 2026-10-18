import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { VapiVoiceDemo } from '../vapi/VapiVoiceDemo';
import { ConsultationModal } from '../modals/ConsultationModal';

export const VapiDemoPage: React.FC = () => {
  const { clientName } = useParams<{ clientName?: string }>();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const formattedClientName = clientName
    ? clientName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Votre Concession Automobile';

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 text-foreground">
      <Helmet>
        <title>{`Démo Réceptionniste IA — ${formattedClientName} | AIXPT`}</title>
        <meta 
          name="description" 
          content="Testez en direct notre assistante vocale IA pour concessionnaires. Prise d'appels 24/7, qualification immédiate et réservation d'essais routiers." 
        />
      </Helmet>

      <VapiVoiceDemo
        clientTitle={formattedClientName}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
};

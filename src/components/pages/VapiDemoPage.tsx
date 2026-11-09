import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { VapiVoiceDemo } from '../vapi/VapiVoiceDemo';
import { ConsultationModal } from '../modals/ConsultationModal';
import { PUBLIC_NICHES, resolveClientTitle } from '../../data/niches/public';
import { resolveNicheFromUrl } from '../../data/niches/demoLinks';
import type { NicheId } from '../../data/niches/types';
import { VAPI_DEMOS } from '../../lib/vapi';

const NICHE_META: Record<NicheId, { description: string }> = {
  concessionnaire: {
    description:
      "Testez en direct notre assistante vocale IA pour concessionnaires. Prise d'appels 24/7, qualification immédiate et réservation d'essais routiers.",
  },
  dentaire: {
    description:
      "Testez en direct notre réceptionniste vocale IA pour cliniques dentaires. Prise de rendez-vous, urgences et questions des patients 24/7.",
  },
  hvac: {
    description:
      "Testez en direct notre réceptionniste vocale IA pour entreprises de chauffage et climatisation. Urgences, zones desservies et rendez-vous 24/7.",
  },
  avocat: {
    description:
      "Testez notre assistant IA pour cabinets juridiques. Qualification des demandes, prise de consultation et réponses administratives 24/7.",
  },
};

export const VapiDemoPage: React.FC = () => {
  const { nicheSlug, clientSlug } = useParams<{
    nicheSlug?: string;
    clientSlug?: string;
  }>();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const nicheId = resolveNicheFromUrl(nicheSlug) ?? 'concessionnaire';
  const niche = PUBLIC_NICHES[nicheId];
  const clientTitle = resolveClientTitle(nicheId, clientSlug);
  const demo = VAPI_DEMOS[nicheId];
  const openingMessage = niche.openingMessage.replace(niche.defaultClientTitle, clientTitle);

  return (
    <div className="min-h-screen bg-background pt-32 pb-16 text-foreground">
      <Helmet>
        <title>{`Démo Réceptionniste IA — ${clientTitle} | AIXPT`}</title>
        <meta name="description" content={NICHE_META[nicheId].description} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/demo"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-brand transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Toutes les démos
        </Link>

        <div id="demo" className="scroll-mt-24">
          <VapiVoiceDemo
            key={`${nicheId}-${clientTitle}`}
            clientTitle={clientTitle}
            agentId={demo.agentId}
            phoneNumber={demo.phoneNumber}
            formattedPhoneNumber={demo.formattedPhoneNumber}
            suggestedQuestions={niche.suggestedQuestions}
            agentRole={niche.agentRole}
            openingMessage={openingMessage}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        </div>
      </div>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
};

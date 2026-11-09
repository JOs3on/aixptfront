import React from 'react';
import { Calendar, Clock, FileText, Scale, ShieldCheck } from 'lucide-react';
import {
  VerticalServicePage,
  type VerticalPageConfig,
} from './VerticalServicePage';

const config: VerticalPageConfig = {
  path: '/chatbot-ia-avocats',
  eyebrow: 'Chatbot IA pour avocats',
  h1Lead: 'Chatbot IA pour',
  h1Accent: 'avocats et cabinets juridiques — AIXPT',
  subtitle:
    "Qualifiez les demandes, répondez aux questions administratives et prenez les consultations — sans surcharger votre équipe.",
  description:
    "Votre cabinet perd des mandats parce que les demandes arrivent après les heures ou se perdent dans la boîte courriel. Le chatbot IA d'AIXPT accueille la personne sur votre site, qualifie le type de dossier, explique les honoraires de consultation et propose un créneau avec le bon avocat. Il ne donne jamais d'avis juridique : il fait le tri et prépare la rencontre.",
  icon: Scale,
  problems: [
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Demandes reçues après les heures',
      description:
        "Une personne en séparation cherche de l'aide le soir. Sans réponse immédiate, elle contacte un autre cabinet.",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Intake manuel et répétitif',
      description:
        'Votre équipe repose les mêmes questions au téléphone et par courriel avant de savoir si le dossier est pertinent.',
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Consultations difficiles à caler',
      description:
        'Les allers-retours pour trouver un créneau ralentissent la prise de mandat et occupent l\'adjointe.',
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: 'Risque de donner un avis juridique',
      description:
        'Un chatbot mal encadré peut déraper. Le nôtre est limité aux questions administratives et transfère les cas sensibles.',
    },
  ],
  functionalities: [
    'Accueille et qualifie le type de dossier (famille, travail, succession, litige)',
    'Répond aux questions sur les honoraires, les documents et les consultations à distance',
    'Propose un créneau précis et collecte prénom + téléphone',
    'Priorise les urgences (délai de cour, saisie, garde, violence)',
    'Transfère à un humain pour toute question juridique ou situation sensible',
    'S\'intègre à votre site, votre agenda et votre CRM',
  ],
  advantages: [
    'Plus de demandes qualifiées, même en dehors des heures d\'ouverture',
    'Moins de temps passé sur l\'intake répétitif',
    'Consultations mieux préparées et mieux réparties entre avocats',
    'Aucun avis juridique donné par l\'IA',
    'Expérience professionnelle dès le premier contact',
    'Déploiement rapide, sans changer vos outils',
  ],
  faq: [
    {
      q: 'Le chatbot peut-il donner un avis juridique ?',
      a: 'Non. Il est configuré pour répondre uniquement aux questions administratives et pour transférer toute question juridique à un membre du cabinet.',
    },
    {
      q: 'Respecte-t-il la confidentialité des dossiers ?',
      a: 'Oui. Le chatbot collecte le minimum d\'informations nécessaires et ne demande jamais de pièce d\'identité, de NAS ni de détail sensible dans le clavardage.',
    },
    {
      q: 'Peut-il prendre les consultations directement dans notre agenda ?',
      a: 'Oui, il peut proposer des créneaux et créer la consultation dans votre agenda ou votre CRM, selon les intégrations disponibles.',
    },
    {
      q: 'Est-ce adapté à un cabinet solo ?',
      a: 'Oui. Le chatbot s\'adapte à un avocat seul comme à un cabinet multi-praticiens, avec des règles différentes par domaine.',
    },
  ],
  demoPath: '/agents-conversationnels/avocats#demo',
  demoLabel: 'Tester le chatbot avocats',
  serviceType: 'Chatbot IA et agent conversationnel pour cabinets juridiques',
  keywords:
    'chatbot IA avocat, chatbot cabinet juridique, intake avocat IA, agent conversationnel juridique Québec, prise de consultation avocat, automatisation cabinet avocat',
};

interface ChatbotIAAvocatsProps {
  onOpenConsultation: () => void;
}

export const ChatbotIAAvocats: React.FC<ChatbotIAAvocatsProps> = ({ onOpenConsultation }) => (
  <VerticalServicePage config={config} onOpenConsultation={onOpenConsultation} />
);

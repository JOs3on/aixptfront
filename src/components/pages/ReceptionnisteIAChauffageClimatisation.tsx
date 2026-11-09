import React from 'react';
import { Calendar, MapPin, Phone, Thermometer, Wrench } from 'lucide-react';
import {
  VerticalServicePage,
  type VerticalPageConfig,
} from './VerticalServicePage';

const config: VerticalPageConfig = {
  path: '/receptionniste-ia-chauffage-climatisation',
  eyebrow: 'Réceptionniste IA pour chauffage et climatisation',
  h1Lead: 'Réceptionniste IA pour',
  h1Accent: 'chauffage et climatisation — AIXPT',
  subtitle:
    "Répondez aux urgences, validez la zone desservie et remplissez l'agenda des techniciens — 24/7, même en pointe.",
  description:
    "Une thermopompe qui arrête en canicule ou une fournaise en panne en janvier ne peut pas attendre lundi matin. La réceptionniste IA d'AIXPT répond à tous les appels, qualifie la panne, vérifie la ville desservie et propose un créneau d'intervention précis. Vos techniciens arrivent avec la bonne information, et aucun appel d'urgence ne part chez le concurrent.",
  icon: Thermometer,
  problems: [
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Appels d\'urgence manqués',
      description:
        'En pointe ou après les heures, les appels d\'urgence sonnent dans le vide — et le client appelle ailleurs.',
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Zones et frais à répéter',
      description:
        'Votre équipe redemande la ville, vérifie la zone et explique les frais de déplacement à chaque appel.',
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Agenda de techniciens mal rempli',
      description:
        'Les rendez-vous se prennent manuellement, avec des trous, des doubles réservations et des rappels oubliés.',
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      title: 'Diagnostics mal qualifiés',
      description:
        'Le technicien arrive sans savoir si c\'est une thermopompe, une fournaise ou un chauffe-eau — et sans l\'historique.',
    },
  ],
  functionalities: [
    'Répond à 100 % des appels entrants, 24/7',
    'Qualifie la panne, l\'équipement et le niveau d\'urgence',
    'Valide la ville desservie et explique les frais applicables',
    'Propose un créneau d\'intervention précis',
    'Transfère les urgences critiques (gaz, CO, fuite active) à la bonne ressource',
    'Notifie l\'équipe par texto ou courriel avec les détails',
  ],
  advantages: [
    'Zéro appel d\'urgence manqué, même la fin de semaine',
    'Plus de rendez-vous techniciens remplis',
    'Moins de temps au téléphone pour votre équipe',
    'Meilleure préparation des interventions',
    'Expérience client rapide et rassurante',
    'Une fraction du coût d\'une réception 24/7',
  ],
  faq: [
    {
      q: 'La réceptionniste IA gère-t-elle les urgences la fin de semaine ?',
      a: 'Oui. Elle répond 24/7, qualifie l\'urgence et propose le prochain créneau disponible, avec les règles que vous définissez.',
    },
    {
      q: 'Que fait-elle en cas d\'odeur de gaz ou de monoxyde de carbone ?',
      a: 'Elle demande d\'évacuer et d\'appeler le 911 puis Énergir immédiatement, sans attendre une intervention de votre entreprise.',
    },
    {
      q: 'Peut-elle valider la zone desservie et les frais de déplacement ?',
      a: 'Oui. Elle connaît vos villes desservies et peut expliquer les frais avant de proposer un rendez-vous.',
    },
    {
      q: 'S\'intègre-t-elle à notre agenda et à notre CRM ?',
      a: 'Oui, selon vos outils. Elle peut créer le rendez-vous et transmettre les informations au technicien ou à l\'équipe de dispatch.',
    },
  ],
  demoPath: '/assistant-vocal/hvac#demo',
  demoLabel: 'Tester la démo vocale CVC',
  serviceType: 'Réceptionniste IA et agent vocal pour entreprises de chauffage et climatisation',
  keywords:
    'réceptionniste IA chauffage climatisation, agent vocal HVAC Québec, standard téléphonique thermopompe, répondeur IA urgence chauffage, prise de rendez-vous technicien IA',
};

interface ReceptionnisteIAChauffageClimatisationProps {
  onOpenConsultation: () => void;
}

export const ReceptionnisteIAChauffageClimatisation: React.FC<
  ReceptionnisteIAChauffageClimatisationProps
> = ({ onOpenConsultation }) => (
  <VerticalServicePage config={config} onOpenConsultation={onOpenConsultation} />
);

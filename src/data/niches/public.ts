import type { NicheId, NichePublicConfig } from './types';

/**
 * Client-safe metadata only. Never import the server prompts from here:
 * keep the system instructions out of the browser bundle.
 */
export const PUBLIC_NICHES: Record<NicheId, NichePublicConfig> = {
  concessionnaire: {
    id: 'concessionnaire',
    name: 'Concessionnaire automobile',
    industry: 'Automobile',
    defaultClientTitle: 'Concessionnaire automobile',
    agentName: 'Maxime',
    agentRole: 'Conseiller commercial',
    icon: 'car',
    openingMessage:
      'Bonjour! Je suis Maxime, conseiller au concessionnaire automobile. Vous cherchez un véhicule en particulier?',
    suggestedQuestions: [
      'Le VUS noir 2023 est-il encore disponible ?',
      'Quels sont vos taux de financement en ce moment ?',
      'Je veux essayer un VUS cette semaine.',
      'Reprenez-vous mon véhicule actuel ?',
    ],
    inputPlaceholder: 'Écrivez votre message…',
    availabilityLabel: 'En ligne · réponse en quelques secondes',
  },
  dentaire: {
    id: 'dentaire',
    name: 'Clinique dentaire',
    industry: 'Dentaire',
    defaultClientTitle: 'Clinique dentaire',
    agentName: 'Camille',
    agentRole: 'Coordonnatrice clinique',
    icon: 'stethoscope',
    openingMessage:
      'Bonjour! Je suis Camille, coordonnatrice à la clinique dentaire. Qu’est-ce qui vous amène aujourd’hui?',
    suggestedQuestions: [
      "J’ai une rage de dent, avez-vous une place aujourd’hui ?",
      'Acceptez-vous les nouveaux patients ?',
      'Quels sont vos horaires cette semaine ?',
      'Est-ce que mes assurances sont acceptées ?',
    ],
    inputPlaceholder: 'Décrivez votre besoin…',
    availabilityLabel: 'En ligne · urgences prises en priorité',
  },
  hvac: {
    id: 'hvac',
    name: 'Chauffage & climatisation',
    industry: 'CVC / HVAC',
    defaultClientTitle: 'Thermopompes',
    agentName: 'Alex',
    agentRole: 'Coordonnateur technique',
    icon: 'thermometer',
    openingMessage:
      'Bonjour! Je suis Alex, coordonnateur chez Thermopompes. Quel problème de chauffage ou de climatisation avez-vous?',
    suggestedQuestions: [
      'Ma thermopompe ne fonctionne plus, pouvez-vous venir aujourd’hui ?',
      'Est-ce que vous desservez ma ville ?',
      'Combien coûte un diagnostic ?',
      'Faites-vous l’entretien annuel ?',
    ],
    inputPlaceholder: 'Décrivez la panne…',
    availabilityLabel: 'En ligne · service d’urgence 7 jours',
  },
  avocat: {
    id: 'avocat',
    name: 'Cabinet juridique',
    industry: 'Juridique',
    defaultClientTitle: 'Cabinet juridique',
    agentName: 'Léa',
    agentRole: 'Adjointe juridique',
    icon: 'scale',
    openingMessage:
      'Bonjour! Je suis Léa, adjointe au cabinet juridique. Quel type de dossier vous amène?',
    suggestedQuestions: [
      'J’aurais besoin d’aide pour une séparation.',
      'Combien coûte la première consultation ?',
      'Offrez-vous des consultations à distance ?',
      'Quels documents dois-je apporter ?',
    ],
    inputPlaceholder: 'Décrivez votre dossier…',
    availabilityLabel: 'En ligne · réponse en quelques secondes',
  },
};

export const NICHE_IDS = Object.keys(PUBLIC_NICHES) as NicheId[];

/** URL/keyword heuristics — unchanged from the previous Sandbox logic. */
export function resolveNicheId(raw?: string | null): NicheId {
  const value = (raw ?? '').toLowerCase();
  if (!value) return 'concessionnaire';

  if (
    value.includes('hvac') ||
    value.includes('cvc') ||
    value.includes('chauffage') ||
    value.includes('climatisation') ||
    value.includes('thermopompe') ||
    value.includes('plomberie') ||
    value.includes('technicien')
  ) {
    return 'hvac';
  }

  if (
    value.includes('avocat') ||
    value.includes('lawyer') ||
    value.includes('juridique') ||
    value.includes('legal') ||
    value.includes('law')
  ) {
    return 'avocat';
  }

  if (
    value.includes('dentaire') ||
    value.includes('dentist') ||
    value.includes('clinique') ||
    value.includes('dental')
  ) {
    return 'dentaire';
  }

  return 'concessionnaire';
}

const GENERIC_SLUGS = new Set([
  'sandbox',
  'concessionnaire',
  'concessionnaires',
  'concession',
  'auto',
  'automobile',
  'garage',
  'car',
  'cars',
  'dealership',
  'vehicule',
  'vehicules',
  'dentaire',
  'dentiste',
  'dentistes',
  'dental',
  'dentist',
  'clinique',
  'cliniques',
  'hvac',
  'cvc',
  'chauffage',
  'climatisation',
  'thermopompe',
  'thermopompes',
  'plomberie',
  'technicien',
  'avocat',
  'avocats',
  'lawyer',
  'lawyers',
  'law',
  'juridique',
  'legal',
  'cabinet',
  'cabinets',
]);

/** Turns `groupe-auto-demo` into `Groupe Auto Demo`. */
export function formatClientName(raw?: string | null): string {
  if (!raw) return '';
  return raw
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Returns the brand to display. Generic slugs such as `/sandbox/concessionnaire`
 * should not replace the demo brand with a single word like "Concessionnaire".
 */
export function resolveClientTitle(nicheId: NicheId, rawSlug?: string | null): string {
  const formatted = formatClientName(rawSlug);
  if (!formatted) return PUBLIC_NICHES[nicheId].defaultClientTitle;

  const words = (rawSlug ?? '')
    .toLowerCase()
    .split('-')
    .filter(Boolean);
  const isGeneric = words.length > 0 && words.every((word) => GENERIC_SLUGS.has(word));

  return isGeneric ? PUBLIC_NICHES[nicheId].defaultClientTitle : formatted;
}

import { PUBLIC_NICHES, resolveNicheId } from './public';
import { concessionnaireKnowledgeBase, concessionnaireSystemInstruction } from './concessionnaire';
import { dentaireKnowledgeBase, dentaireSystemInstruction } from './dentaire';
import { hvacKnowledgeBase, hvacSystemInstruction } from './hvac';
import { avocatKnowledgeBase, avocatSystemInstruction } from './avocat';
import type { KnowledgeBase, NicheConfig, NicheId } from './types';

/**
 * Server-only registry. Imported by `api/chat.ts`, never by React components,
 * so the system prompts never ship in the browser bundle.
 */
const INSTRUCTIONS: Record<NicheId, string> = {
  concessionnaire: concessionnaireSystemInstruction,
  dentaire: dentaireSystemInstruction,
  hvac: hvacSystemInstruction,
  avocat: avocatSystemInstruction,
};

const KNOWLEDGE: Record<NicheId, KnowledgeBase> = {
  concessionnaire: concessionnaireKnowledgeBase,
  dentaire: dentaireKnowledgeBase,
  hvac: hvacKnowledgeBase,
  avocat: avocatKnowledgeBase,
};

function sanitizeBrand(value?: string | null): string {
  if (!value) return '';
  return value.replace(/[<>{}\n\r]/g, '').trim().slice(0, 80);
}

export function getNicheConfig(id: string | undefined, clientTitle?: string | null): NicheConfig {
  const nicheId = resolveNicheId(id);
  const publicConfig = PUBLIC_NICHES[nicheId];
  const brand = sanitizeBrand(clientTitle) || publicConfig.defaultClientTitle;

  return {
    ...publicConfig,
    defaultClientTitle: brand,
    systemInstruction: INSTRUCTIONS[nicheId].split('{{CLIENT_NAME}}').join(brand),
    knowledgeBase: KNOWLEDGE[nicheId],
  };
}

export { NICHE_IDS, resolveNicheId } from './public';
export type { NicheConfig, NicheId } from './types';

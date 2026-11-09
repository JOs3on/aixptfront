/**
 * Shared types for the multi-niche demo chatbots.
 *
 * `NichePublicConfig` is the only part that is bundled in the browser.
 * The full `NicheConfig` (with its system prompt and knowledge base) is
 * imported exclusively by the serverless function `api/chat.ts`.
 */

export type NicheId = 'dentaire' | 'concessionnaire' | 'hvac' | 'avocat';

export type NicheIcon = 'stethoscope' | 'car' | 'thermometer' | 'scale';

export interface NichePublicConfig {
  id: NicheId;
  /** Human readable industry label. */
  name: string;
  industry: string;
  /** Fallback brand shown when the URL does not contain a client name. */
  defaultClientTitle: string;
  /** First name of the virtual agent. */
  agentName: string;
  agentRole: string;
  icon: NicheIcon;
  /** First message rendered instantly in the widget, before any API call. */
  openingMessage: string;
  suggestedQuestions: string[];
  inputPlaceholder: string;
  /** Short line under the brand in the widget header. */
  availabilityLabel: string;
}

export interface KnowledgeBase {
  services: string[];
  faq: { question: string; answer: string }[];
  businessRules: string[];
  urgencyProtocols?: string[];
}

export interface NicheConfig extends NichePublicConfig {
  systemInstruction: string;
  knowledgeBase: KnowledgeBase;
}

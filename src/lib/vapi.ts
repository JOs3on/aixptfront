import Vapi from '@vapi-ai/web';
import type { NicheId } from '@/data/niches/types';

/**
 * Agent IDs and phone numbers are public demo assets: they are sent from the
 * browser to Vapi, so they are safe to keep here as fallbacks. Everything can
 * be overridden with VITE_* environment variables at build time.
 */
const PUBLIC_KEY_FALLBACK = '40619c43-35e4-4e4a-8fed-0034da186ccc';

const AGENT_FALLBACKS: Partial<Record<NicheId, string>> = {
  concessionnaire: '0d1624c4-4f3f-452f-9b4d-e3602fe83b1c',
  dentaire: '6e38ec29-794a-4740-8c1a-2096ccb5be8a',
  hvac: 'a3058292-b43f-4150-9f05-fc22d48bfa63',
};

const PHONE_FALLBACKS: Partial<Record<NicheId, string>> = {
  concessionnaire: '+14504893882',
  hvac: '+15818078332',
  // The dental line is intentionally blank until a dedicated number is assigned.
  // The browser voice demo still works with the dental assistant.
  dentaire: '',
};

const readEnv = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim() : '';

export const formatPhoneNumber = (phone: string) => {
  const digits = phone.replace(/[^\d]/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
};

export interface VapiDemoConfig {
  /** Vapi assistant launched in the browser and behind the phone line. */
  agentId: string;
  /** E.164 number assigned to the assistant, or '' when not provisioned. */
  phoneNumber: string;
  formattedPhoneNumber: string;
  /** True only when both the assistant and the phone line exist. */
  phoneEnabled: boolean;
}

const buildDemo = (agentId: string, phoneNumber: string): VapiDemoConfig => ({
  agentId,
  phoneNumber,
  formattedPhoneNumber: phoneNumber ? formatPhoneNumber(phoneNumber) : '',
  phoneEnabled: Boolean(agentId && phoneNumber),
});

export const VAPI_CONFIG = {
  publicKey: readEnv(import.meta.env.VITE_VAPI_PUBLIC_KEY) || PUBLIC_KEY_FALLBACK,
};

export const VAPI_DEMOS: Record<NicheId, VapiDemoConfig> = {
  concessionnaire: buildDemo(
    readEnv(import.meta.env.VITE_VAPI_CONCESSIONNAIRE_AGENT_ID) ||
      AGENT_FALLBACKS.concessionnaire!,
    readEnv(import.meta.env.VITE_DEMO_PHONE_CONCESSIONNAIRE) ||
      PHONE_FALLBACKS.concessionnaire!,
  ),
  dentaire: buildDemo(
    readEnv(import.meta.env.VITE_VAPI_DENTAIRE_AGENT_ID) || AGENT_FALLBACKS.dentaire!,
    readEnv(import.meta.env.VITE_DEMO_PHONE_DENTAIRE) || PHONE_FALLBACKS.dentaire!,
  ),
  hvac: buildDemo(
    readEnv(import.meta.env.VITE_VAPI_HVAC_AGENT_ID) || AGENT_FALLBACKS.hvac!,
    readEnv(import.meta.env.VITE_DEMO_PHONE_HVAC) || PHONE_FALLBACKS.hvac!,
  ),
  avocat: buildDemo(
    readEnv(import.meta.env.VITE_VAPI_AVOCAT_AGENT_ID),
    readEnv(import.meta.env.VITE_DEMO_PHONE_AVOCAT),
  ),
};

export function getVapiDemo(nicheId: NicheId): VapiDemoConfig {
  return VAPI_DEMOS[nicheId];
}

let vapiInstance: Vapi | null = null;

export function getVapiClient(): Vapi {
  if (!vapiInstance) {
    vapiInstance = new Vapi(VAPI_CONFIG.publicKey);
  }
  return vapiInstance;
}

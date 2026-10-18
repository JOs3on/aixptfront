import Vapi from '@vapi-ai/web';

export const VAPI_CONFIG = {
  publicKey: import.meta.env.VITE_VAPI_PUBLIC_KEY || '40619c43-35e4-4e4a-8fed-0034da186ccc',
  concessionnaireAgentId: import.meta.env.VITE_VAPI_CONCESSIONNAIRE_AGENT_ID || 'a2be3578-6644-4a2a-8057-57edbfd6ab54',
  phoneNumber: import.meta.env.VITE_DEMO_PHONE_NUMBER || '+15818078332',
  formattedPhoneNumber: '+1 (581) 807-8332',
};

let vapiInstance: Vapi | null = null;

export function getVapiClient(): Vapi {
  if (!vapiInstance) {
    vapiInstance = new Vapi(VAPI_CONFIG.publicKey);
  }
  return vapiInstance;
}

import { useEffect } from 'react';

declare global {
  interface Window {
    voiceflow: any;
  }
}

export const VoiceflowWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '67e4543319c28c2b0898f9b4' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: {
          url: "https://runtime-api.voiceflow.com"
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove script and widget if possible
      // Voiceflow widget is hard to completely remove from DOM automatically without their SDK destroy method
      // but hiding it is a good fallback
      const widget = document.getElementById('voiceflow-chat-frame') || document.querySelector('.v-chat-widget');
      if (widget) {
        (widget as HTMLElement).style.display = 'none';
      }
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

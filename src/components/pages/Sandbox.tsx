import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Copy, Check, MessageSquare, MousePointerClick, Zap, Car, Activity, Flame } from 'lucide-react';

declare global {
  interface Window {
    voiceflow: any;
  }
}

export const Sandbox: React.FC = () => {
  const { clientName } = useParams<{ clientName?: string }>();
  const [copied, setCopied] = useState(false);
  
  // Format the raw clientName from URL
  const formattedClientName = clientName 
    ? clientName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  // Detect if the loaded URL has dealership/automotive keywords
  const isDealershipRoute = clientName 
    ? (clientName.toLowerCase().includes('concessionnaire') || 
       clientName.toLowerCase().includes('auto') || 
       clientName.toLowerCase().includes('garage') || 
       clientName.toLowerCase().includes('car') ||
       clientName.toLowerCase().includes('dealership') ||
       clientName.toLowerCase().includes('vehicule') ||
       clientName.toLowerCase().includes('concession'))
    : false;

  // Detect if the loaded URL has HVAC/CVC/technician keywords
  const isHVACRoute = clientName 
    ? (clientName.toLowerCase().includes('hvac') || 
       clientName.toLowerCase().includes('cvc') || 
       clientName.toLowerCase().includes('chauffage') || 
       clientName.toLowerCase().includes('climatisation') ||
       clientName.toLowerCase().includes('thermopompe') ||
       clientName.toLowerCase().includes('plomberie') ||
       clientName.toLowerCase().includes('technicien'))
    : false;

  // Set active industry tab (pre-selected based on URL path context, defaults to dentaire)
  const [activeTab, setActiveTab] = useState<'dentaire' | 'concessionnaire' | 'hvac'>(
    isDealershipRoute ? 'concessionnaire' : isHVACRoute ? 'hvac' : 'dentaire'
  );

  // Dynamically resolve titles and instruction content based on active industry tab
  const content = {
    dentaire: {
      clientName: formattedClientName || 'Votre Clinique',
      intro: "Pour tester comment éliminer l'attente liée aux formulaires le soir et la fin de semaine, suivez ces étapes :",
      question: "J'ai une urgence dentaire et j'ai très mal. Quelle est votre prochaine disponibilité ?",
      step3: "Laissez l'assistant vous guider. Répondez naturellement à ses questions (vous pouvez entrer un courriel ou numéro fictif) pour voir comment il collecte les informations et finalise la prise de rendez-vous de A à Z.",
      observation: "Remarquez comment le système gère tout l'échange et confirme la prise en charge sans qu'un humain n'ait à intervenir."
    },
    concessionnaire: {
      clientName: formattedClientName || 'Nom du concessionnaire',
      intro: "Pour tester comment garder l'élan d'un acheteur le soir, suivez ces étapes :",
      question: "Je regarde le VUS noir sur votre page, est-il toujours sur la cour en ce moment ?",
      step3: "Laissez l'assistant répondre et vous guider (vous pouvez utiliser des fausses coordonnées s'il en demande pour réserver une visite).",
      observation: "Remarquez comment il répond d'abord à la question pour garder l'attention du client, au lieu d'exiger un formulaire avant de donner l'information."
    },
    hvac: {
      clientName: formattedClientName || "Nom de l'entreprise",
      intro: "Pour tester comment éliminer l'incertitude d'un client qui a une urgence technique le soir ou la fin de semaine, suivez ces étapes :",
      question: "Ma thermopompe/climatisation vient de lâcher complètement, c'est une urgence. Avez-vous un technicien qui peut passer rapidement ?",
      step3: "Laissez l'assistant prendre le relais. Donnez-lui une ville (ou adresse) et de fausses coordonnées lorsqu'il les demande pour préparer le dossier du technicien.",
      observation: "Remarquez comment l'assistant ne se contente pas de prendre un message : il qualifie la zone de déplacement, puis consulte l'horaire pour confirmer instantanément qu'un technicien peut être dispatché à un moment précis, éliminant ainsi l'attente angoissante pour le client."
    }
  }[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(content.question);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Dynamic loading of Voiceflow embed script ONLY on the Sandbox page
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.onload = () => {
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: '69f8ba943ee4fb7bf5d64a8f' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          },
          assistant: {
            stylesheet: '/voiceflow.css'
          }
        });
      }
    };
    document.body.appendChild(script);

    // Cleanup: remove script and Voiceflow widget elements when navigating away
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // Clean up DOM elements generated by Voiceflow widget
      const widgetFrame = document.getElementById('voiceflow-chat-frame');
      if (widgetFrame) {
        widgetFrame.remove();
      }
      const shadowHost = document.querySelector('div[id^="voiceflow-chat-"]');
      if (shadowHost) {
        shadowHost.remove();
      }
      const chatWidget = document.querySelector('.v-chat-widget');
      if (chatWidget) {
        (chatWidget as HTMLElement).remove();
      }
      // Delete global voiceflow object
      if (window.voiceflow) {
        try {
          delete window.voiceflow;
        } catch (e) {
          window.voiceflow = undefined;
        }
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Sandbox | {content.clientName}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Metallic Grey Background - Padded at the top to clear the navigation bar */}
      <div className="min-h-screen bg-[#121212] flex items-center justify-center relative overflow-hidden font-sans pt-28 pb-16">
        
        {/* Brushed Metal Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
        
        {/* Subtle Light Reflection */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Main Content Area - Center aligned and padded */}
        <div className="w-full px-4 sm:px-8 md:px-16 flex items-center justify-center h-full relative z-10">
          
          {/* Instruction Card - Dark Metallic Style */}
          <div className="w-full max-w-[54rem]">
            
            <div className="backdrop-blur-2xl bg-zinc-900/80 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-6 sm:p-10 md:p-12 relative overflow-hidden group">
              
              {/* Metallic Shine Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

              {/* Status Header */}
              <div className="inline-flex items-center space-x-2 bg-zinc-800/80 border border-white/5 px-4 py-1.5 rounded-full mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                  Environnement de test : {content.clientName}
                </span>
              </div>

              {/* Industry Switcher Tabs */}
              <div className="flex flex-col md:flex-row p-1 bg-black/40 border border-white/10 rounded-2xl mb-8 max-w-2xl mx-auto gap-1 md:gap-0">
                <button
                  onClick={() => setActiveTab('dentaire')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeTab === 'dentaire'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Activity className="w-4 h-4 flex-shrink-0" />
                  <span>Clinique Dentaire</span>
                </button>
                <button
                  onClick={() => setActiveTab('concessionnaire')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeTab === 'concessionnaire'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Car className="w-4 h-4 flex-shrink-0" />
                  <span>Concessionnaire Auto</span>
                </button>
                <button
                  onClick={() => setActiveTab('hvac')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeTab === 'hvac'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Flame className="w-4 h-4 flex-shrink-0" />
                  <span>CVC / Thermopompe</span>
                </button>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                {content.clientName}
              </h1>

              <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-light">
                {content.intro}
              </p>

              {/* Steps */}
              <div className="space-y-6 mb-12">
                {/* Step 1 */}
                <div className="flex items-start space-x-5 bg-white/[0.03] p-5 rounded-3xl border border-white/[0.05] hover:bg-white/[0.05] transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center text-blue-400 font-bold shadow-lg">
                    1
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-1 flex items-center text-base">
                      Ouvrez l'assistant
                      <MousePointerClick className="w-4 h-4 ml-2 text-zinc-500" />
                    </h3>
                    <p className="text-zinc-500 text-sm">Cliquez sur la bulle en bas à droite.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-5 bg-white/[0.03] p-5 rounded-3xl border border-white/[0.05] hover:bg-white/[0.05] transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center text-blue-400 font-bold shadow-lg">
                    2
                  </div>
                  <div className="pt-1 flex-1">
                    <h3 className="text-white font-semibold mb-3 flex items-center text-base">
                      Démarrez la conversation
                      <MessageSquare className="w-4 h-4 ml-2 text-zinc-500" />
                    </h3>
                    
                    <p className="text-zinc-500 text-sm mb-3">En copiant-collant ceci :</p>
                    
                    <div className="relative group/copy">
                      <div className="bg-black/40 border border-white/10 rounded-2xl p-4 pr-16 transition-all duration-300 group-hover/copy:border-blue-500/30 shadow-inner min-h-[4rem] flex items-center">
                        <code className="text-sm text-zinc-300 block leading-relaxed italic">
                          "{content.question}"
                        </code>
                      </div>
                      
                      <button 
                         onClick={handleCopy}
                         className="absolute right-2 bottom-2 flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-xl transition-all duration-300 shadow-lg active:scale-95 group/btn"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden md:inline">Copié</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 absolute" />
                            <Copy className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden md:inline">Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-5 bg-white/[0.03] p-5 rounded-3xl border border-white/[0.05] hover:bg-white/[0.05] transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center text-blue-400 font-bold shadow-lg">
                    3
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-1 flex items-center text-base">
                      Jouez le jeu
                      <Zap className="w-4 h-4 ml-2 text-zinc-500" />
                    </h3>
                    <p className="text-zinc-500 text-sm">{content.step3}</p>
                  </div>
                </div>
              </div>

              {/* Observation Section - Metallic Accent */}
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-[2rem] p-8 border border-white/5 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] rotate-12">
                  <Zap className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-4">Ce qu'il faut observer :</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">
                    {content.observation}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

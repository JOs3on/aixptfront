import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw,
  Headphones,
  CheckCircle2,
  Calendar,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { getVapiClient, VAPI_CONFIG } from '../../lib/vapi';
import { Button } from '../ui/button';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  time?: string;
}

interface VapiVoiceDemoProps {
  onOpenConsultation?: () => void;
  agentId?: string;
  clientTitle?: string;
}

const SUGGESTED_QUESTIONS = [
  "Avez-vous le VUS 2023 toujours disponible ?",
  "Est-ce possible de réserver un essai routier samedi ?",
  "Quelles sont vos heures d'ouverture aujourd'hui ?",
  "Reprenez-vous mon ancien véhicule en échange ?"
];

const FALLBACK_TRANSCRIPT: { role: 'caller' | 'agent'; text: string; time: string }[] = [
  { role: 'caller', text: "Bonjour, j'aimerais savoir si le VUS noir 2023 est toujours disponible pour un essai routier ?", time: "00:03" },
  { role: 'agent', text: "Bonjour ! Oui, le VUS 2023 est actuellement en concession et prêt pour un essai. À quel moment préférez-vous passer ?", time: "00:12" },
  { role: 'caller', text: "Ce samedi vers 11 h, est-ce que ce serait possible ?", time: "00:20" },
  { role: 'agent', text: "Parfait pour samedi à 11 h 00. Afin de préparer le véhicule et vous assigner un conseiller, puis-je avoir votre prénom et numéro de cellulaire ?", time: "00:32" },
  { role: 'caller', text: "Marc Tremblay, 514-555-0199.", time: "00:39" },
  { role: 'agent', text: "C'est noté M. Tremblay ! Votre essai routier est confirmé pour samedi 11 h. La confirmation arrive par texto. À samedi !", time: "00:44" }
];

export const VapiVoiceDemo: React.FC<VapiVoiceDemoProps> = ({
  onOpenConsultation,
  agentId = VAPI_CONFIG.concessionnaireAgentId,
  clientTitle = "Concession Automobile — Démo IA"
}) => {
  // Call state
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Conversation history
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Bonjour ! Je suis l'assistante virtuelle de la concession. Comment puis-je vous aider aujourd'hui ?",
      time: "Maintenant"
    }
  ]);
  const [textInput, setTextInput] = useState('');
  const [isSendingText, setIsSendingText] = useState(false);

  // Fallback Audio Player State
  const [isPlayingFallback, setIsPlayingFallback] = useState(false);
  const [fallbackTime, setFallbackTime] = useState(0);
  const fallbackDuration = 45; // 45 seconds

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Call timer
  useEffect(() => {
    if (callStatus === 'connected') {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callStatus]);

  // Vapi event listeners
  useEffect(() => {
    const vapi = getVapiClient();

    const handleCallStart = () => {
      setCallStatus('connected');
      setErrorMessage(null);
    };

    const handleCallEnd = () => {
      setCallStatus('idle');
      setIsAssistantSpeaking(false);
      setVolumeLevel(0);
    };

    const handleSpeechStart = () => {
      setIsAssistantSpeaking(true);
    };

    const handleSpeechEnd = () => {
      setIsAssistantSpeaking(false);
    };

    const handleVolumeLevel = (volume: number) => {
      setVolumeLevel(volume);
    };

    const handleMessage = (msg: any) => {
      if (msg.type === 'transcript') {
        const role = msg.role === 'assistant' ? 'assistant' : 'user';
        const transcriptText = msg.transcript;
        
        if (msg.transcriptType === 'final' && transcriptText?.trim()) {
          const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setMessages((prev) => {
            // Avoid duplicate identical consecutive messages
            const last = prev[prev.length - 1];
            if (last && last.role === role && last.content.trim() === transcriptText.trim()) {
              return prev;
            }
            return [...prev, { role, content: transcriptText, time: now }];
          });
        }
      }
    };

    const handleError = (error: any) => {
      console.error('Vapi error:', error);
      setErrorMessage(
        typeof error === 'string' 
          ? error 
          : error?.message || "Erreur de connexion. Vous pouvez poser une question par texte ou composer le numéro direct."
      );
      setCallStatus('idle');
    };

    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('volume-level', handleVolumeLevel);
    vapi.on('message', handleMessage);
    vapi.on('error', handleError);

    return () => {
      vapi.stop();
      vapi.removeAllListeners();
    };
  }, []);

  // Format timer seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start WebRTC Call
  const startCall = async (initialMuted = false) => {
    try {
      setErrorMessage(null);
      setCallStatus('connecting');
      const vapi = getVapiClient();
      await vapi.start(agentId);
      if (initialMuted) {
        vapi.setMuted(true);
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    } catch (err: any) {
      console.error('Failed to start call:', err);
      setErrorMessage("Microphone non disponible. Vous pouvez poser une question par écrit ci-dessous.");
      setCallStatus('idle');
    }
  };

  // End WebRTC Call
  const endCall = () => {
    const vapi = getVapiClient();
    vapi.stop();
    setCallStatus('idle');
    setIsAssistantSpeaking(false);
    setVolumeLevel(0);
  };

  // Toggle Mute
  const toggleMute = () => {
    const vapi = getVapiClient();
    const newMuted = !isMuted;
    vapi.setMuted(newMuted);
    setIsMuted(newMuted);
  };

  // Send Text Question -> Agent speaks back!
  const handleSendText = async (textToSend?: string) => {
    const query = (textToSend || textInput).trim();
    if (!query) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { role: 'user', content: query, time: now }]);
    setTextInput('');
    setIsSendingText(true);

    try {
      const vapi = getVapiClient();

      // If call is not yet connected, initiate call in muted mode first so user doesn't have to speak
      if (callStatus !== 'connected') {
        setCallStatus('connecting');
        await vapi.start(agentId);
        vapi.setMuted(true);
        setIsMuted(true);
      }

      // Send the text into the active conversation session
      vapi.send({
        type: 'add-message',
        message: {
          role: 'user',
          content: query
        },
        triggerResponseEnabled: true
      });
    } catch (err: any) {
      console.error('Failed to send text message to Vapi:', err);
      setErrorMessage("Impossible d'envoyer le message. Vous pouvez lancer l'appel direct.");
    } finally {
      setIsSendingText(false);
    }
  };

  // Fallback Audio Simulation (synthetic preview of the 45s audio)
  const toggleFallbackAudio = () => {
    if (isPlayingFallback) {
      if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
      setIsPlayingFallback(false);
    } else {
      setIsPlayingFallback(true);
      fallbackTimerRef.current = setInterval(() => {
        setFallbackTime((prev) => {
          if (prev >= fallbackDuration) {
            if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
            setIsPlayingFallback(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const resetFallbackAudio = () => {
    if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
    setIsPlayingFallback(false);
    setFallbackTime(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner / Headline */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-brand mb-4">
          <Sparkles className="w-3.5 h-3.5 text-brand" />
          Prototype Voix IA 24/7 en Direct
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Testez l'Assistante Vocale en Direct
        </h2>
        <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez comment notre réceptionniste IA répond instantanément, qualifie l'intention d'achat et réserve des essais routiers sans aucun humain.
        </p>
      </div>

      {/* Main Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive Virtual Phone Console (7 cols) */}
        <div className="lg:col-span-7 relative">
          <div className="relative rounded-[2.5rem] border border-white/10 bg-[#15151a] p-4 shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
            
            {/* Phone Screen Container */}
            <div className="relative rounded-[2rem] bg-gradient-to-b from-[#181820] to-[#0d0d12] border border-white/5 p-6 overflow-hidden">
              
              {/* Top Notch & Status */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                  </span>
                  <span className="font-medium text-emerald-400">Agent en Ligne</span>
                </div>
                <div className="font-mono text-[11px] text-zinc-400">
                  {callStatus === 'connected' ? (
                    <span className="text-brand font-semibold">{formatTime(callDuration)}</span>
                  ) : (
                    <span>Ligne Dédiée</span>
                  )}
                </div>
              </div>

              {/* Agent Identity Header */}
              <div className="text-center mb-6">
                <div className="relative mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9a6bff] to-[#7a4bff] shadow-[0_8px_24px_rgba(154,107,255,0.4)]">
                  <Phone className="h-8 w-8 text-white" />
                  {isAssistantSpeaking && (
                    <span className="absolute -inset-1 rounded-2xl border-2 border-brand animate-pulse pointer-events-none" />
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-white">{clientTitle}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Réceptionniste Virtuelle Spécialisée en Concession
                </p>
              </div>

              {/* Live Waveform & Speaking Status */}
              <div className="h-14 flex flex-col items-center justify-center mb-6">
                {callStatus === 'connected' ? (
                  <>
                    <div className="flex items-center gap-1.5 h-8">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => {
                        // Dynamically calculate wave height based on Vapi volume level
                        const dynamicHeight = isAssistantSpeaking
                          ? Math.max(8, Math.min(32, (volumeLevel * 100) * (1 + (bar % 3) * 0.4)))
                          : 8;
                        return (
                          <motion.span
                            key={bar}
                            className={`w-1.5 rounded-full ${
                              isAssistantSpeaking
                                ? 'bg-gradient-to-t from-[#9a6bff] to-[#c4a6ff]'
                                : 'bg-zinc-700'
                            }`}
                            animate={{ height: dynamicHeight }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[11px] text-zinc-400 mt-2">
                      {isAssistantSpeaking ? "L'assistante vous répond..." : isMuted ? "Micro coupé — Vous pouvez parler ou taper" : "À votre écoute — Parlez ou posez une question"}
                    </span>
                  </>
                ) : (
                  <div className="text-center text-xs text-muted-foreground">
                    Cliquez sur le bouton ci-dessous pour démarrer l'appel avec le micro de votre appareil.
                  </div>
                )}
              </div>

              {/* Main Call Action Buttons */}
              <div className="flex items-center justify-center gap-4 mb-6">
                {callStatus === 'idle' && (
                  <Button
                    onClick={() => startCall(false)}
                    className="w-full max-w-xs rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-600 transition-all hover:scale-[1.02]"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Démarrer l'Appel en Direct
                  </Button>
                )}

                {callStatus === 'connecting' && (
                  <Button
                    disabled
                    className="w-full max-w-xs rounded-full bg-zinc-800 py-6 text-base font-semibold text-zinc-300"
                  >
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                    Connexion en cours...
                  </Button>
                )}

                {callStatus === 'connected' && (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleMute}
                      className={`h-12 w-12 rounded-full border-white/10 ${
                        isMuted 
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                          : 'bg-zinc-800 text-white hover:bg-zinc-700'
                      }`}
                      title={isMuted ? "Réactiver le micro" : "Couper le micro"}
                    >
                      {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>

                    <Button
                      onClick={endCall}
                      className="rounded-full bg-red-600 px-6 py-6 text-sm font-semibold text-white hover:bg-red-700 shadow-lg shadow-red-600/30"
                    >
                      <PhoneOff className="mr-2 h-5 w-5" />
                      Terminer l'Appel
                    </Button>
                  </div>
                )}
              </div>

              {/* Error Notice */}
              {errorMessage && (
                <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Live Transcript Bubble Box */}
              <div className="rounded-xl border border-white/5 bg-black/40 p-3 max-h-48 overflow-y-auto space-y-2.5 text-xs">
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-b border-white/5 pb-1">
                  Transcription en direct
                </div>
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`rounded-2xl px-3.5 py-2 max-w-[85%] leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-brand text-white rounded-tr-none'
                          : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-white/5'
                      }`}
                    >
                      {m.content}
                    </div>
                    {m.time && (
                      <span className="text-[9px] text-zinc-500 mt-1 px-1">{m.time}</span>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Text Input Option ("Or type a question and agent speaks") */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 mb-2 text-[11px] text-zinc-400">
                  <MessageSquare className="w-3.5 h-3.5 text-brand" />
                  <span>Vous préférez taper ? L'agent répondra à voix haute :</span>
                </div>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendText();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Ex: Avez-vous le VUS noir disponible samedi ?"
                    className="flex-1 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand"
                  />
                  <Button
                    type="submit"
                    disabled={!textInput.trim() || isSendingText}
                    className="rounded-xl bg-brand px-3 py-2 text-xs font-semibold text-white hover:bg-brand-hover"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>

                {/* Prompt suggestions pills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendText(q)}
                      className="rounded-full border border-white/5 bg-zinc-800/60 hover:bg-brand/20 hover:border-brand/40 px-2.5 py-1 text-[10px] text-zinc-300 transition-colors"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Twilio Direct Phone + 45s Pre-recorded Fallback + Meeting Bridge (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Option 2: Real Phone Call via Twilio */}
          <div className="rounded-2xl border border-white/10 bg-[#15151a] p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-brand">
              <Phone className="w-3.5 h-3.5" />
              Testez depuis votre Cellulaire
            </div>
            
            <h4 className="font-display text-lg font-bold text-white mb-2">
              Composez le Numéro Direct
            </h4>
            
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Vous voulez entendre exactement comment sonne l'agent sur le réseau téléphonique québécois ?
            </p>

            <a
              href={`tel:${VAPI_CONFIG.phoneNumber}`}
              className="flex items-center justify-between rounded-xl border border-brand/30 bg-brand/10 hover:bg-brand/20 p-3.5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ligne directe (sans attente)</div>
                  <div className="font-mono text-base font-bold text-white group-hover:text-brand transition-colors">
                    {VAPI_CONFIG.formattedPhoneNumber}
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand">Appeler →</span>
            </a>
          </div>

          {/* Option 3: Fallback Audio Extrait 45s */}
          <div className="rounded-2xl border border-white/10 bg-[#15151a] p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
              <Headphones className="w-3.5 h-3.5 text-brand" />
              Proof Proxy — Sans Téléchargement
            </div>

            <h4 className="font-display text-lg font-bold text-white mb-1">
              Extrait d'un Appel Type (45 s)
            </h4>

            <p className="text-xs text-muted-foreground mb-4">
              Écoutez la qualification complète d'un client samedi matin sans activer votre micro.
            </p>

            {/* Audio Player Bar */}
            <div className="rounded-xl border border-white/5 bg-zinc-900 p-4">
              <div className="flex items-center justify-between gap-4 mb-2">
                <Button
                  onClick={toggleFallbackAudio}
                  size="icon"
                  className="h-10 w-10 rounded-full bg-brand hover:bg-brand-hover text-white flex-shrink-0"
                >
                  {isPlayingFallback ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </Button>

                {/* Progress bar */}
                <div className="flex-1">
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand to-[#c4a6ff] transition-all duration-300"
                      style={{ width: `${(fallbackTime / fallbackDuration) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                    <span>{formatTime(fallbackTime)}</span>
                    <span>{formatTime(fallbackDuration)}</span>
                  </div>
                </div>

                <Button
                  onClick={resetFallbackAudio}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-white"
                  title="Recommencer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Script dialogue sample */}
              <div className="mt-3 text-[11px] text-zinc-400 space-y-1.5 border-t border-white/5 pt-3">
                <div className="font-medium text-white text-xs mb-1">Scénario de l'extrait :</div>
                <div>• Le client demande la disponibilité d'un VUS 2023.</div>
                <div>• L'IA confirme l'inventaire et qualifie l'heure de visite.</div>
                <div>• Prise de rendez-vous confirmée avec coordonnées et SMS.</div>
              </div>
            </div>
          </div>

          {/* Bridge to Appointment / Next Step */}
          <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/15 to-transparent p-6 text-center">
            <h4 className="font-display text-lg font-bold text-white mb-2">
              Curieux de voir ce que ça donnerait sur vos appels ?
            </h4>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Pas de pitch de vente. On prend 15 minutes pour analyser comment vos appels du soir, du samedi et de débordement sont gérés actuellement — et voir si boucher ces fuites a un sens économique pour votre entreprise.
            </p>
            <Button
              onClick={onOpenConsultation}
              className="w-full rounded-full bg-brand py-5 text-sm font-semibold text-white shadow-lg shadow-brand/30 hover:bg-brand-hover"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Évaluer la faisabilité (15 min)
            </Button>
            <p className="text-[10px] text-zinc-500 mt-2.5">
              15 minutes chrono · Sans engagement · Analyse de vos flux actuels
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

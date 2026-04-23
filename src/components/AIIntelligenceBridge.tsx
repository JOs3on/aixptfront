import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, MessageSquare, Phone, Database,
    Cpu, Zap, BarChart3, Clock, CheckCircle2,
    Lock, Globe, BrainCircuit, Sparkles
} from 'lucide-react';

/**
 * AIIntelligenceBridge Component
 * 
 * An advanced visualization representing the "Intelligence Bridge" of an AI Agency.
 * Transitions from "Raw/Unstructured Data" (Chaos) to "AI Processing" (Synthesis) 
 * and finally "Strategic Value" (ROI).
 */
const AIIntelligenceBridge: React.FC = () => {
    const [isAIActive, setIsAIActive] = useState(true);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center gap-16 font-sans overflow-hidden bg-[#fafafa]">

            {/* 1. STRATEGIC HEADER */}
            <div className="text-center space-y-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest"
                >
                    <Sparkles size={14} /> Optimization de Flux
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                    De la donnée brute à <br />
                    l'intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">décisionnelle</span>
                </h2>
                <p className="text-slate-500 text-xl font-medium">
                    Transformez le chaos opérationnel en moteurs de croissance automatisés.
                </p>
            </div>

            {/* 2. THE INTELLIGENCE TOGGLE (Premium UI) */}
            <div className="flex items-center justify-center gap-8 select-none z-50">
                <label className="flex items-center gap-4 cursor-pointer group">
                    <span className={`text-sm font-bold uppercase tracking-widest transition-all duration-500 ${!isAIActive ? 'text-slate-900' : 'text-slate-300'}`}>
                        Audit Manuel
                    </span>
                    <div
                        className="relative w-20 h-10 rounded-full p-1 transition-all duration-700 ease-in-out shadow-inner"
                        style={{
                            backgroundColor: isAIActive ? '#6366f1' : '#e2e8f0',
                            boxShadow: isAIActive ? '0 0 20px rgba(99, 102, 241, 0.3)' : 'none'
                        }}
                        onClick={() => setIsAIActive(!isAIActive)}
                    >
                        <motion.div
                            className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-indigo-600"
                            animate={{ x: isAIActive ? 40 : 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                            {isAIActive ? <Zap size={16} fill="currentColor" /> : <Clock size={16} />}
                        </motion.div>
                    </div>
                    <span className={`text-sm font-bold uppercase tracking-widest transition-all duration-500 ${isAIActive ? 'text-indigo-600' : 'text-slate-300'}`}>
                        Intelligence AIXPT
                    </span>
                </label>
            </div>

            {/* 3. THE BRIDGE VISUALIZATION */}
            <div className="relative w-full min-h-[500px] flex items-center justify-between mt-12 px-12">

                {/* Connection Lines & Neural Pulses */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 1200 500" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={isAIActive ? "#818cf8" : "#94a3b8"} stopOpacity="0" />
                                <stop offset="50%" stopColor={isAIActive ? "#818cf8" : "#94a3b8"} stopOpacity="0.5" />
                                <stop offset="100%" stopColor={isAIActive ? "#22d3ee" : "#94a3b8"} stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Input to Core Paths */}
                        {[80, 160, 240, 320, 400].map((y, i) => (
                            <g key={`flow-${i}`}>
                                <motion.path
                                    d={`M 250 ${y} C 450 ${y}, 400 250, 600 250`}
                                    fill="transparent"
                                    stroke="url(#lineGrad)"
                                    strokeWidth={isAIActive ? "2" : "1"}
                                    initial={{ pathLength: 0, opacity: 0.2 }}
                                    animate={{
                                        pathLength: 1,
                                        opacity: isAIActive ? 0.8 : 0.1,
                                        strokeWidth: isAIActive ? 2 : 1
                                    }}
                                    transition={{ duration: 1.5, delay: i * 0.1 }}
                                />
                                {isAIActive && (
                                    <motion.circle r="3" fill="#818cf8">
                                        <animateMotion
                                            path={`M 250 ${y} C 450 ${y}, 400 250, 600 250`}
                                            dur={`${2 + i * 0.5}s`}
                                            repeatCount="indefinite"
                                        />
                                    </motion.circle>
                                )}
                            </g>
                        ))}

                        {/* Core to Output Paths */}
                        {[150, 250, 350].map((y, i) => (
                            <g key={`output-flow-${i}`}>
                                <motion.path
                                    d={`M 600 250 C 750 250, 800 ${y}, 950 ${y}`}
                                    fill="transparent"
                                    stroke="url(#lineGrad)"
                                    strokeWidth={isAIActive ? "3" : "1"}
                                    animate={{
                                        opacity: isAIActive ? 1 : 0.05,
                                        strokeDasharray: isAIActive ? "0 0" : "5 5"
                                    }}
                                />
                            </g>
                        ))}
                    </svg>
                </div>

                {/* LEFT COMPONENT: RAW INPUTS */}
                <div className="z-10 w-72 space-y-4">
                    <InputSource icon={<FileText />} label="Documents PDF" desc="Contrats & Factures" active={isAIActive} delay={0.1} />
                    <InputSource icon={<MessageSquare />} label="Flux Omnicanal" desc="Tickets & Chats" active={isAIActive} delay={0.2} />
                    <InputSource icon={<Phone />} label="Appels Vocaux" desc="Enregistrements SAV" active={isAIActive} delay={0.3} />
                    <InputSource icon={<Database />} label="Legacy ERP" desc="Données Silos" active={isAIActive} delay={0.4} />
                </div>

                {/* CENTER COMPONENT: THE INTELLIGENCE CORE */}
                <div className="z-20 relative px-12 group">
                    <motion.div
                        className="relative w-48 h-48 rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
                        animate={{
                            scale: isAIActive ? 1.05 : 0.9,
                            boxShadow: isAIActive ?
                                ['0 0 20px rgba(99,102,241,0.2)', '0 0 60px rgba(99,102,241,0.4)', '0 0 20px rgba(99,102,241,0.2)'] :
                                '0 0 0px rgba(0,0,0,0)'
                        }}
                        transition={{
                            boxShadow: { duration: 3, repeat: Infinity },
                            scale: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                    >
                        {/* Background Glass Effects */}
                        <div className={`absolute inset-0 transition-all duration-1000 ${isAIActive ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 opacity-90 rotate-45 scale-110' : 'bg-slate-200'}`} />
                        <div className="absolute inset-2 bg-white/10 backdrop-blur-3xl rounded-full border border-white/30" />

                        {/* Neural Web Animation (Only shows when active) */}
                        {isAIActive && (
                            <motion.div
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute top-1/2 left-1/2 w-full h-[1px] bg-white/20 origin-left"
                                        style={{ rotate: `${i * 60}deg` }}
                                        animate={{ opacity: [0.1, 0.5, 0.1] }}
                                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                                    />
                                ))}
                            </motion.div>
                        )}

                        <div className="relative z-10 text-white flex flex-col items-center">
                            <motion.div
                                animate={{ rotate: isAIActive ? 360 : 0 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <Cpu size={56} className={isAIActive ? 'drop-shadow-glow' : 'text-slate-400'} />
                            </motion.div>
                            <AnimatePresence>
                                {isAIActive && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-[10px] font-black uppercase tracking-[0.2em] mt-2"
                                    >
                                        Processing...
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Core Labels */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                        <span className={`text-sm font-black uppercase tracking-widest transition-colors duration-500 ${isAIActive ? 'text-slate-900' : 'text-slate-400'}`}>
                            Intelligence Core
                        </span>
                    </div>
                </div>

                {/* RIGHT COMPONENT: STRATEGIC OUTPUTS */}
                <div className="z-10 w-80 relative h-[450px]">
                    <AnimatePresence mode="wait">
                        {isAIActive ? (
                            <motion.div
                                key="ai-output"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4 h-full flex flex-col justify-center"
                            >
                                <OutputCard
                                    title="Insights Décisionnels"
                                    value="+42% de marge"
                                    icon={<BarChart3 />}
                                    color="bg-indigo-500"
                                    delay={0.1}
                                />
                                <OutputCard
                                    title="Temps de Réponse"
                                    value="< 2.4 secondes"
                                    icon={<Zap />}
                                    color="bg-cyan-500"
                                    delay={0.2}
                                />
                                <OutputCard
                                    title="Précision Technique"
                                    value="99.8% certifié"
                                    icon={<CheckCircle2 />}
                                    color="bg-emerald-500"
                                    delay={0.3}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="manual-output"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200"
                            >
                                <Lock className="text-slate-300 mb-4" size={48} />
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest text-center">
                                    Potentiel Inexploité
                                </p>
                                <div className="mt-6 w-full space-y-2">
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-slate-300"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "15%" }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-slate-300 font-bold uppercase italic">Efficiency: 15%</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* 4. PERFORMANCE METRICS FOOTER */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full pt-12 border-t border-slate-100">
                <Metric label="Clients Heureux" value="500+" icon={<Globe size={18} />} />
                <Metric label="Erreurs Réduites" value="95%" icon={<BrainCircuit size={18} />} />
                <Metric label="Scalabilité" value="∞ Infra" icon={<Zap size={18} />} />
                <Metric label="Sécurité" value="Chiffré" icon={<Lock size={18} />} />
            </div>

        </div>
    );
};

// Helper Components
const InputSource = ({ icon, label, desc, active, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
            opacity: active ? 1 : 0.4,
            x: 0,
            scale: active ? 1 : 0.95,
            filter: active ? 'grayscale(0%)' : 'grayscale(100%)'
        }}
        transition={{ delay, duration: 0.5 }}
        className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${active ? 'bg-white shadow-lg border border-indigo-50' : 'bg-transparent border border-slate-100'}`}
    >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
            {React.cloneElement(icon, { size: 20 })}
        </div>
        <div>
            <h4 className={`text-sm font-black uppercase tracking-tight leading-none ${active ? 'text-slate-900' : 'text-slate-400'}`}>{label}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 italic">{desc}</p>
        </div>
    </motion.div>
);

const OutputCard = ({ title, value, icon, color, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.6, type: "spring" }}
        className="bg-white p-5 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center gap-5 relative overflow-hidden group"
    >
        <div className="absolute top-0 right-0 p-2 opacity-5 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
            {React.cloneElement(icon, { size: 80 })}
        </div>
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-current/20`}>
            {React.cloneElement(icon, { size: 28 })}
        </div>
        <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
            <h3 className="text-xl font-black text-slate-900">{value}</h3>
        </div>
    </motion.div>
);

const Metric = ({ label, value, icon }: any) => (
    <div className="flex items-center gap-4 py-2 opacity-70 hover:opacity-100 transition-opacity">
        <div className="text-indigo-400">
            {icon}
        </div>
        <div>
            <p className="text-xl font-black text-slate-900 leading-none mb-1">{value}</p>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">{label}</p>
        </div>
    </div>
);

export default AIIntelligenceBridge;

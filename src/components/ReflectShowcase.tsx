import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database, Users, Briefcase,
    Settings, Layers, Target, TrendingUp, PieChart
} from 'lucide-react';

/**
 * ReflectShowcase Component
 * 
 * Replicates the "Sans Reflect" vs "Avec Reflect" comparison component 
 * from getreflect.io with 1:1 DOM structure and premium animations.
 */
const ReflectShowcase: React.FC = () => {
    const [isActive, setIsActive] = useState(true);

    // Toggle switch configuration
    const toggleState = () => setIsActive(!isActive);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-16 flex flex-col items-center gap-12 font-sans overflow-hidden">

            {/* 1. HEADER SECTION */}
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                    Vos données RH centralisées <br />
                    dans une unique <span className="text-indigo-400 relative">
                        source de vérité
                        <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="transparent" />
                        </svg>
                    </span>
                </h2>
                <p className="text-gray-500 text-lg">Centralisez, fiabilisez et visualisez vos données.</p>
            </div>

            {/* 2. TOGGLE COMPONENT (1:1 Logic) */}
            <div className="flex items-center justify-center gap-6 select-none">
                <span
                    className={`text-base font-medium transition-all duration-300 ${!isActive ? 'text-gray-900 opacity-100' : 'text-gray-400 opacity-25'}`}
                    onClick={() => setIsActive(false)}
                    role="button"
                >
                    Sans Reflect
                </span>

                <div
                    className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors duration-300 p-1 flex items-center ${isActive ? 'bg-indigo-100' : 'bg-red-100'
                        }`}
                    onClick={toggleState}
                    id="integration-toggle"
                >
                    <motion.div
                        className={`w-5 h-5 rounded-full shadow-sm bg-white border-2 ${isActive ? 'border-indigo-400' : 'border-red-400'
                            }`}
                        animate={{ x: isActive ? 28 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                </div>

                <span
                    className={`text-base font-medium transition-all duration-300 ${isActive ? 'text-gray-900 opacity-100' : 'text-gray-400 opacity-25'}`}
                    onClick={() => setIsActive(true)}
                    role="button"
                >
                    Avec Reflect
                </span>
            </div>

            {/* 3. VISUALIZATION AREA */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] flex items-center justify-between mt-8 min-h-[400px]">

                {/* Connection Lines (SVG) - Animated based on state */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                    <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
                        {/* Left to Center Connections */}
                        {[100, 160, 220, 280].map((y, i) => (
                            <motion.path
                                key={`line-left-${i}`}
                                d={`M 350 ${y} C 420 ${y}, 450 200, 500 200`}
                                fill="transparent"
                                stroke={isActive ? "#A5AFE6" : "#E95353"}
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                animate={{
                                    strokeDashoffset: [0, -20],
                                    opacity: isActive ? 1 : 0.2
                                }}
                                transition={{
                                    strokeDashoffset: { repeat: Infinity, duration: 2, ease: "linear" },
                                    opacity: { duration: 0.5 }
                                }}
                            />
                        ))}

                        {/* Center to Right Connections */}
                        <motion.path
                            d="M 500 200 C 550 200, 580 200, 650 200"
                            fill="transparent"
                            stroke={isActive ? "#A5AFE6" : "#E95353"}
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            animate={{
                                strokeDashoffset: [0, -20],
                                opacity: isActive ? 1 : 0.1
                            }}
                            transition={{
                                strokeDashoffset: { repeat: Infinity, duration: 2, ease: "linear" },
                                opacity: { duration: 0.5 }
                            }}
                        />

                        {/* Glowing Dots */}
                        {isActive && [1, 2, 3].map((_, i) => (
                            <motion.circle
                                key={`dot-${i}`}
                                r="3"
                                fill="#A5AFE6"
                                animate={{
                                    offsetDistance: ["0%", "100%"]
                                }}
                                transition={{
                                    duration: 3,
                                    delay: i * 1,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <animateMotion
                                    path="M 500 200 C 550 200, 580 200, 650 200"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </motion.circle>
                        ))}
                    </svg>
                </div>

                {/* LEFT PANE: Data Sources */}
                <div className="z-10 bg-white rounded-2xl shadow-xl shadow-gray-100 p-8 w-1/3 border border-gray-50">
                    <div className="grid grid-cols-3 gap-6">
                        <IntegrationItem icon={<Database className="text-blue-500" />} label="SIPH" active={isActive} />
                        <IntegrationItem icon={<Database className="text-green-500" />} label="BambooHR" active={isActive} />
                        <IntegrationItem icon={<Users className="text-orange-500" />} label="Lucca" active={isActive} />


                        <IntegrationItem icon={<Briefcase className="text-indigo-500" />} label="PayFit" active={isActive} />
                        <IntegrationItem icon={<Layers className="text-purple-500" />} label="Nibeilis" active={isActive} />
                        <IntegrationItem icon={<Settings className="text-red-500" />} label="ADP" active={isActive} />

                        <IntegrationItem icon={<PieChart className="text-sky-500" />} label="Flatchr" active={isActive} />
                        <IntegrationItem icon={<Target className="text-emerald-500" />} label="Lever" active={isActive} />
                        <IntegrationItem icon={<TrendingUp className="text-pink-500" />} label="ATS" active={isActive} />
                    </div>
                </div>

                {/* CENTER ICON: Reflect Logo */}
                <div className="z-20 relative px-8">
                    <motion.div
                        className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-700 shadow-2xl ${isActive ? 'bg-indigo-400 scale-110 rotate-0' : 'bg-gray-200 scale-90 rotate-45 grayscale'
                            }`}
                        animate={{
                            backgroundColor: isActive ? "#A1A9E1" : "#E2E8F0",
                            scale: isActive ? 1.1 : 0.9,
                            rotate: isActive ? 0 : 45
                        }}
                    >
                        <div className="text-white">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M20 5 L35 20 L20 35 L5 20 Z" fill="currentColor" opacity="0.8" />
                                <path d="M15 15 L25 25 M25 15 L15 25" stroke="currentColor" strokeWidth="3" />
                            </svg>
                        </div>
                    </motion.div>
                    {/* Pulsing effect when active */}
                    {isActive && (
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-indigo-400 -z-10"
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                </div>

                {/* RIGHT PANE: Output Visualization (Fades between states) */}
                <div className="z-10 w-1/3 relative h-[320px]">
                    <AnimatePresence mode="wait">
                        {isActive ? (
                            <motion.div
                                key="active-pane"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-2xl shadow-xl shadow-gray-100 p-8 h-full border border-gray-50 flex flex-col items-center justify-center gap-4"
                            >
                                <p className="font-semibold text-gray-700 mb-4">Funnel de conversion des candidatures</p>
                                <div className="w-full h-48 flex items-center justify-center">
                                    <svg className="w-full h-full" viewBox="0 0 200 120">
                                        <motion.path
                                            d="M20 10 L180 10 L140 110 L60 110 Z"
                                            fill="url(#funnelGradient)"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1 }}
                                        />
                                        <defs>
                                            <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#2D3E50" />
                                                <stop offset="100%" stopColor="#A5AFE6" />
                                            </linearGradient>
                                        </defs>
                                        <line x1="20" y1="35" x2="180" y2="35" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                                        <line x1="30" y1="60" x2="170" y2="60" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                                        <line x1="45" y1="85" x2="155" y2="85" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                                    </svg>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400"><span className="w-2 h-2 rounded-full bg-slate-800"></span> Candidature reçue</div>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400"><span className="w-2 h-2 rounded-full bg-indigo-400"></span> Profil sélectionné</div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="inactive-pane"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-2xl shadow-xl shadow-gray-100 p-8 h-full border border-gray-50 flex flex-col items-center justify-center opacity-40 grayscale"
                            >
                                <p className="font-medium text-gray-400">Données éparpillées...</p>
                                <div className="mt-8 flex gap-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-12 h-16 bg-gray-100 rounded border border-gray-200 animate-pulse" />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* 4. FOOTER FEATURES */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                <Feature label="En temps réel" />
                <Feature label="Données Fiables" />
                <Feature label="Collaboratif" />
                <Feature label="Certifié ISO 27001" />
            </div>

        </div>
    );
};

// Helper Components
const IntegrationItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active: boolean }) => (
    <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${!active && 'opacity-20 grayscale scale-95'}`}>
        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center shadow-inner">
            {icon}
        </div>
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
);

const Feature = ({ label }: { label: string }) => (
    <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
);

export default ReflectShowcase;

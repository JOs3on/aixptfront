import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  CalendarCheck2,
  Check,
  Copy,
  MessageSquare,
  MousePointerClick,
  Phone,
  Sparkles,
  Zap,
} from 'lucide-react';
import { NicheChatWidget } from '../chat/NicheChatWidget';
import {
  PUBLIC_NICHES,
  resolveClientTitle,
} from '../../data/niches/public';
import { buildDemoPath, resolveNicheFromUrl } from '../../data/niches/demoLinks';
import { VAPI_DEMOS } from '../../lib/vapi';

export const Sandbox: React.FC = () => {
  const { clientName } = useParams<{ clientName?: string }>();
  const [copied, setCopied] = useState(false);
  const [activeExample, setActiveExample] = useState(0);

  const niche = PUBLIC_NICHES[resolveNicheFromUrl(clientName) ?? 'concessionnaire'];
  const clientTitle = resolveClientTitle(niche.id, clientName);
  const voiceDemo = VAPI_DEMOS[niche.id];
  const voiceDemoPath = buildDemoPath('voice', niche.id);

  const pageData = {
    dentaire: {
      intro:
        'Testez comment un patient avec une rage de dent obtient une réponse immédiate, un créneau le jour même et une confirmation — sans appeler.',
      examples: [
        {
          label: 'Urgence',
          question:
            "Bonjour, j'ai une grosse rage de dent et je n'arrive pas à dormir. Est-ce que vous auriez une place d'urgence aujourd'hui ?",
        },
        {
          label: 'Nouveau patient',
          question: 'Est-ce que vous acceptez les nouveaux patients ? J’aimerais un examen cette semaine.',
        },
        {
          label: 'Assurances',
          question: 'Acceptez-vous mes assurances Sun Life, et est-ce que vous soumettez la réclamation ?',
        },
        {
          label: 'Horaires',
          question: 'Quels sont vos horaires samedi, et avez-vous une place la fin de semaine ?',
        },
        {
          label: 'Prix',
          question: 'Combien coûtent un examen complet et un nettoyage ?',
        },
      ],
      step3:
        "Donnez une douleur sur 10, puis un prénom et un numéro fictif pour voir la confirmation du rendez-vous.",
      observation:
        "L'assistant qualifie l'urgence, propose un créneau précis et confirme le rendez-vous en deux phrases maximum.",
    },
    concessionnaire: {
      intro:
        "Testez l'expérience d'un acheteur qui magasine un VUS un dimanche soir : réponse immédiate, disponibilité réelle et essai routier proposé sans formulaire.",
      examples: [
        {
          label: 'Inventaire',
          question: "Bonjour, le VUS noir 2023 est-il toujours disponible ?",
        },
        {
          label: 'Financement',
          question: 'Quels sont vos taux de financement en ce moment pour un VUS ?',
        },
        {
          label: 'Essai routier',
          question: 'Je veux essayer un VUS cette fin de semaine, quels créneaux avez-vous ?',
        },
        {
          label: 'Reprise',
          question: 'Je veux échanger mon véhicule actuel contre le RAV4 hybride, comment ça marche ?',
        },
        {
          label: 'Prix tout inclus',
          question: 'Combien coûte le Ford F-150 tout inclus, taxes et frais ?',
        },
      ],
      step3:
        "Demandez le financement ou l'échange, puis donnez un prénom et un numéro fictif pour voir la confirmation.",
      observation:
        "Remarquez la réponse directe sur l'inventaire, puis la transition naturelle vers un créneau d'essai précis — le tout en deux phrases, sans ton robotique.",
    },
    hvac: {
      intro:
        "Testez une urgence de thermopompe en pleine canicule : qualification de la panne, validation de la zone et créneau de technicien proposé immédiatement.",
      examples: [
        {
          label: 'Urgence',
          question:
            "Bonjour, ma thermopompe vient de s'arrêter et il fait super chaud dans la maison. Est-ce que vous auriez un technicien disponible rapidement ?",
        },
        {
          label: 'Zone desservie',
          question: 'Est-ce que vous desservez ma ville, et y a-t-il des frais de déplacement ?',
        },
        {
          label: 'Diagnostic',
          question: 'Combien coûte un diagnostic pour une thermopompe ?',
        },
        {
          label: 'Entretien',
          question: 'Faites-vous l’entretien annuel d’une thermopompe, et combien ça coûte ?',
        },
        {
          label: 'Remplacement',
          question: 'Je veux remplacer ma fournaise, pouvez-vous venir évaluer ?',
        },
      ],
      step3:
        "Donnez une ville desservie, puis un prénom et un numéro fictif pour voir la confirmation d'intervention.",
      observation:
        "L'assistant valide la zone, priorise l'urgence et fixe une plage d'intervention précise, sans laisser le client sans réponse.",
    },
    avocat: {
      intro:
        "Testez l'accueil d'une personne qui demande de l'aide pour une séparation : qualification du dossier, explication des honoraires et proposition de consultation.",
      examples: [
        {
          label: 'Séparation',
          question: "Bonjour, j'aurais besoin d'aide pour une séparation. Par où commencer ?",
        },
        {
          label: 'Honoraires',
          question: 'Combien coûte la première consultation avec un avocat ?',
        },
        {
          label: 'Documents',
          question: 'Quels documents dois-je apporter à la première rencontre ?',
        },
        {
          label: 'Urgence',
          question: "J'ai une date de cour la semaine prochaine, pouvez-vous m'aider rapidement ?",
        },
        {
          label: 'Consultation à distance',
          question: 'Est-ce possible de faire la consultation en visioconférence ?',
        },
      ],
      step3:
        "Précisez le type de dossier, puis donnez un prénom et un numéro fictif pour voir la proposition de consultation.",
      observation:
        "L'assistante qualifie le dossier, explique les honoraires sans donner d'avis juridique et propose un créneau précis.",
    },
  }[niche.id];

  const examples = pageData.examples;
  const activeExampleData = examples[Math.min(activeExample, examples.length - 1)];

  useEffect(() => {
    setActiveExample(0);
    setCopied(false);
  }, [niche.id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeExampleData.question);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      number: '1',
      title: 'Écrivez comme un vrai client',
      description:
        'La fenêtre de clavardage est déjà ouverte. Posez votre question ou cliquez une suggestion pour démarrer.',
      icon: MousePointerClick,
    },
    {
      number: '2',
      title: 'Choisissez un exemple de test',
      description:
        'Parcourez les scénarios ci-dessous, puis copiez la question dans le clavardage pour voir la réaction de l’assistant.',
      icon: MessageSquare,
    },
    {
      number: '3',
      title: 'Jouez le jeu',
      description: pageData.step3,
      icon: CalendarCheck2,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sandbox | {clientTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Metallic Grey Background */}
      <div className="relative min-h-screen overflow-hidden bg-[#121212] pt-24 pb-16 font-sans">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
        <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-[0.03]" />
        <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-white/5 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-[#9a6bff]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_420px] xl:gap-12">
            {/* Instructions card */}
            <div className="order-2 w-full lg:order-1">
              <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-10">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent" />

                <div className="mb-7 flex justify-end">
                  <div className="inline-flex items-center space-x-2 rounded-full border border-white/5 bg-zinc-800/80 px-4 py-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Environnement de test · {niche.industry}
                    </span>
                  </div>
                </div>

                <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {clientTitle}
                </h1>

                <p className="mb-8 text-lg font-light leading-relaxed text-zinc-400">
                  {pageData.intro}
                </p>

                <div className="mb-8 space-y-4">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.number}
                        className="flex items-start space-x-4 rounded-3xl border border-white/[0.05] bg-white/[0.03] p-4 transition-colors duration-300 hover:bg-white/[0.05] sm:p-5"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-zinc-800 text-sm font-bold text-[#b79aff] shadow-lg">
                          {step.number}
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <h3 className="mb-1 flex items-center text-[15px] font-semibold text-white">
                            {step.title}
                            <Icon className="ml-2 h-4 w-4 text-zinc-500" />
                          </h3>
                          <p className="text-sm leading-relaxed text-zinc-500">
                            {step.description}
                          </p>

                          {step.number === '2' && (
                            <div className="mt-4">
                              <div
                                className="mb-3 flex flex-wrap gap-1.5"
                                role="tablist"
                                aria-label="Exemples de tests"
                              >
                                {examples.map((example, index) => (
                                  <button
                                    key={example.label}
                                    type="button"
                                    role="tab"
                                    aria-selected={index === activeExample}
                                    onClick={() => {
                                      setActiveExample(index);
                                      setCopied(false);
                                    }}
                                    className={
                                      index === activeExample
                                        ? 'rounded-full border border-[#9a6bff]/50 bg-[#9a6bff]/15 px-3 py-1.5 text-[11px] font-semibold text-white transition'
                                        : 'rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-zinc-400 transition hover:border-white/20 hover:text-zinc-200'
                                    }
                                  >
                                    {example.label}
                                  </button>
                                ))}
                              </div>

                              <div className="group/copy relative">
                                <div className="flex min-h-[3.5rem] items-center rounded-2xl border border-white/10 bg-black/40 p-3 pr-16 shadow-inner transition-all duration-300 group-hover/copy:border-[#9a6bff]/30">
                                  <code className="block text-[12.5px] italic leading-relaxed text-zinc-300">
                                    « {activeExampleData.question} »
                                  </code>
                                </div>

                              <button
                                type="button"
                                onClick={handleCopy}
                                className="absolute bottom-2 right-2 flex items-center space-x-1.5 rounded-xl bg-[#7c4dff] px-2.5 py-1.5 text-white shadow-lg transition-all duration-300 hover:bg-[#8a5cef] active:scale-95"
                                aria-label="Copier la question d'exemple"
                              >
                                {copied ? (
                                  <>
                                    <Check className="h-3.5 w-3.5" />
                                    <span className="hidden text-[10px] font-bold uppercase tracking-wider md:inline">
                                      Copié
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3.5 w-3.5" />
                                    <span className="hidden text-[10px] font-bold uppercase tracking-wider md:inline">
                                      Copier
                                    </span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Phone demo CTA */}
                {voiceDemo.phoneEnabled && (
                  <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-emerald-400/15 bg-gradient-to-br from-emerald-400/[0.08] via-zinc-900 to-zinc-900 p-6 shadow-2xl sm:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300/80">
                            Démo téléphonique
                          </p>
                          <h3 className="mt-0.5 text-base font-semibold text-white">
                            Appelez la réceptionniste IA
                          </h3>
                          <p className="mt-0.5 text-xs text-zinc-500">
                            La même expérience, sur une vraie ligne téléphonique.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:items-end">
                        <a
                          href={`tel:${voiceDemo.phoneNumber}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 font-mono text-sm font-bold text-white shadow-[0_10px_24px_-12px_rgba(16,185,129,0.9)] transition hover:bg-emerald-400"
                        >
                          <Phone className="h-4 w-4" />
                          {voiceDemo.formattedPhoneNumber}
                        </a>
                        <Link
                          to={voiceDemoPath}
                          className="text-center text-[11px] font-medium text-zinc-400 transition hover:text-white sm:text-right"
                        >
                          Essayer dans le navigateur →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Observation */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 shadow-2xl sm:p-8">
                  <div className="absolute right-0 top-0 rotate-12 p-6 opacity-[0.03]">
                    <Zap className="h-32 w-32 text-white" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="mb-3 flex items-center text-sm font-bold uppercase tracking-[0.18em] text-[#b79aff]">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Ce qu'il faut observer
                    </h4>
                    <p className="text-sm font-light leading-relaxed text-zinc-400">
                      {pageData.observation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live chat window */}
            <div className="order-1 mx-auto w-full max-w-[470px] lg:order-2 lg:mx-0 lg:max-w-none">
              <div className="mb-3 flex items-center px-1">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9a6bff]" />
                  Conversation en direct
                </span>
              </div>

              <NicheChatWidget
                key={`${niche.id}-${clientTitle}`}
                niche={niche}
                clientTitle={clientTitle}
                className="lg:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.95)]"
              />

              <p className="mt-3 px-2 text-center text-[10.5px] leading-relaxed text-zinc-600">
                Démo fonctionnelle — utilisez des coordonnées fictives. Aucun message n'est transmis à un humain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Database, MailOpen, Sparkles } from 'lucide-react';

interface Email {
  from: string;
  initials: string;
  subject: string;
  tag: 'Réservation' | 'Urgent' | 'Info';
  time: string;
  preview: string;
}

const EMAILS: Email[] = [
  {
    from: 'Jean Tremblay',
    initials: 'JT',
    subject: 'Annulation — chambre 204',
    tag: 'Urgent',
    time: '08:47',
    preview: 'Merci de bien vouloir annuler ma réservation…',
  },
  {
    from: 'Julie Martin',
    initials: 'JM',
    subject: 'Demande de réservation — 2 nuits',
    tag: 'Réservation',
    time: '09:12',
    preview: 'Bonjour, je souhaite réserver une chambre double…',
  },
  {
    from: 'Newsletter',
    initials: 'NL',
    subject: 'Promo weekend — jusqu\u2019à dimanche',
    tag: 'Info',
    time: '08:02',
    preview: 'Profitez de -20 % sur les chambres supérieures…',
  },
  {
    from: 'Caroline Bédard',
    initials: 'CB',
    subject: 'Demande de réservation — chambre double',
    tag: 'Réservation',
    time: '09:52',
    preview: 'Bonjour, serait-il possible de réserver une chambre double…',
  },
];

const REPLY =
  'Bonjour Mme Bédard, merci pour votre demande. Chambre double disponible du 14 au 16 — confirmation envoyée, paiement sécurisé en pièce jointe. À bientôt !';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const InboxMockup: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(prefersReduced ? EMAILS.length : 3);
  const [showReply, setShowReply] = useState(prefersReduced);
  const [synced, setSynced] = useState(prefersReduced);
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(EMAILS.length);
      setShowReply(true);
      setSynced(true);
      return;
    }
    if (!inView) {
      setVisible(3);
      setShowReply(false);
      setSynced(false);
      return;
    }

    let alive = true;
    const run = async () => {
      await sleep(600);
      if (!alive) return;
      while (alive) {
        setSynced(false);
        setShowReply(false);
        // incoming email
        setVisible(4);
        await sleep(1200);
        if (!alive) return;
        // open + auto-reply
        setActive(3);
        await sleep(500);
        setShowReply(true);
        await sleep(2600);
        if (!alive) return;
        setSynced(true);
        await sleep(4200);
        if (!alive) return;
        setVisible(3);
        setActive(1);
        await sleep(700);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [inView, prefersReduced]);

  const tagClass: Record<Email['tag'], string> = {
    Réservation: 'border-brand/30 bg-brand/10 text-brand',
    Urgent: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    Info: 'border-white/10 bg-white/5 text-muted-foreground',
  };

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0f] shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          agent-email — inbox · Hôtel Le Château
        </span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">12 emails · 3 min</span>
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-[1.1fr_1fr]">
        {/* Inbox list */}
        <ul className="space-y-2">
          {EMAILS.slice(0, visible).map((email, i) => (
            <motion.li
              key={email.subject}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`rounded-lg border px-3 py-2.5 transition-colors duration-200 ${
                active === i ? 'border-brand/40 bg-brand/5' : 'border-white/5 bg-white/[0.03] hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#9a6bff]/40 to-[#7a4bff]/20 font-mono text-[9px] font-bold text-white">
                  {email.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-semibold text-white">{email.from}</span>
                  <span className="block truncate text-[10px] text-muted-foreground">{email.subject}</span>
                </span>
                <span className="font-mono text-[9px] text-muted-foreground">{email.time}</span>
              </div>
              <span className={`mt-2 inline-block rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest ${tagClass[email.tag]}`}>
                {email.tag}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Reading pane */}
        <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <MailOpen className="h-3.5 w-3.5 text-brand" />
            <span className="truncate text-[11px] font-semibold text-white">
              {EMAILS[active]?.subject}
            </span>
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
            {EMAILS[active]?.preview}
          </p>

          {showReply && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-3 rounded-lg border border-brand/25 bg-gradient-to-br from-[#9a6bff]/15 to-[#7a4bff]/5 p-3"
            >
              <div className="mb-1.5 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-brand" />
                <span className="font-mono text-[8px] uppercase tracking-widest text-brand">
                  Réponse générée par l'agent
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-foreground/85">{REPLY}</p>
            </motion.div>
          )}

          {synced && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2"
            >
              <Database className="h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
              <span className="text-[10px] text-foreground/80">CRM synchronisé · chambres à jour</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxMockup;

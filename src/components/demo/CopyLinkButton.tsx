import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyLinkButtonProps {
  url: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

/**
 * Copies an absolute demo URL. Used on the demo hub and the niche switcher so
 * the sales team can paste a ready-to-send link into an email.
 */
export const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({
  url,
  label = 'Copier le lien',
  copiedLabel = 'Lien copié',
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API can be unavailable on http:// or older browsers.
      const input = document.createElement('textarea');
      input.value = url;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[11px] font-semibold text-zinc-300 transition hover:border-brand/40 hover:bg-brand/10 hover:text-white',
        className,
      )}
      aria-label={label}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? copiedLabel : label}
    </button>
  );
};

export default CopyLinkButton;

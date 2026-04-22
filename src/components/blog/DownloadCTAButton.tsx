'use client';

import { clarityEvent } from '@/lib/clarity';

interface DownloadCTAButtonProps {
  href: string;
  label: string;
}

export default function DownloadCTAButton({ href, label }: DownloadCTAButtonProps) {
  const handleClick = () => {
    // Track download event for charte IA
    if (href.includes('charte-ia')) {
      clarityEvent('download_charte_ia');
    }
  };

  return (
    <a
      href={href}
      download
      onClick={handleClick}
      className="inline-block min-h-[48px] px-8 py-3 bg-ambre text-white font-semibold
        rounded-lg hover:bg-ambre-light transition-all"
    >
      {label}
    </a>
  );
}

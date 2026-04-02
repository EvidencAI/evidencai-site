'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import DownloadModal from './DownloadModal';

interface DownloadButtonProps {
  downloadUrl: string;
  accessCode: string;
}

export default function DownloadButton({ downloadUrl, accessCode }: DownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        title="Télécharger le plugin"
        className="w-9 h-9 rounded-full bg-ambre text-white flex items-center justify-center
          hover:bg-ambre-light hover:scale-110 transition-all shadow-md hover:shadow-lg"
      >
        <span className="font-bold text-sm leading-none">T</span>
      </button>
      <DownloadModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        downloadUrl={downloadUrl}
        accessCode={accessCode}
      />
    </>
  );
}

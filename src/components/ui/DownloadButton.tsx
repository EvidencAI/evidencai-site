'use client';

import { useState } from 'react';
import DownloadModal, { type DownloadFile } from './DownloadModal';

interface DownloadButtonProps {
  files: DownloadFile[];
  accessCode: string;
}

export default function DownloadButton({ files, accessCode }: DownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        title="Télécharger"
        className="px-4 py-2 rounded-lg bg-ambre text-white text-sm font-semibold flex items-center gap-2
          hover:bg-ambre-light hover:scale-105 transition-all shadow-md hover:shadow-lg"
      >
        Télécharger
      </button>
      <DownloadModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        files={files}
        accessCode={accessCode}
      />
    </>
  );
}

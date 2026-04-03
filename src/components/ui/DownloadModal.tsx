'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Download, Lock, FileArchive } from 'lucide-react';

export interface DownloadFile {
  name: string;
  url: string;
}

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: DownloadFile[];
  accessCode: string;
}

export default function DownloadModal({ isOpen, onClose, files, accessCode }: DownloadModalProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelected(new Set());
      setCode('');
      setError(false);
      setSuccess(false);
    }
  }, [isOpen]);

  const toggleFile = (index: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === accessCode) {
      setSuccess(true);
      setError(false);
      // Télécharger chaque fichier sélectionné
      selected.forEach((index) => {
        const file = files[index];
        if (file) {
          const link = document.createElement('a');
          link.href = file.url;
          link.download = '';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
      setTimeout(() => onClose(), 1500);
    } else {
      setError(true);
      setCode('');
      inputRef.current?.focus();
    }
  };

  if (!isOpen) return null;

  const hasSelection = selected.size > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-ambre/10 rounded-full flex items-center justify-center">
            <Lock className="w-5 h-5 text-ambre" />
          </div>
          <div>
            <h3 className="font-playfair font-bold text-bleu-nuit text-lg leading-tight">
              Test privé
            </h3>
            <p className="text-xs text-gray-500">Outils en test</p>
          </div>
        </div>

        {success ? (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-lg p-3">
            <Download className="w-5 h-5" />
            <span className="text-sm font-medium">
              Téléchargement{selected.size > 1 ? 's' : ''} lancé{selected.size > 1 ? 's' : ''} !
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Liste des fichiers avec checkboxes */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                Sélectionnez les fichiers à télécharger :
              </label>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors
                      ${selected.has(index)
                        ? 'border-ambre bg-ambre/5'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(index)}
                      onChange={() => toggleFile(index)}
                      className="w-4 h-4 rounded border-gray-300 text-ambre focus:ring-ambre/30 accent-[#C8A35F]"
                    />
                    <FileArchive className={`w-4 h-4 flex-shrink-0 ${selected.has(index) ? 'text-ambre' : 'text-gray-400'}`} />
                    <span className={`text-sm ${selected.has(index) ? 'text-bleu-nuit font-medium' : 'text-gray-600'}`}>
                      {file.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Séparateur */}
            <div className="border-t border-gray-100 my-4" />

            {/* Code d'accès */}
            <label className="block text-sm text-gray-600 mb-2">
              Entrez le code d&apos;accès :
            </label>
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              placeholder="Code d'accès"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm font-mono text-gray-900 placeholder-gray-400 transition-colors outline-none
                ${error
                  ? 'border-red-300 bg-red-50 focus:border-red-400'
                  : 'border-gray-200 bg-white focus:border-ambre focus:ring-1 focus:ring-ambre/30'
                }`}
            />
            {error && (
              <p className="text-xs text-red-500 mt-1.5">Code incorrect</p>
            )}
            <button
              type="submit"
              disabled={!code.trim() || !hasSelection}
              className="mt-4 w-full py-2.5 bg-bleu-nuit text-white text-sm font-semibold rounded-lg
                hover:bg-bleu-nuit-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {hasSelection
                ? `Télécharger ${selected.size} fichier${selected.size > 1 ? 's' : ''}`
                : 'Sélectionnez au moins un fichier'
              }
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Download, Lock } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  accessCode: string;
}

export default function DownloadModal({ isOpen, onClose, downloadUrl, accessCode }: DownloadModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError(false);
      setSuccess(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === accessCode) {
      setSuccess(true);
      setError(false);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => onClose(), 1500);
    } else {
      setError(true);
      setCode('');
      inputRef.current?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
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
            <p className="text-xs text-gray-500">Application en cours de test</p>
          </div>
        </div>

        {success ? (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-lg p-3">
            <Download className="w-5 h-5" />
            <span className="text-sm font-medium">Téléchargement lancé !</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block text-sm text-gray-600 mb-2">
              Entrez le code d&apos;accès pour télécharger le plugin :
            </label>
            <input
              ref={inputRef}
              type="password"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              placeholder="Code d'accès"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm font-mono transition-colors outline-none
                ${error
                  ? 'border-red-300 bg-red-50 focus:border-red-400'
                  : 'border-gray-200 bg-gray-50 focus:border-ambre'
                }`}
            />
            {error && (
              <p className="text-xs text-red-500 mt-1.5">Code incorrect</p>
            )}
            <button
              type="submit"
              disabled={!code.trim()}
              className="mt-4 w-full py-2.5 bg-bleu-nuit text-white text-sm font-semibold rounded-lg
                hover:bg-bleu-nuit-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Télécharger le plugin
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

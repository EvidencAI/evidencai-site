'use client';

import { useState } from 'react';

export default function FormationInscriptionForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    session: '',
    demande: 'inscription',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/formation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">&#10003;</div>
        <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-2">Demande envoyée</h3>
        <p className="text-gray-600">
          {formData.demande === 'inscription'
            ? 'Votre pré-inscription a bien été reçue. Je reviens vers vous sous 48h avec les modalités.'
            : 'Votre demande a bien été reçue. Je reviens vers vous sous 48h.'}
        </p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ambre focus:border-transparent";
  const labelClass = "block text-sm font-medium text-bleu-nuit mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type de demande */}
      <div className="flex gap-3">
        <label className={`flex-1 cursor-pointer`}>
          <input
            type="radio"
            name="demande"
            value="inscription"
            checked={formData.demande === 'inscription'}
            onChange={handleChange}
            className="sr-only"
          />
          <div className={`text-center py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
            formData.demande === 'inscription'
              ? 'border-ambre bg-ambre/10 text-ambre'
              : 'border-gray-200 text-gray-500 hover:border-gray-300'
          }`}>
            Je souhaite m&apos;inscrire
          </div>
        </label>
        <label className={`flex-1 cursor-pointer`}>
          <input
            type="radio"
            name="demande"
            value="information"
            checked={formData.demande === 'information'}
            onChange={handleChange}
            className="sr-only"
          />
          <div className={`text-center py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
            formData.demande === 'information'
              ? 'border-ambre bg-ambre/10 text-ambre'
              : 'border-gray-200 text-gray-500 hover:border-gray-300'
          }`}>
            Je souhaite des informations
          </div>
        </label>
      </div>

      {/* Session (visible seulement pour inscription) */}
      {formData.demande === 'inscription' && (
        <div>
          <label htmlFor="session" className={labelClass}>Session souhaitée</label>
          <select
            id="session"
            name="session"
            value={formData.session}
            onChange={handleChange}
            required={formData.demande === 'inscription'}
            className={inputClass}
          >
            <option value="">Choisir une session</option>
            <option value="7 et 14 avril 2026">7 et 14 avril 2026 — Valence</option>
            <option value="5 et 12 mai 2026">5 et 12 mai 2026 — Valence</option>
            <option value="23 et 30 juin 2026">23 et 30 juin 2026 — Valence</option>
          </select>
        </div>
      )}

      {/* Nom + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nom" className={labelClass}>Nom et prénom *</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email professionnel *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Téléphone + Entreprise */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="telephone" className={labelClass}>Téléphone</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="entreprise" className={labelClass}>Entreprise</label>
          <input
            type="text"
            id="entreprise"
            name="entreprise"
            value={formData.entreprise}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3 bg-bleu-nuit text-white font-semibold rounded-lg hover:bg-bleu-nuit-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Envoi en cours...' : (
          formData.demande === 'inscription' ? 'Pré-réserver ma place' : 'Envoyer ma demande'
        )}
      </button>

      {status === 'error' && (
        <p className="text-red-500 text-sm text-center">
          Une erreur est survenue. Réessayez ou contactez directement stephane@commenge.net
        </p>
      )}

      <p className="text-xs text-gray-400 text-center">
        Vos données sont uniquement utilisées pour traiter votre demande.
      </p>
    </form>
  );
}

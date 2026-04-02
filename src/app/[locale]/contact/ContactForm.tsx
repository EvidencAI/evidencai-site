'use client';

import { useState, type FormEvent } from 'react';

interface ContactFormProps {
  dict: any;
  locale: string;
}

export default function ContactForm({ dict, locale }: ContactFormProps) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value || undefined,
      entreprise: (form.elements.namedItem('entreprise') as HTMLInputElement).value || undefined,
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Erreur serveur');
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
        <p className="text-green-800 font-semibold">{dict.success}</p>
        <p className="text-green-700 text-sm mt-2">{dict.successSubtitle}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          {dict.nom} <span className="text-red-500">{dict.required}</span>
        </label>
        <input type="text" id="name" name="name" required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ambre focus:border-ambre transition-all" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          {dict.email} <span className="text-red-500">{dict.required}</span>
        </label>
        <input type="email" id="email" name="email" required autoComplete="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ambre focus:border-ambre transition-all" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            {dict.telephone}
          </label>
          <input type="tel" id="phone" name="phone" autoComplete="tel"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ambre focus:border-ambre transition-all" />
        </div>
        <div>
          <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-2">
            {dict.entreprise}
          </label>
          <input type="text" id="entreprise" name="entreprise" autoComplete="organization"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ambre focus:border-ambre transition-all" />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          {dict.sujet} <span className="text-red-500">{dict.required}</span>
        </label>
        <select id="subject" name="subject" required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ambre focus:border-ambre transition-all">
          <option value="">{dict.sujetPlaceholder}</option>
          <option value="atelier">{dict.sujets.atelier}</option>
          <option value="formation">{dict.sujets.formation}</option>
          <option value="audit">{dict.sujets.audit}</option>
          <option value="outil">{dict.sujets.outil}</option>
          <option value="autre">{dict.sujets.autre}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {dict.message} <span className="text-red-500">{dict.required}</span>
        </label>
        <textarea id="message" name="message" rows={6} required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ambre focus:border-ambre transition-all resize-none" />
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" id="rgpd" name="rgpd" required
          className="mt-1 w-5 h-5 rounded border-gray-300 text-ambre focus:ring-ambre" />
        <label htmlFor="rgpd" className="text-sm text-gray-600">
          {dict.rgpd}{' '}
          <a href={`/${locale}/mentions-legales#confidentialite`} className="text-ambre hover:underline">{dict.rgpdLink}</a>.
        </label>
      </div>

      <button type="submit" disabled={pending}
        className="w-full min-h-[48px] px-6 py-3 bg-bleu-nuit text-white font-semibold rounded-lg hover:bg-bleu-nuit-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {pending ? dict.pending : dict.submit}
      </button>
    </form>
  );
}

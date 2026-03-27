'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full min-h-[48px] px-6 py-3 bg-bleu-nuit text-white font-semibold rounded-lg hover:bg-bleu-nuit-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Envoi en cours...' : 'Envoyer le message'}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, {});

  return (
    <form action={formAction} className="space-y-6">
      {/* Success message */}
      {state.success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{state.message}</p>
        </div>
      )}

      {/* Global error */}
      {state.errors?._form && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{state.errors._form[0]}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ambre focus:border-ambre transition-all"
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ambre focus:border-ambre transition-all"
        />
        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Téléphone (optionnel)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ambre focus:border-ambre transition-all"
        />
        {state.errors?.phone && (
          <p className="mt-1 text-sm text-red-500">{state.errors.phone[0]}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Sujet <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ambre focus:border-ambre transition-all"
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="atelier">Atelier IA</option>
          <option value="formation">Formation Qualiopi</option>
          <option value="audit">Audit & Solutions</option>
          <option value="autre">Autre</option>
        </select>
        {state.errors?.subject && (
          <p className="mt-1 text-sm text-red-500">{state.errors.subject[0]}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ambre focus:border-ambre transition-all resize-none"
        />
        {state.errors?.message && (
          <p className="mt-1 text-sm text-red-500">{state.errors.message[0]}</p>
        )}
      </div>

      {/* RGPD */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="rgpd"
          name="rgpd"
          required
          className="mt-1 w-5 h-5 rounded border-gray-300 text-ambre focus:ring-ambre"
        />
        <label htmlFor="rgpd" className="text-sm text-gray-600">
          J&apos;accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande.
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès et de rectification de vos données.{' '}
          <a href="/mentions-legales#confidentialite" className="text-ambre hover:underline">
            En savoir plus
          </a>
          .
        </label>
      </div>
      {state.errors?.rgpd && (
        <p className="text-sm text-red-500">{state.errors.rgpd[0]}</p>
      )}

      <SubmitButton />
    </form>
  );
}

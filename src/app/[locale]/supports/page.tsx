'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface FormationResource {
  label: string;
  href: string | null;
  available: boolean;
  icon: 'course' | 'prompt' | 'knowledge';
}

interface Formation {
  slug: string;
  title: string;
  description: string;
  code: string;
  resources: FormationResource[];
}

const formations: Formation[] = [
  {
    slug: 'decider-avec-ia',
    title: 'Décider avec l\'IA, de l\'usage à la maîtrise stratégique',    description: 'Support de cours complet de la formation « Décider avec l\'IA ». Deux journées pour comprendre les mécanismes de l\'intelligence artificielle, apprendre à l\'utiliser concrètement dans vos décisions de dirigeant, et construire une stratégie IA adaptée à votre entreprise.',
    code: 'DECIDER2026',
    resources: [
      { label: 'Accéder au support de cours', href: '/supports/decider-avec-ia.html', available: true, icon: 'course' },
      { label: 'Télécharger le prompt système', href: '/downloads/prompt-systeme-coach-ia.md', available: true, icon: 'prompt' },
      { label: 'Télécharger le Knowledge', href: '/downloads/knowledge-base-coach-ia.md', available: true, icon: 'knowledge' },
    ],
  },
];

const icons = {
  course: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  prompt: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  knowledge: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
};
export default function SupportsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [codes, setCodes] = useState<Record<string, string>>({});
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = (formation: Formation) => {
    const inputCode = (codes[formation.slug] || '').trim().toUpperCase();
    if (inputCode === formation.code) {
      setUnlocked((prev) => ({ ...prev, [formation.slug]: true }));
      setErrors((prev) => ({ ...prev, [formation.slug]: false }));
    } else {
      setErrors((prev) => ({ ...prev, [formation.slug]: true }));
      setUnlocked((prev) => ({ ...prev, [formation.slug]: false }));
    }
  };

  const labels = locale === 'fr' ? {
    pageTitle: 'Nos supports de cours',
    pageSubtitle: 'Accédez aux ressources pédagogiques de vos formations avec le code fourni par votre formateur.',
    codePlaceholder: 'Code d\'accès',
    submitButton: 'Accéder',
    errorMessage: 'Code incorrect. Vérifiez le code fourni par votre formateur.',
    comingSoon: 'Bientôt disponible',
    backHome: 'Retour à l\'accueil',
  } : {    pageTitle: 'Course Materials',
    pageSubtitle: 'Access the training resources for our courses with the code provided by your instructor.',
    codePlaceholder: 'Access code',
    submitButton: 'Access',
    errorMessage: 'Incorrect code. Please check the code provided by your instructor.',
    comingSoon: 'Coming soon',
    backHome: 'Back to home',
  };

  return (
    <section className="min-h-screen bg-bleu-nuit pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
            {labels.pageTitle}
          </h1>
          <p className="text-text-secondary text-base leading-relaxed">
            {labels.pageSubtitle}
          </p>
        </div>

        <div className="space-y-6">
          {formations.map((formation) => (
            <div
              key={formation.slug}
              className="bg-bleu-nuit-light border border-white/10 rounded-xl p-6 sm:p-8"
            >
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-3">                {formation.title}
              </h2>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                {formation.description}
              </p>

              {!unlocked[formation.slug] ? (
                <div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={codes[formation.slug] || ''}
                      onChange={(e) =>
                        setCodes((prev) => ({ ...prev, [formation.slug]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmit(formation);
                      }}
                      placeholder={labels.codePlaceholder}
                      className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-text-secondary text-sm focus:outline-none focus:border-ambre focus:ring-1 focus:ring-ambre transition-colors"
                    />
                    <button
                      onClick={() => handleSubmit(formation)}
                      className="bg-ambre hover:bg-ambre-light text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
                    >
                      {labels.submitButton}
                    </button>
                  </div>
                  {errors[formation.slug] && (
                    <p className="text-red-400 text-xs mt-2">{labels.errorMessage}</p>                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {formation.resources.map((resource) => (
                    resource.available && resource.href ? (
                      <a
                        key={resource.label}
                        href={resource.href}
                        target={resource.icon === 'course' ? '_blank' : undefined}
                        rel={resource.icon === 'course' ? 'noopener noreferrer' : undefined}
                        download={resource.icon !== 'course'}
                        className="flex items-center gap-3 bg-ambre hover:bg-ambre-light text-white font-medium px-5 py-3 rounded-lg text-sm transition-colors"
                      >
                        {icons[resource.icon]}
                        {resource.label}
                      </a>
                    ) : (
                      <div
                        key={resource.label}
                        className="flex items-center gap-3 bg-white/5 border border-white/10 text-text-secondary px-5 py-3 rounded-lg text-sm cursor-not-allowed"
                      >
                        {icons[resource.icon]}
                        <span>{resource.label}</span>
                        <span className="ml-auto text-xs opacity-60">{labels.comingSoon}</span>
                      </div>
                    )
                  ))}
                </div>
              )}            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}`}
            className="text-text-secondary hover:text-ambre transition-colors text-sm"
          >
            ← {labels.backHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
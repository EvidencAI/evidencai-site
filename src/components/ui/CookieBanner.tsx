'use client';

import { useState, useEffect } from 'react';
import type { Locale } from '@/i18n/config';

const translations = {
  fr: {
    title: 'Respect de votre vie privée',
    description:
      'Nous utilisons des cookies d\u2019analyse (Google Analytics, Microsoft Clarity) pour comprendre comment vous utilisez notre site et l\u2019améliorer. Ces cookies ne sont déposés qu\u2019avec votre consentement.',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    customize: 'Personnaliser',
    save: 'Enregistrer mes choix',
    analytics: 'Cookies d\u2019analyse',
    analyticsDesc:
      'Google Analytics et Microsoft Clarity : mesure d\u2019audience et analyse du comportement de navigation.',
    essential: 'Cookies essentiels',
    essentialDesc:
      'Nécessaires au fonctionnement du site (préférences de langue, consentement cookies). Toujours actifs.',
  },
  en: {
    title: 'Respecting your privacy',
    description:
      'We use analytics cookies (Google Analytics, Microsoft Clarity) to understand how you use our site and improve it. These cookies are only placed with your consent.',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    customize: 'Customize',
    save: 'Save my choices',
    analytics: 'Analytics cookies',
    analyticsDesc:
      'Google Analytics and Microsoft Clarity: audience measurement and browsing behavior analysis.',
    essential: 'Essential cookies',
    essentialDesc:
      'Required for site functionality (language preferences, cookie consent). Always active.',
  },
};

type CookieConsent = {
  essential: boolean;
  analytics: boolean;
};

function getStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('cookie-consent');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function storeConsent(consent: CookieConsent) {
  localStorage.setItem('cookie-consent', JSON.stringify(consent));
  // Dispatch event pour que les scripts analytics puissent réagir
  window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: consent }));
}

export default function CookieBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const t = translations[locale] || translations.fr;

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: CookieConsent = { essential: true, analytics: true };
    storeConsent(consent);
    setVisible(false);
  };

  const handleRejectAll = () => {
    const consent: CookieConsent = { essential: true, analytics: false };
    storeConsent(consent);
    setVisible(false);
  };

  const handleSaveChoices = () => {
    const consent: CookieConsent = { essential: true, analytics: analyticsChecked };
    storeConsent(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-bleu-nuit-light border border-white/15 rounded-xl shadow-2xl p-6">
        <h3 className="font-playfair text-lg font-bold text-white mb-2">{t.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">{t.description}</p>

        {showDetails && (
          <div className="mb-4 space-y-3">
            {/* Cookies essentiels */}
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <input
                type="checkbox"
                checked
                disabled
                className="mt-1 accent-ambre"
              />
              <div>
                <p className="text-sm font-medium text-white">{t.essential}</p>
                <p className="text-xs text-text-secondary">{t.essentialDesc}</p>
              </div>
            </div>
            {/* Cookies analytics */}
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <input
                type="checkbox"
                checked={analyticsChecked}
                onChange={(e) => setAnalyticsChecked(e.target.checked)}
                className="mt-1 accent-ambre cursor-pointer"
              />
              <div>
                <p className="text-sm font-medium text-white">{t.analytics}</p>
                <p className="text-xs text-text-secondary">{t.analyticsDesc}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {!showDetails ? (
            <>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2.5 text-sm font-medium text-text-secondary border border-white/20 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
              >
                {t.rejectAll}
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2.5 text-sm font-medium text-text-secondary border border-white/20 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
              >
                {t.customize}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2.5 text-sm font-medium bg-ambre text-bleu-nuit rounded-lg hover:bg-ambre-light transition-colors"
              >
                {t.acceptAll}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2.5 text-sm font-medium text-text-secondary border border-white/20 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
              >
                {t.rejectAll}
              </button>
              <button
                onClick={handleSaveChoices}
                className="px-4 py-2.5 text-sm font-medium bg-ambre text-bleu-nuit rounded-lg hover:bg-ambre-light transition-colors"
              >
                {t.save}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Hook utilitaire pour vérifier le consentement analytics
export function useAnalyticsConsent(): boolean {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored?.analytics) setConsent(true);

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<CookieConsent>).detail;
      setConsent(detail.analytics);
    };
    window.addEventListener('cookie-consent-update', handler);
    return () => window.removeEventListener('cookie-consent-update', handler);
  }, []);

  return consent;
}

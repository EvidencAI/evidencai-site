'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GA_ID = 'G-X2HY34H4LB';

function loadGA4() {
  // Ne pas charger deux fois
  if (typeof window.gtag !== 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function checkAndActivate() {
  try {
    const stored = localStorage.getItem('cookie-consent');
    if (!stored) return;
    const consent = JSON.parse(stored);
    if (consent?.analytics === true) {
      // @ts-ignore
      window[`ga-disable-${GA_ID}`] = false;
      loadGA4();
    } else {
      // @ts-ignore
      window[`ga-disable-${GA_ID}`] = true;
    }
  } catch {
    // localStorage indisponible ou JSON invalide
  }
}

export default function GA4Consent() {
  useEffect(() => {
    // Vérifier au chargement
    checkAndActivate();

    // Réagir quand le CookieBanner met à jour le consentement
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.analytics === true) {
        // @ts-ignore
        window[`ga-disable-${GA_ID}`] = false;
        loadGA4();
      } else {
        // @ts-ignore
        window[`ga-disable-${GA_ID}`] = true;
      }
    };

    window.addEventListener('cookie-consent-update', handler);
    return () => window.removeEventListener('cookie-consent-update', handler);
  }, []);

  return null;
}

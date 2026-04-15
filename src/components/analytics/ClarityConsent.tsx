'use client';

import { useEffect } from 'react';
import { checkAndSetOptOut, shouldTrack } from '@/lib/tracking-opt-out';

const CLARITY_PROJECT_ID = 'w3dj64hgwq';

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
    __clarityLoaded?: boolean;
  }
}

/**
 * Installe un stub Clarity en queue-only (aucun r seau, aucun cookie)
 * pour que les helpers clarityTag / clarityEvent puissent bufferiser
 * les appels faits avant le consentement. Le vrai tag sera append
 * uniquement sous consentement et consommera automatiquement la queue.
 */
function installStub() {
  if (typeof window === 'undefined') return;
  // @ts-ignore
  window.clarity = window.clarity || function () {
    // @ts-ignore
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };
}

function loadClarityTag() {
  if (typeof window === 'undefined') return;
  // Flag sur window : survit au d montage/remontage de ClarityConsent
  // provoqu  par certaines navigations Next.js. Emp che toute r injection
  // du tag, donc toute r initialisation de session c t  Clarity.
  if (window.__clarityLoaded) return;
  window.__clarityLoaded = true;

  installStub();

  const script = document.createElement('script');
  script.id = 'clarity-tag';
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(script);

  // Donner explicitement le consentement   Clarity pour qu'il passe
  // en mode avec cookies. Sans cet appel, Clarity tourne en mode cookieless
  // et traite chaque page vue comme une nouvelle session (cf. github.com/
  // microsoft/clarity/issues/175).
  grantClarityConsent();
}

function grantClarityConsent() {
  if (typeof window === 'undefined' || !window.clarity) return;
  try {
    // API legacy : accept e par toutes les versions du SDK
    window.clarity('consent');
    // API v2 : signal de consentement granulaire pour conformit  post-oct 2025
    window.clarity('consentv2', {
      ad_Storage: 'granted',
      analytics_Storage: 'granted',
    });
  } catch {
    // no-op si Clarity refuse la commande
  }
}

function revokeClarityConsent() {
  if (typeof window === 'undefined' || !window.clarity) return;
  try {
    window.clarity('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: 'denied',
    });
  } catch {
    // no-op
  }
}

function checkAndActivate() {
  // Opt-out interne ou bot : on ne charge rien.
  if (!shouldTrack()) return;
  try {
    const stored = localStorage.getItem('cookie-consent');
    if (!stored) return;
    const consent = JSON.parse(stored);
    if (consent?.analytics === true) {
      loadClarityTag();
    }
  } catch {
    // localStorage indisponible ou JSON invalide
  }
}

export default function ClarityConsent() {
  useEffect(() => {
    // Poser/retirer le flag opt-out si l'URL contient ?notrack=1|0
    checkAndSetOptOut();

    // Opt-out interne ou bot : on ne fait absolument rien (pas de stub,
    // pas d' couteur, pas de charge).
    if (!shouldTrack()) return;

    // Stub imm diat : les tags pos s par ClarityTracker avant consentement
    // sont queue's et rejou s d s que le tag Clarity est charg .
    installStub();

    // V rifier le consentement d j  stock 
    checkAndActivate();

    // R agir quand le CookieBanner met   jour le consentement
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.analytics === true) {
        loadClarityTag();
        // Cas o  le tag  tait d j  charg  : redonner le consentement
        // (idempotent) pour couvrir un go-accept apr s un accept-reject-accept
        grantClarityConsent();
      } else {
        // Retrait : signaler   Clarity que le consentement est r voqu .
        // Le script reste en place mais Clarity arr te de poser des cookies.
        revokeClarityConsent();
      }
    };

    window.addEventListener('cookie-consent-update', handler);
    return () => window.removeEventListener('cookie-consent-update', handler);
  }, []);

  return null;
}

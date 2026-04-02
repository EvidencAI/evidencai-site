'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';

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

export default function Analytics() {
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    console.log('[Analytics] Component mounted');
    console.log('[Analytics] GA_ID:', GA_MEASUREMENT_ID ? 'present' : 'missing');
    console.log('[Analytics] Clarity_ID:', CLARITY_PROJECT_ID ? 'present' : 'missing');

    const consent = getStoredConsent();
    console.log('[Analytics] Stored consent:', consent);

    if (consent?.analytics) setAnalyticsConsent(true);

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<CookieConsent>).detail;
      console.log('[Analytics] Consent updated:', detail);
      setAnalyticsConsent(detail.analytics);
    };
    window.addEventListener('cookie-consent-update', handler);
    return () => window.removeEventListener('cookie-consent-update', handler);
  }, []);

  return (
    <>
      {/* Google Analytics GA4 - Requires explicit consent */}
      {analyticsConsent && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              console.log('[Analytics] Loading Google Analytics');
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure',
              });
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity - Loaded as legitimate interest (no consent required under GDPR) */}
      {CLARITY_PROJECT_ID && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            console.log('[Analytics] Loading Microsoft Clarity');
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      )}
    </>
  );
}

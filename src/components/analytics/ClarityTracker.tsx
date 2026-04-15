'use client';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { clarityTag, clarityEvent } from '@/lib/clarity';

function getPageType(pathname: string): string {
  if (pathname.includes('/blog/')) return 'article';
  if (pathname.endsWith('/blog')) return 'blog_index';
  if (pathname.includes('/ateliers/inscription')) return 'atelier_inscription';
  if (pathname.includes('/ateliers')) return 'atelier';
  if (pathname.includes('/formation')) return 'formation';
  if (pathname.includes('/contact')) return 'contact';
  if (pathname.includes('/solutions')) return 'solutions';
  if (pathname.includes('/outils')) return 'outils';
  if (pathname.includes('/a-propos')) return 'a_propos';
  if (pathname.includes('/mentions-legales')) return 'mentions_legales';
  if (pathname.match(/^\/(fr|en)$/)) return 'homepage';
  return 'page';
}

// Variable module-level : survit aux remounts du composant
// causés par le Suspense boundary autour de useSearchParams
let lastSentPath = '';
let initialized = false;

function ClarityTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialisation unique : UTM, locale, referrer
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    const utmSource = searchParams.get('utm_source');
    const utmMedium = searchParams.get('utm_medium');
    const utmCampaign = searchParams.get('utm_campaign');
    if (utmSource) clarityTag('utm_source', utmSource);
    if (utmMedium) clarityTag('utm_medium', utmMedium);
    if (utmCampaign) clarityTag('utm_campaign', utmCampaign);

    const locale = pathname.startsWith('/en') ? 'en' : 'fr';
    clarityTag('locale', locale);

    if (document.referrer && !document.referrer.includes('evidencai.com')) {
      clarityTag('external_referrer', document.referrer);
    }

    clarityTag('page_type', getPageType(pathname));
    clarityTag('page_path', pathname);
    lastSentPath = pathname;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Navigations SPA : garde module-level contre le double fire
  useEffect(() => {
    if (pathname !== lastSentPath) {
      lastSentPath = pathname;
      clarityTag('page_path', pathname);
      clarityTag('page_type', getPageType(pathname));
      clarityEvent('spa_navigation');
    }
  }, [pathname]);

  return null;
}

export default function ClarityTracker() {
  return (
    <Suspense fallback={null}>
      <ClarityTrackerInner />
    </Suspense>
  );
}

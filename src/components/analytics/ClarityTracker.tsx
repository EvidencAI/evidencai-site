'use client';
import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

function ClarityTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname && window.clarity) {
      // Signaler le changement de page à Clarity
      window.clarity('set', 'page_path', pathname);

      // Détecter le type de page pour segmentation
      const pageType = pathname.includes('/blog/')
        ? 'article'
        : pathname.endsWith('/blog')
        ? 'blog_index'
        : pathname.includes('/ateliers')
        ? 'atelier'
        : pathname.includes('/formation')
        ? 'formation'
        : pathname.includes('/contact')
        ? 'contact'
        : pathname.includes('/solutions')
        ? 'solutions'
        : pathname.includes('/outils')
        ? 'outils'
        : pathname.includes('/a-propos')
        ? 'a_propos'
        : 'page';
      window.clarity('set', 'page_type', pageType);
      window.clarity('event', 'spa_navigation');
    }
    prevPathRef.current = pathname;
  }, [pathname, searchParams]);

  return null;
}

export default function ClarityTracker() {
  return (
    <Suspense fallback={null}>
      <ClarityTrackerInner />
    </Suspense>
  );
}

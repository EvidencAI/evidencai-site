'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/i18n/config';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();

  // Enlever la locale actuelle du pathname
  const pathnameWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';

  const otherLocale = currentLocale === 'fr' ? 'en' : 'fr';

  return (
    <div className="flex items-center bg-white/10 rounded-lg overflow-hidden text-sm font-medium h-9">
      <Link
        href={`/fr${pathnameWithoutLocale}`}
        className={`inline-flex items-center justify-center px-2.5 h-full transition-colors ${
          currentLocale === 'fr'
            ? 'bg-ambre text-bleu-nuit'
            : 'text-text-secondary hover:text-white'
        }`}
      >
        FR
      </Link>
      <Link
        href={`/en${pathnameWithoutLocale}`}
        className={`inline-flex items-center justify-center px-2.5 h-full transition-colors ${
          currentLocale === 'en'
            ? 'bg-ambre text-bleu-nuit'
            : 'text-text-secondary hover:text-white'
        }`}
      >
        EN
      </Link>
    </div>
  );
}

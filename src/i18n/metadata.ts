import type { Metadata } from 'next';
import type { Locale } from './config';

const baseUrl = 'https://www.evidencai.com';

/**
 * Génère les alternates hreflang pour une page donnée.
 * À inclure dans le generateMetadata() de chaque page.
 */
export function getAlternates(locale: Locale, path: string = ''): Pick<Metadata, 'alternates'> {
  return {
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: {
        'fr': `${baseUrl}/fr${path}`,
        'en': `${baseUrl}/en${path}`,
        'x-default': `${baseUrl}/fr${path}`,
      },
    },
  };
}

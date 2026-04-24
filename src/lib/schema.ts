/**
 * Helpers JSON-LD pour SEO / AEO.
 * Centralisé ici pour cohérence et évolution sans toucher à chaque page.
 */

import type { Locale } from '@/i18n/config';

const SITE_URL = 'https://www.evidencai.com';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Schéma BreadcrumbList pour afficher les fils d'ariane dans les SERP.
 * Accepte une liste de segments. Home est ajouté automatiquement.
 */
export function buildBreadcrumbSchema(
  locale: Locale,
  segments: BreadcrumbItem[]
) {
  const homeName = locale === 'fr' ? 'Accueil' : 'Home';
  const items = [
    { name: homeName, url: `${SITE_URL}/${locale}` },
    ...segments.map((s) => ({
      name: s.name,
      url: s.url.startsWith('http') ? s.url : `${SITE_URL}${s.url}`,
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Schéma FAQPage. Accepte une liste de {question, answer}.
 * Insère en dur le @type Question + acceptedAnswer.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export function buildFaqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Helper pour sérialiser un objet JSON-LD dans un <script>.
 * Évite la répétition du dangerouslySetInnerHTML dans chaque page.
 */
export function jsonLd(schema: object): string {
  return JSON.stringify(schema);
}

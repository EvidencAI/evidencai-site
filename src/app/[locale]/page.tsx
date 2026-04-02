import { locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getAlternates } from '@/i18n/metadata';
import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import FunnelSection from '@/components/home/FunnelSection';
import ValuesSection from '@/components/home/ValuesSection';
import PainPointsSection from '@/components/home/PainPointsSection';
import OutilsSection from '@/components/home/OutilsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export async function generateStaticParams(): Promise<{ locale: Locale }[]> {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.metadata.site.title,
    description: dict.metadata.site.description,
    keywords: dict.metadata.site.keywords,
    ...getAlternates(locale),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EvidencAI',
    url: 'https://www.evidencai.com',
    logo: 'https://www.evidencai.com/logo-evidencai.png',
    description: locale === 'fr'
      ? 'Accompagnement IA pragmatique pour dirigeants et PME/TPE. Ateliers, formations Qualiopi et solutions sur mesure.'
      : 'Pragmatic AI guidance for executives and SMBs. Workshops, Qualiopi-certified training and custom solutions.',
    founder: {
      '@type': 'Person',
      name: 'Stéphane Commenge',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '200 impasse Cheyssans',
      addressLocality: 'Châteauneuf-sur-Isère',
      postalCode: '26300',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@evidencai.com',
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
    },
    sameAs: [],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EvidencAI',
    url: 'https://www.evidencai.com',
    inLanguage: [locale === 'fr' ? 'fr-FR' : 'en-US'],
    potentialAction: {
      '@type': 'ReadAction',
      target: `https://www.evidencai.com/${locale}`,
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.evidencai.com/#localbusiness',
    name: 'EvidencAI',
    description: locale === 'fr'
      ? 'Accompagnement IA pragmatique pour dirigeants et PME/TPE'
      : 'Pragmatic AI guidance for executives and SMBs',
    url: 'https://www.evidencai.com',
    email: 'contact@evidencai.com',
    image: 'https://www.evidencai.com/logo-evidencai.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '200 impasse Cheyssans',
      addressLocality: 'Châteauneuf-sur-Isère',
      postalCode: '26300',
      addressRegion: 'Auvergne-Rhône-Alpes',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.9833,
      longitude: 4.9333,
    },
    priceRange: '€€',
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    founder: {
      '@type': 'Person',
      name: 'Stéphane Commenge',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'AI Consulting',
      'AI Training',
      'Digital Transformation',
      'Claude Anthropic',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Hero dict={dict} locale={locale} />
      <FunnelSection dict={dict} locale={locale} />
      <ValuesSection dict={dict} />
      <PainPointsSection dict={dict} locale={locale} />
      <OutilsSection dict={dict} locale={locale} />
      <TestimonialsSection dict={dict} />
    </>
  );
}

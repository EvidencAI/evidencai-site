import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import Link from 'next/link';
import { getDictionary } from '@/i18n/dictionaries';
import { getAlternates } from '@/i18n/metadata';
import { locales, type Locale } from '@/i18n/config';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.contact.metadata.title,
    description: dict.contact.metadata.description,
    openGraph: {
      title: dict.contact.metadata.ogTitle,
      description: dict.contact.metadata.ogDescription,
      url: `https://www.evidencai.com/${locale}/contact`,
    },
    ...getAlternates(locale, '/contact'),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="bg-bleu-nuit">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
                {dict.contact.hero.title}
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                {dict.contact.hero.subtitle}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-gray-900">
              <ContactForm dict={dict.contact.form} locale={locale} />
            </div>

            {/* Calendly CTA */}
            <div className="mt-10 text-center">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <p className="text-white font-semibold text-lg mb-2">
                  {dict.contact.calendly.title}
                </p>
                <p className="text-text-secondary text-sm mb-6">
                  {dict.contact.calendly.subtitle}
                </p>
                <a
                  href="https://calendly.com/stephane-commenge/echange-decouverte-ia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-ambre text-white font-semibold rounded-lg hover:bg-ambre-light transition-colors"
                >
                  {dict.contact.calendly.cta}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Coordonnées */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{dict.contact.coordonnees.email.label}</p>
                <a
                  href={`mailto:${dict.contact.coordonnees.email.value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ambre hover:text-ambre-light transition-colors text-sm"
                >
                  {dict.contact.coordonnees.email.value}
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{dict.contact.coordonnees.adresse.label}</p>
                <p className="text-text-secondary text-sm whitespace-pre-line">
                  {dict.contact.coordonnees.adresse.value}
                </p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{dict.contact.coordonnees.linkedin.label}</p>
                <a
                  href="https://linkedin.com/in/stephanecommenge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ambre hover:text-ambre-light transition-colors text-sm"
                >
                  {dict.contact.coordonnees.linkedin.value}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

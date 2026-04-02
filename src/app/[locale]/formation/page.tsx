import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import FormationCatalogueDetails from '@/components/formation/FormationCatalogueDetails';
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
    title: dict.formation.metadata.title,
    description: dict.formation.metadata.description,
    openGraph: {
      title: dict.formation.metadata.ogTitle,
      description: dict.formation.metadata.ogDescription,
      url: `https://evidencai.com/${locale}/formation`,
    },
    ...getAlternates(locale, '/formation'),
  };
}

export default async function FormationPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  const CheckIcon = () => (
    <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  const AmbreCheck = () => (
    <svg className="w-5 h-5 text-ambre flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  const surMesure = [
    {
      titre: dict.formation.surmesure.situations.parler.titre,
      soustitre: dict.formation.surmesure.situations.parler.soustitre,
      description: dict.formation.surmesure.situations.parler.description,
      reponse: dict.formation.surmesure.situations.parler.reponse,
    },
    {
      titre: dict.formation.surmesure.situations.debrouiller.titre,
      soustitre: dict.formation.surmesure.situations.debrouiller.soustitre,
      description: dict.formation.surmesure.situations.debrouiller.description,
      reponse: dict.formation.surmesure.situations.debrouiller.reponse,
    },
    {
      titre: dict.formation.surmesure.situations.retard.titre,
      soustitre: dict.formation.surmesure.situations.retard.soustitre,
      description: dict.formation.surmesure.situations.retard.description,
      reponse: dict.formation.surmesure.situations.retard.reponse,
    },
    {
      titre: dict.formation.surmesure.situations.generique.titre,
      soustitre: dict.formation.surmesure.situations.generique.soustitre,
      description: dict.formation.surmesure.situations.generique.description,
      reponse: dict.formation.surmesure.situations.generique.reponse,
    },
  ];

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: locale === 'fr' ? 'Formation IA pour entreprises' : 'AI Training for Businesses',
    description: locale === 'fr'
      ? 'Formations inter-entreprises et intra-entreprises pour intégrer l\'IA dans votre activité. Certifié Qualiopi via ALIA Formation. Financement OPCO possible.'
      : 'Inter-company and in-company training to integrate AI into your business. Qualiopi-certified via ALIA Formation. OPCO funding available.',
    provider: {
      '@type': 'Organization',
      name: 'EvidencAI',
      url: 'https://www.evidencai.com',
    },
    educationalCredentialAwarded: 'Qualiopi (via ALIA Formation)',
    isAccessibleForFree: false,
    inLanguage: locale === 'fr' ? 'fr' : 'en',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: locale === 'fr' ? 'Dirigeants et équipes de PME/TPE' : 'SMB executives and teams',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: locale === 'fr' ? 'Les formations EvidencAI sont-elles éligibles au financement OPCO ?' : 'Are EvidencAI trainings eligible for OPCO funding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'fr'
            ? 'Oui. Les formations sont dispensées en partenariat avec ALIA Formation, organisme certifié Qualiopi. Le financement OPCO est possible selon votre branche professionnelle.'
            : 'Yes. Training is delivered in partnership with ALIA Formation, a Qualiopi-certified organization. OPCO funding is available depending on your professional sector.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'fr' ? 'Quelle est la différence entre un atelier et une formation ?' : 'What is the difference between a workshop and a training course?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'fr'
            ? 'L\'atelier est une session de 2h en visio pour découvrir l\'IA au quotidien (120€ TTC). La formation est un programme plus complet (1 à 5 jours), inter ou intra-entreprise, avec des mises en pratique sur vos cas métier.'
            : 'A workshop is a 2-hour remote session to discover everyday AI use (€120 incl. VAT). Training is a more comprehensive program (1-5 days), inter or intra-company, with hands-on practice on your business cases.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'fr' ? 'Les formations sont-elles adaptées aux débutants en IA ?' : 'Are the training courses suitable for AI beginners?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'fr'
            ? 'Absolument. Notre approche est progressive : on part de votre niveau actuel. Pas de jargon technique, des démonstrations concrètes sur vos cas réels.'
            : 'Absolutely. Our approach is progressive: we start from your current level. No technical jargon, concrete demonstrations on your real use cases.',
        },
      },
    ],
  };

  return (
    <div className="bg-bleu-nuit">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              {dict.formation.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed whitespace-pre-line">
              {dict.formation.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ================================ */}
      {/* Section Catalogue */}
      {/* ================================ */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="intermediaire" className="mb-4 text-sm px-4 py-1.5">{dict.formation.catalogue.badge}</Badge>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
                {dict.formation.catalogue.title}
              </h2>
              <p className="text-ambre text-lg mt-2 font-medium">{dict.formation.catalogue.subtitle}</p>
            </div>

            <Card className="max-w-4xl mx-auto">
              {/* En-tête formation */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-ambre">{dict.formation.catalogue.price} <span className="text-base font-normal text-gray-500">{dict.formation.catalogue.priceUnit}</span></p>
                  <p className="text-gray-600 mt-1">{dict.formation.catalogue.duration}</p>
                </div>
                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  {dict.formation.catalogue.certifications.map((cert, i) => (
                    <span key={i} className="flex items-center gap-2">
                      <CheckIcon />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Objectifs pédagogiques */}
              <div className="mb-8">
                <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-4">{dict.formation.catalogue.objectifs.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{dict.formation.catalogue.objectifs.subtitle}</p>
                <ul className="space-y-2">
                  {dict.formation.catalogue.objectifs.items.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <AmbreCheck />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dates */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-bleu-nuit mb-3">{dict.formation.catalogue.sessions.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {dict.formation.catalogue.sessions.items.map((session, i) => (
                    <div key={i} className="text-center p-3 bg-white rounded-lg border border-gray-200">
                      <p className="font-semibold text-bleu-nuit">{session.dates}</p>
                      <p className="text-sm text-gray-500">{session.location}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accordéons : détails */}
              <FormationCatalogueDetails />
            </Card>
          </div>
        </div>
      </section>

      {/* ================================ */}
      {/* Section Sur Mesure */}
      {/* ================================ */}
      <section className="py-16 md:py-24 bg-bleu-nuit-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="confirme" className="mb-4 text-sm px-4 py-1.5">{dict.formation.surmesure.badge}</Badge>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4 whitespace-pre-line">
                {dict.formation.surmesure.title}
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto whitespace-pre-line">
                {dict.formation.surmesure.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
              {surMesure.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-ambre/30 transition-colors flex flex-col h-full"
                >
                  <h3 className="font-playfair text-lg font-bold text-white leading-snug">
                    {item.titre}
                  </h3>
                  {item.soustitre && (
                    <p className="font-playfair text-lg font-bold text-white mb-3 leading-snug">
                      {item.soustitre}
                    </p>
                  )}
                  {!item.soustitre && <div className="mb-3" />}
                  <div className="text-text-secondary text-sm leading-relaxed flex-grow">
                    {item.description.split('\n').map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </div>
                  <p className="text-ambre text-sm font-medium mt-4">
                    {item.reponse}
                  </p>
                </div>
              ))}
            </div>

            {/* Bandeau ALIA / Qualiopi */}
            <div className="text-center mb-8">
              <p className="text-text-secondary text-sm whitespace-pre-line">
                {dict.formation.surmesure.qualiopi}
              </p>
            </div>

            {/* CTA Calendly */}
            <div className="text-center">
              <Link
                href="https://calendly.com/stephane-commenge/echange-decouverte-ia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-ambre text-bleu-nuit font-semibold rounded-lg hover:bg-ambre-light transition-all text-lg"
              >
                {dict.formation.surmesure.cta.text}
              </Link>
              <p className="text-text-secondary text-sm mt-4 whitespace-pre-line">
                {dict.formation.surmesure.cta.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

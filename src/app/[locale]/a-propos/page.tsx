import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { getDictionary } from '@/i18n/dictionaries';
import { getAlternates } from '@/i18n/metadata';
import { locales, type Locale } from '@/i18n/config';
import { buildBreadcrumbSchema, buildFaqSchema, jsonLd } from '@/lib/schema';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.apropos.metadata.title,
    description: dict.apropos.metadata.description,
    openGraph: {
      title: dict.apropos.metadata.ogTitle,
      description: dict.apropos.metadata.ogDescription,
      url: `https://www.evidencai.com/${locale}/a-propos`,
    },
    ...getAlternates(locale, '/a-propos'),
  };
}

export default async function AProposPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  // Schema.org Person structured data
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: dict.apropos.hero.name,
    jobTitle: dict.apropos.hero.title,
    description: locale === 'fr'
      ? 'Président de CORA, fondateur d\'EvidencAI, juge consulaire au Tribunal de Commerce de Romans-sur-Isère. Accompagne dirigeants et PME dans l\'adoption pragmatique de l\'IA.'
      : 'President of CORA, founder of EvidencAI, consular judge at the Commercial Court of Romans-sur-Isère. Helps executives and SMBs adopt AI pragmatically.',
    worksFor: {
      '@type': 'Organization',
      name: 'EvidencAI',
      url: 'https://www.evidencai.com',
    },
    url: `https://www.evidencai.com/${locale}/a-propos`,
    image: 'https://www.evidencai.com/logo-evidencai.png',
    sameAs: [
      'https://www.linkedin.com/in/st%C3%A9phane-commenge-7463ba20/',
      'https://www.linkedin.com/company/evidencai',
    ],
    knowsAbout: [
      'Intelligence Artificielle',
      'Formation professionnelle',
      'Claude AI',
      'Anthropic',
      'Conseil en IA',
      'Transformation numérique PME',
      'AI Act',
      'Adoption IA entreprise',
    ],
    nationality: { '@type': 'Country', name: 'France' },
    homeLocation: {
      '@type': 'Place',
      name: 'Drôme, Auvergne-Rhône-Alpes, France',
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema(locale, [
    {
      name: locale === 'fr' ? 'À propos' : 'About',
      url: `/${locale}/a-propos`,
    },
  ]);

  const faqSchema = buildFaqSchema(
    locale === 'fr'
      ? [
          {
            question: 'Qui est Stéphane Commenge ?',
            answer: 'Stéphane Commenge est le fondateur d\'EvidencAI, président de CORA (conseil et formation en IA), et juge consulaire au Tribunal de Commerce de Romans-sur-Isère. Il accompagne dirigeants et PME dans l\'adoption pragmatique de l\'intelligence artificielle depuis 2024, avec une approche ancrée sur le terrain et non dogmatique.',
          },
          {
            question: 'Pourquoi EvidencAI ?',
            answer: 'EvidencAI est né du constat que 95% des projets IA en entreprise n\'atteignent jamais la production. La cause : trop de démonstrations, pas assez d\'ancrage métier. EvidencAI apporte une méthode simple, centrée sur les irritants concrets des PME, avec une conviction forte : l\'IA ne remplace pas, elle augmente.',
          },
          {
            question: 'Quelle est la spécialité d\'EvidencAI ?',
            answer: 'EvidencAI est spécialisé dans l\'accompagnement des dirigeants et cadres de PME/TPE sur l\'adoption de l\'IA générative. Trois axes : formation certifiée Qualiopi, diagnostic de maturité, construction de solutions sur mesure. Zone d\'intervention principale : Auvergne-Rhône-Alpes (Drôme, Ardèche, Isère, Rhône).',
          },
          {
            question: 'Quelle IA est utilisée par EvidencAI ?',
            answer: 'EvidencAI travaille principalement avec Claude (Anthropic) pour ses garanties éthiques et sa qualité de raisonnement, mais les formations couvrent également ChatGPT, Copilot, Gemini et Mistral. Le choix de l\'outil dépend du cas d\'usage et des contraintes de l\'entreprise, notamment sur la localisation des données.',
          },
        ]
      : [
          {
            question: 'Who is Stéphane Commenge?',
            answer: 'Stéphane Commenge is the founder of EvidencAI, president of CORA (AI consulting and training), and consular judge at the Commercial Court of Romans-sur-Isère, France. He has been supporting executives and SMBs in pragmatic AI adoption since 2024, with a grounded, non-dogmatic approach.',
          },
          {
            question: 'Why EvidencAI?',
            answer: 'EvidencAI was founded on the observation that 95% of enterprise AI projects never reach production. The cause: too many demos, not enough business anchoring. EvidencAI brings a simple method focused on concrete SMB pain points, with a strong conviction: AI doesn\'t replace, it augments.',
          },
          {
            question: 'What is EvidencAI\'s specialty?',
            answer: 'EvidencAI specializes in supporting SMB executives and managers on generative AI adoption. Three focus areas: Qualiopi-certified training, maturity assessment, custom solution building. Primary service area: Auvergne-Rhône-Alpes region in France (Drôme, Ardèche, Isère, Rhône).',
          },
          {
            question: 'Which AI does EvidencAI use?',
            answer: 'EvidencAI primarily uses Claude (Anthropic) for its ethical guarantees and reasoning quality, but training also covers ChatGPT, Copilot, Gemini and Mistral. Tool selection depends on the use case and company constraints, notably data localization.',
          },
        ]
  );

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
      />

      <div className="bg-bleu-nuit">
        {/* Hero Section - Photo + Identité */}
        <section className="pt-16 md:pt-24 pb-8 md:pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-col items-center md:flex-row md:items-end gap-8">
              {/* Photo */}
              <div className="shrink-0">
                <div className="w-48 h-48 md:w-56 md:h-56 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                  <svg
                    className="w-20 h-20 text-white/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              {/* Identité */}
              <div className="text-center md:text-left">
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-3">
                  {dict.apropos.hero.name}
                </h1>
                <p className="text-xl text-ambre font-semibold mb-4">
                  {dict.apropos.hero.title}
                </p>
                <a
                  href="https://www.linkedin.com/in/st%C3%A9phane-commenge-7463ba20/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ambre hover:text-ambre-light transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  {dict.apropos.hero.linkedin}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Parcours - Texte pleine largeur */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6 text-text-secondary leading-relaxed">
              {dict.apropos.parcours.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Valeurs & Vision */}
        <section className="py-16 md:py-24 bg-bleu-nuit-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                {dict.apropos.valeurs.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-4">
                    {dict.apropos.valeurs.items.conviction.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {dict.apropos.valeurs.items.conviction.text}
                  </p>
                </Card>

                <Card>
                  <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-4">
                    {dict.apropos.valeurs.items.claude.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {dict.apropos.valeurs.items.claude.text}
                  </p>
                </Card>

                <Card>
                  <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-4">
                    {dict.apropos.valeurs.items.ameliore.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {dict.apropos.valeurs.items.ameliore.text}
                  </p>
                </Card>

                <Card>
                  <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-4">
                    {dict.apropos.valeurs.items.voir.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {dict.apropos.valeurs.items.voir.text}
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
                {dict.apropos.cta.title}
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                {dict.apropos.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/ateliers`}
                  className="min-h-[48px] px-8 py-3 bg-ambre text-bleu-nuit font-semibold rounded-lg hover:bg-ambre-light transition-all"
                >
                  {dict.apropos.cta.ateliers}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="min-h-[48px] px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-bleu-nuit transition-all"
                >
                  {dict.apropos.cta.contact}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

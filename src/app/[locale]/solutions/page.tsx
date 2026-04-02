import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, TrendingUp, Search, Users, Wrench, MessageCircle, Brain, ShieldX, Gauge, Heart, Zap } from 'lucide-react';
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
    title: dict.solutions.metadata.title,
    description: dict.solutions.metadata.description,
    openGraph: {
      title: dict.solutions.metadata.ogTitle,
      description: dict.solutions.metadata.ogDescription,
    },
    ...getAlternates(locale, '/solutions'),
  };
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'fr' ? 'Audit & Implémentation IA' : 'AI Audit & Implementation',
    description: locale === 'fr'
      ? 'Mission complète : diagnostic de maturité IA, acculturation des équipes et implémentation de solutions sur mesure pour PME/TPE.'
      : 'Complete mission: AI maturity assessment, team acculturation and custom solution implementation for SMBs.',
    provider: {
      '@type': 'Organization',
      name: 'EvidencAI',
      url: 'https://www.evidencai.com',
    },
    serviceType: 'AI Consulting',
    areaServed: { '@type': 'Country', name: 'France' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'fr' ? 'Prestations IA' : 'AI Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'Diagnostic IA' : 'AI Assessment' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'Acculturation IA' : 'AI Acculturation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'Construction de solutions' : 'Solution Building' } },
      ],
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: locale === 'fr' ? 'Comment intégrer l\'IA dans votre entreprise' : 'How to integrate AI into your business',
    description: locale === 'fr'
      ? 'Méthode en 3 étapes pour une intégration IA progressive et adaptée à votre rythme.'
      : 'A 3-step method for progressive AI integration adapted to your pace.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: locale === 'fr' ? 'Diagnostiquer' : 'Assess',
        text: locale === 'fr'
          ? 'On écoute, on observe, on cartographie. Quels processus ? Quelles douleurs ? Quel niveau de maturité IA dans vos équipes ?'
          : 'We listen, observe, and map. What processes? What pain points? What AI maturity level in your teams?',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: locale === 'fr' ? 'Acculturer' : 'Acculturate',
        text: locale === 'fr'
          ? 'Vos équipes découvrent ce que l\'IA sait faire, ce qu\'elle ne sait pas faire, et où elle peut les aider concrètement.'
          : 'Your teams discover what AI can and cannot do, and where it can concretely help them.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: locale === 'fr' ? 'Construire' : 'Build',
        text: locale === 'fr'
          ? 'On commence petit. Un outil, un processus, un gain mesurable. Puis on élargit si ça fait sens.'
          : 'We start small. One tool, one process, one measurable gain. Then we scale if it makes sense.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: locale === 'fr' ? 'Que peut faire l\'IA pour une PME ou TPE ?' : 'What can AI do for an SMB?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'fr'
            ? 'L\'IA agit sur trois leviers : faire ce qui était impossible (accéder à des compétences hors de portée), gagner du temps (automatiser les tâches répétitives), et augmenter la qualité (améliorer les analyses, synthèses et prises de décision).'
            : 'AI acts on three levers: doing what was impossible (accessing skills beyond reach), saving time (automating repetitive tasks), and improving quality (better analysis, summaries and decision-making).',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'fr' ? 'Faut-il former les équipes avant d\'implémenter l\'IA ?' : 'Should teams be trained before implementing AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'fr'
            ? 'Oui. La plupart des projets IA échouent parce qu\'on installe des outils avant que les équipes comprennent ce que l\'IA sait et ne sait pas faire. L\'acculturation est la clé de l\'adoption.'
            : 'Yes. Most AI projects fail because tools are installed before teams understand what AI can and cannot do. Acculturation is the key to adoption.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'fr' ? 'Quelles sont les limites de l\'IA ?' : 'What are AI\'s limitations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'fr'
            ? 'L\'IA ne comprend pas votre métier toute seule, ne remplace pas le jugement humain, ne garantit pas zéro erreur (hallucinations possibles), et ne fonctionne pas sans méthode ni accompagnement.'
            : 'AI doesn\'t understand your business on its own, doesn\'t replace human judgment, doesn\'t guarantee zero errors (hallucinations are possible), and doesn\'t work without method and support.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'fr' ? 'Combien de temps dure un accompagnement IA ?' : 'How long does an AI engagement take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'fr'
            ? 'Le diagnostic prend 1 à 2 jours, l\'acculturation 1 à 5 jours, et la construction est sur mesure. Chaque étape est autonome : vous pouvez commencer par un diagnostic seul.'
            : 'Assessment takes 1-2 days, acculturation 1-5 days, and building is custom. Each step is self-contained: you can start with assessment alone.',
        },
      },
    ],
  };

  return (
    <div className="bg-bleu-nuit">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-ambre font-semibold text-sm uppercase tracking-widest mb-4">{dict.solutions.hero.badge}</p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              {dict.solutions.hero.title}
              <br />
              <span className="text-ambre">{dict.solutions.hero.titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
              {dict.solutions.hero.subtitle}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-ambre/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Comprendre avant d'agir */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bleu-nuit mb-6">
                {dict.solutions.comprendre.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
                {dict.solutions.comprendre.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Users,
                  title: dict.solutions.comprendre.etapes.equipes.title,
                  text: dict.solutions.comprendre.etapes.equipes.text,
                },
                {
                  icon: Search,
                  title: dict.solutions.comprendre.etapes.identifier.title,
                  text: dict.solutions.comprendre.etapes.identifier.text,
                },
                {
                  icon: Wrench,
                  title: dict.solutions.comprendre.etapes.construire.title,
                  text: dict.solutions.comprendre.etapes.construire.text,
                },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.title} className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100">
                    <IconComponent className="w-10 h-10 text-ambre mx-auto mb-4" />
                    <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Les leviers */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bleu-nuit mb-4">
                {dict.solutions.leviers.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {/* Levier 1 */}
              <div className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
                <Zap className="w-10 h-10 text-ambre mx-auto mb-4" />
                <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-3">{dict.solutions.leviers.impossible.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-5">{dict.solutions.leviers.impossible.description}</p>
                <div className="text-left space-y-2.5 mt-4 pt-4 border-t border-gray-100">
                  {dict.solutions.leviers.impossible.exemples.map((ex: string) => (
                    <div key={ex} className="flex items-start gap-2">
                      <Zap className="w-3.5 h-3.5 text-ambre flex-shrink-0 mt-1" />
                      <p className="text-gray-500 text-sm">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Levier 2 */}
              <div className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
                <Clock className="w-10 h-10 text-ambre mx-auto mb-4" />
                <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-3">{dict.solutions.leviers.temps.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-5">{dict.solutions.leviers.temps.description}</p>
                <div className="text-left space-y-2.5 mt-4 pt-4 border-t border-gray-100">
                  {dict.solutions.leviers.temps.exemples.map((ex: string) => (
                    <div key={ex} className="flex items-start gap-2">
                      <Gauge className="w-3.5 h-3.5 text-ambre flex-shrink-0 mt-1" />
                      <p className="text-gray-500 text-sm">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Levier 3 */}
              <div className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
                <TrendingUp className="w-10 h-10 text-ambre mx-auto mb-4" />
                <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-3">{dict.solutions.leviers.qualite.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-5">{dict.solutions.leviers.qualite.description}</p>
                <div className="text-left space-y-2.5 mt-4 pt-4 border-t border-gray-100">
                  {dict.solutions.leviers.qualite.exemples.map((ex: string) => (
                    <div key={ex} className="flex items-start gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-ambre flex-shrink-0 mt-1" />
                      <p className="text-gray-500 text-sm">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* La méthode */}
      <section className="py-16 md:py-24 bg-bleu-nuit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                {dict.solutions.methode.title}
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                {dict.solutions.methode.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  step: dict.solutions.methode.etapes.diagnostiquer.step,
                  title: dict.solutions.methode.etapes.diagnostiquer.title,
                  description: dict.solutions.methode.etapes.diagnostiquer.description,
                  duration: dict.solutions.methode.etapes.diagnostiquer.duration,
                },
                {
                  step: dict.solutions.methode.etapes.acculturer.step,
                  title: dict.solutions.methode.etapes.acculturer.title,
                  description: dict.solutions.methode.etapes.acculturer.description,
                  duration: dict.solutions.methode.etapes.acculturer.duration,
                },
                {
                  step: dict.solutions.methode.etapes.construire.step,
                  title: dict.solutions.methode.etapes.construire.title,
                  description: dict.solutions.methode.etapes.construire.description,
                  duration: dict.solutions.methode.etapes.construire.duration,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-ambre/30 transition-colors"
                >
                  <span className="text-ambre font-mono text-sm font-bold">{item.step}</span>
                  <h3 className="font-playfair text-xl font-bold text-white mt-2 mb-3">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm mb-4">{item.description}</p>
                  <p className="text-ambre/70 text-xs font-semibold uppercase tracking-wide">{item.duration}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-text-secondary text-sm">
                {dict.solutions.methode.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que l'IA ne sait pas faire */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bleu-nuit mb-4">
                {dict.solutions.pasaire.title}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {dict.solutions.pasaire.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  icon: Brain,
                  title: dict.solutions.pasaire.items.comprendre.title,
                  text: dict.solutions.pasaire.items.comprendre.text,
                },
                {
                  icon: Heart,
                  title: dict.solutions.pasaire.items.jugement.title,
                  text: dict.solutions.pasaire.items.jugement.text,
                },
                {
                  icon: ShieldX,
                  title: dict.solutions.pasaire.items.erreur.title,
                  text: dict.solutions.pasaire.items.erreur.text,
                },
                {
                  icon: MessageCircle,
                  title: dict.solutions.pasaire.items.methode.title,
                  text: dict.solutions.pasaire.items.methode.text,
                },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group flex gap-5 p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:border-ambre/40 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-bleu-nuit/5 rounded-xl flex items-center justify-center group-hover:bg-ambre/10 transition-colors">
                      <IconComponent className="w-6 h-6 text-bleu-nuit group-hover:text-ambre transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-bleu-nuit mb-2">{item.title}</h3>
                      <p className="text-gray-500 leading-relaxed text-sm">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-bleu-nuit-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              {dict.solutions.cta.title}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              {dict.solutions.cta.subtitle}
            </p>
            <Link
              href="https://calendly.com/stephane-commenge/rdv-solution-ia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-ambre text-bleu-nuit font-semibold rounded-lg hover:bg-ambre-light transition-all text-lg"
            >
              {dict.solutions.cta.button}
            </Link>
            <p className="text-text-secondary text-sm mt-4">
              {dict.solutions.cta.footer.split('<Link>')[0]}
              <Link href={`/${locale}/contact`} className="text-ambre hover:underline">{dict.solutions.cta.footer.split('<Link>')[1]?.split('</Link>')[0] || 'page contact'}</Link>
              {dict.solutions.cta.footer.split('</Link>')[1]}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

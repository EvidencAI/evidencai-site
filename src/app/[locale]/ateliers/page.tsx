import type { Metadata } from 'next';
import AtelierCard from '@/components/ateliers/AtelierCard';
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
    title: dict.ateliers.metadata.title,
    description: dict.ateliers.metadata.description,
    openGraph: {
      title: dict.ateliers.metadata.ogTitle,
      description: dict.ateliers.metadata.ogDescription,
      url: `https://www.evidencai.com/${locale}/ateliers`,
    },
    ...getAlternates(locale, '/ateliers'),
  };
}

export default async function AteliersPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  const ateliers = [
    {
      id: 'comprendre',
      title: dict.ateliers.modules.comprendre.title,
      level: dict.ateliers.modules.comprendre.level as 'debutant' | 'intermediaire' | 'confirme',
      duration: dict.ateliers.modules.comprendre.duration,
      price: dict.ateliers.modules.comprendre.price,
      description: dict.ateliers.modules.comprendre.description,
      topics: dict.ateliers.modules.comprendre.topics,
      calendlyUrl: 'https://calendly.com/stephane-commenge/comprendre-l-ia-pour-un-usage-lucide-et-efficient',
      sessions: [
        {
          date: '22 avril 2026',
          time: '9h - 11h',
          spots: 4,
          bookingUrl: 'https://calendly.com/stephane-commenge/comprendre-l-ia-pour-un-usage-lucide-et-efficient/2026-04-22T07:00:00+00:00',
        },
        {
          date: '19 mai 2026',
          time: '14h - 16h',
          spots: 5,
          bookingUrl: 'https://calendly.com/stephane-commenge/comprendre-l-ia-pour-un-usage-lucide-et-efficient/2026-05-19T12:00:00+00:00',
        },
      ],
    },
    {
      id: 'maitriser',
      title: dict.ateliers.modules.maitriser.title,
      level: dict.ateliers.modules.maitriser.level as 'debutant' | 'intermediaire' | 'confirme',
      duration: dict.ateliers.modules.maitriser.duration,
      price: dict.ateliers.modules.maitriser.price,
      description: dict.ateliers.modules.maitriser.description,
      topics: dict.ateliers.modules.maitriser.topics,
      calendlyUrl: 'https://calendly.com/stephane-commenge/maitriser-claude',
      sessions: [
        {
          date: '28 avril 2026',
          time: '9h - 11h',
          spots: 5,
          bookingUrl: 'https://calendly.com/stephane-commenge/maitriser-claude/2026-04-28T07:00:00+00:00',
        },
        {
          date: '26 mai 2026',
          time: '14h - 16h',
          spots: 5,
          bookingUrl: 'https://calendly.com/stephane-commenge/maitriser-claude/2026-05-26T12:00:00+00:00',
        },
      ],
    },
    {
      id: 'outils',
      title: dict.ateliers.modules.outils.title,
      level: dict.ateliers.modules.outils.level as 'debutant' | 'intermediaire' | 'confirme',
      duration: dict.ateliers.modules.outils.duration,
      price: dict.ateliers.modules.outils.price,
      description: dict.ateliers.modules.outils.description,
      topics: dict.ateliers.modules.outils.topics,
      calendlyUrl: 'https://calendly.com/stephane-commenge/les-outils',
      sessions: [
        {
          date: '29 avril 2026',
          time: '9h - 11h',
          spots: 5,
          bookingUrl: 'https://calendly.com/stephane-commenge/les-outils/2026-04-29T07:00:00+00:00',
        },
        {
          date: '27 mai 2026',
          time: '14h - 16h',
          spots: 5,
          bookingUrl: 'https://calendly.com/stephane-commenge/les-outils/2026-05-27T12:00:00+00:00',
        },
      ],
    },
    {
      id: 'connecter',
      title: dict.ateliers.modules.connecter.title,
      level: dict.ateliers.modules.connecter.level as 'debutant' | 'intermediaire' | 'confirme',
      duration: dict.ateliers.modules.connecter.duration,
      price: dict.ateliers.modules.connecter.price,
      description: dict.ateliers.modules.connecter.description,
      topics: dict.ateliers.modules.connecter.topics,
      calendlyUrl: 'https://calendly.com/stephane-commenge/les-outils-ia',
      sessions: [
        {
          date: '30 avril 2026',
          time: '9h - 11h',
          spots: 5,
          bookingUrl: 'https://calendly.com/stephane-commenge/les-outils-ia/2026-04-30T07:00:00+00:00',
        },
        {
          date: '28 mai 2026',
          time: '14h - 16h',
          spots: 5,
          bookingUrl: 'https://calendly.com/stephane-commenge/les-outils-ia/2026-05-28T12:00:00+00:00',
        },
      ],
    },
  ];

  const faqItems = [
    {
      question: dict.ateliers.faq.items.niveau.question,
      answer: dict.ateliers.faq.items.niveau.answer,
    },
    {
      question: dict.ateliers.faq.items.ordre.question,
      answer: dict.ateliers.faq.items.ordre.answer,
    },
    {
      question: dict.ateliers.faq.items.format.question,
      answer: dict.ateliers.faq.items.format.answer,
    },
    {
      question: dict.ateliers.faq.items.preparation.question,
      answer: dict.ateliers.faq.items.preparation.answer,
    },
    {
      question: dict.ateliers.faq.items.paiement.question,
      answer: dict.ateliers.faq.items.paiement.answer,
    },
    {
      question: dict.ateliers.faq.items.remboursement.question,
      answer: dict.ateliers.faq.items.remboursement.answer,
    },
    {
      question: dict.ateliers.faq.items.participants.question,
      answer: dict.ateliers.faq.items.participants.answer,
    },
    {
      question: dict.ateliers.faq.items.supports.question,
      answer: dict.ateliers.faq.items.supports.answer,
    },
  ];

  // Schema.org structured data for FAQ
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-bleu-nuit">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
                {dict.ateliers.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed whitespace-pre-line">
                {dict.ateliers.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Ateliers Cards */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {ateliers.map((atelier) => (
                <AtelierCard key={atelier.id} module={atelier} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-bleu-nuit-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                {dict.ateliers.faq.title}
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <h3 className="font-semibold text-lg text-white mb-3">
                      {item.question}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

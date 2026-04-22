import type { Metadata } from 'next';
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
    title: dict.formations.metadata.title,
    description: dict.formations.metadata.description,
    openGraph: {
      title: dict.formations.metadata.ogTitle,
      description: dict.formations.metadata.ogDescription,
      url: `https://www.evidencai.com/${locale}/formations`,
    },
    ...getAlternates(locale, '/formations'),
  };
}

export default async function FormationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

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

  return (
    <div className="bg-bleu-nuit">
      {/* ================================ */}
      {/* Section 1 — Hero */}
      {/* ================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {dict.formations.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-text-primary max-w-3xl mx-auto">
            {dict.formations.hero.subtitle}
          </p>
        </div>
      </section>

      {/* ================================ */}
      {/* Section 2 — Card Formation Catalogue */}
      {/* ================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href={`/${locale}/formations/decider-avec-ia`}
            className="block bg-fond-surface border border-bleu-subtil rounded-2xl p-8 hover:border-ambre hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-ambre border border-ambre/30 px-3 py-1 rounded-full">
                    {dict.formations.catalogue.deciderAvecIA.badge}
                  </span>
                </div>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">
                  {dict.formations.catalogue.deciderAvecIA.titre}
                </h2>
                <p className="text-ambre text-lg md:text-xl font-medium mb-4">
                  {dict.formations.catalogue.deciderAvecIA.soustitre}
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  {dict.formations.catalogue.deciderAvecIA.description}
                </p>
                <div className="font-mono text-xs text-text-secondary">
                  {locale === 'fr' ? 'Prochaines sessions : ' : 'Next sessions: '}
                  {dict.formation.sessions.items.map((session, i) => (
                    <span key={i}>
                      {i > 0 && ' · '}
                      <span className="text-text-primary">{session.dates.replace(' 2026', '')}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:text-right flex-shrink-0">
                <div className="font-playfair text-3xl font-bold text-white">
                  {dict.formations.catalogue.deciderAvecIA.prix}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambre scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      {/* ================================ */}
      {/* Section 3 — Sur mesure */}
      {/* ================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-ambre border border-ambre/30 px-4 py-1.5 rounded-full inline-block mb-6">
              {dict.formation.surmesure.badge}
            </span>
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
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col h-full"
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

          <div className="text-center mb-8">
            <p className="text-text-secondary text-sm whitespace-pre-line">
              {dict.formation.surmesure.qualiopi}
            </p>
          </div>

          <div className="text-center">
            <Link
              href="https://calendly.com/stephane-commenge/echange-decouverte-ia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-ambre text-white font-semibold rounded-lg hover:bg-ambre-light transition-all text-lg"
            >
              {dict.formation.surmesure.cta.text}
            </Link>
            <p className="text-text-secondary text-sm mt-4 whitespace-pre-line">
              {dict.formation.surmesure.cta.subtitle}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

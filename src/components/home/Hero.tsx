import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { getDictionary } from '@/i18n/dictionaries';

interface HeroProps {
  dict: Awaited<ReturnType<typeof getDictionary>>;
  locale: Locale;
}

export default function Hero({ dict, locale }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bleu-nuit via-bleu-nuit-light to-bleu-nuit py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {dict.home.hero.title}
            <br />
            <span className="text-ambre">{dict.home.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
            {dict.home.hero.subtitle.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index === 0 && <br />}
              </span>
            ))}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}/ateliers`}
              className="min-h-[48px] px-8 py-3 bg-ambre text-bleu-nuit font-semibold rounded-lg hover:bg-ambre-light transition-all hover:shadow-lg"
            >
              {dict.home.hero.cta.primary}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="min-h-[48px] px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-bleu-nuit transition-all"
            >
              {dict.home.hero.cta.secondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Gradient mesh subtil */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-ambre/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

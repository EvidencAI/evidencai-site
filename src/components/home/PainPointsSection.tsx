import Link from 'next/link';
import { Sparkles, Cog, Users, Brain } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { getDictionary } from '@/i18n/dictionaries';

interface PainPointsSectionProps {
  dict: Awaited<ReturnType<typeof getDictionary>>;
  locale?: Locale;
}

export default function PainPointsSection({ dict, locale = 'fr' }: PainPointsSectionProps) {
  const painPoints = [
    {
      icon: Sparkles,
      pain: dict.home.painpoints.items.waouh.pain,
      detail: dict.home.painpoints.items.waouh.detail,
    },
    {
      icon: Cog,
      pain: dict.home.painpoints.items.usine.pain,
      detail: dict.home.painpoints.items.usine.detail,
    },
    {
      icon: Users,
      pain: dict.home.painpoints.items.equipes.pain,
      detail: dict.home.painpoints.items.equipes.detail,
    },
    {
      icon: Brain,
      pain: dict.home.painpoints.items.acheter.pain,
      detail: dict.home.painpoints.items.acheter.detail,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-ambre-contrast font-semibold text-sm uppercase tracking-widest mb-3">{dict.home.painpoints.badge}</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bleu-nuit mb-4">
            {dict.home.painpoints.title}
            <br />
            <span className="text-ambre-contrast">{dict.home.painpoints.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-14">
          {painPoints.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.pain}
                className="group flex gap-5 p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-ambre/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-bleu-nuit/5 rounded-xl flex items-center justify-center group-hover:bg-ambre/10 transition-colors">
                  <IconComponent className="w-7 h-7 text-bleu-nuit group-hover:text-ambre transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-bleu-nuit mb-2">{item.pain}</h3>
                  <p className="text-gray-500 leading-relaxed whitespace-pre-line">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mb-6">
          <Link
            href={`/${locale}/solutions`}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-bleu-nuit text-white text-lg font-semibold rounded-lg hover:bg-bleu-nuit-light transition-colors"
          >
            {dict.home.painpoints.cta}
          </Link>
        </div>

        <p className="text-right text-xs text-gray-500 max-w-5xl mx-auto">
          {dict.home.painpoints.source}
        </p>
      </div>
    </section>
  );
}

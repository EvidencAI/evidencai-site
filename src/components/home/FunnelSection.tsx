import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Target, GraduationCap, Rocket } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { getDictionary } from '@/i18n/dictionaries';

interface FunnelSectionProps {
  dict: Awaited<ReturnType<typeof getDictionary>>;
  locale: Locale;
}

export default function FunnelSection({ dict, locale }: FunnelSectionProps) {
  const funnelItems = [
    {
      title: dict.home.funnel.items.ateliers.title,
      description: dict.home.funnel.items.ateliers.description,
      price: dict.home.funnel.items.ateliers.price,
      href: `/${locale}/ateliers`,
      icon: Target,
      level: dict.home.funnel.items.ateliers.level,
    },
    {
      title: dict.home.funnel.items.formations.title,
      description: dict.home.funnel.items.formations.description,
      price: dict.home.funnel.items.formations.price,
      href: `/${locale}/formation`,
      icon: GraduationCap,
      level: dict.home.funnel.items.formations.level,
    },
    {
      title: dict.home.funnel.items.solutions.title,
      description: dict.home.funnel.items.solutions.description,
      price: dict.home.funnel.items.solutions.price,
      href: `/${locale}/solutions`,
      icon: Rocket,
      level: dict.home.funnel.items.solutions.level,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bleu-nuit mb-4">
            {dict.home.funnel.title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {dict.home.funnel.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {funnelItems.map((item) => {
            const IconComponent = item.icon;
            return (
            <Link key={item.title} href={item.href} className="group block">
              <Card hover className="flex flex-col h-full border border-gray-200 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <IconComponent className="w-10 h-10 text-bleu-nuit flex-shrink-0" />
                  <span className="text-xs font-semibold text-ambre-contrast uppercase tracking-wide pt-1">
                    {item.level}
                  </span>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-bleu-nuit mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-auto">
                  <p className="text-2xl font-bold text-ambre-contrast mb-4">{item.price}</p>
                  <span
                    className="block w-full text-center px-6 py-3 bg-bleu-nuit text-white font-semibold rounded-lg group-hover:bg-bleu-nuit-light transition-colors"
                  >
                    {dict.home.funnel.cta}
                  </span>
                </div>
              </Card>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

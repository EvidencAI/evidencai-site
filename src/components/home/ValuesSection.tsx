import { HandHeart, Lightbulb, Shield } from 'lucide-react';
import type { getDictionary } from '@/i18n/dictionaries';

interface ValuesSectionProps {
  dict: Awaited<ReturnType<typeof getDictionary>>;
}

export default function ValuesSection({ dict }: ValuesSectionProps) {
  const values = [
    {
      title: dict.home.values.items.ameliore.title,
      description: dict.home.values.items.ameliore.description,
      icon: HandHeart,
    },
    {
      title: dict.home.values.items.outil.title,
      description: dict.home.values.items.outil.description,
      icon: Lightbulb,
    },
    {
      title: dict.home.values.items.claude.title,
      description: dict.home.values.items.claude.description,
      icon: Shield,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-bleu-nuit">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            {dict.home.values.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value) => {
            const IconComponent = value.icon;
            return (
            <div
              key={value.title}
              className="text-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <IconComponent className="w-10 h-10 text-ambre mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

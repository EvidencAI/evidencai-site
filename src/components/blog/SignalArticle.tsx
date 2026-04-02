import { Newspaper, Radio, Target } from 'lucide-react';
import type { SignalBloc, BlogCategory } from '@/lib/blog';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/blog';
import type { Locale } from '@/i18n/config';

interface SignalArticleProps {
  signal: SignalBloc;
  category: BlogCategory;
  locale: Locale;
}

const BLOC_CONFIG = {
  fact: {
    Icon: Newspaper,
    labelFr: 'Le Fait',
    labelEn: 'The Fact',
    border: 'border-l-text-secondary',
    iconColor: 'text-text-secondary',
  },
  signal: {
    Icon: Radio,
    labelFr: 'Le Signal',
    labelEn: 'The Signal',
    border: 'border-l-ambre',
    iconColor: 'text-ambre',
  },
  action: {
    Icon: Target,
    labelFr: "L'Action",
    labelEn: 'The Action',
    border: 'border-l-emerald-400',
    iconColor: 'text-emerald-400',
  },
} as const;

export default function SignalArticle({ signal, category, locale }: SignalArticleProps) {
  const blocs = [
    { key: 'fact' as const, text: signal.fact },
    { key: 'signal' as const, text: signal.signal },
    { key: 'action' as const, text: signal.action },
  ];

  return (
    <div className="space-y-8">
      {/* Category badge */}
      <div className="flex items-center gap-3 mb-8">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${CATEGORY_COLORS[category]}`}>
          {CATEGORY_LABELS[category][locale]}
        </span>
      </div>

      {/* Signal blocs */}
      {blocs.map(({ key, text }) => {
        const config = BLOC_CONFIG[key];
        const label = locale === 'fr' ? config.labelFr : config.labelEn;
        const IconComponent = config.Icon;

        return (
          <div
            key={key}
            className={`border-l-4 ${config.border} pl-6 py-5`}
          >
            <div className="flex items-center gap-3 mb-3">
              <IconComponent
                size={22}
                className={config.iconColor}
                strokeWidth={1.8}
              />
              <h3 className="font-playfair text-xl font-bold text-white">
                {label}
              </h3>
            </div>

            <p className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
              {text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

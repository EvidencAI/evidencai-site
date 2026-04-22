import type { Metadata } from 'next';
import Link from 'next/link';
import FormationInscriptionForm from '@/components/formation/FormationInscriptionForm';
import { getDictionary } from '@/i18n/dictionaries';
import { getAlternates } from '@/i18n/metadata';
import { locales, type Locale } from '@/i18n/config';
import { User, Sparkles, MessageCircle, Monitor, RefreshCw, Shield, ClipboardCheck } from 'lucide-react';

// Helper pour mapper les noms d'icônes aux composants Lucide
const iconMap = {
  User,
  Sparkles,
  MessageCircle,
  Monitor,
  RefreshCw,
  Shield,
  ClipboardCheck,
};

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
      url: `https://www.evidencai.com/${locale}/formations/decider-avec-ia`,
    },
    ...getAlternates(locale, '/formations/decider-avec-ia'),
  };
}

export default async function FormationPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: locale === 'fr' ? 'Décider avec l\'IA - Formation immersive' : 'Deciding with AI - Immersive Training',
    description: locale === 'fr'
      ? 'Formation immersive de 2 jours avec trio pédagogique : formateur humain, IA co-animatrice, assistant personnel. Certifié Qualiopi via ALIA Formation.'
      : 'Immersive 2-day training with pedagogical trio: human trainer, AI co-facilitator, personal assistant. Qualiopi-certified via ALIA Formation.',
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
      audienceType: locale === 'fr' ? 'Dirigeants et professionnels' : 'Executives and professionals',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: locale === 'fr' ? 'La formation est-elle éligible au financement OPCO ?' : 'Is the training eligible for OPCO funding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'fr'
            ? 'Oui. La formation est portée par ALIA Formation, organisme certifié Qualiopi. Le financement OPCO est possible selon votre branche professionnelle.'
            : 'Yes. Training is delivered by ALIA Formation, a Qualiopi-certified organization. OPCO funding is available depending on your professional sector.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'fr' ? 'Qu\'est-ce que le trio pédagogique ?' : 'What is the pedagogical trio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'fr'
            ? 'Un formateur humain qui cadre et adapte, une IA co-animatrice (Az) qui intervient en direct, et votre assistant IA personnel configuré pour vos besoins, qui reste actif après la formation.'
            : 'A human trainer who frames and adapts, an AI co-facilitator (Az) who intervenes live, and your personal AI assistant configured for your needs, which stays active after training.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'fr' ? 'La formation convient-elle aux débutants ?' : 'Is the training suitable for beginners?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'fr'
            ? 'Oui. Niveau débutant à intermédiaire. Aucun prérequis technique. Vous travaillez sur vos propres cas concrets.'
            : 'Yes. Beginner to intermediate level. No technical prerequisites. You work on your own concrete cases.',
        },
      },
    ],
  };

  return (
    <div className="bg-bleu-nuit">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ================================ */}
      {/* Section 1 — Hero */}
      {/* ================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-ambre border border-ambre/30 px-4 py-1.5 rounded-full inline-block">
              {dict.formation.hero.badge}
            </span>
          </div>

          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-2">
            {dict.formation.hero.title}<em className="text-ambre font-normal">{dict.formation.hero.titleHighlight}</em>
          </h1>

          <p className="text-ambre text-lg md:text-xl font-medium text-center mb-6">
            {dict.formation.hero.soustitre}
          </p>

          <p className="font-playfair text-xl md:text-2xl text-text-primary text-center mb-6 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {dict.formation.hero.accroche}
          </p>

          <p className="text-text-secondary text-base md:text-lg text-center mb-10 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {dict.formation.hero.description}
          </p>

          <div className="flex flex-wrap gap-8 justify-center mb-10 text-sm">
            {Object.values(dict.formation.hero.meta).map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-1">{item.label}</div>
                <div className="text-text-primary font-semibold">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#inscription"
              className="px-8 py-4 bg-ambre text-white font-semibold rounded-lg hover:bg-ambre-light transition-all"
            >
              {dict.formation.hero.cta.primary}
            </Link>
            <a
              href="/downloads/programme-qualiopi-decider-avec-ia.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-ambre text-ambre font-semibold rounded-lg hover:bg-ambre/10 transition-all inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {dict.formation.hero.cta.download}
            </a>
          </div>
        </div>
      </section>

      {/* ================================ */}
      {/* Section 2 — Trio immersif */}
      {/* ================================ */}
      <section id="trio" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-xs uppercase tracking-wider text-ambre mb-3">
              {dict.formation.trio.label}
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              {dict.formation.trio.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(dict.formation.trio.cards).map((card, i) => {
              const IconComponent = iconMap[card.icon as keyof typeof iconMap];
              return (
                <div
                  key={i}
                  className="relative bg-fond-surface border border-bleu-subtil rounded-2xl p-9 hover:border-ambre hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                >
                  <div className="mb-4">
                    <IconComponent className="w-8 h-8 text-ambre" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-white mb-2">{card.nom}</h3>
                  <div className="font-mono text-xs uppercase tracking-wide text-ambre mb-4">{card.role}</div>
                  <p className="text-text-secondary text-sm leading-relaxed">{card.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambre scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================ */}
      {/* Section 3 — Promesse */}
      {/* ================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="font-mono text-xs uppercase tracking-wider text-ambre mb-3">
              {dict.formation.promesse.label}
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
              {dict.formation.promesse.title1}<br />
              {dict.formation.promesse.title2}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-text-secondary leading-relaxed">
                {dict.formation.promesse.texte}
              </p>
            </div>

            <div className="space-y-4">
              {Object.values(dict.formation.promesse.features).map((feature, i) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <div key={i} className="bg-fond-surface border border-bleu-subtil rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-ambre" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{feature.titre}</h4>
                        <p className="text-text-secondary text-sm">{feature.texte}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================ */}
      {/* Section 4 — "L'assistant reste" */}
      {/* ================================ */}
      <section
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-b border-bleu-subtil"
        style={{
          background: 'linear-gradient(135deg, rgba(224,122,95,0.06) 0%, rgba(26,26,46,0) 60%)'
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-xs uppercase tracking-wider text-ambre mb-3">
              {dict.formation.apres.label}
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              {dict.formation.apres.title}<em className="text-ambre font-normal">{dict.formation.apres.titleHighlight}</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(dict.formation.apres.items).map((item, i) => (
              <div key={i} className="bg-fond-surface/50 backdrop-blur-sm border border-bleu-subtil rounded-xl p-6">
                <h4 className="text-white font-semibold mb-2">{item.titre}</h4>
                <p className="text-text-secondary text-sm leading-relaxed">{item.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================ */}
      {/* Section 5 — Programme */}
      {/* ================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-xs uppercase tracking-wider text-ambre mb-3">
              {dict.formation.programme.label}
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              {dict.formation.programme.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {Object.values(dict.formation.programme.jours).map((jour, i) => (
              <div key={i} className="bg-fond-surface border border-bleu-subtil rounded-2xl p-8">
                <h3 className="font-playfair text-2xl font-bold text-white mb-2">{jour.titre}</h3>
                <p className="text-text-secondary mb-6">{jour.soustitre}</p>
                <div className="flex flex-wrap gap-2">
                  {jour.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="font-mono text-xs text-text-secondary bg-white/5 border border-white/10 px-3 py-1.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h3 className="font-playfair text-2xl font-bold text-white text-center mb-8">
              {dict.formation.programme.piliers.titre}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.values(dict.formation.programme.piliers.items).map((pilier, i) => (
                <div key={i} className="bg-fond-surface border border-bleu-subtil rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-ambre/10 border border-ambre/30 rounded-full flex items-center justify-center">
                    <span className="font-mono text-xl font-bold text-ambre">{pilier.lettre}</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{pilier.titre}</h4>
                  <p className="text-text-secondary text-sm">{pilier.texte}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-ambre/5 border-l-4 border-ambre rounded-r-lg p-6">
            <p className="text-text-secondary text-sm">
              {dict.formation.programme.certif}
            </p>
          </div>
        </div>
      </section>

      {/* ================================ */}
      {/* Section 6 — Prérequis */}
      {/* ================================ */}
      <section className="pt-4 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-8">
            {dict.formation.prerequis.title}
          </h2>
          <ul className="space-y-4">
            {dict.formation.prerequis.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-ambre mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================ */}
      {/* Section 7 — Formateur */}
      {/* ================================ */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-bleu-subtil">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-8">
            {dict.formation.formateur.title}
          </h2>
          <div className="mb-6">
            <p className="text-text-primary font-semibold text-lg mb-1">
              Formateur : {dict.formation.formateur.nom}
            </p>
            <p className="text-text-secondary whitespace-pre-line leading-relaxed">
              {dict.formation.formateur.bio}
            </p>
          </div>
          <p className="text-text-secondary text-sm">
            {dict.formation.formateur.organisme}{' '}
            <span>{dict.formation.formateur.organismeNom}</span>
            {dict.formation.formateur.organismeSuffix}
          </p>
        </div>
      </section>

      {/* ================================ */}
      {/* Section 8 — Inscription */}
      {/* ================================ */}
      <section id="inscription" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-bleu-nuit-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-xs uppercase tracking-wider text-ambre mb-3">
              {dict.formation.inscription.label}
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-8">
              {dict.formation.inscription.titre}
            </h2>
          </div>

          {/* Grille des dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {dict.formation.sessions.items.map((session, i) => (
              <div key={i} className="text-center p-4 bg-fond-surface rounded-lg border border-bleu-subtil">
                <p className="font-semibold text-text-primary">{session.dates}</p>
                <p className="text-sm text-text-secondary">{session.location}</p>
              </div>
            ))}
          </div>

          {/* Formulaire directement visible */}
          <FormationInscriptionForm />
        </div>
      </section>

    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import FormationInscriptionForm from '@/components/formation/FormationInscriptionForm';
import SessionsGrid from '@/components/formation/SessionsGrid';
import { getDictionary } from '@/i18n/dictionaries';
import { getAlternates } from '@/i18n/metadata';
import { locales, type Locale } from '@/i18n/config';
import { buildBreadcrumbSchema, jsonLd } from '@/lib/schema';
import { User, Sparkles, MessageCircle, Monitor, RefreshCw, Shield, ClipboardCheck } from 'lucide-react';

// Helper pour nommer les instances de cours (CourseInstance JSON-LD)
function courseInstanceName(locale: Locale): string {
  return locale === 'fr' ? 'Session présentielle' : 'In-person session';
}

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
      ? 'Formation immersive de 2 jours avec trio pédagogique : formateur humain, IA co-animatrice, Mentor IA. Certifié Qualiopi via ALIA Formation.'
      : 'Immersive 2-day training with pedagogical trio: human trainer, AI co-facilitator, AI Mentor. Qualiopi-certified via ALIA Formation.',
    url: `https://www.evidencai.com/${locale}/formations/decider-avec-ia`,
    provider: {
      '@type': 'Organization',
      name: 'EvidencAI',
      url: 'https://www.evidencai.com',
    },
    educationalCredentialAwarded: 'Qualiopi (via ALIA Formation)',
    isAccessibleForFree: false,
    inLanguage: locale === 'fr' ? 'fr' : 'en',
    educationalLevel: locale === 'fr' ? 'Débutant à intermédiaire' : 'Beginner to intermediate',
    timeRequired: 'PT14H',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: locale === 'fr' ? 'Dirigeants et professionnels' : 'Executives and professionals',
    },
    offers: {
      '@type': 'Offer',
      price: '960',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      category: locale === 'fr' ? 'Formation professionnelle' : 'Professional training',
      url: `https://www.evidencai.com/${locale}/formations/decider-avec-ia#inscription`,
    },
    hasCourseInstance: dict.formation.sessions.items.map((session) => ({
      '@type': 'CourseInstance',
      courseMode: 'Onsite',
      location: {
        '@type': 'Place',
        name: session.location,
      },
      name: `${courseInstanceName(locale)} – ${session.dates}`,
      description: `${session.dates} à ${session.location}`,
      courseWorkload: 'PT14H',
    })),
  };

  const breadcrumbSchema = buildBreadcrumbSchema(locale, [
    {
      name: locale === 'fr' ? 'Formations' : 'Training',
      url: `/${locale}/formations`,
    },
    {
      name: locale === 'fr' ? 'Décider avec l\'IA' : 'Deciding with AI',
      url: `/${locale}/formations/decider-avec-ia`,
    },
  ]);

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
            ? 'Un formateur humain qui cadre et adapte, une IA co-animatrice (Az) qui intervient en direct, et votre Mentor IA configuré pour vos besoins, qui reste actif après la formation.'
            : 'A human trainer who frames and adapts, an AI co-facilitator (Az) who intervenes live, and your AI Mentor configured for your needs, which stays active after training.',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

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
      {/* Section 4 — "Le Mentor IA reste" */}
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
          <SessionsGrid
            sessions={dict.formation.sessions.items}
            label={locale === 'fr' ? 'Session présentielle' : 'In-person session'}
          />

          {/* Formulaire directement visible */}
          <FormationInscriptionForm
            sessions={dict.formation.sessions.items.map((s) => ({
              value: s.dates,
              label: `${s.dates} · ${s.location}`,
            }))}
            formationKey="decider"
          />
        </div>
      </section>

      {/* ================================ */}
      {/* Section 9 — Retour d'expérience Session Avril 2026 (FR uniquement) */}
      {/* ================================ */}
      {locale === 'fr' && (
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-bleu-subtil">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-wider text-ambre border border-ambre/30 px-4 py-1.5 rounded-full inline-block mb-6">
                Retour d&apos;expérience
              </span>
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Session Avril 2026 : six chefs d&apos;entreprise face à l&apos;IA
              </h2>
            </div>

            <div className="space-y-6 text-text-primary text-lg leading-relaxed">
              <p className="italic text-text-secondary">
                Ils sont venus à Valence les 7 et 14 avril 2026. Six chefs d&apos;entreprise, quatre secteurs, des questions très différentes. Deux jours plus tard, chacun est reparti avec sa méthode, son Mentor IA, et une idée claire de ce qu&apos;il allait en faire. Voici ce qu&apos;ils en disent, en chiffres et en mots.
              </p>

              <p>
                Cette session inter-entreprises du parcours «&nbsp;Décider avec l&apos;IA&nbsp;» a été animée dans les locaux valentinois par Stéphane Commenge, chef d&apos;entreprise praticien de l&apos;IA au quotidien et concepteur du programme. Sept participants inscrits, six réponses recueillies en clôture, un questionnaire envoyé aux participants en fin de J2 dans le cadre du suivi Qualiopi exigé par ALIA Formation, l&apos;organisme qui porte la certification. Les chiffres qui suivent sont des moyennes sur ces six réponses.
              </p>

              {/* Dashboard chiffres */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-12">
                {[
                  { value: '9,3/10', label: 'Note globale' },
                  { value: '9,2/10', label: 'NPS' },
                  { value: '9,5/10', label: 'Formateur' },
                  { value: '9,5/10', label: 'Accueil' },
                  { value: '6,8/10', label: 'Confiance IA seul' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-fond-surface border border-bleu-subtil rounded-xl p-4 text-center"
                  >
                    <div className="font-playfair text-2xl md:text-3xl font-bold text-ambre mb-1">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-text-secondary text-center -mt-6">
                6 répondants sur 6. 100 % de chefs d&apos;entreprise. Curseur de confiance par défaut positionné à 1.
              </p>

              {/* Section 1 : Je ne suis pas technique */}
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mt-16 mb-4 leading-tight">
                «&nbsp;Je ne suis pas technique, ça va me dépasser&nbsp;»
              </h3>
              <p>
                Nicolas Chaffois préside{' '}
                <a
                  href="https://www.cuisines-aviva.com/magasins-cuisines/valence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ambre hover:underline"
                >
                  Cuisine Aviva Valence
                </a>
                . Dirigeant d&apos;un magasin de cuisine équipée, il n&apos;est pas développeur, il n&apos;a pas fait d&apos;école d&apos;ingénieurs, et au moment de remplir le questionnaire de satisfaction, il a mis le curseur de confiance à <strong>1 sur 10</strong>.
              </p>
              <p>
                Et pourtant. Dans ses trois mots pour décrire la formation : «&nbsp;prise de conscience&nbsp;». Sa note globale : 9 sur 10. Sa recommandation : 9 sur 10.
              </p>
              <p>
                Le message qu&apos;il envoie est limpide. On ne sort pas de cette formation technicien. On en sort lucide. On comprend ce que l&apos;IA sait faire, ce qu&apos;elle ne sait pas, et comment la cadrer sans se faire avoir. Nicolas ne prétend pas être prêt à l&apos;utiliser seul demain matin. Il sait désormais où il en est. Chacun avance à son rythme, et cette première marche de lucidité vaut mieux qu&apos;une fausse assurance que la formation se refuse à vendre.
              </p>

              {/* Section 2 : Métier concret */}
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mt-16 mb-4 leading-tight">
                «&nbsp;Comment ça tient dans mon métier concret ?&nbsp;»
              </h3>
              <p>
                Chez{' '}
                <a
                  href="https://www.cibox.com/fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ambre hover:underline"
                >
                  CIBOX
                </a>
                , deux participants sont venus ensemble : Sébastien Felix, président, et Alexandre Carton, directeur commercial. Deux jours durant, ils sont revenus sur le même dossier : la conformité de leurs produits aux normes en vigueur. Un sujet touffu, chronophage, où la moindre imprécision a des conséquences commerciales et juridiques.
              </p>
              <p>
                Ce qu&apos;ils ressortent de la formation, ce n&apos;est pas une théorie. C&apos;est un début de chantier : chacun construit son Mentor IA dédié, calibré sur leur documentation technique, capable de répondre aux questions réglementaires qui les occupent au quotidien. Actif après la formation.
              </p>
              <p>
                Alexandre, en trois mots : «&nbsp;découverte, rassurante, utile&nbsp;». Sébastien : «&nbsp;concrète, animée, conviviale&nbsp;». Aucun des deux ne repart avec un diaporama à classer. Ils repartent avec un outil en construction, posé sur leur propre terrain, qui va continuer de s&apos;affiner à mesure qu&apos;ils l&apos;utiliseront sur les vrais dossiers des prochaines semaines.
              </p>

              {/* Section 3 : Changer quelque chose */}
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mt-16 mb-4 leading-tight">
                «&nbsp;Est-ce que ça va vraiment changer quelque chose dans ma boîte ?&nbsp;»
              </h3>
              <p>
                Magali Chaumel copréside avec Laurent Lefevre l&apos;
                <a
                  href="https://www.areas.fr/agence-assurance/26320/l.lefevre-et-m.chaumel-saint-marcel-les-valences"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ambre hover:underline"
                >
                  Agence Aréas Lefevre &amp; Chaumel
                </a>{' '}
                à Saint-Marcel-lès-Valence. À la question «&nbsp;usage concret envisagé&nbsp;», sa réponse tient en une ligne, mais dessine un plan d&apos;action :
              </p>
              <blockquote className="border-l-4 border-ambre pl-6 py-2 my-6 italic text-white">
                «&nbsp;Créer des assistants RH, commerciaux, marketing. Travailler sur la feuille de route.&nbsp;»
              </blockquote>
              <p>
                En trois mots : «&nbsp;dense, utile, enrichissant&nbsp;». Note globale : <strong>10 / 10</strong>. Recommandation : <strong>10 / 10</strong>.
              </p>
              <p>
                Ce n&apos;est pas une réaction d&apos;enthousiasme convenue. C&apos;est une vision. Magali ne voit plus l&apos;IA comme un outil à maîtriser au futur, elle la voit comme un levier à déployer maintenant sur trois fonctions clés de son agence. La formation lui a donné la méthode pour le faire, et la feuille de route devient un sujet de direction, pas un sujet technique.
              </p>

              {/* Section 4 : Hallucinations */}
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mt-16 mb-4 leading-tight">
                «&nbsp;Je n&apos;ai pas envie de me faire piéger par des hallucinations&nbsp;»
              </h3>
              <p>
                C&apos;est la peur la plus fréquente, et elle est légitime. L&apos;IA dit parfois n&apos;importe quoi avec aplomb. Elle peut inventer un chiffre, une citation, une source, une jurisprudence. Comment l&apos;utiliser sans se retrouver avec une information fausse dans un mail client, un contrat, un document officiel, une réponse à appel d&apos;offres ?
              </p>
              <p>
                <strong>La méthode EvidencAI</strong> repose sur quatre réflexes simples, enseignés pendant les deux jours et pratiqués sur les dossiers réels des participants :
              </p>
              <ul className="space-y-3 my-6 text-text-primary">
                <li className="pl-4 border-l-2 border-ambre">
                  <strong className="text-white">Reformuler la demande</strong> au lieu de la subir. La plupart des mauvaises réponses de l&apos;IA viennent d&apos;une mauvaise question.
                </li>
                <li className="pl-4 border-l-2 border-ambre">
                  <strong className="text-white">Donner le bon contexte</strong> à l&apos;IA avant d&apos;attendre une réponse juste. Un document, un exemple, un interdit, une cible : le contexte fait la précision.
                </li>
                <li className="pl-4 border-l-2 border-ambre">
                  <strong className="text-white">Vérifier systématiquement</strong> ce qu&apos;elle produit, et savoir où ça peut clocher. Certaines zones sont plus risquées que d&apos;autres.
                </li>
                <li className="pl-4 border-l-2 border-ambre">
                  <strong className="text-white">Corriger jusqu&apos;au résultat attendu.</strong> L&apos;IA ne délivre pas un produit fini du premier coup, c&apos;est un dialogue.
                </li>
              </ul>
              <p>
                Laurent Lefevre, président de l&apos;Agence Aréas Lefevre &amp; Chaumel, a trouvé le niveau de contenu «&nbsp;trop complexe&nbsp;». C&apos;est sa réponse honnête. Et pourtant, dans le même questionnaire, ses trois mots à la sortie sont «&nbsp;surprenante, intéressante, pointue&nbsp;» et il recommande la formation à 9 sur 10. Ce que dit cette tension ? Qu&apos;on ne survend pas. La formation ne cherche pas à faire facile. Elle cherche à faire juste, et à outiller durablement.
              </p>

              {/* Section 5 : Après la formation */}
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mt-16 mb-4 leading-tight">
                «&nbsp;Et après la formation, je fais quoi tout seul ?&nbsp;»
              </h3>
              <p>
                C&apos;est la différence majeure de ce parcours. Chaque participant ne repart pas avec un manuel à ranger sur une étagère, mais avec <strong className="text-white">son propre Mentor IA</strong>, construit pendant les deux jours sur le métier, le contexte, les documents de son entreprise. Ce Mentor IA reste actif après la formation et continue de progresser au rythme de son utilisateur.
              </p>
              <p>
                Sarah Carrier préside Holding Carrier, un groupe de location TP-bâtiment. Son usage envisagé : préparer ses assemblées générales. Un rendez-vous annuel, codifié, chronophage, stratégique. Elle en repart avec son Mentor IA qui l&apos;aidera chaque année, nourri des documents propres à son groupe, formé à sa façon de travailler.
              </p>
              <p>
                Laurent, Magali, Nicolas, Sarah, Sébastien, Alexandre : tous les six repartent avec le leur, calibré sur leur réalité, pas sur un cas d&apos;école. Cette pédagogie par l&apos;action, où le formateur humain est flanqué d&apos;une IA co-animatrice pendant les deux jours, c&apos;est ce qui distingue ce parcours d&apos;une formation IA générique.
              </p>

              {/* Clôture */}
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mt-16 mb-4 leading-tight">
                Ce qu&apos;on retient de cette session
              </h3>
              <p>
                Six dirigeants. Six métiers. Quatre secteurs : assurance, cuisine équipée, location TP-bâtiment, électronique. Aucun n&apos;était développeur. Aucun n&apos;est reparti développeur. Tous sont repartis avec trois choses :
              </p>
              <ul className="space-y-3 my-6 text-text-primary">
                <li className="pl-4 border-l-2 border-ambre">
                  <strong className="text-white">Une méthode</strong>, la méthode EvidencAI, pour décider avec l&apos;IA sans s&apos;y perdre.
                </li>
                <li className="pl-4 border-l-2 border-ambre">
                  <strong className="text-white">Un Mentor IA</strong>, calibré sur leur métier, actif après la formation.
                </li>
                <li className="pl-4 border-l-2 border-ambre">
                  <strong className="text-white">Un projet concret</strong> à déployer dans leur entreprise dès la semaine suivante.
                </li>
              </ul>
              <p>
                Ce que cette session dit du moment que traversent les dirigeants de PME en 2026 : ils ne veulent plus être impressionnés par l&apos;IA, ils veulent s&apos;en servir. Ils n&apos;ont pas le temps de devenir ingénieurs, et n&apos;en ont pas l&apos;intention. Ils cherchent un passage de relais lucide entre la technologie et leur métier. Ceux qui sont venus à Valence en avril 2026 sont repartis avec ce passage. Les retours en chiffres comme en verbatims le disent : on peut former des chefs d&apos;entreprise à décider avec l&apos;IA en deux jours, à condition d&apos;ancrer chaque geste dans leur métier réel, et de leur laisser un outil qui continue de travailler pour eux après.
              </p>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

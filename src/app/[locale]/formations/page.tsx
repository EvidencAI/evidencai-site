import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/i18n/dictionaries';
import { getAlternates } from '@/i18n/metadata';
import { locales, type Locale } from '@/i18n/config';
import { buildBreadcrumbSchema, buildFaqSchema, jsonLd } from '@/lib/schema';

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

  const breadcrumbSchema = buildBreadcrumbSchema(locale, [
    {
      name: locale === 'fr' ? 'Formations' : 'Training',
      url: `/${locale}/formations`,
    },
  ]);

  const faqItems: Array<{ question: string; answer: string }> =
    locale === 'fr'
      ? [
          {
            question: 'Qu\'est-ce que le Mentor IA livré à chaque participant ?',
            answer:
              'Le Mentor IA est un outil IA préparé sur-mesure pour la session et livré à chaque participant dès l\'ouverture de la formation. Il embarque tous les cours et la méthode, vous assiste pendant les deux jours, et reste actif après la formation pour vous accompagner au quotidien. C\'est un différenciant fort d\'EvidencAI : là où la plupart des formations IA se limitent à un accès à ChatGPT et un PDF de notes, vous repartez avec un partenaire IA durable, calibré sur votre contexte métier.',
          },
          {
            question: 'Quelle formation IA choisir pour une PME ?',
            answer:
              'Pour une PME, deux parcours complémentaires : "Décider avec l\'IA" (2 jours, niveau débutant à intermédiaire) pour poser les fondamentaux et structurer l\'usage de l\'IA dans le quotidien ; "Bâtir avec Claude" (2 jours, niveau avancé) pour passer de l\'usage à la construction de skills, workflows et automatisations. Les deux formations sont certifiées Qualiopi et finançables par OPCO.',
          },
          {
            question: 'Quelle est la différence entre "Décider avec l\'IA" et "Bâtir avec Claude" ?',
            answer:
              '"Décider avec l\'IA" est la porte d\'entrée : comprendre, cadrer, intégrer l\'IA dans ses décisions quotidiennes. "Bâtir avec Claude" est la suite avancée : construire ses propres skills, brancher des connecteurs, automatiser via des tâches programmées, étendre Claude avec des plugins. La première vise l\'usage, la seconde vise la construction.',
          },
          {
            question: 'Quel est le prix d\'une formation IA pour dirigeant ?',
            answer:
              '« Décider avec l\'IA » est à 960 euros HT pour 2 jours (14h). « Bâtir avec Claude », formation avancée à effectif réduit (8 places maximum), est à 1 490 euros HT pour 2 jours. Tarif incluant le formateur humain, la co-animation par une IA dédiée, et un Mentor IA qui reste actif après la formation. Financement OPCO possible selon votre branche.',
          },
          {
            question: 'Les formations EvidencAI sont-elles certifiées Qualiopi ?',
            answer:
              'Oui. Les formations EvidencAI sont portées par ALIA Formation, organisme certifié Qualiopi. Cette certification permet le financement par les OPCO et garantit le respect du référentiel national qualité des actions de formation.',
          },
          {
            question: 'Peut-on organiser une formation IA sur mesure pour son entreprise ?',
            answer:
              'Oui. EvidencAI propose des formations intra-entreprise sur mesure, construites à partir de votre contexte et de vos cas d\'usage. Le parcours commence par un échange pour cadrer vos besoins, puis nous construisons un programme adapté à vos équipes. Interventions en Drôme, Ardèche, Isère, Rhône et Auvergne-Rhône-Alpes.',
          },
          {
            question: 'Où se déroulent les formations EvidencAI ?',
            answer:
              'Les sessions inter-entreprises se déroulent à Valence (Drôme). Les formations intra-entreprise ont lieu dans vos locaux, en Auvergne-Rhône-Alpes prioritairement (Drôme, Ardèche, Isère, Rhône). Une option distancielle est possible sur demande.',
          },
        ]
      : [
          {
            question: 'What is the AI Mentor delivered to each participant?',
            answer:
              'The AI Mentor is an AI tool prepared specifically for the session and delivered to every participant from day one. It carries all the course content and method, supports you throughout the two days, and stays active after the training to help you in your daily work. It\'s a strong differentiator for EvidencAI: where most AI trainings limit themselves to access to ChatGPT and a PDF of notes, you leave with a lasting AI partner, tuned to your business context.',
          },
          {
            question: 'Which AI training to choose for an SMB?',
            answer:
              'For an SMB, two complementary paths: "Deciding with AI" (2 days, beginner to intermediate) to set the fundamentals and structure AI usage in daily work; "Building with Claude" (2 days, advanced) to move from usage to building skills, workflows and automations. Both are Qualiopi-certified and eligible for OPCO funding.',
          },
          {
            question: 'What\'s the difference between "Deciding with AI" and "Building with Claude"?',
            answer:
              '"Deciding with AI" is the entry point: understanding, framing and integrating AI in daily decisions. "Building with Claude" is the advanced follow-up: building custom skills, plugging in connectors, automating with scheduled tasks, extending Claude with plugins. The first targets usage, the second targets construction.',
          },
          {
            question: 'What is the price of AI training for executives?',
            answer:
              '"Deciding with AI" is 960 euros excl. VAT for 2 days (14 hours). "Building with Claude", an advanced small-group training (8 seats maximum), is 1,490 euros excl. VAT for 2 days. Includes the human trainer, AI co-facilitation, and an AI Mentor that stays active after training. OPCO funding available depending on sector.',
          },
          {
            question: 'Are EvidencAI trainings Qualiopi-certified?',
            answer:
              'Yes. EvidencAI trainings are delivered by ALIA Formation, a Qualiopi-certified organization. This certification enables OPCO funding and ensures compliance with the national quality standard for professional training.',
          },
          {
            question: 'Can you organize custom AI training for our company?',
            answer:
              'Yes. EvidencAI offers custom in-house training built from your context and use cases. The process starts with a scoping call, then we build a program adapted to your teams. Available throughout Auvergne-Rhône-Alpes (Drôme, Ardèche, Isère, Rhône).',
          },
          {
            question: 'Where do EvidencAI trainings take place?',
            answer:
              'Open sessions take place in Valence (Drôme, France). In-house trainings are held at your premises, primarily in Auvergne-Rhône-Alpes. Remote delivery is available on request.',
          },
        ];

  const faqSchema = buildFaqSchema(faqItems);

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
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
          <p
            className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mt-4"
            dangerouslySetInnerHTML={{ __html: dict.formations.hero.mentor }}
          />
        </div>
      </section>

      {/* ================================ */}
      {/* Section 2 — Cards Catalogue (Décider + Bâtir) */}
      {/* ================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card Décider */}
            <Link
              href={`/${locale}/formations/decider-avec-ia`}
              className="relative block bg-fond-surface border border-bleu-subtil rounded-2xl p-8 hover:border-ambre hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col"
            >
              <div className="flex-1">
                <div className="mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-ambre border border-ambre/30 px-3 py-1 rounded-full">
                    {dict.formations.catalogue.deciderAvecIA.badge}
                  </span>
                </div>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2">
                  {dict.formations.catalogue.deciderAvecIA.titre}
                </h2>
                <p className="text-ambre text-lg font-medium mb-4">
                  {dict.formations.catalogue.deciderAvecIA.soustitre}
                </p>
                <p className="text-text-secondary leading-relaxed mb-4 whitespace-pre-line">
                  {dict.formations.catalogue.deciderAvecIA.description}
                </p>
              </div>
              <div className="flex items-end justify-between pt-4 border-t border-bleu-subtil">
                <span className="text-sm text-text-secondary">{locale === 'fr' ? 'Voir le programme' : 'See program'} →</span>
                <div className="font-playfair text-2xl font-bold text-white">
                  {dict.formations.catalogue.deciderAvecIA.prix}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambre scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>

            {/* Card Bâtir */}
            <Link
              href={`/${locale}/formations/batir-avec-claude`}
              className="relative block bg-fond-surface border border-bleu-subtil rounded-2xl p-8 hover:border-ambre hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col"
            >
              <div className="flex-1">
                <div className="mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-ambre border border-ambre/30 px-3 py-1 rounded-full">
                    {dict.formations.catalogue.batirAvecClaude.badge}
                  </span>
                </div>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2">
                  {dict.formations.catalogue.batirAvecClaude.titre}
                </h2>
                <p className="text-ambre text-lg font-medium mb-4">
                  {dict.formations.catalogue.batirAvecClaude.soustitre}
                </p>
                <p className="text-text-secondary leading-relaxed mb-4 whitespace-pre-line">
                  {dict.formations.catalogue.batirAvecClaude.description}
                </p>
              </div>
              <div className="flex items-end justify-between pt-4 border-t border-bleu-subtil">
                <span className="text-sm text-text-secondary">{locale === 'fr' ? 'Voir le programme' : 'See program'} →</span>
                <div className="font-playfair text-2xl font-bold text-white">
                  {dict.formations.catalogue.batirAvecClaude.prix}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambre scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </div>

          <p
            className="text-center text-text-secondary text-sm mt-8 max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{
              __html:
                locale === 'fr'
                  ? 'Formation immersive avec trio pédagogique : un formateur humain, une IA co-animatrice, et <span class="text-ambre">votre propre Mentor IA</span>, livré dès l\'ouverture et actif bien après.'
                  : 'Immersive training with a teaching trio: a human trainer, an AI co-facilitator, and <span class="text-ambre">your own AI Mentor</span>, delivered from the start and active long after.',
            }}
          />
        </div>
      </section>

      {/* ================================ */}
      {/* Section 3 — FAQ */}
      {/* ================================ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-bleu-subtil">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-ambre border border-ambre/30 px-4 py-1.5 rounded-full inline-block mb-6">
              {locale === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === 'fr' ? 'Ce qu\'on nous demande le plus souvent' : 'What we get asked most'}
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group bg-fond-surface border border-bleu-subtil rounded-xl overflow-hidden hover:border-ambre/40 transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                  <span className="font-playfair text-lg md:text-xl font-semibold text-white leading-snug">
                    {item.question}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ambre/10 flex items-center justify-center text-ambre text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-bleu-subtil pt-4">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================================ */}
      {/* Section 4 — Sur mesure */}
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

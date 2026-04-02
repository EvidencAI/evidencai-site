import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import ScreenshotGallery from "@/components/ui/ScreenshotGallery";
import BetaForm from "@/components/ui/BetaForm";
import DownloadButton from "@/components/ui/DownloadButton";
import { Brain, Lightbulb, GraduationCap, ShieldCheck, Scale, Radar, ExternalLink, MonitorSmartphone, Puzzle, Globe, MessageSquare, Zap, BookOpen, Atom, Network, Sparkles, Mail } from 'lucide-react';
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
    title: dict.outils.metadata.title,
    description: dict.outils.metadata.description,
    ...getAlternates(locale, '/outils'),
  };
}

function MnemosDetail({ dict }: { dict: any }) {
  return (
    <Card id="mnemos" className="bg-white p-8">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-bleu-nuit rounded-xl flex items-center justify-center">
            <Brain className="w-8 h-8 text-ambre" />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-bleu-nuit">Mnemos</h2>
            <span className="text-xs px-3 py-1 rounded-full font-semibold bg-amber-100 text-amber-800">En test</span>
          </div>
          <p className="text-ambre font-semibold mb-1">Mémoire persistante pour IA</p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Puzzle className="w-4 h-4" />
            <span>Plugin Claude Cowork</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-2">
            Claude est puissant, mais il oublie tout entre deux conversations. Mnemos lui donne une mémoire persistante : vos décisions, faits, contacts et contextes sont conservés et rappelés automatiquement d&apos;un fil à l&apos;autre.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Pas de syntaxe à apprendre, pas de commande à retenir. Vous parlez normalement à Claude, c&apos;est lui qui pilote Mnemos en arrière-plan.
          </p>

          {/* Cycle de session */}
          <div className="mb-8">
            <h3 className="font-semibold text-bleu-nuit mb-4 text-lg">Le cycle d&apos;une session</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 bg-bleu-nuit text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span className="font-semibold text-bleu-nuit">Début de fil</span>
                </div>
                <p className="text-xs text-gray-500 font-mono mb-2">&quot;Mnemos espace [projet]&quot;</p>
                <p className="text-sm text-gray-600">Charge votre profil, le codex de l&apos;espace, les 3 derniers handovers, les connaissances récentes et les atomes épinglés. Claude reprend exactement là où vous en étiez.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 bg-bleu-nuit text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span className="font-semibold text-bleu-nuit">Pendant la conversation</span>
                </div>
                <p className="text-xs text-ambre font-semibold mb-2">automatique</p>
                <p className="text-sm text-gray-600">Mnemos travaille en arrière-plan. Il extrait les connaissances de vos échanges et injecte intelligemment les connaissances passées quand elles sont utiles.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 bg-bleu-nuit text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span className="font-semibold text-bleu-nuit">Fin de fil</span>
                </div>
                <p className="text-xs text-gray-500 font-mono mb-2">&quot;Fin de session&quot;</p>
                <p className="text-sm text-gray-600">Génère un handover narratif : résumé, décisions prises, tâches en attente. Ce handover alimente le codex et sera relu au début du prochain fil.</p>
              </div>
            </div>
          </div>

          {/* Deux mémoires */}
          <div className="mb-8">
            <h3 className="font-semibold text-bleu-nuit mb-4 text-lg">Deux mémoires complémentaires</h3>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-bleu-nuit mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-ambre" />
                  Mémoire de session
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-bleu-nuit mb-1">Handover</p>
                    <p className="text-sm text-gray-600">En fin de session, Mnemos génère le résumé narratif de votre travail. Décisions prises, avancées, tâches en attente. C&apos;est la passation entre deux conversations.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-bleu-nuit mb-1">Codex</p>
                    <p className="text-sm text-gray-600">Les handovers successifs alimentent un dossier vivant par espace. C&apos;est la mémoire de long terme de chaque projet, qui se consolide au fil du temps.</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-bleu-nuit mb-3 flex items-center gap-2">
                  <Atom className="w-5 h-5 text-ambre" />
                  Mémoire continue
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-bleu-nuit mb-1">Atomes</p>
                    <p className="text-sm text-gray-600">Unités de connaissance extraites automatiquement : faits, décisions, positions, contacts, intentions, événements... Chaque atome est typé, daté et rattaché à un espace.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-bleu-nuit mb-1">Connexions</p>
                    <p className="text-sm text-gray-600">Les atomes sont reliés par des liens sémantiques : confirme, contredit, précède, implique. Un graphe de connaissances qui navigue par association.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-bleu-nuit mb-1">Insights (le neurone)</p>
                    <p className="text-sm text-gray-600">Analyse les connexions entre vos espaces et détecte ce que vous ne voyez pas : tensions entre projets, convergences inattendues, évolutions silencieuses.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mail et agenda */}
          <div className="mb-8 bg-gray-50 rounded-lg p-5 border border-gray-100">
            <h4 className="font-semibold text-bleu-nuit mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-ambre" />
              Connectez votre mail et agenda
            </h4>
            <p className="text-sm text-gray-600">Mnemos peut collecter automatiquement vos mails et événements d&apos;agenda. Les contacts sont extraits et ajoutés à votre carnet. Les événements importants deviennent des atomes. Tout est filtré par pertinence, rien n&apos;est stocké en brut.</p>
          </div>

          {/* Stack */}
          <div className="mb-6">
            <h3 className="font-semibold text-bleu-nuit mb-3">{dict.outils.common.stack}</h3>
            <div className="flex flex-wrap gap-2">
              {['Supabase', 'PostgreSQL', 'pgvector', 'Node.js', 'API Anthropic (Opus, Sonnet, Haiku)'].map((tech) => (
                <span key={tech} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded font-mono">{tech}</span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-bleu-nuit mb-2">{dict.outils.common.marche}</h3>
            <p className="text-sm text-gray-600">Tout utilisateur de Claude souhaitant une continuité entre ses sessions de travail.</p>
          </div>

          {/* Screenshots */}
          <div className="mb-6">
            <h3 className="font-semibold text-bleu-nuit mb-3">{dict.outils.common.apercus}</h3>
            <ScreenshotGallery screenshots={[
              { src: "/images/mnemos/mnemos-01.png", alt: "Graphe de mémoire dynamique Mnemos", caption: "Graphe de mémoire dynamique" },
              { src: "/images/mnemos/mnemos-02.png", alt: "Menu général Mnemos", caption: "Menu général" },
              { src: "/images/mnemos/mnemos-03.png", alt: "Suivi d'activité Mnemos", caption: "Suivi d'activité" },
              { src: "/images/mnemos/mnemos-05.jpg", alt: "Cockpit Mnemos", caption: "Cockpit" },
            ]} />
          </div>
        </div>
      </div>
    </Card>
  );
}

const autresOutils = [
  {
    id: 'codirai',
    name: 'CodirAI',
    tagline: 'Orchestrateur de décision',
    icon: Lightbulb,
    install: 'Extension Chrome + Application web',
    installIcon: MonitorSmartphone,
    status: 'Beta test',
    statusColor: 'bg-blue-100 text-blue-800',
    href: 'https://codirai.com',
    external: true,
    cta: 'Découvrir',
    betaCta: true,
    description: 'CodirAI transforme les réponses de l\'IA générative en conseils fiables et exploitables.\nUn comité de 15 experts virtuels analyse, challenge et structure l\'information pour vous donner des recommandations sourcées avec un score de confiance.',
    features: [
      'Analyse multi-angles par 15 modules d\'expertise',
      'Score de confiance et sources vérifiables sur chaque recommandation',
      'Compatible ChatGPT, Claude, Gemini et toute IA générative',
      'Génération de rapports PDF/Word pour vos prises de décision',
      'Tableau de bord centralisant l\'historique de vos analyses',
    ],
    tech: ['Next.js', 'Supabase', 'API OpenAI', 'Chrome Extension API'],
    marche: 'Dirigeants PME, consultants, managers opérationnels.',
  },
  {
    id: 'agoria',
    name: 'AgorIA',
    tagline: 'Cockpit de formation augmentée par l\'IA',
    icon: GraduationCap,
    install: 'Application web',
    installIcon: Globe,
    status: 'En cours de développement',
    statusColor: 'bg-purple-100 text-purple-800',
    href: null,
    external: false,
    description: 'FormIA transforme vos sessions de formation en expériences interactives pilotées par l\'IA.\nCréez vos supports de cours assisté par IA, co-animez avec un assistant vocal qui lit et commente vos slides en temps réel, et générez automatiquement questionnaires de pré-formation, quiz personnalisés par apprenant et enquêtes de satisfaction.',
    features: [
      'Co-animation IA vocale synchronisée avec vos slides (TTS temps réel)',
      'Génération automatique de quiz adaptatifs par niveau et par participant',
      'Création assistée de supports pédagogiques (slides, fiches, exercices)',
      'Questionnaires de pré-formation et satisfaction générés automatiquement',
      'Mémoire de session : l\'IA retient les interactions, niveaux et progression de chaque apprenant',
    ],
    tech: ['Flask', 'API Anthropic (Sonnet)', 'Edge-TTS', 'HTML/JS temps réel'],
    marche: 'Formateurs indépendants, organismes de formation, intervenants en entreprise.',
  },
  {
    id: 'confidentia',
    name: 'ConfidentIA',
    tagline: 'Anonymisation intelligente de documents',
    icon: ShieldCheck,
    install: 'Plugin Claude Cowork',
    installIcon: Puzzle,
    status: 'En cours de développement',
    statusColor: 'bg-purple-100 text-purple-800',
    href: null,
    external: false,
    description: 'ConfidentIA permet d\'analyser des documents confidentiels avec Claude sans jamais exposer les données sensibles. Le système anonymise automatiquement les noms, adresses, montants et identifiants avant envoi au LLM, puis restaure les données originales dans la réponse.',
    features: [
      'Anonymisation automatique des données personnelles (NER)',
      'Désanonymisation transparente dans les réponses',
      'Support des formats PDF, Word et texte',
      'Dictionnaire de correspondance sécurisé en local',
      'Aucune donnée sensible ne transite vers le cloud',
    ],
    tech: ['Next.js', 'Supabase', 'API Anthropic (Haiku extraction, Sonnet analyse)'],
    marche: 'Professions réglementées, juristes, experts-comptables, RH.',
  },
  {
    id: 'mongreffier',
    name: 'Mon Greffier',
    tagline: 'Assistant du juge consulaire',
    icon: Scale,
    install: 'Plugin Claude Cowork',
    installIcon: Puzzle,
    status: 'En cours de développement',
    statusColor: 'bg-purple-100 text-purple-800',
    href: null,
    external: false,
    description: 'Mon Greffier accompagne les juges consulaires de l\'analyse du dossier jusqu\'au jugement rédigé. L\'IA ne juge pas : elle analyse, structure et propose. Chaque étape requiert la validation du magistrat avant de passer à la suivante.',
    features: [
      'Cadrage du dossier : parties, fins de non-recevoir, articles cités, pièces clés',
      'Points de décision soumis au juge avec indicateurs de fiabilité — le magistrat tranche, l\'IA exécute',
      'Rédaction du jugement structuré avec motivation obligatoire de chaque montant',
      'Analyse de robustesse : angles morts, simulation de mémoire d\'appel, risque de réformation',
    ],
    tech: ['Next.js', 'Supabase', 'API Anthropic (Sonnet, Opus)', 'Tavily', 'API Legifrance'],
    marche: 'Juges consulaires des tribunaux de commerce. Marché France.',
  },
  {
    id: 'signalpro',
    name: 'SignalPro',
    tagline: 'Veille économique et signaux faibles',
    icon: Radar,
    install: 'Plugin Claude Cowork',
    installIcon: Puzzle,
    status: 'En cours de développement',
    statusColor: 'bg-purple-100 text-purple-800',
    href: null,
    external: false,
    description: 'SignalPro agrège et analyse les signaux économiques de vos partenaires, clients et fournisseurs. Publications BODACC, ratios financiers, scan presse sectoriel : tout est compilé pour détecter les situations à risque avant qu\'il ne soit trop tard.',
    features: [
      'Surveillance BODACC en temps réel (procédures collectives, cessions, radiations)',
      'Ratios financiers via données BCE/INPI',
      'Scan presse sectoriel automatisé (18 médias)',
      'Watchlist personnalisée avec alertes (stable/alerte/critique)',
      'Export PDF hebdomadaire pour diffusion interne',
    ],
    tech: ['Next.js', 'Supabase', 'Tavily Search', 'API INSEE SIRENE', 'API BODACC', 'data.economie.gouv.fr', 'Pappers'],
    marche: 'Dirigeants PME, DAF, risk managers. Marché France (données exploitables).',
  },
];

export default async function OutilsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="bg-bleu-nuit">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              {dict.outils.hero.title}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              {dict.outils.hero.subtitle}
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {/* Mnemos - fiche enrichie */}
            <MnemosDetail dict={dict} />

            {/* Autres outils - format standard */}
            {autresOutils.map((outil) => {
              const IconComponent = outil.icon;
              const InstallIcon = outil.installIcon;
              return (
                <Card key={outil.id} id={outil.id} className="bg-white p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-bleu-nuit rounded-xl flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-ambre" />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-bleu-nuit">
                          {outil.name}
                        </h2>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${outil.statusColor}`}>
                          {outil.status}
                        </span>
                      </div>

                      <p className="text-ambre font-semibold mb-1">{outil.tagline}</p>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <InstallIcon className="w-4 h-4" />
                        <span>{outil.install}</span>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                        {outil.description}
                      </p>

                      <div className="mb-6">
                        <h3 className="font-semibold text-bleu-nuit mb-3">{dict.outils.common.fonctionnalites}</h3>
                        <ul className="space-y-2">
                          {outil.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-ambre mt-0.5">&#10003;</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-semibold text-bleu-nuit mb-3">{dict.outils.common.stack}</h3>
                        <div className="flex flex-wrap gap-2">
                          {outil.tech.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-semibold text-bleu-nuit mb-2">{dict.outils.common.marche}</h3>
                        <p className="text-sm text-gray-600">{outil.marche}</p>
                      </div>

                      {outil.id === 'agoria' && (
                        <div className="mb-6">
                          <h3 className="font-semibold text-bleu-nuit mb-3">{dict.outils.common.apercus}</h3>
                          <ScreenshotGallery screenshots={[
                            { src: "/images/AgorIA/agoria-01-accueil.png", alt: "Accueil interactif AgorIA", caption: "Accueil interactif" },
                            { src: "/images/AgorIA/agoria-02-intervention-ia.png", alt: "Intervention IA écrite et verbale", caption: "Intervention IA écrite et verbale" },
                            { src: "/images/AgorIA/agoria-03-questionnaire.png", alt: "Questionnaire automatique", caption: "Questionnaire automatique" },
                            { src: "/images/AgorIA/agoria-04-quiz.png", alt: "Quiz personnalisé par apprenant", caption: "Quiz personnalisé" },
                          ]} />
                        </div>
                      )}

                      {outil.id === 'mongreffier' && (
                        <div className="flex justify-end mt-2">
                          <DownloadButton
                            downloadUrl="/downloads/mon-greffier-v3.3.0.plugin"
                            accessCode="TC26Romans"
                          />
                        </div>
                      )}

                      {outil.href && !outil.betaCta && (
                        <a
                          href={outil.href}
                          target={outil.external ? '_blank' : undefined}
                          rel={outil.external ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-bleu-nuit text-white font-semibold rounded-lg hover:bg-bleu-nuit-light transition-colors"
                        >
                          {outil.cta || dict.outils.common.cta.decouvrir}
                          {outil.external && <ExternalLink className="w-4 h-4" />}
                        </a>
                      )}

                      {outil.betaCta && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <a
                            href={outil.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-bleu-nuit text-white font-semibold rounded-lg hover:bg-bleu-nuit-light transition-colors"
                          >
                            {outil.cta || dict.outils.common.cta.decouvrir}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <div className="flex items-center gap-3 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg sm:ml-auto">
                            <div className="text-sm">
                              <span className="text-bleu-nuit font-semibold">{dict.outils.common.beta.recherche}</span>
                              <span className="text-gray-500 mx-1.5">|</span>
                              <span className="text-gray-600">{dict.outils.common.beta.offre}</span>
                            </div>
                            <BetaForm />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

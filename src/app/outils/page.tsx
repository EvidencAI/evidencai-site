import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import ScreenshotGallery from "@/components/ui/ScreenshotGallery";
import { Brain, Lightbulb, ShieldCheck, Scale, Radar, ExternalLink, MonitorSmartphone, Puzzle, Globe, MessageSquare, Zap, BookOpen, Atom, Network, Sparkles, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nos outils IA - EvidencAI',
  description: 'Découvrez nos applications IA : Mnemos (mémoire persistante), CodirAI (aide à la décision), ConfidentIA (anonymisation), JudicIA (rédaction judiciaire) et SignalPro (veille économique).',
};

function MnemosDetail() {
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
            <h3 className="font-semibold text-bleu-nuit mb-3">Stack technique</h3>
            <div className="flex flex-wrap gap-2">
              {['Supabase', 'PostgreSQL', 'pgvector', 'Node.js', 'API Anthropic (Opus, Sonnet, Haiku)'].map((tech) => (
                <span key={tech} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded font-mono">{tech}</span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-bleu-nuit mb-2">Marché cible</h3>
            <p className="text-sm text-gray-600">Tout utilisateur de Claude souhaitant une continuité entre ses sessions de travail.</p>
          </div>

          {/* Screenshots */}
          <div className="mb-6">
            <h3 className="font-semibold text-bleu-nuit mb-3">Aperçus</h3>
            <ScreenshotGallery screenshots={[
              { src: "/images/mnemos/dashboard.png", alt: "Dashboard Mnemos", caption: "Tableau de bord" },
              { src: "/images/mnemos/atomes.png", alt: "Graphe d atomes", caption: "Graphe d atomes" },
              { src: "/images/mnemos/cycle.png", alt: "Cycle de session", caption: "Cycle de session" },
              { src: "/images/mnemos/insights.png", alt: "Insights du neurone", caption: "Insights" },
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
    cta: 'Devenir beta-testeur',
    description: 'CodirAI transforme les réponses de l\'IA générative en conseils fiables et exploitables. Un comité de 15 experts virtuels analyse, challenge et structure l\'information pour vous donner des recommandations sourcées avec un score de confiance.',
    features: [
      'Analyse multi-angles par 15 modules d\'expertise',
      'Score de confiance et sources vérifiables sur chaque recommandation',
      'Compatible ChatGPT, Claude, Gemini et toute IA générative',
      'Génération de rapports PDF/Word pour vos prises de décision',
      'Tableau de bord centralisant l\'historique de vos analyses',
    ],
    tech: ['Next.js', 'Supabase', 'API Anthropic (Opus, Sonnet, Haiku)', 'Chrome Extension API'],
    marche: 'Dirigeants PME, consultants, managers opérationnels.',
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
    id: 'judicia',
    name: 'JudicIA',
    tagline: 'Assistant rédaction de jugements commerciaux',
    icon: Scale,
    install: 'Application web',
    installIcon: Globe,
    status: 'En cours de développement',
    statusColor: 'bg-purple-100 text-purple-800',
    href: null,
    external: false,
    description: 'JudicIA accompagne les juges consulaires dans l\'analyse des dossiers et la rédaction des jugements commerciaux. Extraction des faits, cadrage juridique, rédaction structurée et analyse de robustesse : chaque étape est assistée par l\'IA avec une gate humaine obligatoire.',
    features: [
      'Extraction automatique des faits et demandes depuis les conclusions',
      'Cadrage juridique avec recherche de jurisprudence (Legifrance)',
      'Rédaction structurée en 9 sections avec triple LLM',
      'Analyse de robustesse : angles morts, risque d\'appel, solutions',
      'Anonymisation intégrée pour la confidentialité des dossiers',
    ],
    tech: ['Next.js', 'Supabase', 'API Anthropic (Haiku, Sonnet, Opus)', 'Tavily', 'API Legifrance', 'API data.gouv.fr'],
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

export default function OutilsPage() {
  return (
    <div className="bg-bleu-nuit">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Nos outils IA
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Nous créons les outils que nous enseignons. Chaque application est une démonstration
              concrète de ce que l&apos;IA peut faire pour améliorer votre quotidien professionnel.
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {/* Mnemos - fiche enrichie */}
            <MnemosDetail />

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

                      <p className="text-gray-600 leading-relaxed mb-6">
                        {outil.description}
                      </p>

                      <div className="mb-6">
                        <h3 className="font-semibold text-bleu-nuit mb-3">Fonctionnalités clés</h3>
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
                        <h3 className="font-semibold text-bleu-nuit mb-3">Stack technique</h3>
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
                        <h3 className="font-semibold text-bleu-nuit mb-2">Marché cible</h3>
                        <p className="text-sm text-gray-600">{outil.marche}</p>
                      </div>

                      {outil.href && (
                        <a
                          href={outil.href}
                          target={outil.external ? '_blank' : undefined}
                          rel={outil.external ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-bleu-nuit text-white font-semibold rounded-lg hover:bg-bleu-nuit-light transition-colors"
                        >
                          {outil.cta || 'Découvrir'}
                          {outil.external && <ExternalLink className="w-4 h-4" />}
                        </a>
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

import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Brain, Lightbulb, ShieldCheck, Scale, Radar } from 'lucide-react';

export default function OutilsSection() {
  const outils = [
    {
      name: 'Mnemos',
      tagline: 'Mémoire persistante pour IA',
      description: 'Claude se souvient de vos projets, préférences et contextes à travers les conversations.',
      install: 'Plugin Claude Cowork',
      status: 'En test',
      statusColor: 'bg-amber-100 text-amber-800',
      href: 'https://mnemos.evidencai.com',
      external: true,
      icon: Brain,
      tech: ['Supabase', 'PostgreSQL', 'pgvector', 'Node.js', 'API Anthropic'],
    },
    {
      name: 'CodirAI',
      tagline: 'Orchestrateur de décision',
      description: 'Analyse, challenge et structure l\'information pour des décisions fiables et sourcées.',
      install: 'Extension Chrome',
      status: 'Beta test',
      statusColor: 'bg-blue-100 text-blue-800',
      href: 'https://codirai.com',
      external: true,
      icon: Lightbulb,
      tech: ['Next.js', 'Supabase', 'API OpenAI', 'Chrome Extension'],
    },
    {
      name: 'ConfidentIA',
      tagline: 'Anonymisation intelligente',
      description: 'Analysez vos documents confidentiels avec Claude, sans risque. Anonymisation et désanonymisation automatiques.',
      install: 'Plugin Claude Cowork',
      status: 'En cours',
      statusColor: 'bg-purple-100 text-purple-800',
      href: '/outils#confidentia',
      external: false,
      icon: ShieldCheck,
      tech: ['Next.js', 'Supabase', 'API Anthropic'],
    },
    {
      name: 'JudicIA',
      tagline: 'Assistant rédaction judiciaire',
      description: 'Contrôle, analyse et aide à la rédaction de jugements commerciaux pour les tribunaux de commerce.',
      install: 'Application web',
      status: 'En cours',
      statusColor: 'bg-purple-100 text-purple-800',
      href: '/outils#judicia',
      external: false,
      icon: Scale,
      tech: ['Next.js', 'Supabase', 'API Anthropic', 'Tavily', 'Legifrance'],
    },
    {
      name: 'SignalPro',
      tagline: 'Veille et signaux faibles',
      description: 'Surveillez et analysez la situation de vos partenaires. Compilation de signaux économiques et financiers.',
      install: 'Plugin Claude Cowork',
      status: 'En cours',
      statusColor: 'bg-purple-100 text-purple-800',
      href: '/outils#signalpro',
      external: false,
      icon: Radar,
      tech: ['Next.js', 'Supabase', 'Tavily', 'INSEE', 'BODACC', 'data.economie.gouv.fr'],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-bleu-nuit-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Nos outils
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Nous créons les outils que nous enseignons. Chaque application est une démonstration concrète de ce que l&apos;IA peut faire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {outils.map((outil) => {
            const IconComponent = outil.icon;
            return (
              <Card key={outil.name} hover className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-8 h-8 text-ambre flex-shrink-0" />
                    <div>
                      <h3 className="font-playfair text-xl font-bold text-bleu-nuit">
                        {outil.name}
                      </h3>
                      <p className="text-ambre text-sm font-semibold">{outil.tagline}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${outil.statusColor}`}>
                    {outil.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {outil.install}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">
                  {outil.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {outil.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  {outil.external ? (
                    <a
                      href={outil.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-ambre font-semibold text-sm hover:text-ambre-light transition-colors"
                    >
                      Découvrir
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={outil.href}
                      className="inline-flex items-center gap-1.5 text-ambre font-semibold text-sm hover:text-ambre-light transition-colors"
                    >
                      En savoir plus
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/outils"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-bleu-nuit transition-all"
          >
            Voir tous nos outils en détail
          </Link>
        </div>
      </div>
    </section>
  );
}

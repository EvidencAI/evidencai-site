import Card from '@/components/ui/Card';

export default function OutilsSection() {
  const outils = [
    {
      name: 'Mnemos',
      tagline: 'Mémoire persistante pour IA',
      description: 'Un système de mémoire qui permet à Claude de se souvenir de vos projets, préférences et contextes à travers les conversations.',
      status: 'En production',
      link: 'https://mnemos.evidencai.com',
      tech: ['Next.js', 'PostgreSQL', 'Supabase', 'Claude API'],
    },
    {
      name: 'CodirIA',
      tagline: 'Assistant comité de direction',
      description: 'Outil d\'aide à la décision pour dirigeants. Analyse, synthèse et préparation de vos comités de direction avec l\'IA.',
      status: 'À venir',
      link: '#',
      tech: ['Next.js', 'Claude API', 'Analytics'],
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {outils.map((outil) => (
            <Card key={outil.name} hover>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-bleu-nuit mb-1">
                    {outil.name}
                  </h3>
                  <p className="text-ambre font-semibold">{outil.tagline}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    outil.status === 'En production'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {outil.status}
                </span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {outil.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {outil.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {outil.link !== '#' ? (
                <a
                  href={outil.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ambre font-semibold hover:text-ambre-light transition-colors"
                >
                  Essayer la démo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span className="text-gray-400 font-semibold">Bientôt disponible</span>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

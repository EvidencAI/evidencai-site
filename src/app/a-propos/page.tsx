import type { Metadata } from 'next';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'À propos - Stéphane Commenge',
  description: 'Entrepreneur, juge consulaire, formateur et développeur IA. Découvrez le parcours de Stéphane Commenge et sa vision de l\'intelligence artificielle.',
  openGraph: {
    title: 'À propos - Stéphane Commenge | EvidencAI',
    description: 'Entrepreneur, juge consulaire, formateur et développeur IA',
    url: 'https://evidencai.com/a-propos',
  },
};

export default function AProposPage() {
  // Schema.org Person structured data
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Stéphane Commenge',
    jobTitle: 'Formateur et consultant IA',
    worksFor: {
      '@type': 'Organization',
      name: 'EvidencAI',
    },
    url: 'https://evidencai.com/a-propos',
    sameAs: [
      'https://linkedin.com/in/stephanecommenge',
    ],
    knowsAbout: [
      'Intelligence Artificielle',
      'Formation professionnelle',
      'Claude AI',
      'Anthropic',
      'Conseil en IA',
    ],
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="bg-bleu-nuit">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Photo placeholder */}
                <div className="md:col-span-1">
                  <div className="aspect-square bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <svg
                      className="w-24 h-24 text-white/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="mt-6 text-center">
                    <a
                      href="https://linkedin.com/in/stephanecommenge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-ambre hover:text-ambre-light transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 text-white space-y-6">
                  <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                    Stéphane Commenge
                  </h1>
                  <p className="text-xl text-ambre font-semibold">
                    Entrepreneur, formateur et développeur IA
                  </p>

                  <div className="space-y-4 text-text-secondary leading-relaxed">
                    <p>
                      [PLACEHOLDER - Parcours professionnel de Stéphane à compléter]
                    </p>
                    <p>
                      Entrepreneur depuis plus de 15 ans, juge consulaire au Tribunal de Commerce,
                      j&apos;ai développé une expertise unique à la croisée du business et de la technologie.
                    </p>
                    <p>
                      [PLACEHOLDER - Transition vers l&apos;IA, motivations, formations suivies]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valeurs & Vision */}
        <section className="py-16 md:py-24 bg-bleu-nuit-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Pourquoi l&apos;IA ?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-4">
                    Une conviction, pas un effet de mode
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    L&apos;IA n&apos;est pas une technologie parmi d&apos;autres. C&apos;est un changement de paradigme
                    dans notre façon de travailler, de décider, de créer. Mon objectif : vous accompagner
                    dans cette transformation avec pragmatisme et éthique.
                  </p>
                </Card>

                <Card>
                  <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-4">
                    Pourquoi Claude / Anthropic ?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Anthropic place la sécurité et l&apos;éthique au cœur de son approche (safety-first).
                    Claude excelle en raisonnement complexe, nuance et transparence. C&apos;est l&apos;outil que
                    je recommande pour un usage professionnel exigeant.
                  </p>
                </Card>

                <Card>
                  <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-4">
                    L&apos;IA qui améliore l&apos;humain
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Je ne crois pas à l&apos;IA qui remplace. Je crois à l&apos;IA qui amplifie vos capacités,
                    libère du temps pour l&apos;essentiel, et vous permet de prendre de meilleures décisions.
                  </p>
                </Card>

                <Card>
                  <h3 className="font-playfair text-xl font-bold text-bleu-nuit mb-4">
                    Formation Qualiopi
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Organisme de formation certifié Qualiopi, permettant une prise en charge par les OPCO
                    pour vos formations. Qualité, rigueur et accompagnement personnalisé.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à transformer votre approche de l&apos;IA ?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Que vous soyez curieux, professionnel ou dirigeant, il y a un parcours pour vous.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/ateliers"
                  className="min-h-[48px] px-8 py-3 bg-ambre text-bleu-nuit font-semibold rounded-lg hover:bg-ambre-light transition-all"
                >
                  Découvrir les ateliers
                </a>
                <a
                  href="/contact"
                  className="min-h-[48px] px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-bleu-nuit transition-all"
                >
                  Me contacter
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import AtelierCard from '@/components/ateliers/AtelierCard';

export const metadata: Metadata = {
  title: 'Ateliers IA - 2h pour maîtriser l\'intelligence artificielle',
  description: 'Ateliers pratiques de 2h pour découvrir et maîtriser l\'IA. 3 niveaux : débutant, intermédiaire, confirmé. 120€ TTC par personne.',
  openGraph: {
    title: 'Ateliers IA - EvidencAI',
    description: 'Ateliers pratiques de 2h pour découvrir et maîtriser l\'IA',
    url: 'https://evidencai.com/ateliers',
  },
};

export default function AteliersPage() {
  const ateliers = [
    {
      id: 'debutant',
      title: 'Découvrir l\'IA au quotidien',
      level: 'debutant' as const,
      duration: '2 heures',
      price: '120€ TTC',
      description: 'Pour les curieux qui veulent comprendre ce qu\'est vraiment l\'IA et comment l\'utiliser au quotidien, sans prérequis technique.',
      topics: [
        'Comprendre ce qu\'est (et n\'est pas) l\'IA',
        'Premiers usages concrets dans votre quotidien',
        'Démonstration live avec Claude',
        'Les bonnes pratiques pour démarrer',
        'Questions/réponses personnalisées',
      ],
    },
    {
      id: 'intermediaire',
      title: 'L\'IA dans votre métier',
      level: 'intermediaire' as const,
      duration: '2 heures',
      price: '120€ TTC',
      description: 'Pour les professionnels qui veulent intégrer l\'IA dans leur workflow quotidien et gagner en efficacité.',
      topics: [
        'Cas d\'usage adaptés à votre secteur',
        'Techniques de prompt engineering',
        'Outils IA pour votre métier',
        'Automatisation de tâches répétitives',
        'Atelier pratique personnalisé',
      ],
    },
    {
      id: 'confirme',
      title: 'Automatiser et créer avec l\'IA',
      level: 'confirme' as const,
      duration: '2 heures',
      price: '120€ TTC',
      description: 'Pour les utilisateurs avancés qui veulent créer des workflows IA personnalisés et développer des solutions sur mesure.',
      topics: [
        'Architecture d\'agents IA',
        'Création de workflows automatisés',
        'Intégration d\'APIs IA',
        'Développement d\'outils sur mesure',
        'Stratégie d\'implémentation',
      ],
    },
  ];

  const faqItems = [
    {
      question: 'Faut-il un niveau technique particulier ?',
      answer: 'Non, chaque module est adapté à son niveau. Le module débutant ne nécessite aucune compétence technique. Les modules intermédiaire et confirmé s\'adaptent à votre profil.',
    },
    {
      question: 'Les ateliers sont-ils en présentiel ou distanciel ?',
      answer: 'Les deux formats sont possibles. Les ateliers en présentiel ont lieu dans la Drôme (26). Les ateliers en visio sont disponibles pour toute la France.',
    },
    {
      question: 'Comment se passe le paiement ?',
      answer: 'Le paiement se fait en ligne de manière sécurisée via Stripe lors de votre inscription. Vous recevez immédiatement une confirmation par email.',
    },
    {
      question: 'Puis-je être remboursé ?',
      answer: 'Oui, vous pouvez annuler jusqu\'à 48h avant l\'atelier pour un remboursement complet. Au-delà, un avoir sera proposé pour une session ultérieure.',
    },
    {
      question: 'Combien de participants par atelier ?',
      answer: 'Maximum 8 participants pour garantir un accompagnement personnalisé et des échanges de qualité.',
    },
    {
      question: 'Recevrai-je des supports ?',
      answer: 'Oui, chaque participant reçoit un support PDF récapitulatif et accès aux ressources partagées pendant l\'atelier.',
    },
  ];

  // Schema.org structured data for FAQ
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-bleu-nuit">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
                Ateliers IA
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                2 heures pour découvrir, comprendre et maîtriser l&apos;intelligence artificielle.
                Choisissez le module adapté à votre niveau.
              </p>
            </div>
          </div>
        </section>

        {/* Ateliers Cards */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {ateliers.map((atelier) => (
                <AtelierCard key={atelier.id} module={atelier} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-bleu-nuit-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Questions fréquentes
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <h3 className="font-semibold text-lg text-white mb-3">
                      {item.question}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

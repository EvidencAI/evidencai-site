import type { Metadata } from 'next';
import AtelierCard from '@/components/ateliers/AtelierCard';

export const metadata: Metadata = {
  title: 'Ateliers IA - 2h pour maîtriser l\'intelligence artificielle',
  description: 'Ateliers pratiques de 2h en visio pour comprendre et maîtriser l\'IA. 4 modules : fondamentaux, Claude, outils IA, intégration entreprise. 120€ TTC par personne, 5 participants max.',
  openGraph: {
    title: 'Ateliers IA - EvidencAI',
    description: 'Ateliers pratiques de 2h en visio pour comprendre et maîtriser l\'IA. Du premier contact à l\'intégration en entreprise.',
    url: 'https://evidencai.com/ateliers',
  },
};

export default function AteliersPage() {
  const ateliers = [
    {
      id: 'comprendre',
      title: 'Comprendre l\'IA : pour un usage lucide et efficient',
      level: 'debutant' as const,
      duration: '2 heures',
      price: '120€ TTC',
      description: 'Vous entendez parler d\'IA partout. Certains sont enthousiastes, d\'autres inquiets, la plupart sont perdus. Cet atelier vous donne les clés pour comprendre ce que l\'IA fait vraiment, et les 4 réflexes pour l\'utiliser sans vous faire avoir.',
      topics: [
        'Les 4 piliers d\'un usage maîtrisé : Contextualiser, Vérifier, Recadrer, Itérer',
        'Ce que l\'IA sait faire, ce qu\'elle ne sait pas, et ce qu\'elle fait semblant de savoir',
        'Démonstration live : la même question posée de deux façons, deux résultats radicalement différents',
        'Les 6 pièges que tout le monde fait (et comment les éviter)',
        'Votre premier échange guidé avec Claude, en direct pendant l\'atelier',
      ],
    },
    {
      id: 'maitriser',
      title: 'Maîtriser Claude : produire, itérer, réussir',
      level: 'intermediaire' as const,
      duration: '2 heures',
      price: '120€ TTC',
      description: 'Vous avez testé l\'IA. Les résultats étaient... moyens.\nNormal : 80% de la qualité dépend de la façon dont vous posez le problème. Cet atelier vous donne la méthode pour obtenir des résultats professionnels, sur vos vrais sujets.',
      topics: [
        'La méthode C.R.T.F. : quatre réflexes pour un prompt qui produit',
        'Avant / après : le même sujet, un résultat médiocre puis un résultat exploitable',
        'Exercice guidé : transformer un cas concret avec la méthode, puis itérer ensemble',
        'L\'art de l\'itération : passer d\'un premier jet à un résultat professionnel',
        'Guide pratique offert : configurer votre espace Claude pour un usage durable',
      ],
    },
    {
      id: 'outils',
      title: 'NotebookLM, Perplexity & Cie : choisir les bons outils IA',
      level: 'debutant' as const,
      duration: '2 heures',
      price: '120€ TTC',
      description: 'NotebookLM, Perplexity, ChatGPT, Claude, Gemini... Vous avez entendu ces noms sans savoir lequel utiliser, ni pourquoi. Cet atelier vous donne une grille de lecture claire pour choisir le bon outil au bon moment, et arrêter de papillonner.',
      topics: [
        'NotebookLM : synthétiser et interroger vos documents en quelques minutes',
        'Perplexity : rechercher avec des sources, pas des suppositions',
        'Claude, ChatGPT, Gemini : forces, limites et positionnements réels',
        'Les 4 piliers appliqués à chaque outil : même méthode, outils différents',
        'Une grille de choix claire : quel outil pour quel usage dans votre quotidien',
      ],
    },
    {
      id: 'connecter',
      title: 'L\'IA dans votre entreprise : de l\'outil au levier',
      level: 'confirme' as const,
      duration: '2 heures',
      price: '120€ TTC',
      description: 'L\'IA dans un onglet, c\'est un gadget. L\'IA connectée à vos données, vos outils et vos processus, c\'est un levier stratégique. Cet atelier vous montre concrètement ce qui devient possible, et vous aide à identifier vos premiers cas d\'usage.',
      topics: [
        'Ce que change l\'IA connectée : démonstration avec des outils réels',
        'Plugins et intégrations : comment l\'IA accède à vos fichiers, votre agenda, vos données',
        'Sécurité et confidentialité : les vraies questions à se poser avant de connecter quoi que ce soit',
        'Trois cas d\'usage concrets commentés et adaptables à votre secteur',
        'Les questions clés pour construire votre feuille de route d\'intégration IA',
      ],
    },
  ];

  const faqItems = [
    {
      question: 'Faut-il un niveau technique particulier ?',
      answer: 'Non. L\'atelier "Comprendre l\'IA" ne nécessite aucune compétence technique. Pour "Maîtriser Claude", avoir déjà utilisé un assistant IA est un plus. Pour "L\'IA dans votre entreprise", une expérience préalable avec l\'IA est recommandée.',
    },
    {
      question: 'Dans quel ordre suivre les ateliers ?',
      answer: 'Nous recommandons de commencer par "Comprendre l\'IA" qui pose les fondamentaux. Ensuite, "Maîtriser Claude" et "NotebookLM, Perplexity & Cie" peuvent être suivis dans l\'ordre de votre choix. "L\'IA dans votre entreprise" est idéal en dernier pour une vision stratégique.',
    },
    {
      question: 'Les ateliers sont-ils en présentiel ou distanciel ?',
      answer: 'Les ateliers se déroulent en visio (Google Meet ou Zoom). Ce format permet un échange direct avec le formateur tout en restant confortable depuis votre bureau. Les ateliers en présentiel sont possibles sur demande dans la Drôme (26).',
    },
    {
      question: 'Faut-il préparer quelque chose avant l\'atelier ?',
      answer: 'Pour les ateliers qui utilisent Claude (modules 1 et 2), nous vous demandons de créer votre compte Claude gratuit avant la session. Un email avec les instructions vous est envoyé à l\'inscription.',
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
      answer: 'Maximum 5 participants pour garantir un accompagnement personnalisé et des échanges de qualité, même en visio.',
    },
    {
      question: 'Recevrai-je des supports ?',
      answer: 'Oui, chaque participant reçoit un support PDF récapitulatif, des ressources complémentaires et, selon les modules, des guides pratiques pour continuer en autonomie.',
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
                2 heures en visio, 5 participants max, un formateur praticien.
                <br />
                Quatre modules, une progression : lucidité, maîtrise, discernement, vision.
              </p>
            </div>
          </div>
        </section>

        {/* Ateliers Cards */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
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

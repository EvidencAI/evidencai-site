import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Target, GraduationCap, Rocket } from 'lucide-react';

export default function FunnelSection() {
  const funnelItems = [
    {
      title: 'Ateliers',
      description: 'Initiation pratique de 2h pour découvrir et maîtriser l\'IA au quotidien',
      price: '120€ TTC',
      href: '/ateliers',
      icon: Target,
      level: 'Démarrage rapide',
    },
    {
      title: 'Formation Qualiopi',
      description: 'Parcours sur mesure de 1 à 3 jours pour votre équipe. Financement OPCO possible.',
      price: 'Sur devis',
      href: '/formation',
      icon: GraduationCap,
      level: 'Montée en compétence',
    },
    {
      title: 'Audit & Implémentation',
      description: 'Mission complète : diagnostic, recommandations et intégration IA dans vos processus',
      price: 'Sur mesure',
      href: '/solutions',
      icon: Rocket,
      level: 'Transformation',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bleu-nuit mb-4">
            Un parcours adapté à votre maturité IA
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Du premier contact avec l&apos;IA à l&apos;implémentation complète, choisissez votre étape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {funnelItems.map((item) => {
            const IconComponent = item.icon;
            return (
            <Card key={item.title} hover className="flex flex-col h-full border border-gray-200 shadow-lg">
              <IconComponent className="w-10 h-10 text-bleu-nuit mb-4" />
              <span className="text-xs font-semibold text-ambre uppercase tracking-wide mb-2">
                {item.level}
              </span>
              <h3 className="font-playfair text-2xl font-bold text-bleu-nuit mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                {item.description}
              </p>
              <div className="mt-auto">
                <p className="text-2xl font-bold text-ambre mb-4">{item.price}</p>
                <Link
                  href={item.href}
                  className="block w-full text-center px-6 py-3 bg-bleu-nuit text-white font-semibold rounded-lg hover:bg-bleu-nuit-light transition-colors"
                >
                  En savoir plus
                </Link>
              </div>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

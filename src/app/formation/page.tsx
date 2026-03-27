import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Formation Qualiopi - Parcours IA sur mesure',
  description: 'Formations IA certifiées Qualiopi pour entreprises. Parcours 1-3 jours personnalisés. Financement OPCO possible.',
};

export default function FormationPage() {
  return (
    <div className="bg-bleu-nuit min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Formation Qualiopi
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Page en cours de développement
          </p>
          <p className="text-text-secondary mb-8">
            Parcours de formation sur mesure certifiés Qualiopi, adaptés aux besoins de votre entreprise.
            Financement OPCO possible.
          </p>
          <Link
            href="/contact"
            className="inline-block min-h-[48px] px-8 py-3 bg-ambre text-bleu-nuit font-semibold rounded-lg hover:bg-ambre-light transition-all"
          >
            Contactez-nous pour un devis
          </Link>
        </div>
      </div>
    </div>
  );
}

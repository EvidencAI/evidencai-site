import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Audit & Solutions IA - Intégration sur mesure',
  description: 'Diagnostic, audit et implémentation IA pour votre entreprise. Du conseil à la mise en œuvre complète.',
};

export default function SolutionsPage() {
  return (
    <div className="bg-bleu-nuit min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Audit & Solutions IA
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Page en cours de développement
          </p>
          <p className="text-text-secondary mb-8">
            Diagnostic IA, audit de vos processus, recommandations stratégiques et implémentation complète.
            Du conseil à la mise en œuvre.
          </p>
          <Link
            href="/contact"
            className="inline-block min-h-[48px] px-8 py-3 bg-ambre text-bleu-nuit font-semibold rounded-lg hover:bg-ambre-light transition-all"
          >
            Réserver un diagnostic gratuit
          </Link>
        </div>
      </div>
    </div>
  );
}

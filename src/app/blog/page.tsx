import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Actualités et réflexions sur l\'IA',
  description: 'Articles, tutoriels et réflexions sur l\'intelligence artificielle en entreprise',
};

export default function BlogPage() {
  return (
    <div className="bg-bleu-nuit min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Page en cours de développement
          </p>
          <p className="text-text-secondary mb-8">
            Articles, tutoriels et réflexions sur l&apos;intelligence artificielle en entreprise.
            Retours d&apos;expérience et cas pratiques.
          </p>
          <Link
            href="/"
            className="inline-block min-h-[48px] px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-bleu-nuit transition-all"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

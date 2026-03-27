import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bleu-nuit flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-playfair text-8xl md:text-9xl font-bold text-white mb-6">
          404
        </h1>
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
          Cette page n&apos;existe pas
        </h2>
        <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
          La page que vous cherchez semble introuvable. Peut-être a-t-elle été déplacée ou supprimée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-ambre text-bleu-nuit font-semibold rounded-lg hover:bg-ambre-light transition-all hover:shadow-lg"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}

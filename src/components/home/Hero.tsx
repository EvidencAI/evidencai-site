import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bleu-nuit via-bleu-nuit-light to-bleu-nuit py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Pour une IA qui vous améliore.
            <br />
            <span className="text-ambre">Pas qui vous remplace.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
            Accompagnement IA pour dirigeants et entreprises. De l&apos;atelier découverte à l&apos;implémentation sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/ateliers"
              className="min-h-[48px] px-8 py-3 bg-ambre text-bleu-nuit font-semibold rounded-lg hover:bg-ambre-light transition-all hover:shadow-lg"
            >
              Découvrir les ateliers
            </Link>
            <Link
              href="/contact"
              className="min-h-[48px] px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-bleu-nuit transition-all"
            >
              Parlons de votre projet
            </Link>
          </div>
        </div>
      </div>

      {/* Gradient mesh subtil */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-ambre/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import OutilsSection from '@/components/home/OutilsSection';

export const metadata: Metadata = {
  title: 'Nos outils - Mnemos & CodirIA',
  description: 'Découvrez nos applications IA : Mnemos (mémoire persistante) et CodirIA (assistant comité de direction)',
};

export default function OutilsPage() {
  return (
    <div className="bg-bleu-nuit">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Nos outils IA
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Nous créons les outils que nous enseignons. Chaque application est une démonstration
              concrète de ce que l&apos;IA peut faire pour améliorer votre quotidien professionnel.
            </p>
          </div>
        </div>
      </section>
      <OutilsSection />
    </div>
  );
}

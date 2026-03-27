import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inscription atelier - Paiement sécurisé',
  description: 'Inscrivez-vous à un atelier IA. Paiement sécurisé via Stripe.',
};

export default function InscriptionPage() {
  return (
    <div className="bg-bleu-nuit min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Inscription atelier
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Page en cours de développement
          </p>
          <p className="text-text-secondary mb-8">
            Le formulaire d&apos;inscription avec paiement Stripe sera disponible prochainement.
            En attendant, contactez-nous directement.
          </p>
          <Link
            href="/contact"
            className="inline-block min-h-[48px] px-8 py-3 bg-ambre text-bleu-nuit font-semibold rounded-lg hover:bg-ambre-light transition-all"
          >
            Me contacter pour une inscription
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import CalendlyEmbed from '@/components/ateliers/CalendlyEmbed';

export const metadata: Metadata = {
  title: 'Inscription atelier IA - Choisissez votre date',
  description: 'Choisissez votre créneau et inscrivez-vous à un atelier IA EvidencAI. Paiement sécurisé, confirmation immédiate.',
};

// Mapping module ID → Calendly URL
const calendlyUrls: Record<string, string> = {
  comprendre: 'https://calendly.com/stephane-commenge/comprendre-l-ia-pour-un-usage-lucide-et-efficient',
  maitriser: 'https://calendly.com/stephane-commenge/maitriser-claude',
  outils: 'https://calendly.com/stephane-commenge/les-outils',
  connecter: 'https://calendly.com/stephane-commenge/les-outils-ia',
};

const moduleNames: Record<string, string> = {
  comprendre: 'Comprendre l\'IA : pour un usage lucide et efficient',
  maitriser: 'Maîtriser Claude : produire, itérer, réussir',
  outils: 'NotebookLM, Perplexity & Cie : choisir les bons outils IA',
  connecter: 'L\'IA dans votre entreprise : de l\'outil au levier',
};

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ module?: string }>;
}) {
  const params = await searchParams;
  const moduleId = params.module || '';
  const calendlyUrl = calendlyUrls[moduleId] || '';
  const moduleName = moduleNames[moduleId] || '';

  // Module non trouvé ou pas d'URL Calendly
  if (!calendlyUrl) {
    return (
      <div className="bg-bleu-nuit min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Inscription
            </h1>
            <p className="text-xl text-text-secondary mb-4">
              {moduleId && !calendlyUrl
                ? 'Les dates pour cet atelier ne sont pas encore disponibles.'
                : 'Choisissez un atelier pour voir les dates disponibles.'}
            </p>
            <Link
              href="/ateliers"
              className="inline-block min-h-[48px] px-8 py-3 bg-ambre text-white font-semibold rounded-lg hover:bg-ambre-light transition-all"
            >
              Voir tous les ateliers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bleu-nuit min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="mb-8">
            <Link
              href="/ateliers"
              className="text-text-secondary hover:text-white transition-colors text-sm mb-4 inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux ateliers
            </Link>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mt-4 mb-2">
              Choisissez votre date
            </h1>
            <p className="text-lg text-ambre font-semibold">
              {moduleName}
            </p>
            <p className="text-text-secondary mt-2">
              120€ TTC · 2 heures · 5 participants max · Visio
            </p>
          </div>

          {/* Embed Calendly */}
          <div className="rounded-xl overflow-hidden border border-white/10">
            <CalendlyEmbed url={calendlyUrl} />
          </div>

          {/* Infos complémentaires */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-white font-semibold mb-1">Paiement sécurisé</p>
              <p className="text-text-secondary text-sm">
                Par carte bancaire via Stripe.
                Apple Pay et Google Pay acceptés.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-white font-semibold mb-1">Confirmation immédiate</p>
              <p className="text-text-secondary text-sm">
                Vous recevez un email avec le lien visio
                et les instructions de préparation.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-white font-semibold mb-1">Annulation flexible</p>
              <p className="text-text-secondary text-sm">
                Remboursement complet jusqu'à 48h avant.
                Au-delà, un avoir pour une session ultérieure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales - CGV et Politique de confidentialité',
  description: 'Mentions légales, conditions générales de vente et politique de confidentialité EvidencAI',
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-bleu-nuit">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-12">
              Mentions légales
            </h1>

            {/* Éditeur */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-white mb-6">
                Éditeur du site
              </h2>
              <div className="text-text-secondary space-y-2">
                <p>
                  <strong className="text-white">Raison sociale :</strong> [À COMPLÉTER - Nom de l&apos;entreprise]
                </p>
                <p>
                  <strong className="text-white">Forme juridique :</strong> [À COMPLÉTER - EURL, SARL, Auto-entrepreneur, etc.]
                </p>
                <p>
                  <strong className="text-white">Siège social :</strong> [À COMPLÉTER - Adresse complète]
                </p>
                <p>
                  <strong className="text-white">SIRET :</strong> [À COMPLÉTER]
                </p>
                <p>
                  <strong className="text-white">Directeur de publication :</strong> Stéphane Commenge
                </p>
                <p>
                  <strong className="text-white">Contact :</strong>{' '}
                  <a href="mailto:contact@evidencai.com" className="text-ambre hover:text-ambre-light">
                    contact@evidencai.com
                  </a>
                </p>
              </div>
            </section>

            {/* Hébergement */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-white mb-6">
                Hébergement
              </h2>
              <div className="text-text-secondary space-y-2">
                <p>
                  <strong className="text-white">Hébergeur :</strong> Vercel Inc.
                </p>
                <p>
                  <strong className="text-white">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
                </p>
                <p>
                  <strong className="text-white">Site web :</strong>{' '}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ambre hover:text-ambre-light"
                  >
                    vercel.com
                  </a>
                </p>
              </div>
            </section>

            {/* CGV */}
            <section id="cgv" className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-white mb-6">
                Conditions Générales de Vente (CGV)
              </h2>
              <div className="text-text-secondary space-y-4">
                <h3 className="text-xl font-semibold text-white">Article 1 - Objet</h3>
                <p>
                  Les présentes conditions générales de vente s&apos;appliquent à tous les ateliers,
                  formations et prestations de conseil proposés par EvidencAI.
                </p>

                <h3 className="text-xl font-semibold text-white">Article 2 - Prix</h3>
                <p>
                  Les prix des ateliers sont indiqués en euros TTC. Les tarifs des formations et
                  prestations de conseil sont communiqués sur devis personnalisé.
                </p>

                <h3 className="text-xl font-semibold text-white">Article 3 - Paiement</h3>
                <p>
                  Le paiement des ateliers s&apos;effectue en ligne via Stripe au moment de l&apos;inscription.
                  Pour les formations et prestations sur devis, un acompte de 30% peut être demandé.
                </p>

                <h3 className="text-xl font-semibold text-white">Article 4 - Annulation et remboursement</h3>
                <p>
                  Annulation par le client : remboursement intégral jusqu&apos;à 48h avant l&apos;atelier.
                  Au-delà, un avoir sera proposé pour une session ultérieure.
                </p>
                <p>
                  Annulation par EvidencAI : remboursement intégral ou report à une date ultérieure.
                </p>

                <h3 className="text-xl font-semibold text-white">Article 5 - Droit de rétractation</h3>
                <p>
                  Conformément à l&apos;article L221-28 du Code de la consommation, le droit de
                  rétractation ne peut être exercé pour les prestations de formation professionnelle.
                </p>

                <h3 className="text-xl font-semibold text-white">Article 6 - Propriété intellectuelle</h3>
                <p>
                  Tous les supports de formation restent la propriété exclusive d&apos;EvidencAI.
                  Toute reproduction ou diffusion non autorisée est interdite.
                </p>
              </div>
            </section>

            {/* Confidentialité */}
            <section id="confidentialite" className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-white mb-6">
                Politique de confidentialité (RGPD)
              </h2>
              <div className="text-text-secondary space-y-4">
                <h3 className="text-xl font-semibold text-white">Responsable du traitement</h3>
                <p>
                  EvidencAI, représentée par Stéphane Commenge, est responsable du traitement de
                  vos données personnelles.
                </p>

                <h3 className="text-xl font-semibold text-white">Données collectées</h3>
                <p>
                  Nous collectons les données suivantes : nom, prénom, email, téléphone (optionnel),
                  entreprise (optionnel). Ces données sont nécessaires pour la gestion de votre
                  inscription et la communication autour de votre formation.
                </p>

                <h3 className="text-xl font-semibold text-white">Finalités</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Gestion des inscriptions aux ateliers et formations</li>
                  <li>Communication relative à votre commande</li>
                  <li>Envoi d&apos;informations sur nos activités (avec votre consentement)</li>
                  <li>Amélioration de nos services</li>
                </ul>

                <h3 className="text-xl font-semibold text-white">Durée de conservation</h3>
                <p>
                  Vos données sont conservées pendant 3 ans à compter de votre dernière interaction
                  avec EvidencAI.
                </p>

                <h3 className="text-xl font-semibold text-white">Vos droits</h3>
                <p>
                  Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
                  d&apos;effacement, de limitation, d&apos;opposition et de portabilité de vos données.
                  Pour exercer ces droits, contactez-nous à{' '}
                  <a href="mailto:contact@evidencai.com" className="text-ambre hover:text-ambre-light">
                    contact@evidencai.com
                  </a>
                  .
                </p>

                <h3 className="text-xl font-semibold text-white">Cookies</h3>
                <p>
                  Ce site utilise Google Analytics et Microsoft Clarity pour analyser le trafic.
                  Vous pouvez désactiver ces cookies via les paramètres de votre navigateur.
                </p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-white mb-6">
                Propriété intellectuelle
              </h2>
              <div className="text-text-secondary space-y-4">
                <p>
                  L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos) est protégé
                  par le droit d&apos;auteur. Toute reproduction, même partielle, est interdite sans
                  autorisation préalable.
                </p>
              </div>
            </section>

            {/* Crédits */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-white mb-6">
                Crédits
              </h2>
              <div className="text-text-secondary space-y-2">
                <p>
                  <strong className="text-white">Design et développement :</strong> Stéphane Commenge
                </p>
                <p>
                  <strong className="text-white">Technologies :</strong> Next.js, Tailwind CSS, Vercel
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

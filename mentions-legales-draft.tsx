import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales - CGV et Politique de confidentialité',
  description: 'Mentions légales, conditions générales de vente et politique de confidentialité EvidencAI',
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-bleu-nuit">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-12">
              Mentions légales
            </h1>

            {/* Éditeur du site */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-white mb-6">Éditeur du site</h2>
              <div className="text-text-secondary space-y-2">
                <p><strong className="text-white">Raison sociale :</strong> EvidencAI</p>
                <p><strong className="text-white">Forme juridique :</strong> SAS au capital de 180&nbsp;000&nbsp;&euro;</p>
                <p><strong className="text-white">Siège social :</strong> 200 impasse Cheyssans, 26300 Châteauneuf-sur-Isère</p>
                <p><strong className="text-white">SIRET :</strong> En cours d&apos;immatriculation</p>
                <p><strong className="text-white">Directeur de publication :</strong> Stéphane Commenge</p>
                <p>
                  <strong className="text-white">Contact :</strong>{' '}
                  <a href="mailto:contact@evidencai.com" className="text-ambre hover:text-ambre-light">contact@evidencai.com</a>
                </p>
              </div>
            </section>

            {/* Hébergement */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-white mb-6">Hébergement</h2>
              <div className="text-text-secondary space-y-2">
                <p><strong className="text-white">Hébergeur :</strong> Vercel Inc.</p>
                <p><strong className="text-white">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
                <p>
                  <strong className="text-white">Site web :</strong>{' '}
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-ambre hover:text-ambre-light">vercel.com</a>
                </p>
              </div>
            </section>

            {/* Activité de formation */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-white mb-6">Activité de formation</h2>
              <div className="text-text-secondary space-y-4">
                <p>
                  Les formations proposées par EvidencAI sont dispensées en partenariat avec{' '}
                  <strong className="text-white">ALIA Formation</strong>, organisme de formation certifié{' '}
                  <strong className="text-white">Qualiopi</strong> au titre de la catégorie d&apos;actions de formation.
                </p>
                <p>
                  La certification Qualiopi couvre les formations inter-entreprises et intra-entreprises
                  proposées via EvidencAI. Le financement OPCO est possible selon votre branche professionnelle.
                </p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-white mb-6">Propriété intellectuelle</h2>
              <div className="text-text-secondary space-y-4">
                <p>
                  L&apos;ensemble du contenu de ce site (textes, images, logos, vidéos, logiciels,
                  bases de données) est protégé par le droit d&apos;auteur et le droit des marques.
                  Toute reproduction, représentation ou exploitation, même partielle,
                  est interdite sans autorisation écrite préalable d&apos;EvidencAI.
                </p>
                <p>
                  Les marques EvidencAI, Mnemos, CodirAI, AgorIA, ConfidentIA, Mon Greffier et
                  SignalPro sont la propriété d&apos;EvidencAI.
                </p>
              </div>
            </section>

            {/* Crédits */}
            <section className="mb-16">
              <h2 className="font-playfair text-2xl font-bold text-white mb-6">Crédits</h2>
              <div className="text-text-secondary space-y-2">
                <p><strong className="text-white">Conception et développement :</strong> Stéphane Commenge</p>
                <p><strong className="text-white">Technologies :</strong> Next.js, Tailwind CSS, Vercel</p>
                <p><strong className="text-white">IA :</strong> Claude (Anthropic)</p>
              </div>
            </section>

            {/* ================================================ */}
            {/* CGV */}
            {/* ================================================ */}
            <div id="cgv" className="pt-8 border-t border-white/10">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-12">
                Conditions Générales de Vente
              </h1>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Article 1 — Champ d&apos;application</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à l&apos;ensemble
                    des prestations proposées par EvidencAI : ateliers, formations, audit, conseil
                    et développement de solutions IA sur mesure.
                  </p>
                  <p>
                    Toute commande implique l&apos;acceptation sans réserve des présentes CGV.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Article 2 — Prestations</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    <strong className="text-white">Ateliers IA</strong> : sessions pratiques en visioconférence,
                    d&apos;une durée de 2 heures, ouvertes aux particuliers et professionnels.
                  </p>
                  <p>
                    <strong className="text-white">Formations</strong> : formations inter-entreprises ou
                    intra-entreprises, dispensées en partenariat avec ALIA Formation (certifiée Qualiopi).
                    Financement OPCO possible.
                  </p>
                  <p>
                    <strong className="text-white">Audit &amp; Solutions</strong> : missions de diagnostic,
                    acculturation et implémentation IA, sur devis personnalisé.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Article 3 — Tarifs</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Les prix des ateliers sont indiqués en euros TTC sur le site.
                    Les tarifs des formations et prestations de conseil sont communiqués sur devis personnalisé.
                    EvidencAI se réserve le droit de modifier ses tarifs à tout moment,
                    les prestations étant facturées au tarif en vigueur au moment de la commande.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Article 4 — Commande et paiement</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    <strong className="text-white">Ateliers :</strong> le paiement s&apos;effectue en ligne
                    par carte bancaire via Stripe au moment de l&apos;inscription.
                  </p>
                  <p>
                    <strong className="text-white">Formations et prestations sur devis :</strong> un acompte
                    de 30% est demandé à la commande. Le solde est dû à la livraison de la prestation.
                  </p>
                  <p>
                    Le paiement s&apos;effectue par virement bancaire ou carte bancaire.
                    En cas de retard de paiement, des pénalités de retard seront appliquées
                    au taux de trois fois le taux d&apos;intérêt légal en vigueur, conformément à
                    l&apos;article L.441-10 du Code de commerce. Une indemnité forfaitaire de 40&nbsp;&euro;
                    pour frais de recouvrement sera également exigible (article D.441-5 du Code de commerce).
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Article 5 — Annulation et remboursement</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    <strong className="text-white">Annulation par le client :</strong> remboursement intégral
                    jusqu&apos;à 48 heures avant la date prévue de l&apos;atelier ou de la formation.
                    Au-delà de ce délai, un avoir sera proposé pour une session ultérieure.
                  </p>
                  <p>
                    <strong className="text-white">Annulation par EvidencAI :</strong> en cas d&apos;annulation
                    de notre fait (nombre insuffisant de participants, cas de force majeure),
                    le client se verra proposer un remboursement intégral ou un report à une date ultérieure.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Article 6 — Droit de rétractation</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Conformément à l&apos;article L.221-28 du Code de la consommation, le droit de
                    rétractation ne peut être exercé pour les prestations de services pleinement
                    exécutées avant la fin du délai de rétractation, ni pour les prestations de
                    formation professionnelle.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Article 7 — Propriété intellectuelle</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Tous les supports de formation, outils, méthodologies et livrables produits
                    par EvidencAI restent sa propriété exclusive, sauf accord écrit contraire.
                    Le client bénéficie d&apos;un droit d&apos;utilisation non exclusif dans le cadre
                    de son activité professionnelle.
                  </p>
                  <p>
                    Les solutions IA développées sur mesure sont livrées selon les modalités convenues
                    dans le devis : acquisition (transfert de propriété) ou location (licence d&apos;utilisation
                    avec maintenance).
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Article 8 — Responsabilité</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    EvidencAI s&apos;engage à apporter tout le soin et la diligence nécessaires
                    à la réalisation de ses prestations. Il s&apos;agit d&apos;une obligation de moyens.
                  </p>
                  <p>
                    Les outils et solutions intégrant de l&apos;intelligence artificielle sont des aides
                    à la décision. Ils ne se substituent pas au jugement humain. Le client reste
                    seul responsable des décisions prises sur la base des analyses ou recommandations
                    produites par les outils IA.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Article 9 — Médiation</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    En cas de litige, le client peut recourir gratuitement au service de médiation
                    de la consommation. Le médiateur compétent sera communiqué sur demande
                    à l&apos;adresse{' '}
                    <a href="mailto:contact@evidencai.com" className="text-ambre hover:text-ambre-light">contact@evidencai.com</a>.
                  </p>
                  <p>
                    Le client peut également déposer sa réclamation sur la plateforme européenne
                    de règlement en ligne des litiges :{' '}
                    <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-ambre hover:text-ambre-light">
                      ec.europa.eu/consumers/odr
                    </a>.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Article 10 — Droit applicable</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Les présentes CGV sont soumises au droit français. En cas de litige non résolu
                    par la médiation, les tribunaux compétents du ressort du siège social
                    d&apos;EvidencAI seront seuls compétents.
                  </p>
                </div>
              </section>
            </div>

            {/* ================================================ */}
            {/* Politique de confidentialité */}
            {/* ================================================ */}
            <div id="confidentialite" className="pt-8 mt-8 border-t border-white/10">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-12">
                Politique de confidentialité
              </h1>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Responsable du traitement</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    EvidencAI, représentée par Stéphane Commenge, est responsable du traitement
                    de vos données personnelles au sens du Règlement Général sur la Protection
                    des Données (RGPD) et de la loi Informatique et Libertés.
                  </p>
                  <p>
                    Contact DPO :{' '}
                    <a href="mailto:contact@evidencai.com" className="text-ambre hover:text-ambre-light">contact@evidencai.com</a>
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Données collectées et finalités</h2>
                <div className="text-text-secondary space-y-4">
                  <p>Nous collectons vos données dans les cas suivants :</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left text-white py-3 pr-4">Contexte</th>
                          <th className="text-left text-white py-3 pr-4">Données</th>
                          <th className="text-left text-white py-3 pr-4">Finalité</th>
                          <th className="text-left text-white py-3">Base légale</th>
                        </tr>
                      </thead>
                      <tbody className="text-text-secondary">
                        <tr className="border-b border-white/10">
                          <td className="py-3 pr-4">Formulaire de contact</td>
                          <td className="py-3 pr-4">Nom, email, téléphone (opt.), entreprise (opt.), message</td>
                          <td className="py-3 pr-4">Répondre à votre demande</td>
                          <td className="py-3">Intérêt légitime</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 pr-4">Inscription atelier</td>
                          <td className="py-3 pr-4">Nom, email, données de paiement</td>
                          <td className="py-3 pr-4">Gestion de l&apos;inscription et du paiement</td>
                          <td className="py-3">Exécution du contrat</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 pr-4">Réservation Calendly</td>
                          <td className="py-3 pr-4">Nom, email, créneau choisi</td>
                          <td className="py-3 pr-4">Planification du rendez-vous</td>
                          <td className="py-3">Intérêt légitime</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 pr-4">Navigation sur le site</td>
                          <td className="py-3 pr-4">Cookies, adresse IP, pages visitées</td>
                          <td className="py-3 pr-4">Analyse du trafic et amélioration du site</td>
                          <td className="py-3">Consentement</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Sous-traitants et transferts de données</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Vos données peuvent être transmises aux sous-traitants suivants,
                    dans le cadre strict des finalités décrites ci-dessus :
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left text-white py-3 pr-4">Sous-traitant</th>
                          <th className="text-left text-white py-3 pr-4">Usage</th>
                          <th className="text-left text-white py-3 pr-4">Localisation</th>
                          <th className="text-left text-white py-3">Garanties</th>
                        </tr>
                      </thead>
                      <tbody className="text-text-secondary">
                        <tr className="border-b border-white/10">
                          <td className="py-3 pr-4">Vercel</td>
                          <td className="py-3 pr-4">Hébergement du site</td>
                          <td className="py-3 pr-4">États-Unis</td>
                          <td className="py-3">Clauses contractuelles types (CCT)</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 pr-4">Resend</td>
                          <td className="py-3 pr-4">Envoi des emails du formulaire de contact</td>
                          <td className="py-3 pr-4">États-Unis (AWS)</td>
                          <td className="py-3">Clauses contractuelles types (CCT)</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 pr-4">Stripe</td>
                          <td className="py-3 pr-4">Traitement des paiements</td>
                          <td className="py-3 pr-4">UE / États-Unis</td>
                          <td className="py-3">Certifié PCI-DSS, CCT</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 pr-4">Calendly</td>
                          <td className="py-3 pr-4">Planification des rendez-vous</td>
                          <td className="py-3 pr-4">États-Unis</td>
                          <td className="py-3">Clauses contractuelles types (CCT)</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 pr-4">Google Analytics</td>
                          <td className="py-3 pr-4">Analyse du trafic</td>
                          <td className="py-3 pr-4">États-Unis</td>
                          <td className="py-3">Consentement utilisateur, CCT</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 pr-4">Microsoft Clarity</td>
                          <td className="py-3 pr-4">Analyse comportementale</td>
                          <td className="py-3 pr-4">États-Unis / UE</td>
                          <td className="py-3">CCT, DPA Microsoft</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Durée de conservation</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Vos données sont conservées pendant une durée proportionnée à la finalité
                    du traitement :
                  </p>
                  <p>
                    <strong className="text-white">Données clients :</strong> 3 ans à compter de la dernière
                    interaction commerciale, puis archivage pendant la durée de prescription légale.
                  </p>
                  <p>
                    <strong className="text-white">Données de prospection :</strong> 3 ans à compter de la collecte
                    ou du dernier contact.
                  </p>
                  <p>
                    <strong className="text-white">Cookies :</strong> 13 mois maximum conformément aux
                    recommandations de la CNIL.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Vos droits</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants
                    sur vos données personnelles : droit d&apos;accès, de rectification,
                    d&apos;effacement, de limitation du traitement, d&apos;opposition,
                    de portabilité, et du droit de définir des directives relatives au sort
                    de vos données après votre décès.
                  </p>
                  <p>
                    Pour exercer ces droits, contactez-nous à{' '}
                    <a href="mailto:contact@evidencai.com" className="text-ambre hover:text-ambre-light">contact@evidencai.com</a>.
                    Nous nous engageons à répondre dans un délai d&apos;un mois.
                  </p>
                  <p>
                    Vous pouvez également introduire une réclamation auprès de la{' '}
                    <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-ambre hover:text-ambre-light">
                      CNIL
                    </a>{' '}
                    (Commission Nationale de l&apos;Informatique et des Libertés).
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Cookies</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    Ce site utilise des cookies pour analyser le trafic et améliorer votre expérience.
                  </p>
                  <p>
                    <strong className="text-white">Cookies d&apos;analyse :</strong> Google Analytics et
                    Microsoft Clarity sont utilisés pour comprendre comment les visiteurs interagissent
                    avec le site. Ces cookies ne sont déposés qu&apos;avec votre consentement.
                  </p>
                  <p>
                    <strong className="text-white">Cookies essentiels :</strong> certains cookies sont
                    nécessaires au fonctionnement du site (préférences de langue, session).
                    Ils ne nécessitent pas votre consentement.
                  </p>
                  <p>
                    Vous pouvez à tout moment modifier vos préférences en matière de cookies
                    via les paramètres de votre navigateur ou en nous contactant.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Sécurité</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    EvidencAI met en œuvre les mesures techniques et organisationnelles appropriées
                    pour protéger vos données personnelles contre la destruction accidentelle ou illicite,
                    la perte, l&apos;altération, la divulgation ou l&apos;accès non autorisé.
                  </p>
                  <p>
                    Le site est servi en HTTPS. Les paiements sont traités par Stripe (certifié PCI-DSS niveau 1).
                    Les données de carte bancaire ne transitent jamais par nos serveurs.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">Mise à jour</h2>
                <div className="text-text-secondary space-y-4">
                  <p>
                    La présente politique de confidentialité peut être mise à jour à tout moment.
                    La date de dernière mise à jour est indiquée ci-dessous.
                  </p>
                  <p className="text-white font-medium">
                    Dernière mise à jour : 29 mars 2026
                  </p>
                </div>
              </section>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

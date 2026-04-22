import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionaries';
import { getAlternates } from '@/i18n/metadata';
import { locales, type Locale } from '@/i18n/config';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.mentions.metadata.title,
    description: dict.mentions.metadata.description,
    robots: { index: true, follow: true },
    ...getAlternates(locale, '/mentions-legales'),
  };
}

export default async function MentionsLegalesPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="bg-bleu-nuit">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-12">
              {dict.mentions.title}
            </h1>

            {/* Éditeur du site */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-white mb-6">{dict.mentions.editeur.title}</h2>
              <div className="text-text-secondary space-y-2">
                <p><strong className="text-white">{dict.mentions.editeur.raison}</strong> {dict.mentions.editeur.raisonValue}</p>
                <p><strong className="text-white">{dict.mentions.editeur.forme}</strong> {dict.mentions.editeur.formeValue}</p>
                <p><strong className="text-white">{dict.mentions.editeur.siege}</strong> {dict.mentions.editeur.siegeValue}</p>
                <p><strong className="text-white">{dict.mentions.editeur.siret}</strong> {dict.mentions.editeur.siretValue}</p>
                <p><strong className="text-white">{dict.mentions.editeur.directeur}</strong> {dict.mentions.editeur.directeurValue}</p>
                <p>
                  <strong className="text-white">{dict.mentions.editeur.contact}</strong>{' '}
                  <a href={`mailto:${dict.mentions.editeur.contactValue}`} target="_blank" rel="noopener noreferrer" className="text-ambre hover:text-ambre-light">{dict.mentions.editeur.contactValue}</a>
                </p>
              </div>
            </section>

            {/* Hébergement et infrastructure */}
            <section className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-white mb-6">{dict.mentions.hebergement.title}</h2>
              <div className="text-text-secondary space-y-2">
                <p><strong className="text-white">{dict.mentions.hebergement.hebergeur}</strong> {dict.mentions.hebergement.hebergeurValue}</p>
                <p><strong className="text-white">{dict.mentions.hebergement.adresse}</strong> {dict.mentions.hebergement.adresseValue}</p>
                <p>
                  <strong className="text-white">{dict.mentions.hebergement.site}</strong>{' '}
                  <a href={`https://${dict.mentions.hebergement.siteValue}`} target="_blank" rel="noopener noreferrer" className="text-ambre hover:text-ambre-light">{dict.mentions.hebergement.siteValue}</a>
                </p>
                <p><strong className="text-white">{dict.mentions.hebergement.datacenter}</strong> {dict.mentions.hebergement.datacenterValue}</p>
                <p><strong className="text-white">{dict.mentions.hebergement.orchestration}</strong> {dict.mentions.hebergement.orchestrationValue}</p>
                <p><strong className="text-white">{dict.mentions.hebergement.baseDeDonnees}</strong> {dict.mentions.hebergement.baseDeDonneesValue}</p>
              </div>

              <h3 className="font-playfair text-xl font-semibold text-white mt-8 mb-4">
                {dict.mentions.hebergement.souverainete.title}
              </h3>
              <div className="text-text-secondary space-y-4">
                <p>{dict.mentions.hebergement.souverainete.intro}</p>
                <p>{dict.mentions.hebergement.souverainete.rgpd}</p>
                <p>{dict.mentions.hebergement.souverainete.securite}</p>
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
              <h2 className="font-playfair text-2xl font-bold text-white mb-6">{dict.mentions.pi.title}</h2>
              <div className="text-text-secondary space-y-4">
                <p>
                  {dict.mentions.pi.text}
                </p>
                <p>
                  Les marques EvidencAI, Mnemos, CodirAI, AgorIA, ConfidentIA, Mon Greffier et
                  SignalPro sont la propriété d&apos;EvidencAI.
                </p>
              </div>
            </section>

            {/* Crédits */}
            <section className="mb-16">
              <h2 className="font-playfair text-2xl font-bold text-white mb-6">{dict.mentions.credits.title}</h2>
              <div className="text-text-secondary space-y-2">
                <p><strong className="text-white">{dict.mentions.credits.design}</strong> {dict.mentions.credits.designValue}</p>
                <p><strong className="text-white">{dict.mentions.credits.techno}</strong> {dict.mentions.credits.technoValue}</p>
                <p><strong className="text-white">IA :</strong> Claude (Anthropic)</p>
              </div>
            </section>

            {/* ================================================ */}
            {/* CGV */}
            {/* ================================================ */}
            <div id="cgv" className="pt-8 border-t border-white/10">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-12">
                {dict.mentions.cgv.title}
              </h1>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.cgv.objet.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <p>{dict.mentions.cgv.objet.text}</p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.cgv.prix.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <p>{dict.mentions.cgv.prix.text}</p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.cgv.paiement.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <p>{dict.mentions.cgv.paiement.text}</p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.cgv.annulation.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <p><strong className="text-white">Annulation par le client :</strong> {dict.mentions.cgv.annulation.client}</p>
                  <p><strong className="text-white">Annulation par EvidencAI :</strong> {dict.mentions.cgv.annulation.evidencai}</p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.cgv.retractation.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <p>{dict.mentions.cgv.retractation.text}</p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.cgv.pi.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <p>{dict.mentions.cgv.pi.text}</p>
                </div>
              </section>
            </div>

            {/* ================================================ */}
            {/* Politique de confidentialité */}
            {/* ================================================ */}
            <div id="confidentialite" className="pt-8 mt-8 border-t border-white/10">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-12">
                {dict.mentions.confidentialite.title}
              </h1>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.confidentialite.responsable.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <p>{dict.mentions.confidentialite.responsable.text}</p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.confidentialite.donnees.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <p>{dict.mentions.confidentialite.donnees.text}</p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.confidentialite.finalites.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    {dict.mentions.confidentialite.finalites.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.confidentialite.conservation.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <p>{dict.mentions.confidentialite.conservation.text}</p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.confidentialite.droits.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <p>{dict.mentions.confidentialite.droits.text}</p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="font-playfair text-2xl font-bold text-white mb-4">{dict.mentions.confidentialite.cookies.title}</h2>
                <div className="text-text-secondary space-y-4">
                  <p>{dict.mentions.confidentialite.cookies.text}</p>
                </div>
              </section>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

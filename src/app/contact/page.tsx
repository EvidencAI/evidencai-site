import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact - Parlons de votre projet IA',
  description: 'Contactez EvidencAI pour échanger sur vos besoins en formation, atelier ou audit IA. Réponse sous 24h.',
  openGraph: {
    title: 'Contact | EvidencAI',
    description: 'Contactez-nous pour échanger sur vos besoins en IA',
    url: 'https://evidencai.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-bleu-nuit">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
                Parlons de votre projet
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                Une question ? Un projet ? Remplissez ce formulaire et je vous réponds sous 24h.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <ContactForm />
            </div>

            {/* Alternative contact methods */}
            <div className="mt-12 text-center">
              <p className="text-text-secondary mb-4">
                Vous préférez m&apos;appeler directement ?
              </p>
              <div className="space-y-2">
                <p className="text-white">
                  <a
                    href="mailto:contact@evidencai.com"
                    className="text-ambre hover:text-ambre-light transition-colors"
                  >
                    contact@evidencai.com
                  </a>
                </p>
                <p className="text-white">
                  <a
                    href="https://linkedin.com/in/stephanecommenge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ambre hover:text-ambre-light transition-colors"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

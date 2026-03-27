import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produits: [
      { href: '/ateliers', label: 'Ateliers IA' },
      { href: '/formation', label: 'Formation Qualiopi' },
      { href: '/solutions', label: 'Audit & Solutions' },
      { href: '/outils', label: 'Nos outils' },
    ],
    ressources: [
      { href: '/blog', label: 'Blog' },
      { href: '/a-propos', label: 'À propos' },
      { href: '/contact', label: 'Contact' },
    ],
    legal: [
      { href: '/mentions-legales', label: 'Mentions légales' },
      { href: '/mentions-legales#cgv', label: 'CGV' },
      { href: '/mentions-legales#confidentialite', label: 'Confidentialité' },
    ],
  };

  return (
    <footer className="bg-bleu-nuit-light border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="font-playfair text-2xl font-bold text-white">
              EvidencAI
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              L&apos;IA qui vous améliore, pas qui vous remplace.
              Accompagnement IA pour dirigeants et entreprises.
            </p>
          </div>

          {/* Produits */}
          <div>
            <h3 className="font-semibold text-white mb-4">Produits</h3>
            <ul className="space-y-3">
              {footerLinks.produits.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-ambre transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Ressources</h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-ambre transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Légal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-ambre transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm">
              © {currentYear} EvidencAI. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com/in/stephanecommenge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-ambre transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

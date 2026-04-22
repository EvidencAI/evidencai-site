import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { getDictionary } from '@/i18n/dictionaries';

interface FooterProps {
  locale: Locale;
  dict: Awaited<ReturnType<typeof getDictionary>>;
}

export default function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produits: [
      { href: `/${locale}/ateliers`, label: dict.footer.sections.produits.items.ateliers },
      { href: `/${locale}/formation`, label: dict.footer.sections.produits.items.formation },
      { href: `/${locale}/solutions`, label: dict.footer.sections.produits.items.solutions },
      { href: `/${locale}/outils`, label: dict.footer.sections.produits.items.outils },
    ],
    ressources: [
      { href: `/${locale}/blog`, label: dict.footer.sections.ressources.items.blog },
      { href: `/${locale}/a-propos`, label: dict.footer.sections.ressources.items.apropos },
      { href: `/${locale}/contact`, label: dict.footer.sections.ressources.items.contact },
      { href: `/${locale}/supports`, label: dict.footer.sections.ressources.items.supports },
    ],
    legal: [
      { href: `/${locale}/mentions-legales`, label: dict.footer.sections.legal.items.mentions },
      { href: `/${locale}/mentions-legales#cgv`, label: dict.footer.sections.legal.items.cgv },
      { href: `/${locale}/mentions-legales#confidentialite`, label: dict.footer.sections.legal.items.confidentialite },
    ],
  };

  return (
    <footer className="bg-bleu-nuit-light border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Logo & Description */}
          <div className="space-y-2">
            <Link href={`/${locale}`} className="font-playfair text-2xl font-bold text-white tracking-tight">
              Evidenc<span className="text-ambre">AI</span>
            </Link>
            <p className="text-text-secondary text-xs leading-relaxed">
              {dict.footer.tagline}<br />
              {dict.footer.description}
            </p>
            <p className="text-text-secondary text-xs pt-1">
              {dict.footer.copyright.replace('{year}', currentYear.toString())}
            </p>
            <a
              href="https://linkedin.com/in/stephanecommenge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-text-secondary hover:text-ambre transition-colors pt-1"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

          {/* Produits */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-3">{dict.footer.sections.produits.title}</h3>
            <ul className="space-y-1.5">
              {footerLinks.produits.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-ambre transition-colors text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-3">{dict.footer.sections.ressources.title}</h3>
            <ul className="space-y-1.5">
              {footerLinks.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-ambre transition-colors text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-3">{dict.footer.sections.legal.title}</h3>
            <ul className="space-y-1.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-ambre transition-colors text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

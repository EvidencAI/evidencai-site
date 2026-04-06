'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { getDictionary } from '@/i18n/dictionaries';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface HeaderProps {
  locale: Locale;
  dict: Awaited<ReturnType<typeof getDictionary>>;
}

export default function Header({ locale, dict }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}/ateliers`, label: dict.header.nav.ateliers },
    { href: `/${locale}/formation`, label: dict.header.nav.formations },
    { href: `/${locale}/solutions`, label: dict.header.nav.solutions },
    { href: `/${locale}/outils`, label: dict.header.nav.outils },
    { href: `/${locale}/a-propos`, label: dict.header.nav.apropos },
    { href: `/${locale}/blog`, label: dict.header.nav.blog },
    { href: `/${locale}/contact`, label: dict.header.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bleu-nuit/95 backdrop-blur-sm border-b border-white/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center hover:opacity-90 transition-opacity">
            <span className="font-playfair text-2xl md:text-3xl font-bold text-white tracking-tight">
              Evidenc<span className="text-ambre">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-base text-text-primary hover:text-ambre transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button + Lang Switch (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={`/${locale}/ateliers`}
              className="px-5 py-1.5 bg-ambre text-bleu-nuit text-sm font-semibold rounded-lg hover:bg-ambre-light transition-colors"
            >
              {dict.header.cta}
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile: CTA + Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href={`/${locale}/ateliers`}
              className="px-4 py-2 bg-ambre text-bleu-nuit text-sm font-semibold rounded-lg hover:bg-ambre-light transition-colors"
            >
              {dict.header.nav.ateliers}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-ambre transition-colors"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-1 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-text-primary hover:text-ambre hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-4 pt-3 mt-2 border-t border-white/10">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

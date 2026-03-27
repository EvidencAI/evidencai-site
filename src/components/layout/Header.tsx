'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/ateliers', label: 'Ateliers' },
    { href: '/formation', label: 'Formation' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/outils', label: 'Outils' },
    { href: '/a-propos', label: 'À propos' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bleu-nuit/95 backdrop-blur-sm border-b border-white/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-playfair text-xl md:text-2xl font-bold text-white hover:text-ambre transition-colors"
          >
            EvidencAI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-text-primary hover:text-ambre transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:flex">
            <Link
              href="/ateliers"
              className="px-6 py-2 bg-ambre text-bleu-nuit font-semibold rounded-lg hover:bg-ambre-light transition-colors"
            >
              Découvrir les ateliers
            </Link>
          </div>

          {/* Mobile: CTA + Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/ateliers"
              className="px-4 py-2 bg-ambre text-bleu-nuit text-sm font-semibold rounded-lg hover:bg-ambre-light transition-colors"
            >
              Ateliers
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
          </div>
        )}
      </nav>
    </header>
  );
}

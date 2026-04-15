import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
import GA4Consent from '@/components/analytics/GA4Consent';
import ClarityConsent from '@/components/analytics/ClarityConsent';
import ClarityTracker from '@/components/analytics/ClarityTracker';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.evidencai.com'),
  title: {
    default: 'EvidencAI | Accompagnement IA pour dirigeants de PME',
    template: '%s | EvidencAI',
  },
  description: 'Accompagnement IA pour dirigeants et entreprises. Ateliers, formations Qualiopi et solutions sur mesure. De l\'initiation à l\'implémentation.',
  keywords: ['formation IA', 'atelier intelligence artificielle', 'consultant IA PME', 'formation IA Qualiopi', 'audit IA entreprise', 'Claude Anthropic'],
  authors: [{ name: 'Stéphane Commenge' }],
  creator: 'Stéphane Commenge',
  publisher: 'EvidencAI',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.evidencai.com',
    siteName: 'EvidencAI',
    title: 'EvidencAI | Accompagnement IA pour dirigeants de PME',
    description: 'Accompagnement IA pour dirigeants et entreprises. Ateliers, formations Qualiopi et solutions sur mesure.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EvidencAI - Accompagnement IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EvidencAI | L\'IA qui vous améliore',
    description: 'Accompagnement IA pour dirigeants et entreprises',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        {/* Analytics - Chargés uniquement sous consentement (cf. CookieBanner).
            GA4Consent et ClarityConsent écoutent l'événement cookie-consent-update
            et n'injectent leur tag qu'après acceptation des cookies analytics.
            ClarityTracker installe un stub côté client et bufferise les tags
            jusqu'au chargement effectif de Clarity. */}
        <GA4Consent />
        <ClarityConsent />
        <ClarityTracker />
      </body>
    </html>
  );
}

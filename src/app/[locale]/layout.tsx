import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PartnersBar from '@/components/layout/PartnersBar';
import CookieBanner from '@/components/ui/CookieBanner';
import HtmlLang from '@/components/ui/HtmlLang';


export async function generateStaticParams(): Promise<{ locale: Locale }[]> {
  return locales.map((locale) => ({ locale }));
}

// Pages /en/ : noindex tant qu'on ne cible pas l'anglais
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  return {};
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <div lang={locale}>
      <HtmlLang locale={locale} />
      <Header locale={locale} dict={dict} />
      <main className="min-h-screen">
        {children}
      </main>
      <PartnersBar />
      <Footer locale={locale} dict={dict} />
      <CookieBanner locale={locale} />
    </div>
  );
}

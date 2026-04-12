import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Anciennes URLs obsolètes → redirection 301 vers accueil
  const legacyPaths = ['/month', '/year'];
  if (legacyPaths.includes(pathname)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url), 301);
  }

  // Vérifier si le pathname commence par une locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // Rediriger / vers /fr (permanent)
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url), 308);
  }

  // Rediriger les autres chemins sans locale vers /fr/...
  // SAUF les routes API et les fichiers statiques
  if (
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/images') &&
    !pathname.startsWith('/logos') &&
    !pathname.includes('.')
  ) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url), 308);
  }
}

export const config = {
  matcher: [
    // Matcher pour toutes les routes sauf les fichiers statiques et API
    '/((?!api|_next/static|_next/image|favicon.ico|images|logos).*)',
  ],
};

/**
 * M canismes d'opt-out du tracking analytics (GA4 + Clarity).
 *
 * Objectifs :
 *  - Exclure les connexions internes (admin, tests de recette,
 *    navigation quotidienne de l' quipe) du trafic analys .
 *  - Exclure les bots/crawlers connus c t  client pour  viter
 *    d'envoyer des requ tes analytics inutiles.
 */

const OPT_OUT_KEY = 'evidencai-no-track';

/**
 * Pose ou retire le flag d'opt-out selon les query params de l'URL :
 *  - ?notrack=1   pose le flag (devient persistant en localStorage)
 *  - ?notrack=0   retire le flag
 *
 * Usage : visiter une fois https://evidencai.com/fr?notrack=1 sur
 * chaque device interne.   appeler au montage du composant analytics.
 */
export function checkAndSetOptOut(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const notrack = params.get('notrack');
    if (notrack === '1') {
      localStorage.setItem(OPT_OUT_KEY, '1');
    } else if (notrack === '0') {
      localStorage.removeItem(OPT_OUT_KEY);
    }
  } catch {
    // localStorage indisponible
  }
}

/** True si le device est marqu  comme opt-out interne. */
export function isOptedOut(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(OPT_OUT_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * D tecte les crawlers/bots basiques c t  client.
 * Clarity filtre d j  les bots c t  serveur mais on coupe en amont
 * pour ne pas g n rer de requ tes r seau inutiles.
 */
export function isBot(): boolean {
  if (typeof navigator === 'undefined') return false;
  // Flag standard pour les drivers automatis s (Selenium, Playwright,
  // Puppeteer, Cypress...). navigator.webdriver est en lecture seule.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((navigator as any).webdriver) return true;
  const ua = navigator.userAgent || '';
  return /bot|crawl|spider|slurp|bingbot|googlebot|duckduckbot|yandexbot|baiduspider|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegram|headlesschrome|phantomjs|lighthouse|ahrefs|semrush|mj12bot|dotbot/i.test(ua);
}

/**
 * Retourne true si le tracking doit  tre activ  pour ce visiteur.
 * Combine opt-out interne + d tection bot.
 */
export function shouldTrack(): boolean {
  return !isOptedOut() && !isBot();
}

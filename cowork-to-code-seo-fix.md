# Mission SEO & Analytics — Fix complet

## Contexte
Google Search Console signale des problèmes d'indexation sur evidencai.com :
- 2 pages Introuvable (404)
- 1 page en double sans URL canonique
- 1 page bloquée par robots.txt
- 1 page avec redirection
- 19 détectées non indexées
- 2 explorées non indexées
En parallèle, Microsoft Clarity ne reçoit aucune donnée (0 sessions).

## Fixes à appliquer (dans l'ordre)

### Fix 1 — Canonical + Hreflang sur toutes les pages
Le sitemap.ts génère déjà les alternates mais les balises ne sont pas dans le HTML.
Chaque page doit avoir dans son `<head>` :
- `<link rel="canonical" href="https://www.evidencai.com/{locale}/{path}" />`
- `<link rel="alternate" hreflang="fr" href="https://www.evidencai.com/fr/{path}" />`
- `<link rel="alternate" hreflang="en" href="https://www.evidencai.com/en/{path}" />`
- `<link rel="alternate" hreflang="x-default" href="https://www.evidencai.com/fr/{path}" />`

La meilleure approche dans Next.js App Router : ajouter les metadata `alternates` dans chaque `page.tsx` ou dans le layout `[locale]/layout.tsx` via `generateMetadata()`. Utiliser `metadataBase` déjà défini dans le root layout.

### Fix 2 — Redirection www → non-www (ou l'inverse, mais être cohérent)
DÉCISION : utiliser `www.evidencai.com` comme domaine canonical (c'est ce que disent le metadataBase et le sitemap).
- Dans `vercel.json` : ajouter une redirection 301 de `evidencai.com` vers `www.evidencai.com`
- OU configurer le domaine principal dans Vercel sur www (vérifier la config Vercel)
- Mettre à jour le middleware si nécessaire

Alternative si le domaine principal Vercel est sans www : inverser tout vers `evidencai.com` (metadataBase, sitemap baseUrl, robots.txt sitemap URL). Choisir UN domaine et s'y tenir.

### Fix 3 — robots.txt
Le fichier public/robots.txt (ou la route) référence le sitemap sur `www.evidencai.com`. S'assurer que c'est cohérent avec le domaine canonical choisi.
Vérifier aussi : est-ce que `/api/` est bien bloqué ? Y a-t-il d'autres routes à bloquer ?

### Fix 4 — Analytics : vérifier le chargement
Le composant Analytics.tsx semble correct mais ne se charge jamais en production.
Vérifications :
1. Les variables `NEXT_PUBLIC_GA_ID` et `NEXT_PUBLIC_CLARITY_ID` sont-elles configurées dans les Environment Variables de Vercel ? (pas juste dans .env.local)
2. Le CookieBanner s'affiche-t-il correctement ? Émet-il bien l'événement `cookie-consent-update` ?
3. Tester : ajouter un console.log dans Analytics.tsx pour confirmer le montage
4. IMPORTANT : Si le bandeau cookies n'a jamais été affiché (ou si localStorage n'est pas set), les scripts ne chargent jamais. Envisager de charger Clarity SANS consentement (Clarity est généralement considéré comme analytics légitime intérêt sous RGPD, mais GA4 nécessite consentement). Ou au minimum, s'assurer que le bandeau cookies fonctionne.

### Fix 5 — Supprimer le placeholder Google verification
Dans `src/app/layout.tsx`, `verification.google` est à `'PLACEHOLDER_GOOGLE_VERIFICATION'`. Soit mettre la vraie valeur de Search Console, soit supprimer la ligne pour éviter de polluer le HTML avec un faux meta tag.

### Fix 6 — Gérer les 404 avec des redirections
Vérifier quelles anciennes URLs pourraient retourner 404. Ajouter des redirections dans le middleware ou vercel.json pour les anciennes routes connues (ex: si des pages ont changé de nom).

## Validation
Après les fixes :
1. `npm run build` doit passer sans erreur
2. Vérifier le HTML généré : les balises canonical et hreflang doivent être présentes
3. Vérifier que le sitemap et robots.txt sont cohérents sur le domaine
4. Tester le bandeau cookies + chargement analytics

## Fichiers concernés
- `src/app/layout.tsx` (metadataBase, verification)
- `src/app/[locale]/layout.tsx` (generateMetadata pour canonical/hreflang)
- `src/app/[locale]/*/page.tsx` (metadata alternates par page)
- `src/app/sitemap.ts` (baseUrl cohérence)
- `src/components/analytics/Analytics.tsx` (debug loading)
- `src/components/ui/CookieBanner.tsx` (vérifier fonctionnement)
- `src/middleware.ts` (redirections 404, www handling)
- `vercel.json` (redirections domaine)
- `public/robots.txt` (si existant, cohérence sitemap URL)

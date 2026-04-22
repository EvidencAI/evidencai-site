# FIX ANALYTICS - Instructions pour Claude Code

## Problème diagnostiqué
Les composants `'use client'` Analytics et CookieBanner placés à la fin de `src/app/[locale]/layout.tsx` ne s'hydratent JAMAIS en production. Le code est dans le bundle JS mais React ne monte pas ces composants. Bug suspecté Next.js 16.2.1 / Turbopack.

## Ce qu'il faut faire

### 1. Injecter Clarity directement dans le root layout

Dans `src/app/layout.tsx`, ajouter le script Clarity directement dans le `<head>` via le composant `<Script>` de Next.js (strategy="afterInteractive"). Clarity peut être chargé sans consentement (intérêt légitime RGPD).

Le project ID Clarity est : `w3dj64hgwq`
Il est aussi dans `.env.local` sous `NEXT_PUBLIC_CLARITY_ID`.

Script Clarity à injecter :
```
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","w3dj64hgwq");
```

### 2. GA4 - deux options possibles

Option A (simple) : Injecter GA4 aussi dans le root layout, mais avec un check cookie côté client. Créer un petit composant client GA4Consent qui vérifie le cookie `analytics-consent` et charge GA4 si consent=true.

Option B (plus simple) : Injecter GA4 script dans le head du root layout avec `strategy="lazyOnload"`, et ajouter un `window['ga-disable-G-X2HY34H4LB'] = true` par défaut, puis le mettre à false quand le consent est donné.

Le GA4 ID est : `G-X2HY34H4LB`

### 3. Ne PAS supprimer Analytics.tsx et CookieBanner

Garde-les pour l'instant mais commente leur import dans `src/app/[locale]/layout.tsx` pour éviter toute confusion.

### 4. Après les modifications

Fais un `vercel --prod` pour déployer.

## Fichiers concernés
- `src/app/layout.tsx` (modification principale)
- `src/app/[locale]/layout.tsx` (commenter Analytics et CookieBanner)
- Éventuellement un nouveau petit composant pour le consent GA4

## Vérification
Après déploiement, ouvrir https://evidencai.com dans Chrome DevTools et vérifier :
- Console : pas d'erreurs
- Network : requête vers clarity.ms/tag/w3dj64hgwq visible
- Elements > head : script Clarity présent

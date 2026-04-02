# MISSION : Internationalisation (i18n) du site EvidencAI

## Contexte
Site Next.js (App Router) vitrine pour EvidencAI. Actuellement 100% français.
On veut ajouter le support anglais avec routing i18n standard Next.js.

## Architecture cible

### Routing
- `/fr/...` = version française (défaut)
- `/en/...` = version anglaise  
- `/` redirige vers `/fr`
- Middleware Next.js pour détecter la locale et rediriger

### Structure fichiers
```
src/
  i18n/
    config.ts          # locales, defaultLocale
    dictionaries.ts    # loader async des dictionnaires
    fr.json            # toutes les traductions FR
    en.json            # toutes les traductions EN
  app/
    [locale]/          # layout dynamique avec locale
      layout.tsx       # wrapper qui charge le dictionnaire
      page.tsx         # home
      ateliers/
        page.tsx
      formation/
        page.tsx
      solutions/
        page.tsx
      outils/
        page.tsx
      a-propos/
        page.tsx
      blog/
        page.tsx
      contact/
        page.tsx
        ContactForm.tsx
      mentions-legales/
        page.tsx
    api/               # les routes API restent HORS du [locale]
      contact/
      beta/
      formation/
  middleware.ts        # redirect / -> /fr, détection locale
```

### Approche traduction
- Extraire TOUS les textes hardcodés de chaque page et composant
- Les mettre dans fr.json et en.json avec des clés structurées par page
- Exemple : `home.hero.title`, `solutions.leviers.impossible.title`, etc.
- Les composants reçoivent le dictionnaire via props ou context

### Composant Header
- Le bouton FR/EN existe déjà dans `src/components/layout/Header.tsx`
- Il faut le rendre fonctionnel : cliquer sur EN navigue vers `/en/...` (même page)
- Cliquer sur FR navigue vers `/fr/...`
- Le bouton actif (ambre) correspond à la locale courante

### Pages à traduire (8 pages + composants)
1. Home (`page.tsx`) + composants Hero, FunnelSection, ValuesSection, PainPointsSection, OutilsSection, TestimonialsSection
2. Ateliers (`ateliers/page.tsx`)
3. Formation (`formation/page.tsx`) + FormationCatalogueDetails
4. Solutions (`solutions/page.tsx`)
5. Outils (`outils/page.tsx`)
6. À propos (`a-propos/page.tsx`)
7. Blog (`blog/page.tsx`)
8. Contact (`contact/page.tsx` + `ContactForm.tsx`)
9. Mentions légales (`mentions-legales/page.tsx`)
10. Layout global (`layout.tsx`) + Header + Footer

### Règles importantes
- NE PAS modifier le contenu français, juste l'extraire dans fr.json
- La traduction anglaise doit être professionnelle, pas du mot-à-mot
- Adapter le ton : le site est direct, pas corporate. Garder ce ton en anglais.
- Les metadata (title, description, openGraph) doivent aussi être traduites
- Le sitemap doit inclure les deux versions (hreflang)
- Les liens Calendly restent les mêmes
- Les noms propres (EvidencAI, Mnemos, CodirAI, etc.) ne se traduisent pas

### Ce qu'il ne faut PAS faire
- Ne pas toucher aux routes API
- Ne pas changer le design ou le CSS
- Ne pas modifier la logique des formulaires
- Ne pas créer de nouvelle dépendance npm sauf si vraiment nécessaire (next-intl est OK si tu trouves ça plus propre que du fait main)

## Ordre d'exécution suggéré
1. Créer la structure i18n (config, middleware, dictionnaires vides)
2. Créer fr.json avec toutes les clés extraites du site actuel  
3. Créer en.json avec les traductions
4. Migrer le layout dans [locale]/layout.tsx
5. Migrer chaque page une par une
6. Adapter le Header (switch fonctionnel)
7. Adapter le Footer
8. Tester le build
9. Déployer avec `npx vercel --prod --yes`

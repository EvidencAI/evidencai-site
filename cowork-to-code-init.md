# Mission : Initialiser le projet EvidencAI

## Contexte
Tu travailles dans `/Users/stephanecommenge/Claude-Dev/EvidencIA-site/`.
Le fichier `evidencai-spec.md` dans ce dossier contient les specs complètes du site.
Lis-le en entier avant de commencer.

## Ce que tu dois faire (Phase 1 — Init + MVP skeleton)

### 1. Initialiser le projet Next.js
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
ATTENTION : Vérifie la version de Next.js installée (`npx next --version`).
- Si Next.js 15+ avec Tailwind v4 : la config est CSS-based dans `globals.css` (pas de `tailwind.config.ts`). Utilise `@theme` pour déclarer les couleurs et fonts custom.
- Si Next.js 14 avec Tailwind v3 : utilise `tailwind.config.ts` classiquement.
Adapte les étapes suivantes en fonction.

### 2. Installer les dépendances
```bash
npm install stripe @stripe/stripe-js resend zod
```
Note : PAS de react-hook-form ni @hookform/resolvers. On utilise les Server Actions de Next.js pour les formulaires (plus léger, plus moderne). Le plugin @tailwindcss/typography sera ajouté en Phase 2 (blog MDX).

### 3. Configurer Tailwind avec le design system
Ajouter les tokens custom (via `tailwind.config.ts` OU `@theme` dans globals.css selon la version) :
- Couleurs custom : bleu nuit `#1a1a2e`, `#16213e`, ambre `#f59e0b`, `#fbbf24`
- Fonts : Playfair Display (titres), DM Sans (corps), JetBrains Mono (code)

### 4. Configurer les Google Fonts dans layout.tsx
- Playfair Display (700)
- DM Sans (400, 500, 600)

### 5. Créer le layout global (`src/app/layout.tsx`)
- Fonts configurées via next/font/google
- Header sticky : logo EvidencAI (texte pour l'instant) + nav desktop + hamburger mobile
- Footer : liens, copyright, mentions légales
- Fond par défaut : bleu nuit #1a1a2e, texte blanc

### 6. Créer les composants UI de base (`src/components/ui/`)
- `Button.tsx` : variantes primary (ambre), secondary (outline blanc), ghost
- `Card.tsx` : fond blanc, shadow, rounded-xl, padding
- `Badge.tsx` : petits labels colorés (Débutant, Intermédiaire, Confirmé)
- `Input.tsx` : styled input avec label flottant

### 7. Créer la Homepage (`src/app/page.tsx`)
- Hero : titre Playfair "L'IA qui vous améliore, pas qui vous remplace", sous-titre DM Sans, 2 CTA (ambre + outline)
- Section funnel : 3 cartes (Ateliers / Formation / Solutions)
- Section valeurs : 3 blocs avec les phrases clés
- Section outils : 2 cartes Mnemos + CodirIA avec liens externes
- Section témoignages : placeholder avec 2-3 quotes fictives marquées [à remplacer]

### 8. Créer la page Ateliers (`src/app/ateliers/page.tsx`)
- 3 cartes modules avec niveau, durée, prix, description, CTA
- Section FAQ avec Schema.org FAQPage en JSON-LD

### 9. Créer la page À propos (`src/app/a-propos/page.tsx`)
- Placeholder photo (div grise avec icône)
- Texte parcours de Stéphane (à compléter, mettre placeholder structuré)
- Valeurs, choix Anthropic
- Schema.org Person

### 10. Créer la page Contact (`src/app/contact/page.tsx`)
- Formulaire avec Server Actions Next.js + validation Zod côté serveur
- Champs : Nom, Email, Téléphone (opt), Sujet (select), Message, RGPD checkbox
- Server Action dans `src/app/contact/actions.ts` : valide avec Zod, envoie email via Resend
- Pour l'instant : console.log si pas de clé Resend
- Utiliser `useFormStatus` pour le bouton de soumission (pending state)

### 11. Créer la page Mentions légales (`src/app/mentions-legales/page.tsx`)
- Structure standard : éditeur, hébergeur, données personnelles, cookies, CGV

### 12. SEO de base
- `src/app/layout.tsx` : metadata par défaut (title, description, openGraph)
- Chaque page : metadata spécifique avec generateMetadata si besoin
- `public/robots.txt`
- Placeholder pour sitemap (on le fera dynamique plus tard)

### 13. Fichiers statiques
- `public/robots.txt` : Allow /, Disallow /api/
- `.env.example` : template des variables nécessaires
- `.gitignore` : vérifier qu'il inclut .env*

## Contraintes
- Mobile-first absolu : coder d'abord les styles mobiles
- Touch targets 48px minimum sur tous les éléments cliquables
- Pas de hover-only : tout doit fonctionner au tap
- Animations subtiles (300ms transitions)
- Pas de lorem ipsum : mettre du vrai contenu ou des [PLACEHOLDER] explicites
- Lighthouse mobile > 90 comme objectif

## Ce que tu ne dois PAS faire
- Pas de Stripe pour l'instant (juste le lien /ateliers/inscription)
- Pas de blog/MDX (Phase 2)
- Pas de PWA (Phase 3)
- Pas de chatbot (Phase 3)

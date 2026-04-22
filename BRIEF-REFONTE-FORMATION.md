# BRIEF : Refonte page /fr/formation — EvidencAI

## Contexte
La page formation actuelle est cassée visuellement (énorme espace vide entre les sections) et affiche le programme V1 (25 séquences S01-S25). On passe en V2 (12 séquences J1-01 à J2-06) avec un design accrocheur centré sur le trio pédagogique immersif.

## Projet
`/Users/stephanecommenge/Claude-Dev/EvidencIA-site`
Stack : Next.js App Router + Tailwind CSS v4 + i18n (fr.json/en.json)

## Fichiers à modifier

### 1. `src/app/globals.css` — Ajouter les nouvelles variables
Ajouter dans le bloc `@theme` (après les variables existantes) :
```css
--color-fond-surface: #222240;
--color-bleu-subtil: #3a3a5c;
```

### 2. `src/app/[locale]/formation/page.tsx` — RÉÉCRIRE ENTIÈREMENT

La nouvelle page doit avoir cette structure (GARDER les imports, generateStaticParams, generateMetadata, les schemas JSON-LD) :

**Section 1 — Hero** (fond bleu-nuit, pas de card blanche)
- Badge : "Formation immersive · 2 jours"
- H1 : "Décider avec l'IA" (IA en corail)
- Accroche (Playfair, taille intermédiaire) : "Un formateur humain. Une IA co-animatrice espiègle. Un assistant personnel qui reste avec vous après la formation."
- Sous-titre (DM Sans, gris) : "Ce n'est pas une formation où on vous montre des slides sur l'IA. C'est une formation où vous travaillez avec l'IA, en direct, sur vos vrais sujets, pendant deux jours. Et quand vous repartez, votre assistant IA repart avec vous."
- Meta-row : Format "2 jours espacés d'1 semaine" | Groupe "4 à 8 personnes" | Niveau "Débutant à intermédiaire" | Lieu "Valence (26) ou à distance"
- 2 CTA : "Réserver ma place" (lien vers #inscription) + "Comment ça marche ?" (lien vers #trio)

**Section 2 — Trio immersif** (id="trio")
- Label : "Ce qui change tout"
- H2 : "Vous n'êtes pas seul face à un écran"
- 3 cards sur fond-surface (#222240), border bleu-subtil (#3a3a5c), hover border corail + translateY(-3px) + barre corail animée en bas
- Card 1 : 🎯 "Stéphane" / "Formateur humain" / "Il cadre, contextualise, adapte..."
- Card 2 : ⚡ "Az" / "Co-animatrice IA · espiègle" / "Elle intervient en direct..."
- Card 3 : 💬 "Votre Assistant" / "IA personnelle · pendant et après" / "Chaque participant reçoit son propre Assistant IA..."

**Section 3 — Promesse** (grille 2 colonnes : texte gauche + features droite)
- Label : "La promesse"
- H2 : "En deux jours, vous passez de « c'est impressionnant » à « je sais quoi en faire »"
- Texte narratif sur le manque de cadre mental
- 4 feature cards : "📱 Supports en ligne, pas de classeur", "🔄 Pratique sur vos vrais cas", "🛡️ Sécurité et bon sens", "📋 Un plan d'action en repartant"

**Section 4 — "L'assistant reste"** (fond avec gradient subtil corail, bordures haut/bas)
- Label : "Ce qui continue"
- H2 : "La formation se termine. L'assistant reste." (reste en corail)
- 4 items en grille 2x2 : "Supports accessibles en ligne", "Votre Assistant configuré", "Quiz de réactivation", "Évaluation à J+30"

**Section 5 — Programme** (aperçu compact, PAS les 12 séquences détaillées)
- Label : "En deux jours"
- H2 : "Du « je ne sais pas quoi lui demander » au plan d'action"
- 2 cards côte à côte : Jour 1 "Comprendre et maîtriser" + Jour 2 "Construire et pérenniser"
- Chaque card avec tags thématiques (JetBrains Mono, petits, fond subtil)
- Sous les cards : 4 Piliers en grille compacte (R C V I)
- Note certif discrète : "Finançable. Formation portée par un organisme certifié Qualiopi. Programme détaillé envoyé sur demande."

**Section 6 — Sessions + inscription** (id="inscription")
- Grille des 3 prochaines sessions (garder les dates du dict)
- Formulaire de pré-inscription (GARDER le composant FormationInscriptionForm existant tel quel)

**Section 7 — Sur mesure** (GARDER la section existante telle quelle, elle est bien)

### 3. `src/components/formation/FormationCatalogueDetails.tsx` — SUPPRIMER
Ce composant avec les 25 séquences V1 n'est plus utilisé. Le supprimer.

### 4. `src/i18n/fr.json` — Mettre à jour la section `formation`
La section `formation.catalogue` doit être mise à jour pour correspondre au nouveau contenu.
Les nouvelles clés i18n à ajouter dans `formation` :
- `formation.trio` (section trio)
- `formation.promesse` (section promesse)
- `formation.apres` (section "l'assistant reste")
- `formation.programme` (section programme compact)
- `formation.piliers` (section 4 piliers)
Les textes exacts sont dans les descriptions de sections ci-dessus. Utiliser ces textes EXACTEMENT.
GARDER `formation.surmesure` intact.
GARDER `formation.metadata` intact.

### 5. `src/i18n/en.json` — Traduire la section `formation`
Traduire toutes les nouvelles clés en anglais professionnel.

## Règles de style CSS (Tailwind)

- Fond principal : `bg-bleu-nuit` (déjà défini)
- Fond cards : `bg-fond-surface` (nouvelle variable #222240)
- Bordures cards : `border border-bleu-subtil` (nouvelle variable #3a3a5c)
- Hover cards : `hover:border-ambre hover:-translate-y-0.5 transition-all duration-300`
- Texte principal : `text-text-primary` (#f0f0f0 — mettre à jour dans globals.css de #f8fafc à #f0f0f0)
- Texte secondaire : `text-text-secondary` (garder #94a3b8 ou passer à #a0a0b8)
- Accent : `text-ambre` (déjà #E07A5F)
- Labels/badges : `font-mono text-xs uppercase tracking-wider text-ambre`
- Titres h1/h2 : `font-playfair`
- Corps texte : `font-sans` (DM Sans)
- Max-width contenu : `max-w-5xl mx-auto`
- Padding sections : `py-16 md:py-24 px-4 sm:px-6 lg:px-8`

## Règles impératives

1. NE PAS toucher à FormationInscriptionForm.tsx (le formulaire fonctionne)
2. NE PAS toucher à la section sur mesure (le contenu est bon)
3. NE PAS hardcoder du texte français dans le TSX — tout passe par les dictionnaires i18n
4. NE PAS utiliser de Card blanche (bg-white) pour la section catalogue — tout est sur fond sombre
5. GARDER les schemas JSON-LD (courseSchema, faqSchema) — les mettre à jour si nécessaire
6. GARDER generateStaticParams et generateMetadata
7. Les émojis sont autorisés dans les cards trio et features (charte validée)
8. La barre d'accent corail animée au hover sur les cards trio (::after avec scaleX transition)
9. Le composant FormationCatalogueDetails n'est plus importé — le supprimer du import
10. Tester avec `npm run build` avant de considérer comme terminé

## Référence visuelle
Le fichier HTML de référence qui montre le design cible est disponible dans la conversation Cowork.
Les patterns CSS exacts sont documentés dans :
`/Users/stephanecommenge/Claude-Dev/X fichiers divers/CHARTE-DESIGN-EVIDENCAI.md`

## Déploiement
Après validation : `cd /Users/stephanecommenge/Claude-Dev/EvidencIA-site && vercel --prod`
NE PAS déployer sans validation explicite de l'utilisateur.

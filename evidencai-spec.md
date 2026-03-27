# EvidencAI — Spécifications site web

## Vision

Site vitrine + conversion pour EvidencAI, marque ombrelle de Stéphane Commenge.
Objectif : montrer l'écosystème IA (ateliers, formations, audit, apps) et convertir
à travers un funnel progressif.

**Philosophie** : L'IA améliore l'homme, elle ne le remplace pas.
L'IA n'est ni une calculatrice, ni un oracle. Choix assumé : Claude / Anthropic.

---

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Hébergement | Vercel |
| Domaine | evidencai.com (marque ombrelle) |
| Paiement | Stripe Checkout (ateliers) |
| Emails | Resend |
| Analytics | GA4 + Microsoft Clarity |
| CMS Blog | MDX (fichiers locaux, pas de CMS externe) |
| Formulaire | React Hook Form + Resend |

---

## Arborescence du site

### Pages principales

| Route | Contenu | Objectif conversion |
|-------|---------|---------------------|
| `/` | Hero + funnel visuel + valeurs + témoignages | Orienter vers le bon produit |
| `/ateliers` | 3 modules (débutant/inter/confirmé), 2h, 120€ TTC | Conversion directe Stripe |
| `/ateliers/inscription` | Formulaire + paiement Stripe | Achat |
| `/formation` | Parcours longs Qualiopi, sur mesure entreprise | Prise de contact qualifiée |
| `/solutions` | Audit + implémentation IA en entreprise | Prise de contact qualifiée |
| `/outils` | Vitrine apps : Mnemos, CodirIA + liens démos live | Preuve de compétence |
| `/a-propos` | Stéphane, parcours, valeurs, choix Anthropic | Confiance / E-E-A-T |
| `/blog` | Articles SEO/AEO sur l'IA en entreprise | Trafic organique |
| `/blog/[slug]` | Article individuel MDX | SEO longue traîne |
| `/contact` | Formulaire + lien booking Calendly/GCal | Lead capture |
| `/mentions-legales` | CGV, politique confidentialité, RGPD | Conformité |

### Sous-domaines existants

- `mnemos.evidencai.com` → Dashboard Mnemos (Vercel, déjà déployé)
- Futur : `codiria.evidencai.com` si pertinent

---

## Stratégie commerciale (funnel)

### Niveau 1 — Ateliers (produit d'appel)
- **Format** : 2h, présentiel ou visio
- **Prix** : 120€/personne TTC
- **3 modules** :
  - Débutant : "Découvrir l'IA au quotidien"
  - Intermédiaire : "L'IA dans votre métier"
  - Confirmé : "Automatiser et créer avec l'IA"
- **Paiement** : Stripe Checkout directement sur le site
- **Objectif** : Volume, visibilité, identifier les prospects chauds

### Niveau 2 — Formation longue (Qualiopi)
- **Format** : Parcours sur mesure, 1-3 jours
- **Cible** : Entreprises, dirigeants, équipes
- **Financement** : OPCO possible (Qualiopi)
- **Objectif** : Identifier les vrais pain points de l'entreprise
- **Conversion** : Formulaire contact → appel découverte

### Niveau 3 — Audit + Implémentation
- **Format** : Mission consulting, durée variable
- **Cible** : Entreprises prêtes à intégrer l'IA
- **Objectif** : Le vrai business, marge élevée
- **Conversion** : Formulaire contact → RDV diagnostic

### Les apps comme preuve de compétence
Mnemos et CodirIA ne sont pas vendus comme produits principaux.
Ils servent de démonstration vivante : "Je construis les outils que
je vous enseigne à utiliser." Chaque app pointe vers sa démo live.

---

## Design System

### Palette de couleurs

| Rôle | Couleur | Hex |
|------|---------|-----|
| Fond principal | Bleu nuit profond | `#1a1a2e` |
| Fond secondaire | Bleu nuit clair | `#16213e` |
| Surface / cartes | Blanc | `#ffffff` |
| Texte principal | Blanc (sur fond sombre) | `#f8fafc` |
| Texte secondaire | Gris clair | `#94a3b8` |
| Accent primaire | Ambre chaud | `#f59e0b` |
| Accent hover | Ambre clair | `#fbbf24` |
| Succès | Vert | `#10b981` |
| Erreur | Rouge | `#ef4444` |

### Typographie

| Usage | Police | Poids | Taille |
|-------|--------|-------|--------|
| Titres H1 | Playfair Display | 700 | 3rem mobile, 4rem desktop |
| Titres H2 | Playfair Display | 600 | 2rem mobile, 2.5rem desktop |
| Titres H3 | DM Sans | 600 | 1.25rem mobile, 1.5rem desktop |
| Corps | DM Sans | 400 | 1rem (16px) |
| Boutons/CTA | DM Sans | 600 | 0.875rem |
| Code/tech | JetBrains Mono | 400 | 0.875rem |

### Ton éditorial
- Direct, pas corporate
- Tutoiement ou vouvoiement selon contexte (vouvoiement par défaut site)
- Phrases courtes, verbes d'action
- Pas de jargon sauf quand nécessaire (et alors expliqué)
- Humour léger possible, jamais forcé

---

## UX / Mobile-First

### Principes
- Conception mobile d'abord (70%+ trafic attendu mobile)
- Touch targets 48px minimum
- Navigation : sticky header compact + CTA visible
- Pas de hover-only : tout fonctionne au tap
- Formulaires : autofill, inputmode, autocomplete

### Header mobile
```
┌──────────────────────────────────┐
│ [Logo EvidencAI]    [CTA] [Menu] │
└──────────────────────────────────┘
```
CTA principal = "Découvrir les ateliers" (niveau 1 du funnel)

### Responsive breakpoints (Tailwind)
- `sm` (640px) : tablette portrait
- `md` (768px) : tablette paysage
- `lg` (1024px) : desktop
- `xl` (1280px) : large desktop

### Performance cibles (Core Web Vitals)
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1
- Lighthouse score > 90 sur mobile

---

## SEO & AEO

### SEO Technique
- Sitemap XML dynamique (Next.js generateSitemap)
- robots.txt (bloquer /api/, /admin/)
- Meta tags Open Graph + Twitter Card sur chaque page
- Balises canoniques
- Images : next/image avec formats avif/webp, lazy loading
- Structured data Schema.org sur chaque page

### Schema.org prioritaires
- `Organization` : EvidencAI, coordonnées, logo
- `Person` : Stéphane Commenge, rôle, expertise
- `Course` : chaque atelier/formation (nom, prix, durée, description)
- `FAQPage` : sur /ateliers et /formation
- `Article` : sur /blog/[slug]
- `BreadcrumbList` : navigation fil d'Ariane

### AEO (Answer Engine Optimization)
Optimiser pour que ChatGPT, Perplexity, Claude, Google SGE citent EvidencAI :
- Phrases courtes, factuelles, citables
- FAQ structurées avec Schema.org
- Chiffres concrets (nombre de formations, participants, etc.)
- Page "À propos" détaillée (E-E-A-T)
- Blog avec articles de fond sur l'IA en entreprise

### Mots-clés cibles
- "formation IA entreprise Drôme"
- "atelier intelligence artificielle dirigeants"
- "consultant IA PME"
- "formation IA Qualiopi"
- "audit IA entreprise"
- "ateliers IA pratiques"

### E-E-A-T
- **Experience** : Parcours Stéphane, projets réalisés, apps créées
- **Expertise** : Formations dispensées, contenu blog technique
- **Authority** : Témoignages clients, partenariats
- **Trust** : HTTPS, mentions légales, RGPD, choix éthique Anthropic

---

## Structure des composants (Next.js App Router)

```
src/
├── app/
│   ├── layout.tsx              # Layout global (header, footer, analytics)
│   ├── page.tsx                # Homepage
│   ├── ateliers/
│   │   ├── page.tsx            # Catalogue ateliers
│   │   └── inscription/
│   │       └── page.tsx        # Formulaire + Stripe
│   ├── formation/
│   │   └── page.tsx            # Parcours Qualiopi
│   ├── solutions/
│   │   └── page.tsx            # Audit + implémentation
│   ├── outils/
│   │   └── page.tsx            # Vitrine apps
│   ├── a-propos/
│   │   └── page.tsx            # Profil Stéphane
│   ├── blog/
│   │   ├── page.tsx            # Liste articles
│   │   └── [slug]/
│   │       └── page.tsx        # Article MDX
│   ├── contact/
│   │   └── page.tsx            # Formulaire contact
│   ├── mentions-legales/
│   │   └── page.tsx
│   └── api/
│       ├── stripe/
│       │   └── checkout/route.ts
│       └── contact/route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Input.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FunnelSection.tsx
│   │   ├── ValuesSection.tsx
│   │   └── TestimonialsSection.tsx
│   ├── ateliers/
│   │   ├── AtelierCard.tsx
│   │   └── PricingTable.tsx
│   └── blog/
│       ├── ArticleCard.tsx
│       └── MDXComponents.tsx
├── content/
│   └── blog/                   # Fichiers .mdx
│       ├── ia-en-entreprise.mdx
│       └── ...
├── lib/
│   ├── stripe.ts
│   ├── resend.ts
│   └── mdx.ts
└── styles/
    └── globals.css
```

---

## Contenu page par page

### Homepage (`/`)

**Hero** :
- Titre : "Pour une IA qui vous améliore." (retour à la ligne) "Pas qui vous remplace."
- Sous-titre : "Accompagnement IA pour dirigeants et entreprises. De l'atelier découverte à l'implémentation sur mesure."
- CTA primaire : "Découvrir les ateliers" → /ateliers
- CTA secondaire : "Parlons de votre projet" → /contact
- Fond : bleu nuit avec particules/gradient subtil animé

**Section Funnel visuel** :
3 colonnes/cartes représentant les 3 niveaux :
1. Ateliers → icône + prix + CTA
2. Formation Qualiopi → icône + "Sur devis" + CTA
3. Audit & Implémentation → icône + "Sur mesure" + CTA

**Section Valeurs** :
- "L'IA améliore l'homme, elle ne le remplace pas"
- "Pas une calculatrice, pas un oracle : un outil qui amplifie votre intelligence"
- "Claude / Anthropic : un choix éthique assumé"

**Section Outils** :
Aperçu des apps avec screenshots + liens vers démos live

**Section Témoignages** :
Quotes clients (à collecter), avec nom + entreprise

---

### Ateliers (`/ateliers`)

**3 cartes modules** avec pour chacune :
- Nom du module
- Niveau (débutant / intermédiaire / confirmé)
- Durée : 2h
- Prix : 120€ TTC / personne
- Description courte (2-3 lignes)
- Prochaine(s) date(s) disponible(s)
- CTA : "S'inscrire" → /ateliers/inscription?module=X

**Module 1 — Découvrir l'IA au quotidien** (Débutant)
- Public : Curieux, dirigeants, salariés sans expérience IA
- Contenu : Comprendre ce qu'est (et n'est pas) l'IA, premiers usages concrets, démo live

**Module 2 — L'IA dans votre métier** (Intermédiaire)
- Public : Professionnels qui veulent intégrer l'IA dans leur workflow
- Contenu : Cas d'usage métier, prompt engineering, outils pratiques

**Module 3 — Automatiser et créer avec l'IA** (Confirmé)
- Public : Utilisateurs avancés, dirigeants tech-friendly
- Contenu : Agents IA, automatisation, création d'outils sur mesure

**FAQ Section** avec Schema.org FAQPage :
- "Faut-il un niveau technique ?" → Non, chaque module est adapté
- "Présentiel ou distanciel ?" → Les deux possibles
- "Comment se passe le paiement ?" → Paiement sécurisé Stripe
- "Puis-je être remboursé ?" → Conditions d'annulation

---

### Inscription atelier (`/ateliers/inscription`)

**Formulaire** :
- Choix module (pré-rempli si ?module=X)
- Choix date/créneau
- Nom, Prénom, Email, Téléphone
- Entreprise (optionnel)
- Fonction (optionnel)
- Message (optionnel)
- CGV checkbox

**Paiement** : Redirect Stripe Checkout → page succès avec confirmation email (Resend)

---

### Formation Qualiopi (`/formation`)

**Structure page** :
- Hero : "Des parcours IA sur mesure pour votre entreprise"
- Explication Qualiopi (financement OPCO)
- Exemples de parcours types (1 jour, 2 jours, 3 jours)
- Méthodologie (diagnostic → programme → formation → suivi)
- Témoignages entreprises
- CTA : "Demander un programme sur mesure" → formulaire contact

---

### Solutions — Audit & Implémentation (`/solutions`)

**Structure page** :
- Hero : "Intégrer l'IA là où ça compte vraiment"
- Processus en 4 étapes : Diagnostic → Recommandations → Implémentation → Suivi
- Exemples de missions types (anonymisés ou avec accord)
- Différenciateur : "Je code ce que je recommande" (preuve via /outils)
- CTA : "Réserver un diagnostic gratuit" → /contact

---

### Outils (`/outils`)

**Vitrine des apps** — cartes avec :
- Screenshot/mockup
- Nom + tagline
- Description courte
- Stack technique (badge discret)
- Lien vers démo live
- Statut (beta, production)

**Apps actuelles** :
- **Mnemos** : "Mémoire persistante pour IA" → mnemos.evidencai.com
- **CodirIA** : "Assistant comité de direction" → à venir

Chaque app a un bouton "Essayer la démo" pointant vers le sous-domaine.

---

### À propos (`/a-propos`)

**Contenu** :
- Photo pro de Stéphane
- Parcours : entrepreneur, juge consulaire, formateur, développeur IA
- Pourquoi l'IA : conviction personnelle, pas opportunisme
- Pourquoi Claude/Anthropic : choix éthique, safety-first, qualité de raisonnement
- Lien LinkedIn
- Schema.org Person

---

### Blog (`/blog`)

**Architecture** :
- Liste paginée d'articles (12/page)
- Filtrage par catégorie (tag)
- Chaque article = fichier MDX dans /content/blog/
- Frontmatter : title, description, date, tags, image, author

**Catégories initiales** :
- "IA en entreprise"
- "Retours d'expérience"
- "Tutoriels IA"
- "Réflexions"

**Premier articles suggérés** :
- "Pourquoi j'ai choisi Claude pour accompagner les entreprises"
- "5 usages concrets de l'IA pour un dirigeant de PME"
- "Formation IA : ce que Qualiopi change pour votre entreprise"

---

### Contact (`/contact`)

**Formulaire** :
- Nom, Email, Téléphone (optionnel)
- Sujet (select : Atelier, Formation, Audit, Autre)
- Message
- RGPD checkbox

**Envoi** : API route → Resend (email à Stéphane) + accusé de réception auto

**Optionnel** : Lien Calendly/Google Calendar pour booking direct

---

## Intégrations

### Stripe
- Checkout Session pour paiement ateliers (120€)
- Webhook pour confirmation post-paiement
- Email de confirmation via Resend déclenché par webhook
- Mode test d'abord, prod quand prêt

### Resend (emails transactionnels)
- Confirmation inscription atelier
- Accusé de réception formulaire contact
- Template HTML responsive, brandé EvidencAI

### Analytics
- GA4 : trafic, conversions, événements custom
- Microsoft Clarity : heatmaps, sessions replay
- Events à tracker : clic CTA, soumission formulaire, paiement réussi

---

## Déploiement

### Phase 1 — MVP (priorité)
Pages : `/`, `/ateliers`, `/ateliers/inscription`, `/a-propos`, `/contact`, `/mentions-legales`
Fonctionnalités : Stripe ateliers, formulaire contact, SEO de base

### Phase 2 — Contenu
Pages : `/formation`, `/solutions`, `/outils`, `/blog`
Fonctionnalités : MDX blog, vitrine apps

### Phase 3 — Optimisation
- AEO avancé (Schema.org complet, FAQ)
- PWA (manifest + service worker)
- Newsletter capture (popup/banner)
- Chatbot IA (optionnel, Claude API)

---

## Variables d'environnement (.env.local)

```
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...

# Analytics
NEXT_PUBLIC_GA_ID=G-...
NEXT_PUBLIC_CLARITY_ID=...

# Site
NEXT_PUBLIC_SITE_URL=https://evidencai.com
NEXT_PUBLIC_SITE_NAME=EvidencAI
```

---

## Checklist pré-déploiement

- [ ] Lighthouse mobile > 90
- [ ] Meta tags OG + Twitter sur chaque page
- [ ] Schema.org validé (Rich Results Test)
- [ ] robots.txt + sitemap.xml
- [ ] Favicon + apple-touch-icon
- [ ] RGPD : bannière cookies, mentions légales
- [ ] Formulaires : validation, messages d'erreur, autocomplete
- [ ] Images optimisées (avif/webp, lazy loading)
- [ ] 404 page custom
- [ ] Responsive testé (iPhone SE → desktop)
- [ ] Stripe mode test fonctionnel
- [ ] Emails Resend testés
- [ ] DNS evidencai.com pointé vers Vercel

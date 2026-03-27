# EvidencAI - Site Web

Site vitrine et conversion pour EvidencAI, marque ombrelle de Stéphane Commenge.

## 🚀 Technologies

- **Framework** : Next.js 16.2.1 (App Router)
- **Styling** : Tailwind CSS v4
- **Language** : TypeScript
- **Validation** : Zod
- **Paiements** : Stripe (à configurer)
- **Emails** : Resend (à configurer)
- **Hébergement** : Vercel (prévu)

## 📋 Structure du projet

```
src/
├── app/                      # Pages Next.js App Router
│   ├── layout.tsx           # Layout global avec Header/Footer
│   ├── page.tsx             # Homepage
│   ├── ateliers/            # Ateliers IA
│   ├── formation/           # Formation Qualiopi (placeholder)
│   ├── solutions/           # Audit & Solutions (placeholder)
│   ├── outils/              # Vitrine apps (Mnemos, CodirIA)
│   ├── a-propos/            # Profil Stéphane
│   ├── blog/                # Blog (placeholder)
│   ├── contact/             # Formulaire contact + Server Actions
│   └── mentions-legales/    # Mentions légales, CGV, RGPD
├── components/
│   ├── layout/              # Header, Footer
│   ├── ui/                  # Composants UI réutilisables
│   ├── home/                # Sections homepage
│   └── ateliers/            # Composants ateliers
└── styles/
    └── globals.css          # Styles globaux + Tailwind config
```

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build

# Démarrer en mode production
npm start
```

## 🔧 Configuration

### Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner les valeurs :

```bash
# Stripe (optionnel pour l'instant)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend (optionnel pour l'instant)
RESEND_API_KEY=re_...

# Analytics (à configurer)
NEXT_PUBLIC_GA_ID=G-...
NEXT_PUBLIC_CLARITY_ID=...

# Site
NEXT_PUBLIC_SITE_URL=https://evidencai.com
NEXT_PUBLIC_SITE_NAME=EvidencAI
```

## 📝 Pages complétées (Phase 1 - MVP)

- ✅ Homepage avec Hero, Funnel, Valeurs, Outils, Témoignages
- ✅ /ateliers - 3 modules + FAQ + Schema.org
- ✅ /a-propos - Profil Stéphane + Schema.org Person
- ✅ /contact - Formulaire avec Server Actions + validation Zod
- ✅ /mentions-legales - CGV, RGPD, mentions légales
- ✅ Layout global avec Header sticky + Footer
- ✅ Composants UI de base (Button, Card, Badge, Input)
- ✅ SEO de base (metadata, robots.txt, sitemap.xml)

## 🚧 À compléter (Phase 2)

- ⏳ /formation - Page formation Qualiopi complète
- ⏳ /solutions - Page audit & implémentation complète
- ⏳ /blog - Système MDX pour articles de blog
- ⏳ /ateliers/inscription - Intégration Stripe Checkout
- ⏳ Intégration Resend pour emails transactionnels
- ⏳ Analytics (GA4 + Clarity)
- ⏳ Images (logo, photos, og-image)
- ⏳ PWA (manifest + service worker)

## 🎨 Design System

### Couleurs
- **Bleu nuit** : #1a1a2e (fond principal)
- **Bleu nuit clair** : #16213e (fond secondaire)
- **Ambre** : #f59e0b (CTA, accents)
- **Ambre clair** : #fbbf24 (hover)

### Typographie
- **Titres** : Playfair Display (700)
- **Corps** : DM Sans (400, 500, 600)
- **Code** : JetBrains Mono (400)

### Principes UX
- Mobile-first absolu
- Touch targets 48px minimum
- Pas de hover-only
- Animations subtiles (300ms)

## 📊 SEO

- Metadata configurées sur chaque page
- Schema.org : Organization, Person, Course, FAQPage
- Sitemap.xml dynamique
- robots.txt
- Open Graph + Twitter Cards

## 🔗 Liens utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Stripe Documentation](https://docs.stripe.com)
- [Resend Documentation](https://resend.com/docs)

## 📦 Déploiement

Le site est prévu pour être déployé sur Vercel.

```bash
# Connecter à Vercel
vercel

# Déployer en production
vercel --prod
```

## ⚠️ Points d'attention

### À remplacer avant mise en production

1. **Page À propos** : Compléter les placeholders du parcours de Stéphane
2. **Témoignages** : Remplacer les placeholders par de vrais témoignages clients
3. **Images** : Ajouter logo EvidencAI, photo Stéphane, og-image
4. **Mentions légales** : Compléter SIRET, adresse, forme juridique
5. **Metadata** : Retirer "PLACEHOLDER_GOOGLE_VERIFICATION"
6. **Variables d'env** : Configurer Stripe + Resend avant activation formulaires

## 📄 License

Propriété de EvidencAI - Tous droits réservés

---

Développé avec Claude Code par Stéphane Commenge

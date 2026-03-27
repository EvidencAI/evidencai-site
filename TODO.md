# TODO - Prochaines étapes

## ✅ Phase 1 - MVP (TERMINÉE)

- [x] Initialisation projet Next.js + TypeScript + Tailwind
- [x] Configuration design system (couleurs, fonts)
- [x] Layout global (Header sticky + Footer)
- [x] Composants UI de base (Button, Card, Badge, Input)
- [x] Homepage complète (Hero, Funnel, Valeurs, Outils, Témoignages)
- [x] Page Ateliers (3 modules + FAQ + Schema.org)
- [x] Page À propos (profil + Schema.org Person)
- [x] Page Contact (Server Actions + validation Zod)
- [x] Page Mentions légales (CGV, RGPD)
- [x] SEO de base (metadata, robots.txt, sitemap)
- [x] Build réussi et serveur dev fonctionnel

## 🔜 Phase 2 - Contenu (À faire)

### Pages à compléter

- [ ] **/formation** - Page Formation Qualiopi complète
  - Détails des parcours 1-3 jours
  - Méthodologie
  - Témoignages entreprises
  - Schema.org Course

- [ ] **/solutions** - Page Audit & Solutions complète
  - Processus en 4 étapes détaillé
  - Exemples de missions
  - Cas d'usage

- [ ] **/outils** - Améliorer la page existante
  - Plus de détails sur chaque outil
  - Captures d'écran réelles
  - Roadmap produits

- [ ] **/blog** - Système MDX
  - Configuration MDX
  - Composants MDX personnalisés
  - Liste paginée d'articles
  - Premier article : "Pourquoi j'ai choisi Claude"

- [ ] **/ateliers/inscription** - Intégration Stripe
  - Formulaire inscription
  - Stripe Checkout Session
  - Webhook confirmation
  - Email confirmation via Resend

### Contenu à créer

- [ ] **À propos** : Compléter le parcours de Stéphane
- [ ] **Témoignages** : Remplacer les placeholders
- [ ] **Mentions légales** : Ajouter SIRET, adresse, forme juridique

### Intégrations

- [ ] **Stripe**
  - Mode test fonctionnel
  - Webhook endpoint
  - Email confirmation post-paiement

- [ ] **Resend**
  - Configuration API key
  - Templates emails (confirmation, accusé réception)
  - Test emails

- [ ] **Analytics**
  - Google Analytics 4
  - Microsoft Clarity
  - Événements custom (CTA, formulaires, paiements)

### Assets

- [ ] **Logo EvidencAI** : Créer ou intégrer
- [ ] **Photo Stéphane** : Photo professionnelle
- [ ] **OG Image** : Image 1200x630 pour réseaux sociaux
- [ ] **Favicon** : favicon.ico + apple-touch-icon

## 🚀 Phase 3 - Optimisation (Plus tard)

### Performance

- [ ] Optimisation images (formats avif/webp)
- [ ] Lazy loading images
- [ ] Lighthouse mobile > 90
- [ ] Core Web Vitals optimisés

### SEO avancé

- [ ] Schema.org complet sur toutes les pages
- [ ] Rich snippets validés
- [ ] Meta description optimisées (155 caractères)
- [ ] Internal linking structure
- [ ] Sitemap XML avec priorités et fréquences
- [ ] Submit sitemap à Google Search Console

### AEO (Answer Engine Optimization)

- [ ] FAQ structurées avec Schema.org
- [ ] Phrases citables pour LLMs
- [ ] Contenu factuel avec chiffres concrets
- [ ] Blog articles optimisés AEO

### Features

- [ ] PWA (manifest + service worker)
- [ ] Newsletter capture (popup/banner)
- [ ] Chatbot IA (optionnel, Claude API)
- [ ] Booking Calendly/Google Calendar intégré
- [ ] Dark mode toggle (optionnel)

### SEO local

- [ ] Google Business Profile
- [ ] Schema.org LocalBusiness
- [ ] Avis clients Google
- [ ] Mots-clés locaux ("formation IA Drôme")

## 🔧 Technique

### À configurer

- [ ] Vercel deployment
- [ ] DNS evidencai.com pointé vers Vercel
- [ ] Variables d'environnement en production
- [ ] Google Search Console
- [ ] Monitoring erreurs (Sentry ou équivalent)

### Tests

- [ ] Tests responsiveness (iPhone SE → desktop)
- [ ] Tests formulaires (validation, soumission)
- [ ] Tests Stripe en mode test
- [ ] Tests emails Resend

### Documentation

- [ ] Documentation API routes
- [ ] Guide contribution (si équipe)
- [ ] Changelog

## ⚠️ Points critiques avant production

1. **Contenu**
   - [ ] Remplacer tous les `[PLACEHOLDER]`
   - [ ] Vérifier orthographe/grammaire
   - [ ] Valider le ton éditorial

2. **Légal**
   - [ ] SIRET et infos légales complètes
   - [ ] CGV validées par un avocat (recommandé)
   - [ ] RGPD : bannière cookies conforme
   - [ ] Politique de confidentialité à jour

3. **SEO**
   - [ ] Metadata uniques sur chaque page
   - [ ] Pas de contenu dupliqué
   - [ ] Balises alt sur toutes les images
   - [ ] Google verification meta tag

4. **Performance**
   - [ ] Build sans erreurs TypeScript
   - [ ] Build sans warnings
   - [ ] Lighthouse > 90 mobile
   - [ ] Tester sur vrais devices mobiles

5. **Intégrations**
   - [ ] Stripe en mode production
   - [ ] Resend avec vraie adresse
   - [ ] Analytics configurés et testés

---

**Dernière mise à jour** : 27 mars 2026
**Statut actuel** : Phase 1 MVP complète ✅

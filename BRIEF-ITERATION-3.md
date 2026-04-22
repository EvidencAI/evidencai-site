# BRIEF ITÉRATION 3 — Corrections finales

## 1. Remplacer TOUS les émojis par des icônes SVG Lucide

La charte EvidencAI interdit les émojis dans les interfaces/site. Utiliser des icônes SVG inline Lucide (stroke style, 24x24, strokeWidth 1.5-2) à la place.

Fichiers concernés : `src/app/[locale]/formations/decider-avec-ia/page.tsx`

Remplacements à faire :
- 🎯 (Stéphane, formateur) → icône Lucide `Target` ou `User`
- ⚡ (Az, co-animatrice) → icône Lucide `Sparkles` ou `Zap`
- 💬 (Votre Assistant) → icône Lucide `MessageCircle`
- 📱 (Supports en ligne) → icône Lucide `Monitor` ou `Globe`
- 🔄 (Pratique vrais cas) → icône Lucide `RefreshCw` ou `Target`
- 🛡️ (Sécurité) → icône Lucide `Shield`
- 📋 (Plan d'action) → icône Lucide `ClipboardCheck` ou `ListChecks`

Style des icônes : `className="w-8 h-8 text-ambre"` (corail, taille cohérente)

NE PAS installer lucide-react si pas déjà installé. Utiliser des SVG inline à la place :
```tsx
<svg className="w-8 h-8 text-ambre" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" d="..." />
</svg>
```
Prendre les paths SVG depuis https://lucide.dev (ou les coder à la main).
Vérifier d'abord si lucide-react est dans package.json. Si oui, utiliser les composants directement.

## 2. Corriger la section "L'assistant reste" (4 items)

Dans la page détail `formations/decider-avec-ia/page.tsx` et dans fr.json/en.json.

Les 4 items actuels sont FAUX. Corriger avec :

Item 1 : "Supports de cours accessibles"
→ "Tous les contenus de formation restent accessibles en ligne. Revenez-y quand vous en avez besoin."

Item 2 : "Votre Assistant toujours actif"
→ "L'assistant IA avec lequel vous avez travaillé pendant la formation continue de vous accompagner. Même contexte, mêmes réflexes."

Item 3 : "Ressources pratiques"
→ "Fiches méthode, guides de prompt, références : tout ce qui vous a servi pendant la formation reste disponible."

Item 4 : "Évaluation à J+30"
→ "Un mois après, on mesure l'impact réel sur votre quotidien professionnel."

SUPPRIMER toute mention de "quiz de réactivation après la formation". Les quiz sont PENDANT la formation, pas après.

## 3. Ajouter les prochaines dates sur la card index

Dans `src/app/[locale]/formations/page.tsx`, dans la card de la formation "Décider avec l'IA" :

Ajouter les prochaines dates sous le prix/description, dans un format compact :
```
Prochaines sessions : 7 & 14 avril · 5 & 12 mai · 23 & 30 juin
```

Style : texte petit, JetBrains Mono, couleur text-secondary, les dates en text-primary.
Les données sont dans le dict : `dict.formation.catalogue.sessions.items`

## 4. Vérifier aussi la page index formations/page.tsx

S'assurer que les émojis sont aussi remplacés par des SVG dans cette page si elle en contient.

## Ordre
1. Vérifier si lucide-react est installé
2. Remplacer les émojis par SVG dans la page détail
3. Corriger les 4 items "l'assistant reste" (fr.json + en.json + page si hardcodé)
4. Ajouter dates sur la card index
5. npm run build

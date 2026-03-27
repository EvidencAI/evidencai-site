# Mission : Corrections Phase 1 — EvidencAI

Tu travailles dans `/Users/stephanecommenge/Claude-Dev/EvidencIA-site/`.
Voici 5 corrections à appliquer dans l'ordre. Ne touche à rien d'autre.

## 1. CRITIQUE — Corriger globals.css (règles trop agressives)

Dans `src/app/globals.css` :

**Supprimer** la règle globale sur les transitions :
```css
/* SUPPRIMER CES LIGNES */
* {
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}
```

**Remplacer** la règle globale sur les touch targets par une règle ciblée :
```css
/* SUPPRIMER CES LIGNES */
button,
a {
  min-height: 48px;
  min-width: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

**Remplacer par** (ciblé sur les éléments interactifs, pas les liens inline) :
```css
/* Touch targets - éléments interactifs uniquement */
button,
a[role="button"],
nav a,
.cta {
  min-height: 48px;
}

/* Transitions - éléments interactifs uniquement */
button,
a,
input,
select,
textarea {
  transition: color 300ms ease-in-out, background-color 300ms ease-in-out, border-color 300ms ease-in-out, opacity 300ms ease-in-out;
}
```

## 2. VISUEL — Casser la monotonie bleu nuit

Le problème : 5 sections consécutives en bleu nuit, aucun rythme visuel.

**FunnelSection.tsx** : changer le fond de `bg-bleu-nuit-light` vers `bg-white`. Adapter les textes : titre en `text-bleu-nuit`, description en `text-gray-600`. Les cartes sont déjà en blanc donc il faut leur ajouter un `border border-gray-200` et un léger `shadow-lg` pour qu'elles se détachent.

**ValuesSection.tsx** : garder `bg-bleu-nuit` (contraste avec la section blanche au-dessus).

**OutilsSection.tsx** : changer vers `bg-bleu-nuit-light` pour alterner.

**TestimonialsSection.tsx** : fond `bg-white`, textes en `text-bleu-nuit`.

Résultat attendu : Hero(bleu nuit) → Funnel(blanc) → Valeurs(bleu nuit) → Outils(bleu nuit light) → Témoignages(blanc). Alternance clair/sombre.

## 3. VISUEL — Remplacer les emojis par des icônes SVG

```bash
npm install lucide-react
```

Remplacer dans les composants :
- FunnelSection.tsx : 🎯 → `<Target />`, 🎓 → `<GraduationCap />`, 🚀 → `<Rocket />`
- ValuesSection.tsx : 🤝 → `<HandHeart />` (ou `<Heart />`), 💡 → `<Lightbulb />`, ⚡ → `<Shield />`

Importer depuis `lucide-react`. Taille : `className="w-10 h-10 text-ambre"` dans les sections sombres, `className="w-10 h-10 text-bleu-nuit"` dans les sections claires.

## 4. VISUEL — Donner de la vie au Hero

Dans Hero.tsx, ajouter un motif de fond subtil. Remplacer le div décoratif existant par :
```tsx
{/* Gradient mesh subtil */}
<div className="absolute inset-0 opacity-30">
  <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-ambre/20 rounded-full blur-3xl" />
  <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
</div>
```
Cela crée un effet de lumière ambiante sans alourdir le DOM.

## 5. STRUCTURE — Ajouter page 404 et loading

Créer `src/app/not-found.tsx` :
- Fond bleu nuit, titre "404" en Playfair très grand (text-8xl), sous-titre "Cette page n'existe pas", lien retour home avec bouton ambre.

Créer `src/app/loading.tsx` :
- Skeleton screen simple : fond bleu nuit avec 3-4 blocs gris animés (animate-pulse) simulant la structure de la homepage (un grand bloc hero + 3 petits blocs cartes).

## Contraintes
- Ne modifie QUE les fichiers mentionnés ci-dessus
- Vérifie que le build passe (`npm run build`) après toutes les corrections
- Mobile-first : vérifie que tes modifications fonctionnent sur petit écran

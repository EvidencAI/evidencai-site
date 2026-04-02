# ✅ Infrastructure i18n terminée — Prochaines étapes

## 🎉 Ce qui fonctionne déjà

✅ Routes i18n : `/fr` et `/en`
✅ Middleware de redirection (`/` → `/fr`)
✅ Dictionnaires complets (français + anglais)
✅ Header avec switch de langue fonctionnel
✅ Footer internationalisé
✅ Layout [locale] prêt

## 🔧 Il reste à faire : Adapter les composants (30 min de travail)

### Erreur actuelle

```
Property 'dict' does not exist on type 'IntrinsicAttributes'.
```

**Cause** : Les composants de la home page n'acceptent pas encore les props `dict` et `locale`.

### Solution : Adapter les 6 composants

Fichiers à modifier (dans `src/components/home/`) :
1. `Hero.tsx`
2. `FunnelSection.tsx`
3. `ValuesSection.tsx`
4. `PainPointsSection.tsx`
5. `OutilsSection.tsx`
6. `TestimonialsSection.tsx`

### Template à appliquer

**Pour chaque composant, faire :**

1. Ajouter les imports :
```typescript
import type { Locale } from '@/i18n/config';
import type { getDictionary } from '@/i18n/dictionaries';
```

2. Ajouter l'interface :
```typescript
interface ComponentProps {
  dict: Awaited<ReturnType<typeof getDictionary>>;
  locale?: Locale; // optionnel selon le composant
}
```

3. Modifier la signature :
```typescript
// Avant
export default function Hero() {

// Après
export default function Hero({ dict, locale }: ComponentProps) {
```

4. Remplacer le texte en dur par les clés du dictionnaire :
```typescript
// Avant
<h1>Pour une IA qui vous améliore.</h1>

// Après
<h1>{dict.home.hero.title}</h1>
```

### Où trouver les clés ?

Toutes les traductions sont dans :
- `src/i18n/fr.json` (français)
- `src/i18n/en.json` (anglais)

Structure :
```json
{
  "home": {
    "hero": {
      "title": "Pour une IA qui vous améliore.",
      "titleHighlight": "Pas qui vous remplace.",
      ...
    },
    "funnel": { ... },
    "values": { ... },
    ...
  }
}
```

## 📋 Checklist rapide

- [ ] Hero.tsx
- [ ] FunnelSection.tsx
- [ ] ValuesSection.tsx
- [ ] PainPointsSection.tsx
- [ ] OutilsSection.tsx
- [ ] TestimonialsSection.tsx
- [ ] `npm run build` passe sans erreur
- [ ] Tester `/fr` et `/en` en dev
- [ ] Déployer sur Vercel

## 🚀 Commandes

```bash
# Tester en dev
npm run dev
# Aller sur http://localhost:3000 (redirige vers /fr)
# Cliquer sur EN dans le header pour tester /en

# Build de production
npm run build

# Déployer
vercel --prod
```

## 📚 Documentation complète

Voir `i18n-migration-status.md` pour les détails complets de la migration.

---

**Note** : Une fois les 6 composants adaptés, le site sera 100% bilingue et prêt à déployer ! 🎉

# Mission : Adapter les 6 composants home pour l'i18n

## Contexte
L'infrastructure i18n est en place (middleware, dictionnaires fr.json/en.json, layout [locale]).
J'ai déjà patché les composants pour accepter les props (le build passe), mais les textes sont encore hardcodés en français.
Il faut maintenant remplacer tous les textes en dur par les clés du dictionnaire.

## Ce qui est fait
- Le build passe (les composants acceptent dict/locale en props optionnelles avec `any` type)
- La page d'accueil passe `dict` et `locale` aux composants (voir `src/app/[locale]/page.tsx`)

## Ce qu'il faut faire

Pour chaque composant dans `src/components/home/` :

1. **Typer correctement** les props (remplacer le `any` par le vrai type) :
```typescript
import type { Locale } from '@/i18n/config';
import type { getDictionary } from '@/i18n/dictionaries';

interface ComponentProps {
  dict: Awaited<ReturnType<typeof getDictionary>>;
  locale?: Locale;
}
```

2. **Remplacer tous les textes hardcodés** par les clés correspondantes dans `dict.home.*`

3. **Adapter les liens** pour inclure `/${locale}/...` au lieu de `/...`

## Composants à adapter (dans cet ordre)

1. `Hero.tsx` → clés dans `dict.home.hero`
2. `FunnelSection.tsx` → clés dans `dict.home.funnel`
3. `ValuesSection.tsx` → clés dans `dict.home.values`
4. `PainPointsSection.tsx` → clés dans `dict.home.painPoints`
5. `OutilsSection.tsx` → clés dans `dict.home.outils`
6. `TestimonialsSection.tsx` → clés dans `dict.home.testimonials`

## Fichiers de référence
- `src/i18n/fr.json` : toutes les clés françaises
- `src/i18n/en.json` : toutes les clés anglaises
- `src/app/[locale]/page.tsx` : comment les props sont passées
- `NEXT_STEPS_I18N.md` : documentation détaillée

## Règles
- Ne PAS modifier le contenu français (il doit rester identique)
- Ne PAS modifier le design/CSS
- Adapter aussi le Header.tsx et Footer.tsx s'ils ne sont pas encore internationalisés
- Lancer `npx next build` à la fin pour vérifier que tout compile
- Si le build passe, déployer avec `npx vercel --prod --yes`

## Vérification finale
- `/fr` doit afficher le site en français (identique à avant)
- `/en` doit afficher le site en anglais
- Le switch FR/EN dans le header doit changer la langue

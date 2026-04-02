# Mission : Internationaliser les pages restantes (hors home)

## Contexte
L'i18n de la homepage est terminée (les 6 composants home utilisent dict). Les dictionnaires fr.json et en.json contiennent DÉJÀ les traductions pour toutes les pages. Il faut maintenant adapter les pages standalone pour qu'elles utilisent le dictionnaire au lieu de textes hardcodés.

## Pages à adapter

Chaque page dans `src/app/[locale]/` doit :
1. Récupérer `params.locale` et appeler `getDictionary(locale)`
2. Passer `dict` et `locale` aux composants ou les utiliser directement
3. Remplacer tous les textes en dur par les clés du dictionnaire
4. Adapter les liens internes pour inclure `/${locale}/...`
5. Internationaliser les metadata via `generateMetadata()`

### Pages à modifier :

1. **solutions/page.tsx** → clés dans `dict.solutions`
2. **ateliers/page.tsx** → clés dans `dict.ateliers`
3. **ateliers/inscription/page.tsx** → vérifier les clés disponibles
4. **formation/page.tsx** → clés dans `dict.formation`
5. **outils/page.tsx** → clés dans `dict.outils`
6. **a-propos/page.tsx** → clés dans `dict.apropos`
7. **contact/page.tsx** + **contact/ContactForm.tsx** → clés dans `dict.contact`
8. **blog/page.tsx** → clés dans `dict.blog`
9. **mentions-legales/page.tsx** → clés dans `dict.mentions`

### Composant OutilsSection (home)
Les descriptions des outils dans `src/components/home/OutilsSection.tsx` sont encore en français. Les adapter avec `dict.home.outils` si les clés existent.

## Pattern de référence

Regarde comment `src/app/[locale]/page.tsx` fonctionne (la home) :
```typescript
import { getDictionary } from '@/i18n/dictionaries';
import { locales, type Locale } from '@/i18n/config';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: dict.metadata.site.title, ... };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  // utiliser dict.section.key pour le contenu
}
```

## Règles
- Le contenu français doit rester IDENTIQUE à ce qu'il était
- Ne PAS modifier le design/CSS
- Si une clé manque dans le dictionnaire, l'AJOUTER dans fr.json ET en.json
- Tester avec `npx next build` à la fin
- Si le build passe, déployer avec `npx vercel --prod --yes`
- Adapter aussi le sitemap.ts pour inclure les URLs /fr/ et /en/ avec hreflang

## Bonus : metadataBase
Dans `src/app/layout.tsx` (root layout), ajouter :
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://www.evidencai.com'),
};
```
Cela corrige le warning "metadataBase not set" pour les Open Graph / Twitter cards.

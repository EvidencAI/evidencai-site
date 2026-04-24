# Charte éditoriale – Blog EvidencAI

## Ton et style

Écriture directe, en "vous". Phrases courtes. Pas de jargon sans explication.
Le lecteur est un dirigeant de PME, pas un développeur.
On donne des conseils actionnables, pas des cours magistraux.

## Mise en forme du contenu

### Typographie

- **Gras** (`**texte**`) : notions structurantes, chiffres clés, noms de règles.
  Exemples : **90% des risques**, **AI Act européen**, **acte humain**
- <span className="corail">Corail</span> (`<span className="corail">texte</span>`) : mots-clés percutants, les termes qui doivent accrocher l'œil.
  Exemples : contre-productif, zéro garde-fou, 5 règles, tuyau ouvert, Je décide
- Ne jamais cumuler gras + corail sur le même mot. Choisir l'un ou l'autre.
- Doser : 2 à 4 corails par section, 3 à 5 gras par section max.

### Interdits

- Pas de tirets longs (—). Reformuler avec une virgule, un point ou deux-points.
- Pas de séparateurs `---` entre les sections. L'espacement CSS suffit.
- Pas de bullet points dans le corps du blog (sauf liste numérotée d'étapes).
- Pas d'émojis.

### Espacement (géré par CSS, pas par le contenu)

- Entre paragraphes : `margin-bottom: 1.5em` (CSS global .prose p)
- Interligne dans un paragraphe : `line-height: 1.2`
- Avant un h2 : `margin-top: 2.5em`
- Avant un h3 : `margin-top: 2em`
- Ne pas forcer d'espacement dans le MDX (pas de `<br/>`, pas de `&nbsp;`).

## Structure d'un article

### Frontmatter obligatoire

```yaml
title: "Titre court et accrocheur"
description: "1-2 phrases pour le SEO et les réseaux sociaux"
date: "YYYY-MM-DD"
category: "outils | reglementation | adoption"
fact: "Le chiffre ou la donnée sourcée"
signal: "Ce que ça implique pour le lecteur"
action: "Ce qu'il doit faire cette semaine"
ctaLabel: "Texte du bouton"
ctaHref: "/chemin ou /downloads/fichier.ext"
coAuthor: "Claude & Stéphane Commenge"
```

### Blocs Signal (Le Fait / Le Signal / L'Action)

Rendus par le composant `SignalArticle`. Titres en corail (CSS composant).
Le texte est en `text-secondary`. Garder les phrases courtes et percutantes.

### Corps de l'article (MDX)

Commencer par un h2 qui pose le problème ou l'enjeu.
Alterner paragraphes courts (2-4 phrases max) et h3 pour les sous-sections.
Terminer par une section pratique ("Concrètement, comment faire") ou un appel à l'action.

### CTA

Si le lien pointe vers un fichier statique (.docx, .pdf), le composant blog utilise un `<a>` natif.
Si le lien pointe vers une page du site, il utilise `<Link>` Next.js avec préfixe locale.

## Couleurs de référence

- Corail/Ambre : `#E07A5F` (classe CSS `.corail` dans .prose)
- Bleu nuit : `#1a1a2e`
- Texte principal : `#f8fafc`
- Texte secondaire : `#94a3b8`

## Catégories disponibles

- `outils` : cas d'usage, outils, retours d'expérience
- `reglementation` : AI Act, RGPD, chartes, conformité
- `adoption` : méthode, démarrage, conduite du changement

## SEO et indexation

Les articles sont rédigés pour être lus par un humain, mais ils doivent aussi être trouvables. Quelques règles pour que chaque publication soit indexable dès le premier passage de Google, en particulier pendant les 6 premiers mois du domaine où le crawl budget reste limité.

### Longueur

Viser 1000 à 1500 mots dans le corps MDX (hors frontmatter, hors champs `signal` / `fact` / `action`). En dessous de 800 mots sur un domaine jeune, Google considère souvent que le contenu est trop mince et peut retarder l'indexation de plusieurs semaines, voire classer la page en "Détectée, actuellement non indexée".

### Structure

Un seul h1 (géré par le template, pas à écrire dans le MDX).
3 à 5 h2 minimum, chacun couvrant un angle distinct.
h3 seulement si nécessaire pour subdiviser un h2 dense.
Le premier paragraphe sous le premier h2 doit contenir le mot-clé cible ou une variante proche.

### Meta description

Dans le champ `description` du frontmatter, viser 140 à 160 caractères. Doit contenir le mot-clé cible et une promesse concrète. C'est ce que Google affiche en résultat de recherche, donc c'est aussi le taux de clic.

### Mots-clés

Un seul mot-clé cible par article, plus 2 ou 3 variantes sémantiques. Les caser naturellement dans le titre, la description, le premier h2, et 2 à 3 fois dans le corps. Pas de bourrage.

### Maillage interne

Chaque article doit contenir au minimum 2 liens internes vers d'autres articles du blog, en markdown standard : `[texte du lien](/fr/blog/slug)`. Ces liens aident Google à découvrir et valoriser les autres articles, et ils réduisent le nombre de pages orphelines.

### Publication bilingue

Publier la version FR et la version EN le même jour. Chaque version doit avoir son équivalent dans l'autre langue, avec les mêmes mots-clés traduits et la même structure de h2. Le sitemap remonte automatiquement les deux URLs.

### Actions post-publication (obligatoires)

Après chaque `vercel --prod --yes`, exécuter dans l'ordre :

1. **Vérifier le sitemap** : `curl -s https://www.evidencai.com/sitemap.xml | grep <slug>` doit remonter les 2 URLs (FR et EN) dans les 10 minutes. Si absent, forcer un nouveau build Vercel.
2. **GSC, Inspection d'URL** : coller les 2 URLs dans https://search.google.com/search-console, cliquer "Demander une indexation" pour chacune. Temps : 5 minutes. Effet : mise en file prioritaire de Google, indexation en 24 à 72h au lieu de 2 à 4 semaines en passif.
3. **LinkedIn dans les 24h** : poster un extrait avec le lien direct vers l'article FR. Le lien génère un signal de fraîcheur et, via les comptes qui suivent EvidencAI, accélère la découverte par les crawlers.
4. **Mnemos** : créer un atome `fact` dans l'espace EvidencAI avec l'URL publiée et la date. Permet de vérifier plus tard si l'article a bien été indexé et de tracer l'historique éditorial.

### Référencement local

Quand c'est pertinent (cas client régional, formation locale, événement dans la zone), mentionner explicitement la zone géographique : Drôme, Ardèche, Isère, Rhône, Auvergne-Rhône-Alpes. Cela positionne le contenu sur les requêtes locales et nourrit l'ancrage régional d'EvidencAI (Romans-sur-Isère, Valence, Grenoble, Lyon).

### Données structurées

Le template blog gère déjà le schéma `BlogPosting` JSON-LD automatiquement à partir du frontmatter. Ne rien ajouter manuellement dans le MDX. Si un article a besoin d'un schéma spécifique (`FAQPage`, `HowTo`), en parler avant publication pour l'ajouter au template `src/app/[locale]/blog/[slug]/page.tsx`.

### Domaine canonique

Toutes les URLs publiées et partagées doivent utiliser `https://www.evidencai.com` avec le `www`. Le domaine nu `evidencai.com` redirige en 307 vers `www`, ce qui est un signal ambigu pour Google si on partage des liens sans `www`. Le template `og:url` est déjà aligné, mais attention aux posts LinkedIn et aux mails : toujours copier l'URL finale affichée dans le navigateur.

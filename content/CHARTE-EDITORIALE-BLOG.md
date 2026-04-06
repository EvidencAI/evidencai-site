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

# Charte éditoriale – Publications LinkedIn & Facebook EvidencAI

## Positionnement éditorial

EvidencAI s'adresse à des dirigeants de PME. Pas des techs, pas des early adopters.
Le ton est celui d'un pair qui partage ce qu'il a vu sur le terrain, pas d'un expert qui fait cours.
Chaque publication part d'un fait concret (formation, chiffre, situation vécue) et mène à une prise de conscience ou une action.

## Règles communes aux deux plateformes

### Structure type d'un post

1. **Accroche** (2 premières lignes) : fait marquant, chiffre, ou situation vécue. C'est ce qui s'affiche avant "voir plus". Doit donner envie de cliquer.
2. **Développement** : récit court ou démonstration. Alterner phrases courtes et moyennes. Pas de pavés.
3. **Enseignement** : ce que ça change, pourquoi c'est important.
4. **Appel à l'action** : question ouverte pour susciter les commentaires, ou invitation à lire l'article.

### Ton et style

Écriture directe, en "vous" ou "je" selon le contexte.
Phrases courtes. Rythme. Pas de jargon sans contexte.
On peut raconter une anecdote de formation, citer une réaction de participant.
Pas de posture de sachant. On partage, on ne professe pas.

### Mise en forme

- Utiliser → pour les listes ou les points clés (pas de bullet points classiques).
- **Gras** pour les concepts clés et les chiffres marquants.
- *Italique* pour les citations de participants ou les verbatims.
- Pas de tirets longs (—). Reformuler.
- Pas d'émojis. Jamais.
- Sauts de ligne fréquents : un paragraphe = 1 à 3 phrases max.
- Pas de majuscules pour crier (PAS COMME ÇA).

### Interdits

- Pas de ton corporate ou institutionnel.
- Pas de "nous sommes ravis de vous annoncer".
- Pas de listes de services ou de features produit.
- Pas de posts promotionnels purs. Toujours apporter de la valeur avant de renvoyer vers un lien.
- Pas de hashtags génériques inutiles (#Innovation #Digital #Transformation).

### Visuel

Deux formats générés par publication, optimisés par plateforme :
- **LinkedIn** : 1200 x 1200 px (carré, meilleure présence dans le feed mobile)
- **Facebook** : 1200 x 628 px (paysage, compatible OG card)

Fond bleu nuit (#1a1a2e). Texte blanc. Accent corail (#E07A5F).
Pas de stock photos. Pas de visuels surchargés.
Si screenshot (ex: personae.jpg), le publier tel quel sans l'intégrer dans un template.

**Repères récurrents (obligatoires sur chaque visuel) :**

En haut : "LE SIGNAL IA" (blanc, petites caps) + pastille catégorie en corail (fond corail, texte bleu nuit).
Au centre : titre de l'article (blanc, gros corps) + filet corail + sous-titre/accroche (gris secondaire).
En bas à droite : "EvidencAI" en corail, seul, comme signature sobre. Pas de baseline sur le visuel.

La baseline "pour une IA qui vous améliore, pas qui vous remplace." est utilisée en signature dans le texte des posts (voir section dédiée par plateforme), pas sur le visuel.

### Génération des visuels

Le template HTML interactif est dans `content/templates/social-card.html` (ouvrir dans un navigateur pour prévisualiser).

Le script `content/templates/generate-card.mjs` génère automatiquement **2 PNG** par invocation :
- `linkedin-1200x1200.png` (carré, optimisé feed LinkedIn mobile)
- `facebook-1200x628.png` (paysage, compatible OG card Facebook)

**Usage :**

```bash
cd content/templates
node generate-card.mjs "CATÉGORIE" "Titre" "Sous-titre" "../Social/JJMM_sujet"
```

Le dernier argument est le **dossier de destination** (pas un nom de fichier). Les deux PNG y sont créés automatiquement.

**Exemples :**

```bash
node generate-card.mjs "RÉGLEMENTATION" "Charte IA : 5 règles en une page A4" "Un mémo signable pour cadrer l'usage de l'IA en PME" "../Social/0604_charte"

node generate-card.mjs "FORMATION" "Même question, trois dirigeants" "Ce que les persona IA changent dans la prise de décision" "../Social/0804_personae"
```

## LinkedIn : règles spécifiques

### Algorithme et contraintes

LinkedIn pénalise les posts contenant des liens externes dans le corps du texte (reach divisé par 2 à 5).
Règle absolue : **ne jamais mettre de lien dans le post**. Le lien vers l'article va dans le **premier commentaire**, publié immédiatement après le post.

**Le post doit indiquer explicitement que le lien est en commentaire.** Intégrer une mention naturelle dans le corps du texte ou en fin de post, par exemple : "→ Lien vers l'article en commentaire" ou "Je mets le lien en premier commentaire." Ne pas le cacher : le lecteur doit savoir où trouver le lien sans avoir à le deviner.

### Format du premier commentaire

```
→ Article complet : [URL]
→ Template/ressource en téléchargement libre sur le site.
```

### Ton

Professionnel mais humain. On s'adresse à des pairs, pas à des prospects.
On peut se permettre un récit personnel (formation, situation client) si ça sert le propos.
Pas de tutoiement.

### Longueur

Idéal : 1200 à 1800 caractères. Assez pour raconter, pas assez pour perdre le lecteur.
Les 2 premières lignes sont critiques (affichage avant "voir plus").

### Signature (dernière ligne avant les hashtags)

Toujours terminer le post par la baseline en italique, sur sa propre ligne :

*EvidencAI, pour une IA qui vous améliore, pas qui vous remplace.*

### Hashtags

5 à 7 hashtags en fin de post. Mélanger :
- 2-3 hashtags de niche (#CharteIA, #ShadowAI, #DécideravecIA)
- 2-3 hashtags de volume (#IA, #PME, #Dirigeants)
- 1 hashtag signature : #DécideravecIA (toujours présent)

### Horaire de publication

En semaine, entre 8h et 9h (heure française). Mardi, mercredi ou jeudi idéalement.

## Facebook : règles spécifiques

### Algorithme et contraintes

Facebook ne pénalise pas les liens externes de la même façon. Le lien vers l'article peut figurer dans le corps du post. L'OG card (aperçu du lien) s'affiche automatiquement et sert de visuel.

### Ton

Plus chaleureux que LinkedIn. On peut écrire comme si on racontait quelque chose à un ami curieux.
Le "je" est plus naturel ici. On partage une découverte, un étonnement, un résultat.
On peut exprimer de l'enthousiasme mesuré ("j'ai été bluffé", "les regards ont changé dans la salle").

### Longueur

Plus court que LinkedIn. 800 à 1200 caractères. Facebook récompense la concision et les interactions rapides.

### Signature (dernière ligne avant les hashtags ou le lien)

Même baseline que LinkedIn, en italique :

*EvidencAI, pour une IA qui vous améliore, pas qui vous remplace.*

### Hashtags

1 à 2 maximum, ou aucun. Facebook n'est pas une plateforme de découverte par hashtag.
Si un hashtag est utilisé, c'est #DécideravecIA uniquement (signature).

### Horaire de publication

En semaine : 11h ou 18h-19h. Week-end possible (dimanche soir 20h fonctionne bien).

## Template visuel

### Spécifications

Deux formats par publication :
- **LinkedIn** : 1200 x 1200 px (carré, meilleure visibilité feed mobile)
- **Facebook** : 1200 x 628 px (paysage, compatible OG card)

Fond : bleu nuit #1a1a2e
Texte principal : blanc #f8fafc, police sans-serif (Inter ou système)
Accent : corail #E07A5F (catégorie, filet, mot-clé)
Logo EvidencAI en bas à droite, discret

### Composition du template

```
┌──────────────────────────────────────────┐
│ ▬▬▬▬▬▬▬▬▬▬▬▬▬ filet corail haut ▬▬▬▬▬  │
│                                          │
│   LE SIGNAL IA   [CATÉGORIE]             │
│                  (pastille corail)        │
│                                          │
│   Titre de l'article                     │
│   sur 2 lignes max                       │
│                                          │
│   ─── filet corail fin ───               │
│                                          │
│   Sous-titre ou accroche courte          │
│                                          │
│                            EvidencAI     │
│                            (corail)      │
└──────────────────────────────────────────┘
```

Sobre. Pas de dégradés, pas d'ombres portées, pas d'illustrations.
Le template HTML interactif et le script de génération PNG sont dans `content/templates/`.

### Lisibilité mobile (retour d'expérience)

Les textes doivent être suffisamment gros pour rester lisibles sur un écran de téléphone dans le feed (où le visuel s'affiche en petit). Tailles minimales recommandées sur le canvas 1200px :
- Titre principal : **48px minimum** (idéal 52-56px)
- Sous-titre : **28px minimum** (idéal 30-32px)
- "LE SIGNAL IA" + pastille catégorie : **20px minimum** (idéal 22-24px)
- "EvidencAI" (signature) : **24px minimum**

En cas de doute, afficher le PNG à 50% sur écran et vérifier que tout reste lisible. Si un texte disparaît à cette taille, il est trop petit.

## Workflow de publication

### Pipeline complète pour chaque article de blog

1. **Rédaction blog** : écrire et publier l'article sur le site EvidencAI.
2. **Rédaction posts** : rédiger le post LinkedIn (1200-1800 car.) et le post Facebook (800-1200 car.) selon les règles de chaque plateforme.
3. **Présentation visuel** : générer une prévisualisation du visuel (via le template HTML ou description textuelle) et la soumettre à validation.
4. **Validation** : Stéphane valide le visuel (composition, titre, sous-titre, catégorie).
5. **Génération PNG** : exécuter le script pour produire les 2 formats (LinkedIn 1200x1200 + Facebook 1200x628).
6. **Publication LinkedIn** : en semaine 8h-9h. Poster avec le visuel carré. Ajouter le lien en premier commentaire immédiatement.
7. **Publication Facebook** : en semaine 11h ou 18h-19h. Poster avec le lien dans le corps (l'OG card fait office de visuel, le PNG paysage est en backup).

## Organisation des fichiers

### Structure par date de publication

Chaque publication est regroupée dans un dossier daté sous `content/Social/` :

```
content/Social/
├── 0604_charte/
│   ├── linkedin-charte-ia.md
│   ├── facebook-charte-ia.md
│   ├── linkedin-1200x1200.png
│   └── facebook-1200x628.png
├── 0804_personae/
│   ├── linkedin-post 8 avril.md
│   ├── facebook-post 8 avril.md
│   ├── personae.jpg
│   ├── linkedin-1200x1200.png
│   └── facebook-1200x628.png
└── ...
```

**Convention de nommage des dossiers** : `JJMM_sujet` (jour + mois + underscore + sujet court).
Exemple : `0604_charte`, `0804_personae`, `1504_shadow-ai`.

Chaque dossier contient : les posts LinkedIn et Facebook (.md), les visuels générés (.png), et éventuellement un visuel spécifique (screenshot, photo) si le template n'est pas utilisé.

Les anciens dossiers `content/Link/`, `content/FB/` et `content/visuels/` sont obsolètes. Toute nouvelle publication va dans `content/Social/JJMM_sujet/`.

## Couleurs de référence

- Corail/Ambre : #E07A5F
- Bleu nuit : #1a1a2e
- Texte principal : #f8fafc
- Texte secondaire : #94a3b8

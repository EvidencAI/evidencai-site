# BRIEF ITÉRATION 2 — Page Formation EvidencAI

## Contexte
L'itération 1 est validée sur l'accroche et le visuel (hero, trio, promesse). Il reste 5 corrections à faire.

## 1. Architecture multi-formations

Restructurer pour supporter plusieurs formations :

### Créer le dossier formations (avec S)
- Créer `src/app/[locale]/formations/page.tsx` — page index catalogue
- Déplacer `src/app/[locale]/formation/page.tsx` vers `src/app/[locale]/formations/decider-avec-ia/page.tsx`
- Transformer `src/app/[locale]/formation/page.tsx` en redirect vers `/formations`

### Page index `/fr/formations` (nouvelle)
Structure simple :
- Hero : "Formations IA" / "Des parcours structurés pour passer de la curiosité à la compétence."
- Card formation catalogue : card sur fond-surface avec hover corail, titre "Décider avec l'IA", sous-titre "De l'usage à la maîtrise stratégique", badge "2 jours · Qualiopi", prix "960€ HT", lien vers `/formations/decider-avec-ia`
- Section sur mesure : DÉPLACER la section sur mesure existante ici (elle est commune à toutes les formations)

### Page détail `/fr/formations/decider-avec-ia` (page actuelle modifiée)
Garder tout le contenu actuel (hero, trio, promesse, "l'assistant reste", programme, piliers) PLUS ces corrections :
- Retirer la section sur mesure (déplacée vers index)
- Ajouter section inscription avec dates + formulaire (voir points 3 et 4)

### Redirect `/fr/formation` → `/fr/formations`
Dans `src/app/[locale]/formation/page.tsx`, remplacer le contenu par un redirect :
```tsx
import { redirect } from 'next/navigation';
export default function FormationRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/formations`);
}
```

### Navigation
Dans le header/nav, mettre à jour le lien "Formations" pour pointer vers `/formations` au lieu de `/formation`.
Chercher dans les composants de navigation (probablement `src/components/` ou le layout).

## 2. Titre complet de la formation

Dans le hero de la page détail (`decider-avec-ia/page.tsx`) :
- H1 : "Décider avec l'IA" (IA en corail)  
- Sous le h1, ajouter : `<p className="text-ambre text-lg md:text-xl font-medium mt-2">De l'usage à la maîtrise stratégique</p>`

## 3. Dates des sessions (remettre, visibles)

Ajouter une section "Prochaines sessions" AVANT le formulaire d'inscription, sur fond sombre.
Afficher les 3 sessions en grille (comme avant mais en dark theme, pas en cards blanches) :

```tsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  {dict.formation.catalogue.sessions.items.map((session, i) => (
    <div key={i} className="text-center p-4 bg-fond-surface rounded-lg border border-bleu-subtil">
      <p className="font-semibold text-text-primary">{session.dates}</p>
      <p className="text-sm text-text-secondary">{session.location}</p>
    </div>
  ))}
</div>
```

Les données sont déjà dans fr.json : `formation.catalogue.sessions`.

## 4. Formulaire d'inscription (refaire, PAS en accordéon)

Le formulaire ne doit PAS être dans un accordéon. Le rendre directement visible dans une section dédiée id="inscription".

Structure de la section inscription :
- Label section : "Inscription"
- H2 : "Prochaines sessions"
- Grille des 3 dates (voir point 3)
- Puis le formulaire directement visible, sur fond-surface, pas sur fond blanc
- Le composant FormationInscriptionForm existe déjà, mais il est designé pour fond blanc

OPTION : soit adapter FormationInscriptionForm.tsx pour le dark theme, soit créer le formulaire inline dans la page.
Le formulaire a ces champs (regarder FormationInscriptionForm.tsx pour les champs exacts) :
- Radio : inscription / information
- Select : session souhaitée
- Nom et prénom
- Email professionnel
- Téléphone
- Entreprise
- Message libre
- Bouton submit

Style dark : inputs avec bg-fond-surface, border bleu-subtil, text blanc, placeholder gris. Labels en text-secondary. Bouton submit en bg-ambre.

## 5. Mettre à jour les dictionnaires i18n

Ajouter les nouvelles clés nécessaires dans fr.json ET en.json pour :
- Page index formations (titre, description, card)
- Sous-titre formation "De l'usage à la maîtrise stratégique"
- Section inscription

## 6. Mettre à jour le sitemap et les metadata

- `src/app/sitemap.ts` : ajouter /formations et /formations/decider-avec-ia
- Metadata de la page index formations
- Metadata de la page détail (garder l'existant, ajuster l'URL)

## Ordre d'exécution

1. Créer la structure de dossiers (formations/, formations/decider-avec-ia/)
2. Créer la page index formations
3. Modifier la page détail (titre, dates, formulaire, retirer sur mesure)
4. Adapter le formulaire pour dark theme
5. Créer le redirect /formation → /formations
6. Mettre à jour la navigation (lien header)
7. Mettre à jour fr.json et en.json
8. npm run build

## Règles
- NE PAS casser ce qui marche (hero, trio, promesse, piliers)
- NE PAS toucher à la section sur mesure (juste la déplacer)
- NE PAS hardcoder du texte — i18n
- Tester le build avant de valider

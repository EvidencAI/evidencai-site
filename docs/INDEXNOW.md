# IndexNow — evidencai.com

## Quoi

Protocole ouvert supporté par Bing, Yandex, Seznam et Naver. Permet de notifier ces moteurs quand une URL est publiée ou modifiée, sans attendre le passage du crawler.

Google ne supporte pas IndexNow. Pour Google, passer par Google Search Console (Inspection de l'URL → Demander une indexation).

## Installation sur le site

Le fichier `public/a4ce8bc3463a37f41b5af6724080a973.txt` contient la clé brute, servi à `https://www.evidencai.com/a4ce8bc3463a37f41b5af6724080a973.txt`. Ne pas le supprimer.

La route `POST /api/indexnow` transmet les URLs à l'API IndexNow. Elle est protégée par un secret partagé.

## Configuration Vercel

Ajouter deux variables d'environnement sur le projet Vercel (Production + Preview) :

```
INDEXNOW_KEY     = a4ce8bc3463a37f41b5af6724080a973
INDEXNOW_SECRET  = <générer une chaîne aléatoire longue et la stocker de côté>
```

Redéployer après l'ajout pour que les variables soient injectées.

## Utilisation

### Via le script bash

```bash
export INDEXNOW_SECRET="le-secret"
./scripts/indexnow.sh \
  https://www.evidencai.com/fr/blog/mon-article \
  https://www.evidencai.com/en/blog/my-article
```

### Via curl directement

```bash
curl -X POST https://www.evidencai.com/api/indexnow \
  -H "Content-Type: application/json" \
  -H "x-indexnow-secret: $INDEXNOW_SECRET" \
  -d '{"urls":["https://www.evidencai.com/fr/blog/mon-article"]}'
```

## Quand l'appeler

À chaque publication ou modification substantielle d'un contenu indexable :

- Nouvel article de blog (FR et EN)
- Nouvelle page formation ou atelier
- Refonte d'une page existante

Une réponse `202 Accepted` signifie que la notification a été prise en compte (vérification de la clé en cours côté IndexNow).

## Réponse de la route

```json
{
  "indexnow_status": 202,
  "indexnow_body": "",
  "submitted": 2,
  "host": "www.evidencai.com"
}
```

Codes d'erreur habituels IndexNow : 400 (URL invalide), 403 (clé introuvable), 422 (host incohérent).

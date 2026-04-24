#!/usr/bin/env bash
# Notifier Bing/Yandex via IndexNow après publication/modification d'URLs.
#
# Usage :
#   INDEXNOW_SECRET=xxx ./scripts/indexnow.sh \
#     https://www.evidencai.com/fr/blog/mon-article \
#     https://www.evidencai.com/en/blog/my-article
#
# Pré-requis : variable d'environnement INDEXNOW_SECRET (identique à celle
# configurée sur Vercel). Google n'utilise pas IndexNow, passer par GSC pour
# forcer l'indexation Google.

set -euo pipefail

if [ -z "${INDEXNOW_SECRET:-}" ]; then
  echo "Erreur : INDEXNOW_SECRET n'est pas défini dans l'environnement." >&2
  exit 1
fi

if [ "$#" -eq 0 ]; then
  echo "Usage : $0 <url1> [url2 ...]" >&2
  exit 1
fi

# Construit le tableau JSON d'URLs.
urls_json=$(printf '%s\n' "$@" | jq -R . | jq -s .)

payload=$(jq -n --argjson urls "$urls_json" '{urls: $urls}')

curl -sS -X POST "https://www.evidencai.com/api/indexnow" \
  -H "Content-Type: application/json" \
  -H "x-indexnow-secret: ${INDEXNOW_SECRET}" \
  -d "$payload" | jq .

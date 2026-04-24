import { NextResponse } from 'next/server';

/**
 * IndexNow API route
 *
 * Protocole IndexNow supporté par Bing, Yandex, Seznam, Naver.
 * Permet de notifier ces moteurs quand une URL est publiée ou modifiée,
 * au lieu d'attendre que le crawler passe.
 *
 * Google ne supporte pas IndexNow (faire GSC manuel pour Google).
 *
 * Usage :
 *   curl -X POST https://www.evidencai.com/api/indexnow \
 *     -H "Content-Type: application/json" \
 *     -H "x-indexnow-secret: $INDEXNOW_SECRET" \
 *     -d '{"urls":["https://www.evidencai.com/fr/blog/mon-article"]}'
 *
 * Variables d'environnement requises :
 *   INDEXNOW_KEY    : a4ce8bc3463a37f41b5af6724080a973
 *   INDEXNOW_SECRET : secret partagé pour protéger l'endpoint
 */

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const HOST = 'www.evidencai.com';
const KEY = process.env.INDEXNOW_KEY || 'a4ce8bc3463a37f41b5af6724080a973';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

export async function POST(request: Request) {
  // Protection par secret partagé
  const secret = request.headers.get('x-indexnow-secret');
  if (!process.env.INDEXNOW_SECRET || secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { urls?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const urls = Array.isArray(body.urls) ? body.urls : [];
  if (urls.length === 0) {
    return NextResponse.json({ error: 'No URLs provided' }, { status: 400 });
  }

  // Valide que toutes les URLs sont bien sur notre domaine
  const invalid = urls.filter((u) => {
    try {
      const parsed = new URL(u);
      return parsed.host !== HOST;
    } catch {
      return true;
    }
  });
  if (invalid.length > 0) {
    return NextResponse.json(
      { error: 'URLs must be on ' + HOST, invalid },
      { status: 400 }
    );
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    return NextResponse.json(
      {
        indexnow_status: response.status,
        indexnow_body: text || null,
        submitted: urls.length,
        host: HOST,
      },
      { status: response.ok ? 200 : 502 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'IndexNow request failed', detail: String(err) },
      { status: 502 }
    );
  }
}

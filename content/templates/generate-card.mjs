import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- USAGE ---
// node generate-card.mjs "CATÉGORIE" "Titre" "Sous-titre" "../Social/0604_charte"
// Génère 2 fichiers dans le dossier cible :
//   - linkedin-1200x1200.png (carré, feed natif LinkedIn)
//   - facebook-1200x628.png  (paysage, OG card Facebook)

const config = {
  category: process.argv[2] || 'RÉGLEMENTATION',
  title: process.argv[3] || 'Charte IA : 5 règles\nen une page A4',
  subtitle: process.argv[4] || "Un mémo signable pour cadrer l'usage de l'IA en PME",
  outputDir: process.argv[5] || '../visuels'
};

const formats = [
  { name: 'linkedin-1200x1200.png', width: 1200, height: 1200 },
  { name: 'facebook-1200x628.png',  width: 1200, height: 628  },
];
function buildHTML(width, height) {
  // Adapter le padding et les tailles selon le format
  const isSquare = height > 800;
  const padV = isSquare ? 120 : 80;
  const padH = 100;
  const titleSize = isSquare ? 56 : 48;
  const subSize = isSquare ? 30 : 28;
  const brandBottom = isSquare ? 50 : 36;

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${width}px; height: ${height}px;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
    background: #1a1a2e;
    display: flex; flex-direction: column; justify-content: center;
    padding: ${padV}px ${padH}px;
    position: relative; overflow: hidden;
  }
  .accent-line {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 4px;
    background: linear-gradient(90deg, #E07A5F 0%, #E07A5F 30%, transparent 100%);
  }
  .header {
    position: absolute; top: 28px; left: ${padH}px; right: ${padH}px;
    display: flex; align-items: center; gap: 20px;
  }
  .series-name {
    font-size: 22px; font-weight: 600;
    color: #f8fafc; letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .badge {
    font-size: 15px; font-weight: 700;
    color: #1a1a2e; background: #E07A5F;
    padding: 6px 18px; border-radius: 20px;
    text-transform: uppercase; letter-spacing: 0.1em;
  }
  .title {
    font-size: ${titleSize}px; font-weight: 700;
    line-height: 1.15; color: #f8fafc;
    margin-bottom: 28px; max-width: 900px;
    white-space: pre-line;
  }
  .separator {
    width: 80px; height: 3px;
    background: #E07A5F; margin-bottom: 28px;
  }
  .subtitle {
    font-size: ${subSize}px; font-weight: 400;
    color: #94a3b8; line-height: 1.4; max-width: 750px;
  }
  .brand {
    position: absolute; bottom: ${brandBottom}px; right: 60px;
    font-size: 26px; font-weight: 700;
    color: #E07A5F; letter-spacing: 0.05em;
  }
</style></head>
<body>
  <div class="accent-line"></div>
  <div class="header">
    <span class="series-name">Le Signal IA</span>
    <span class="badge">${config.category}</span>
  </div>
  <div class="title">${config.title}</div>
  <div class="separator"></div>
  <div class="subtitle">${config.subtitle}</div>
  <div class="brand">EvidencAI</div>
</body></html>`;
}

async function generate() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  for (const fmt of formats) {
    const page = await browser.newPage();
    await page.setViewport({ width: fmt.width, height: fmt.height });
    await page.setContent(buildHTML(fmt.width, fmt.height), { waitUntil: 'domcontentloaded' });
    const outputPath = resolve(__dirname, config.outputDir, fmt.name);
    await page.screenshot({ path: outputPath, type: 'png' });
    await page.close();
    console.log(`✅ ${fmt.name} → ${outputPath}`);
  }

  await browser.close();
}

generate().catch(err => { console.error('Erreur:', err); process.exit(1); });
/**
 * Gera grids visuais (PNG) com as miniaturas dos produtos cadastrados nesta
 * sessao, agrupados por nome+categoria. Cada grid mostra o id + nome atual
 * sobre cada miniatura para facilitar a validacao manual de cor/tipo.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const OUT = path.resolve(__dirname, "..", "tmp_validation");
fs.mkdirSync(OUT, { recursive: true });

const products = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "..", "tmp_session_products.json"), "utf-8"),
);

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

const THUMB = 220;
const PADDING = 8;
const LABEL_H = 36;
const COLS = 6;
const HEADER_H = 60;
const BG = { r: 245, g: 245, b: 245, alpha: 1 };

async function makeGrid(key, items) {
  console.log(`\n>> ${key} (${items.length})`);
  const thumbs = [];
  for (const it of items) {
    try {
      const buf = await fetchBuffer(it.image_url);
      const t = await sharp(buf)
        .resize(THUMB, THUMB, { fit: "cover" })
        .png()
        .toBuffer();
      thumbs.push({ it, buf: t });
      process.stdout.write(".");
    } catch (e) {
      console.error(`   ERR id=${it.it?.id || it.id}: ${e.message}`);
    }
  }
  process.stdout.write("\n");

  const cols = Math.min(COLS, thumbs.length);
  const rows = Math.ceil(thumbs.length / cols);
  const cellW = THUMB + PADDING * 2;
  const cellH = THUMB + PADDING + LABEL_H;
  const W = cellW * cols;
  const H = HEADER_H + cellH * rows;

  const composites = [];
  for (let i = 0; i < thumbs.length; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const x = c * cellW + PADDING;
    const y = HEADER_H + r * cellH + PADDING;
    composites.push({ input: thumbs[i].buf, left: x, top: y });

    const label = `id ${thumbs[i].it.id}`;
    const svg = Buffer.from(
      `<svg width="${THUMB}" height="${LABEL_H}" xmlns="http://www.w3.org/2000/svg">
         <rect width="100%" height="100%" fill="white"/>
         <text x="${THUMB / 2}" y="22" font-size="18" font-family="Arial" fill="#000" text-anchor="middle">${label}</text>
       </svg>`,
    );
    composites.push({
      input: svg,
      left: x,
      top: HEADER_H + r * cellH + PADDING + THUMB,
    });
  }

  const headerSvg = Buffer.from(
    `<svg width="${W}" height="${HEADER_H}" xmlns="http://www.w3.org/2000/svg">
       <rect width="100%" height="100%" fill="#222"/>
       <text x="20" y="38" font-size="24" font-family="Arial" fill="#fff">${key}</text>
     </svg>`,
  );
  composites.push({ input: headerSvg, left: 0, top: 0 });

  const out = await sharp({
    create: { width: W, height: H, channels: 4, background: BG },
  })
    .composite(composites)
    .png()
    .toBuffer();

  const safe = key.replace(/[^a-zA-Z0-9_]+/g, "_");
  const file = path.join(OUT, `${safe}.png`);
  fs.writeFileSync(file, out);
  console.log(`   -> ${file} (${(out.length / 1024).toFixed(0)} KB)`);
}

(async () => {
  const groups = {};
  for (const p of products) {
    const key = `${p.category} | ${p.name}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  }

  for (const key of Object.keys(groups).sort()) {
    await makeGrid(key, groups[key]);
  }

  console.log(`\nGrids salvos em ${OUT}`);
})();

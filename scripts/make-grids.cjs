/**
 * Para cada categoria, cria grades visuais (PNG) com varias imagens
 * lado a lado, cada uma com o ID sobreposto, para inspecao em massa.
 * Saida: tmp_check/grids/{categoria}-{lote}.png
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const TMP = path.resolve(__dirname, "..", "tmp_check");
const GRIDS = path.join(TMP, "grids");
if (!fs.existsSync(GRIDS)) fs.mkdirSync(GRIDS, { recursive: true });

const index = JSON.parse(fs.readFileSync(path.join(TMP, "_index.json"), "utf8"));

const COLS = 4;
const ROWS = 4;
const CELL = 220;
const PAD = 6;
const LABEL_H = 28;

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function makeCell(p) {
  const imgPath = path.join(TMP, `p-${String(p.id).padStart(4, "0")}.png`);
  if (!fs.existsSync(imgPath)) return null;
  const innerH = CELL - LABEL_H;
  const baseImg = await sharp(imgPath)
    .resize(CELL, innerH, { fit: "contain", background: { r: 240, g: 240, b: 240 } })
    .png()
    .toBuffer();

  const label = `${p.id} - ${p.name}`.slice(0, 36);
  const svg = Buffer.from(`<?xml version="1.0"?>
<svg width="${CELL}" height="${CELL}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="${innerH}" width="${CELL}" height="${LABEL_H}" fill="#111" />
  <text x="6" y="${innerH + 19}" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#fff">${escapeXml(
    label,
  )}</text>
</svg>`);

  const idBadge = Buffer.from(`<?xml version="1.0"?>
<svg width="60" height="22" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="60" height="22" fill="rgba(255,0,0,0.85)" rx="4"/>
  <text x="6" y="16" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#fff">#${p.id}</text>
</svg>`);

  const composed = await sharp({
    create: {
      width: CELL,
      height: CELL,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([
      { input: baseImg, top: 0, left: 0 },
      { input: svg, top: 0, left: 0 },
      { input: idBadge, top: 4, left: 4 },
    ])
    .png()
    .toBuffer();

  return composed;
}

async function makeGrid(items, outPath) {
  const cols = COLS;
  const rows = Math.ceil(items.length / cols);
  const W = cols * CELL + (cols + 1) * PAD;
  const H = rows * CELL + (rows + 1) * PAD;
  const composites = [];
  for (let i = 0; i < items.length; i++) {
    const cell = await makeCell(items[i]);
    if (!cell) continue;
    const r = Math.floor(i / cols);
    const c = i % cols;
    composites.push({
      input: cell,
      top: PAD + r * (CELL + PAD),
      left: PAD + c * (CELL + PAD),
    });
  }
  await sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: { r: 30, g: 30, b: 30 },
    },
  })
    .composite(composites)
    .png({ quality: 80 })
    .toFile(outPath);
}

(async () => {
  const byCategory = {};
  for (const p of index) {
    if (!byCategory[p.category]) byCategory[p.category] = [];
    byCategory[p.category].push(p);
  }
  const cats = Object.keys(byCategory).sort();
  console.log("Categorias:", cats.length);

  const PAGE = COLS * ROWS;
  for (const cat of cats) {
    const items = byCategory[cat];
    const lotes = Math.ceil(items.length / PAGE);
    for (let i = 0; i < lotes; i++) {
      const slice = items.slice(i * PAGE, (i + 1) * PAGE);
      const outName = `${cat}-${String(i + 1).padStart(2, "0")}.png`;
      const outPath = path.join(GRIDS, outName);
      await makeGrid(slice, outPath);
      console.log("OK", outName, "(" + slice.length + " imagens)");
    }
  }
  console.log("Done.");
})();

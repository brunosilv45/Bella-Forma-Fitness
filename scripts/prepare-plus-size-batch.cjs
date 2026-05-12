/**
 * Copia as 53 imagens novas para tmp_plus/p-001.png ... p-053.png
 * e gera grades de inspecao com indice.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const OUT_DIR = path.resolve(__dirname, "..", "tmp_plus");
const GRID_DIR = path.join(OUT_DIR, "grids");
fs.mkdirSync(GRID_DIR, { recursive: true });

const localFiles = fs
  .readdirSync(OUT_DIR)
  .filter((f) => /^p-\d{3}\.png$/.test(f))
  .sort();
console.log("Encontradas locais:", localFiles.length);

const mapping = localFiles.map((f) => ({
  index: parseInt(f.match(/p-(\d{3})\.png/)[1], 10),
  file: f,
}));

(async () => {

  // gerar grades 4x4 com indice destacado
  const COLS = 4;
  const ROWS = 4;
  const CELL = 260;
  const PAD = 8;
  const LABEL = 32;
  const PAGE = COLS * ROWS;

  function escapeXml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  async function makeCell(item) {
    const imgPath = path.join(OUT_DIR, `p-${String(item.index).padStart(3, "0")}.png`);
    const innerH = CELL - LABEL;
    const baseImg = await sharp(imgPath)
      .resize(CELL, innerH, { fit: "contain", background: { r: 240, g: 240, b: 240 } })
      .png()
      .toBuffer();
    const lbl = `#${item.index}`;
    const svg = Buffer.from(`<?xml version="1.0"?>
<svg width="${CELL}" height="${CELL}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="${innerH}" width="${CELL}" height="${LABEL}" fill="#111"/>
  <text x="8" y="${innerH + 23}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff">${escapeXml(lbl)}</text>
</svg>`);
    const badge = Buffer.from(`<?xml version="1.0"?>
<svg width="70" height="30" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="70" height="30" fill="rgba(220,30,30,0.95)" rx="6"/>
  <text x="8" y="22" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff">#${item.index}</text>
</svg>`);
    return sharp({
      create: { width: CELL, height: CELL, channels: 3, background: { r: 255, g: 255, b: 255 } },
    })
      .composite([
        { input: baseImg, top: 0, left: 0 },
        { input: svg, top: 0, left: 0 },
        { input: badge, top: 6, left: 6 },
      ])
      .png()
      .toBuffer();
  }

  const lotes = Math.ceil(mapping.length / PAGE);
  for (let i = 0; i < lotes; i++) {
    const slice = mapping.slice(i * PAGE, (i + 1) * PAGE);
    const rows = Math.ceil(slice.length / COLS);
    const W = COLS * CELL + (COLS + 1) * PAD;
    const H = rows * CELL + (rows + 1) * PAD;
    const composites = [];
    for (let j = 0; j < slice.length; j++) {
      const cell = await makeCell(slice[j]);
      const r = Math.floor(j / COLS);
      const c = j % COLS;
      composites.push({
        input: cell,
        top: PAD + r * (CELL + PAD),
        left: PAD + c * (CELL + PAD),
      });
    }
    const out = path.join(GRID_DIR, `lote-${String(i + 1).padStart(2, "0")}.png`);
    await sharp({
      create: { width: W, height: H, channels: 3, background: { r: 30, g: 30, b: 30 } },
    })
      .composite(composites)
      .png()
      .toFile(out);
    console.log("OK", path.basename(out), `(${slice.length} imagens)`);
  }
  console.log("Done.");
})();

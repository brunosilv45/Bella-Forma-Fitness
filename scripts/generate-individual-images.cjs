/**
 * Gera uma imagem individual (480x640) com label por produto, agrupada em
 * subpastas por categoria. Permite analise visual mais cuidadosa quando o
 * grid pequeno fica ambiguo.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const OUT = path.resolve(__dirname, "..", "tmp_validation", "individual");
fs.mkdirSync(OUT, { recursive: true });

const products = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "..", "tmp_session_products.json"), "utf-8"),
);

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

const W = 480;
const H = 640;
const LABEL_H = 56;

(async () => {
  for (const p of products) {
    const safe = p.category.replace(/[^a-zA-Z0-9_]+/g, "_");
    const subdir = path.join(OUT, safe);
    fs.mkdirSync(subdir, { recursive: true });
    const out = path.join(subdir, `${p.id}.png`);
    if (fs.existsSync(out)) continue;
    try {
      const buf = await fetchBuffer(p.image_url);
      const img = await sharp(buf).resize(W, H - LABEL_H, { fit: "cover" }).png().toBuffer();
      const safeName = p.name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const svg = Buffer.from(
        `<svg width="${W}" height="${LABEL_H}" xmlns="http://www.w3.org/2000/svg">
           <rect width="100%" height="100%" fill="#fff"/>
           <text x="14" y="22" font-size="16" font-family="Arial" fill="#000">id ${p.id}  |  ${p.category}</text>
           <text x="14" y="44" font-size="18" font-family="Arial" fill="#06c" font-weight="bold">${safeName}</text>
         </svg>`,
      );
      const composed = await sharp({
        create: { width: W, height: H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
      })
        .composite([
          { input: img, left: 0, top: 0 },
          { input: svg, left: 0, top: H - LABEL_H },
        ])
        .png()
        .toBuffer();
      fs.writeFileSync(out, composed);
      process.stdout.write(".");
    } catch (e) {
      console.error(`\nERR id=${p.id}: ${e.message}`);
    }
  }
  console.log(`\nIndividual images em ${OUT}`);
})();

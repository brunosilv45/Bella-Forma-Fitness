/**
 * Baixa todas as imagens de produtos do Supabase, converte para PNG
 * em miniatura (300px) e salva em tmp_check com nomes p-{id}.png
 * Tambem gera tmp_check/_index.json com {id, category, name, image_path}.
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NjU1OTgsImV4cCI6MjA5MjI0MTU5OH0.PookUbdOMK7fRG4ZMadSamQR64jPKkPoUKYio8zJrDA";

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public/product-images`;
const OUT_DIR = path.resolve(__dirname, "..", "tmp_check");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });
    req.on("error", reject);
    req.setTimeout(30000, () => req.destroy(new Error("timeout")));
  });
}

async function processOne(p) {
  const outName = `p-${String(p.id).padStart(4, "0")}.png`;
  const outPath = path.join(OUT_DIR, outName);
  if (fs.existsSync(outPath)) return { ok: true, cached: true };
  if (!p.image_path) return { ok: false, error: "no image_path" };
  const url = `${STORAGE_BASE}/${p.image_path}`;
  try {
    const buf = await fetchBuffer(url);
    const png = await sharp(buf).resize(300).png({ quality: 70 }).toBuffer();
    fs.writeFileSync(outPath, png);
    return { ok: true, cached: false };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

(async () => {
  const { data, error } = await sb
    .from("products")
    .select("id, category, name, image_path")
    .order("category")
    .order("id");
  if (error) {
    console.error(error);
    return;
  }
  fs.writeFileSync(
    path.join(OUT_DIR, "_index.json"),
    JSON.stringify(data, null, 2),
  );

  console.log("Total:", data.length);
  const CONCURRENCY = 16;
  let done = 0,
    err = 0,
    cached = 0;
  const queue = [...data];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const p = queue.shift();
      const r = await processOne(p);
      if (!r.ok) {
        err++;
        console.error("ERR id=" + p.id, p.image_path, r.error);
      } else if (r.cached) {
        cached++;
      } else {
        done++;
        if (done % 25 === 0) console.log(`progresso: ${done} novas baixadas`);
      }
    }
  });
  await Promise.all(workers);
  console.log(`Done. baixadas=${done} cached=${cached} erros=${err}`);
})();

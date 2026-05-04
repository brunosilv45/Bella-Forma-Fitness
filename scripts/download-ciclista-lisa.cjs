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
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

(async () => {
  const { data, error } = await sb
    .from("products")
    .select("id, name, image_path")
    .eq("category", "ciclista_lisa")
    .order("id");
  if (error) {
    console.error(error);
    return;
  }
  console.log("Baixando", data.length, "imagens...");
  for (const p of data) {
    const url = `${STORAGE_BASE}/${p.image_path}`;
    const outName = `cl-${String(p.id).padStart(3, "0")}.png`;
    const outPath = path.join(OUT_DIR, outName);
    if (fs.existsSync(outPath)) continue;
    try {
      const buf = await fetchBuffer(url);
      const png = await sharp(buf).resize(400).png().toBuffer();
      fs.writeFileSync(outPath, png);
      console.log("OK", p.id, "->", outName);
    } catch (e) {
      console.error("ERR", p.id, e.message);
    }
  }
  console.log("Done.");
})();

/**
 * Faz upload de 6 novas fotos de Top Regata Azul Claro para o Supabase
 * Storage e cadastra cada uma como produto na tabela `products`,
 * categoria `top_regata`.
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const BUCKET = "product-images";
const TMP = path.resolve(__dirname, "..", "tmp_top_regata");

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const ITEMS = Array.from({ length: 6 }, (_, i) => ({
  index: i + 1,
  category: "top_regata",
  name: "Top Regata Azul Claro",
}));

async function uploadOne(item) {
  const localPath = path.join(TMP, `t-${String(item.index).padStart(3, "0")}.png`);
  if (!fs.existsSync(localPath)) {
    throw new Error("Imagem nao encontrada: " + localPath);
  }
  const buf = fs.readFileSync(localPath);
  const ts = Date.now();
  const storagePath = `top_regata/${ts}-top-regata-azul-claro-${String(item.index).padStart(3, "0")}.png`;

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buf, { contentType: "image/png", upsert: false });
  if (upErr) throw new Error("Storage: " + upErr.message);

  const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;

  const { data, error: insErr } = await supabase
    .from("products")
    .insert({
      name: item.name,
      category: item.category,
      description: "",
      image_path: storagePath,
      image_url: imageUrl,
    })
    .select()
    .single();
  if (insErr) throw new Error("DB: " + insErr.message);

  return data;
}

(async () => {
  console.log(`Enviando ${ITEMS.length} novas fotos de Top Regata Azul Claro...\n`);
  let ok = 0;
  let err = 0;
  for (const item of ITEMS) {
    try {
      const prod = await uploadOne(item);
      console.log(`  OK #${item.index} -> id=${prod.id} "${prod.name}"`);
      ok++;
      await new Promise((r) => setTimeout(r, 5));
    } catch (e) {
      console.error(`  ERRO #${item.index}: ${e.message}`);
      err++;
    }
  }
  console.log(`\nResultado: ${ok} adicionados, ${err} erros.`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

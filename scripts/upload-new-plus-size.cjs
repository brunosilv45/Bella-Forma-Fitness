/**
 * Faz upload de 52 novas imagens plus size (das 53 enviadas: a #20 e' guia
 * de medidas e foi descartada) para o Supabase storage e cadastra cada uma
 * como produto na tabela `products`.
 *
 * Classificacao baseada em inspecao visual (modelo plus + categoria).
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const BUCKET = "product-images";
const TMP_PLUS = path.resolve(__dirname, "..", "tmp_plus");

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

/**
 * Cada entrada: { index, category, name }
 * index = numero da imagem em tmp_plus/p-XXX.png (1..53)
 * Imagem #20 omitida (guia de medidas).
 */
const ITEMS = [
  { index: 1, category: "plus_size_regata", name: "Plus Size Regata Rosa Pink" },
  { index: 2, category: "plus_size_ciclista", name: "Plus Size Ciclista Preta" },
  { index: 3, category: "plus_size_regata", name: "Plus Size Regata Verde Tiffany" },
  { index: 4, category: "plus_size_regata", name: "Plus Size Regata Verde Tiffany" },
  { index: 5, category: "plus_size_blusa", name: "Plus Size Blusa Telha" },
  { index: 6, category: "plus_size_calca", name: "Plus Size Calça Azul Marinho" },
  { index: 7, category: "plus_size_blusa", name: "Plus Size Blusa Roxa" },
  { index: 8, category: "plus_size_blusa", name: "Plus Size Blusa Telha" },
  { index: 9, category: "plus_size_regata", name: "Plus Size Regata Rosa Pink" },
  { index: 10, category: "plus_size_top", name: "Plus Size Top Telha" },
  { index: 11, category: "plus_size_regata", name: "Plus Size Regata Rosa Pink" },
  { index: 12, category: "plus_size_top", name: "Plus Size Top Preto" },
  { index: 13, category: "plus_size_ciclista", name: "Plus Size Ciclista Roxa" },
  { index: 14, category: "plus_size_ciclista", name: "Plus Size Ciclista Roxa" },
  { index: 15, category: "plus_size_top", name: "Plus Size Top Preto" },
  { index: 16, category: "plus_size_calca", name: "Plus Size Calça Azul Marinho" },
  { index: 17, category: "plus_size_ciclista", name: "Plus Size Ciclista Preta" },
  { index: 18, category: "plus_size_calca", name: "Plus Size Calça Telha" },
  { index: 19, category: "plus_size_calca", name: "Plus Size Calça Telha" },
  // index 20 descartado (guia de medidas)
  { index: 21, category: "plus_size_blusa", name: "Plus Size Blusa Telha" },
  { index: 22, category: "plus_size_blusa", name: "Plus Size Blusa Telha" },
  { index: 23, category: "plus_size_top", name: "Plus Size Top Preto" },
  { index: 24, category: "plus_size_blusa", name: "Plus Size Blusa Roxa" },
  { index: 25, category: "plus_size_top", name: "Plus Size Top Telha" },
  { index: 26, category: "plus_size_top", name: "Plus Size Top Telha" },
  { index: 27, category: "plus_size_top", name: "Plus Size Top Azul Marinho" },
  { index: 28, category: "plus_size_top", name: "Plus Size Top Preto" },
  { index: 29, category: "plus_size_top", name: "Plus Size Top Preto" },
  { index: 30, category: "plus_size_top", name: "Plus Size Top Telha" },
  { index: 31, category: "plus_size_top", name: "Plus Size Top Azul Marinho" },
  { index: 32, category: "plus_size_top", name: "Plus Size Top Azul Marinho" },
  { index: 33, category: "plus_size_top", name: "Plus Size Top Preto" },
  { index: 34, category: "plus_size_top", name: "Plus Size Top Preto" },
  { index: 35, category: "plus_size_top", name: "Plus Size Top Azul Marinho" },
  { index: 36, category: "plus_size_blusa", name: "Plus Size Blusa Roxa" },
  { index: 37, category: "plus_size_regata", name: "Plus Size Regata Verde Tiffany" },
  { index: 38, category: "plus_size_blusa", name: "Plus Size Blusa Telha" },
  { index: 39, category: "plus_size_blusa", name: "Plus Size Blusa Telha" },
  { index: 40, category: "plus_size_top", name: "Plus Size Top Roxo" },
  { index: 41, category: "plus_size_regata", name: "Plus Size Regata Verde Tiffany" },
  { index: 42, category: "plus_size_blusa", name: "Plus Size Blusa Telha" },
  { index: 43, category: "plus_size_regata", name: "Plus Size Regata Rosa Pink" },
  { index: 44, category: "plus_size_regata", name: "Plus Size Regata Verde Tiffany" },
  { index: 45, category: "plus_size_top", name: "Plus Size Top Telha" },
  { index: 46, category: "plus_size_blusa", name: "Plus Size Blusa Roxa" },
  { index: 47, category: "plus_size_top", name: "Plus Size Top Azul Marinho" },
  { index: 48, category: "plus_size_blusa", name: "Plus Size Blusa Roxa" },
  { index: 49, category: "plus_size_top", name: "Plus Size Top Roxo" },
  { index: 50, category: "plus_size_top", name: "Plus Size Top Roxo" },
  { index: 51, category: "plus_size_regata", name: "Plus Size Regata Rosa Pink" },
  { index: 52, category: "plus_size_top", name: "Plus Size Top Roxo" },
  { index: 53, category: "plus_size_regata", name: "Plus Size Regata Rosa Pink" },
];

async function uploadOne(item) {
  const localPath = path.join(TMP_PLUS, `p-${String(item.index).padStart(3, "0")}.png`);
  if (!fs.existsSync(localPath)) {
    throw new Error("Imagem nao encontrada: " + localPath);
  }
  const buf = fs.readFileSync(localPath);
  const ts = Date.now();
  const storagePath = `plus_size/${ts}-plus-${String(item.index).padStart(3, "0")}.png`;

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

async function main() {
  console.log(`Enviando ${ITEMS.length} novos produtos plus size...\n`);
  let ok = 0;
  let err = 0;
  const summary = {};
  for (const item of ITEMS) {
    try {
      const prod = await uploadOne(item);
      summary[item.category] = (summary[item.category] || 0) + 1;
      console.log(`  OK #${item.index} -> id=${prod.id} [${item.category}] "${item.name}"`);
      ok++;
      await new Promise((r) => setTimeout(r, 5));
    } catch (e) {
      console.error(`  ERRO #${item.index}: ${e.message}`);
      err++;
    }
  }
  console.log(`\nResultado: ${ok} adicionados, ${err} erros.`);
  console.log("Por categoria:", summary);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

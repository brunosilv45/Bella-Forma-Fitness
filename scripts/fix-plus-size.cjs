/**
 * Limpeza completa dos produtos Plus Size:
 *  - Corrige nomes que nao batem com a foto (cor errada).
 *  - Remove duplicatas (banco + arquivos no storage).
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const BUCKET = "product-images";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const RENAMES = {
  7: "Plus Size Blusa Branca",
  8: "Plus Size Top Azul Marinho",
  9: "Plus Size Regata Preta",
  11: "Plus Size Regata Verde Limão",
  15: "Plus Size Ciclista Preta",
  18: "Plus Size Blusa Verde Limão",
  24: "Plus Size Calça Preta",
  25: "Plus Size Ciclista Preta",
  26: "Plus Size Regata Vermelha",
};

const DELETIONS = [
  { id: 22, motivo: "duplicata byte-identica de id 7 (branca)" },
  { id: 20, motivo: "duplicata byte-identica de id 9 (preta)" },
  { id: 28, motivo: "duplicata byte-identica de id 18 (verde limao)" },
  { id: 27, motivo: "duplicata byte-identica de id 19 (azul claro)" },
  { id: 10, motivo: "mesmo produto que id 11 (verde limao - costas)" },
  { id: 16, motivo: "mesmo produto que id 11 (verde limao - frente)" },
  { id: 17, motivo: "mesmo produto que id 11 (verde limao - costas)" },
  { id: 23, motivo: "duplicata visual de id 21 (fucsia)" },
];

async function renomeia() {
  console.log("\n[1] Corrigindo nomes...\n");
  let ok = 0;
  for (const [idStr, novoNome] of Object.entries(RENAMES)) {
    const id = Number(idStr);
    const { data: atual } = await supabase
      .from("products")
      .select("name")
      .eq("id", id)
      .single();

    if (!atual) {
      console.error(`  Produto id=${id} nao encontrado.`);
      continue;
    }

    const { error } = await supabase
      .from("products")
      .update({ name: novoNome })
      .eq("id", id);

    if (error) {
      console.error(`  ERRO id=${id}: ${error.message}`);
      continue;
    }
    console.log(`  OK id=${id}: "${atual.name}" -> "${novoNome}"`);
    ok++;
  }
  console.log(`\nNomes alterados: ${ok}/${Object.keys(RENAMES).length}`);
}

async function deleta() {
  console.log("\n[2] Deletando duplicatas (banco + storage)...\n");

  let ok = 0;
  for (const item of DELETIONS) {
    const { data: prod, error: fetchErr } = await supabase
      .from("products")
      .select("id, name, image_path")
      .eq("id", item.id)
      .single();

    if (fetchErr || !prod) {
      console.error(`  id=${item.id} nao encontrado: ${fetchErr?.message}`);
      continue;
    }

    if (prod.image_path) {
      const { error: stoErr } = await supabase.storage
        .from(BUCKET)
        .remove([prod.image_path]);
      if (stoErr) {
        console.error(`  AVISO storage id=${item.id}: ${stoErr.message}`);
      }
    }

    const { error: dbErr } = await supabase
      .from("products")
      .delete()
      .eq("id", item.id);

    if (dbErr) {
      console.error(`  ERRO db id=${item.id}: ${dbErr.message}`);
      continue;
    }

    console.log(
      `  OK id=${item.id} "${prod.name}" deletado (${item.motivo})`,
    );
    ok++;
  }
  console.log(`\nDeletados: ${ok}/${DELETIONS.length}`);
}

async function main() {
  await renomeia();
  await deleta();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

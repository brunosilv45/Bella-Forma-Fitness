/**
 * Corrige nomes de produtos da categoria ciclista_lisa para corresponder
 * a cor real visivel na imagem. Tambem deleta uma imagem comparativa
 * (com 2 produtos) que nao deveria estar como produto unico.
 *
 * Mapeamento baseado em inspecao visual de cada uma das 39 imagens.
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const BUCKET = "product-images";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// id -> novo nome (apenas IDs cujo nome no banco nao bate com a foto)
const RENAMES = {
  // Primeira leva (354-370): rotuladas como "Chumbo", "Rosa Bebe", "Verde Musgo",
  // "Nude", "Bege" e "Roxo Escuro", mas sao na verdade pretas, cinza mescla, etc.
  354: "Ciclista Lisa Preta",
  355: "Ciclista Lisa Preta",
  356: "Ciclista Lisa Preta",
  357: "Ciclista Lisa Preta",
  358: "Ciclista Lisa Cinza Mescla",
  359: "Ciclista Lisa Cinza Mescla",
  360: "Ciclista Lisa Cinza Mescla",
  361: "Ciclista Lisa Cinza Mescla",
  362: "Ciclista Lisa Cinza Mescla",
  363: "Ciclista Lisa Preta",
  365: "Ciclista Lisa Preta",
  366: "Ciclista Lisa Pink",
  367: "Ciclista Lisa Pink",
  368: "Ciclista Lisa Cinza Mescla Escuro",
  369: "Ciclista Lisa Preta",
  370: "Ciclista Lisa Preta",

  // Segunda leva (444-465): a maioria ja esta correta, mas algumas precisam ajuste.
  445: "Ciclista Lisa Telha", // Imagem mostra terracota/laranja-avermelhado, nao vermelho puro.
  454: "Ciclista Lisa Marrom", // Imagem mostra marrom/chocolate, nao bordo escuro.
  455: "Ciclista Lisa Rosa Antigo", // Imagem mostra rosa antigo lilas claro, nao rosa bebe.
  456: "Ciclista Lisa Grafite", // Imagem mostra cinza grafite escuro, nao roxo.
};

const DELETIONS = [
  {
    id: 364,
    motivo:
      "imagem comparativa com 2 cores (preto + cinza) - nao serve como foto de produto unico",
  },
];

async function renomeia() {
  console.log("\n[1] Corrigindo nomes para refletir a cor real da imagem...\n");
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

    if (atual.name === novoNome) {
      console.log(`  -- id=${id} ja esta como "${novoNome}", pulando.`);
      ok++;
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
  console.log(`\nNomes processados: ${ok}/${Object.keys(RENAMES).length}`);
}

async function deleta() {
  console.log("\n[2] Removendo imagens invalidas (banco + storage)...\n");

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

    console.log(`  OK id=${item.id} "${prod.name}" deletado (${item.motivo})`);
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

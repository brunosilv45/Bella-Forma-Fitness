/**
 * Migra os 10 produtos da categoria `regata` para subcategorias
 * baseadas nas fotos:
 *
 *  - 9 produtos -> regata_nadador
 *  - 1 produto  -> regata_arrastao (a vermelha de tela furada)
 *
 * Tambem atualiza os nomes para o padrao
 *  "Regata Nadador <Cor>" / "Regata Arrastão <Cor>".
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// id -> { category, name }
const REGATA_UPDATES = {
  257: { category: "regata_nadador", name: "Regata Nadador Branca" },
  258: { category: "regata_nadador", name: "Regata Nadador Branca" },
  259: { category: "regata_nadador", name: "Regata Nadador Branca" },
  260: { category: "regata_nadador", name: "Regata Nadador Pink" },
  261: { category: "regata_arrastao", name: "Regata Arrastão Vermelha" },
  262: { category: "regata_nadador", name: "Regata Nadador Preta" },
  263: { category: "regata_nadador", name: "Regata Nadador Preta" },
  264: { category: "regata_nadador", name: "Regata Nadador Preta" },
  265: { category: "regata_nadador", name: "Regata Nadador Branca" },
  266: { category: "regata_nadador", name: "Regata Nadador Azul Royal" },
};

async function main() {
  console.log("\nMigrando produtos da categoria 'regata' para subcategorias\n");

  let ok = 0;
  for (const [idStr, novo] of Object.entries(REGATA_UPDATES)) {
    const id = Number(idStr);

    const { data: atual, error: fetchErr } = await supabase
      .from("products")
      .select("id, name, category")
      .eq("id", id)
      .single();

    if (fetchErr) {
      console.error(`  ERRO ao buscar id=${id}: ${fetchErr.message}`);
      continue;
    }
    if (!atual) {
      console.error(`  Produto id=${id} nao encontrado.`);
      continue;
    }

    const { error: updErr } = await supabase
      .from("products")
      .update({ category: novo.category, name: novo.name })
      .eq("id", id);

    if (updErr) {
      console.error(`  ERRO id=${id}: ${updErr.message}`);
      continue;
    }
    console.log(
      `  OK id=${id}: "${atual.name}" [${atual.category}] -> "${novo.name}" [${novo.category}]`,
    );
    ok++;
  }

  console.log(`\nAtualizados: ${ok}/${Object.keys(REGATA_UPDATES).length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * Correcao: 6 produtos foram classificados como `regata_nadador`
 * mas na verdade tem o tecido de TULE (listras horizontais
 * semi-transparentes). Corrigindo para `regata_tule`.
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const UPDATES = {
  260: { category: "regata_tule", name: "Regata Tule Pink" },
  262: { category: "regata_tule", name: "Regata Tule Preta" },
  263: { category: "regata_tule", name: "Regata Tule Preta" },
  264: { category: "regata_tule", name: "Regata Tule Preta" },
  265: { category: "regata_tule", name: "Regata Tule Branca" },
  266: { category: "regata_tule", name: "Regata Tule Azul Royal" },
};

async function main() {
  console.log("\nReclassificando produtos: Nadador -> Tule\n");

  let ok = 0;
  for (const [idStr, novo] of Object.entries(UPDATES)) {
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

  console.log(`\nAtualizados: ${ok}/${Object.keys(UPDATES).length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

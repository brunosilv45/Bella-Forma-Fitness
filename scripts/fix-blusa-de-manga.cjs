/**
 * Migra `blusa_de_manga` -> `blusa_com_manga` (4 produtos)
 * pra alinhar com o filtro do site, e renomeia
 * "Blusa De Manga X" -> "Blusa Com Manga X".
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function main() {
  console.log("\nMigrando blusa_de_manga -> blusa_com_manga\n");

  const { data: blusas, error } = await supabase
    .from("products")
    .select("id, name")
    .eq("category", "blusa_de_manga");

  if (error) {
    console.error("Erro ao buscar:", error.message);
    return;
  }

  let ok = 0;
  for (const p of blusas) {
    const novoNome = p.name.replace(/^Blusa De Manga\b/i, "Blusa Com Manga");

    const { error: updErr } = await supabase
      .from("products")
      .update({ category: "blusa_com_manga", name: novoNome })
      .eq("id", p.id);

    if (updErr) {
      console.error(`  ERRO id=${p.id}: ${updErr.message}`);
      continue;
    }
    console.log(`  OK id=${p.id}: "${p.name}" -> "${novoNome}"`);
    ok++;
  }

  console.log(`\nAtualizados: ${ok}/${blusas.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

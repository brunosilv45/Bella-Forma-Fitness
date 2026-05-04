/**
 * Correções pontuais no banco:
 *
 * 1. Renomear a categoria `short` -> `short_liso` (18 produtos) e
 *    atualizar o nome de "Short X" -> "Short Liso X" para ficar
 *    consistente com `calca_lisa` e `ciclista_lisa`.
 *
 * 2. Corrigir os nomes dos 7 produtos de `ciclista_com_bolso` que
 *    estavam marcados como "Chumbo" / "Rose" / "Rosa Bebê" mas na
 *    foto são pretos com faixa lateral Pink ou Amarela.
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// id -> novo nome para a categoria ciclista_com_bolso
const CICLISTA_RENAMES = {
  347: "Ciclista Com Bolso Amarelo",
  348: "Ciclista Com Bolso Pink",
  349: "Ciclista Com Bolso Pink",
  350: "Ciclista Com Bolso Pink",
  351: "Ciclista Com Bolso Amarelo",
  352: "Ciclista Com Bolso Pink",
  353: "Ciclista Com Bolso Amarelo",
};

async function migrateShortToShortLiso() {
  console.log("\n[1] Migrando categoria 'short' -> 'short_liso'\n");

  const { data: shorts, error } = await supabase
    .from("products")
    .select("id, name")
    .eq("category", "short");

  if (error) {
    console.error("Erro ao buscar shorts:", error.message);
    return;
  }

  console.log(`Encontrados ${shorts.length} produtos para migrar.`);

  let ok = 0;
  for (const p of shorts) {
    let novoNome = p.name;
    if (novoNome.startsWith("Short ") && !novoNome.startsWith("Short Liso ")) {
      novoNome = novoNome.replace(/^Short\s+/, "Short Liso ");
    }

    const { error: updErr } = await supabase
      .from("products")
      .update({ category: "short_liso", name: novoNome })
      .eq("id", p.id);

    if (updErr) {
      console.error(`  ERRO id=${p.id}: ${updErr.message}`);
      continue;
    }
    console.log(`  OK id=${p.id}: "${p.name}" -> "${novoNome}"`);
    ok++;
  }
  console.log(`\nMigracao concluida: ${ok}/${shorts.length}`);
}

async function fixCiclistaComBolsoNames() {
  console.log("\n[2] Corrigindo nomes de ciclista_com_bolso\n");

  let ok = 0;
  for (const [idStr, novoNome] of Object.entries(CICLISTA_RENAMES)) {
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
    if (atual.category !== "ciclista_com_bolso") {
      console.warn(
        `  AVISO id=${id} nao e ciclista_com_bolso (e ${atual.category}). Pulando.`,
      );
      continue;
    }

    const { error: updErr } = await supabase
      .from("products")
      .update({ name: novoNome })
      .eq("id", id);

    if (updErr) {
      console.error(`  ERRO id=${id}: ${updErr.message}`);
      continue;
    }
    console.log(`  OK id=${id}: "${atual.name}" -> "${novoNome}"`);
    ok++;
  }
  console.log(`\nNomes atualizados: ${ok}/${Object.keys(CICLISTA_RENAMES).length}`);
}

async function main() {
  await migrateShortToShortLiso();
  await fixCiclistaComBolsoNames();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

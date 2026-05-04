/**
 * Padroniza os nomes dos produtos da colecao para uma escrita
 * consistente:
 *  - "Calca" -> "Calça"
 *  - Acentos faltando: Lilas->Lilás, Petroleo->Petróleo, Bebe->Bebê,
 *    Bordo->Bordô
 *  - Vermelho->Vermelha em Calca Lisa / Ciclista Lisa (substantivo
 *    feminino)
 *  - Plus Size: prefixar com o tipo da peça (Blusa/Calça/Ciclista/
 *    Regata/Top)
 *  - Tactel: remove sufixo "Frente"/"Costas"
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const PLUS_SIZE_LABELS = {
  plus_size_blusa: "Plus Size Blusa",
  plus_size_calca: "Plus Size Calça",
  plus_size_ciclista: "Plus Size Ciclista",
  plus_size_regata: "Plus Size Regata",
  plus_size_top: "Plus Size Top",
};

function normalize(name, category) {
  let n = name.trim();

  // Plus Size: prefixar com o tipo da peca
  if (category && category.startsWith("plus_size_")) {
    const prefix = PLUS_SIZE_LABELS[category];
    if (prefix && /^Plus Size\s+/i.test(n) && !n.startsWith(prefix + " ")) {
      n = n.replace(/^Plus Size\s+/i, prefix + " ");
    }
  }

  // Calca -> Calça (palavra inteira; preserva sufixos)
  n = n.replace(/\bCalca\b/g, "Calça");

  // Acentos faltando
  n = n.replace(/\bLilas\b/g, "Lilás");
  n = n.replace(/\bPetroleo\b/g, "Petróleo");
  n = n.replace(/\bRosa Bebe\b/g, "Rosa Bebê");
  n = n.replace(/\bBordo\b/g, "Bordô");

  // Vermelho -> Vermelha quando o substantivo e feminino
  // (Calça Lisa, Ciclista Lisa, Calça)
  if (
    /^Calça (Lisa|Com|Arrastão)/.test(n) ||
    /^Ciclista (Lisa|Com)/.test(n) ||
    category === "calca_lisa" ||
    category === "ciclista_lisa"
  ) {
    n = n.replace(/\bVermelho\b/g, "Vermelha");
  }

  // Tactel: remover sufixo Frente/Costas
  if (category === "tactel") {
    n = n.replace(/\s+(Frente|Costas)$/i, "");
  }

  // Compactar espacos
  n = n.replace(/\s+/g, " ").trim();

  return n;
}

async function main() {
  console.log("\nPadronizando nomes dos produtos...\n");

  const { data, error } = await supabase
    .from("products")
    .select("id, name, category");

  if (error) {
    console.error("Erro ao buscar:", error.message);
    return;
  }

  let alterados = 0;
  let inalterados = 0;

  for (const p of data) {
    const novo = normalize(p.name, p.category);
    if (novo === p.name) {
      inalterados++;
      continue;
    }

    const { error: updErr } = await supabase
      .from("products")
      .update({ name: novo })
      .eq("id", p.id);

    if (updErr) {
      console.error(`  ERRO id=${p.id}: ${updErr.message}`);
      continue;
    }
    console.log(`  id=${p.id} [${p.category}]: "${p.name}" -> "${novo}"`);
    alterados++;
  }

  console.log(`\nResultado: ${alterados} alterados, ${inalterados} ja estavam ok`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

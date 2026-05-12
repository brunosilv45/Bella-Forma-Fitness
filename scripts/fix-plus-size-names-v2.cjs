/**
 * Segunda rodada de correcoes dos nomes plus size, apos o usuario apontar
 * mais divergencias no front (peças roxas com nome azul, laranjas com nome
 * roxo, etc):
 *
 * - "Plus Size Top Azul Marinho" -> tops sao na verdade ROXOS (violeta)
 * - "Plus Size Top Roxo" -> tops sao na verdade ROSA PINK (fucsia/magenta)
 * - "Plus Size Blusa Roxa" -> 2 itens sao na verdade TELHA (terracota)
 * - "Plus Size Ciclista Roxa" -> 2 itens sao na verdade ciclista PRETA
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const sb = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const FIXES = [
  { ids: [491, 495, 496, 499, 511], name: "Plus Size Top Roxo" },
  { ids: [504, 513, 514, 516], name: "Plus Size Top Rosa Pink" },
  { ids: [472, 512], name: "Plus Size Blusa Telha" },
  { ids: [478, 479], name: "Plus Size Ciclista Preta" },
];

(async () => {
  let total = 0;
  for (const fix of FIXES) {
    for (const id of fix.ids) {
      const { data, error } = await sb
        .from("products")
        .update({ name: fix.name })
        .eq("id", id)
        .select("id, name, category")
        .single();
      if (error) {
        console.error(`ERR id=${id}: ${error.message}`);
      } else {
        console.log(`OK id=${data.id} -> "${data.name}" (${data.category})`);
        total++;
      }
    }
  }
  console.log(`\nTotal: ${total} produtos atualizados.`);
})();

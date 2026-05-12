/**
 * Terceira rodada: corrige erro de *tipo de peca* (top/blusa/regata vs ciclista/calca)
 * e cor associada nos produtos do lote `plus-XXX.png`.
 *
 * Mapeamento id <-> arquivo vem da coluna image_path (...plus-036.png etc).
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const sb = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

/** @type {{ id: number; category: string; name: string }[]} */
const UPDATES = [
  // Foto foca ciclista preta — estava cadastrado como top telha
  { id: 494, category: "plus_size_ciclista", name: "Plus Size Ciclista Preta" },
  { id: 509, category: "plus_size_ciclista", name: "Plus Size Ciclista Preta" },
  // Regata Telha era na verdade ciclista roxo (p-037)
  { id: 501, category: "plus_size_ciclista", name: "Plus Size Ciclista Roxa" },
  // Blusa Roxa era calça azul marinho (p-036)
  { id: 500, category: "plus_size_calca", name: "Plus Size Calça Azul Marinho" },
  // Tops rosas/rosos eram calça telha (p-049)
  { id: 513, category: "plus_size_calca", name: "Plus Size Calça Telha" },
  // Top preto era a mesma calça telha / outro ângulo (p-028)
  { id: 492, category: "plus_size_calca", name: "Plus Size Calça Telha" },
];

(async () => {
  let n = 0;
  for (const u of UPDATES) {
    const { data, error } = await sb
      .from("products")
      .update({ category: u.category, name: u.name })
      .eq("id", u.id)
      .select("id, category, name")
      .single();
    if (error) console.error(`ERR id=${u.id}:`, error.message);
    else {
      console.log(`OK id=${data.id} -> ${data.category} "${data.name}"`);
      n++;
    }
  }
  console.log(`\nTotal: ${n}`);
})();

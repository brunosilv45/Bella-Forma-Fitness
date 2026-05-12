/**
 * Quarta rodada: correcoes apos auditar as imagens reais (fetch via image_url).
 *
 * Muitas entradas plus_size_top / "Top Preto" eram regata, blusa ou calça.
 * Ajuste de `category` + `name` conforme o que aparece na foto.
 */

const { createClient } = require("@supabase/supabase-js");

const sb = createClient(
  "https://dfrjpvwdigdhxqbdgubm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM"
);

/** @type {{ id: number; category: string; name: string }[]} */
const UPDATES = [
  { id: 475, category: "plus_size_regata", name: "Plus Size Regata Telha" },
  { id: 480, category: "plus_size_calca", name: "Plus Size Calça Telha" },
  { id: 487, category: "plus_size_regata", name: "Plus Size Regata Fúcsia" },
  { id: 489, category: "plus_size_regata", name: "Plus Size Regata Rosa Pink" },
  { id: 490, category: "plus_size_regata", name: "Plus Size Regata Turquesa" },
  { id: 491, category: "plus_size_regata", name: "Plus Size Regata Turquesa" },
  { id: 493, category: "plus_size_blusa", name: "Plus Size Blusa Telha" },
  { id: 495, category: "plus_size_blusa", name: "Plus Size Blusa Telha" },
  { id: 496, category: "plus_size_blusa", name: "Plus Size Blusa Telha" },
  { id: 497, category: "plus_size_calca", name: "Plus Size Calça Laranja" },
  { id: 498, category: "plus_size_calca", name: "Plus Size Calça Laranja" },
  { id: 499, category: "plus_size_calca", name: "Plus Size Calça Laranja" },
  { id: 504, category: "plus_size_calca", name: "Plus Size Calça Azul Marinho" },
  { id: 511, category: "plus_size_blusa", name: "Plus Size Blusa Roxa" },
  { id: 514, category: "plus_size_blusa", name: "Plus Size Blusa Telha" },
  { id: 516, category: "plus_size_regata", name: "Plus Size Regata Turquesa" },
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

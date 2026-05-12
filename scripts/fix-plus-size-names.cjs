/**
 * Corrige nomes incorretos nos produtos plus size cadastrados nesta sessao
 * apos analise visual:
 *
 * - As regatas "Rosa Pink" e "Verde Tiffany" sao na verdade na cor "Telha"
 *   (laranja avermelhado / terracota).
 * - Algumas pecas catalogadas como "Top Telha" e "Blusa Telha" tinham
 *   destaque na CALCA telha, mas o top/blusa em si era PRETO.
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const sb = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const FIXES = [
  { ids: [466, 474, 476, 507, 515, 517], name: "Plus Size Regata Telha" },
  { ids: [468, 469, 501, 505, 508], name: "Plus Size Regata Telha" },
  { ids: [475, 489, 490], name: "Plus Size Top Preto" },
  { ids: [470, 473, 485, 486, 502, 503, 506], name: "Plus Size Blusa Preta" },
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

/**
 * Corrige os nomes dos 3 produtos blusa_com_manga que eram brancos
 * mas estavam classificados como "Lilas" (id 394, 396) e "Azul Bebe" (id 397).
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function main() {
  for (const id of [394, 396, 397]) {
    const { data: atual } = await supabase
      .from("products")
      .select("name")
      .eq("id", id)
      .single();

    if (!atual) {
      console.error(`id=${id} nao encontrado.`);
      continue;
    }

    const { error } = await supabase
      .from("products")
      .update({ name: "Blusa Com Manga Branca" })
      .eq("id", id);

    if (error) {
      console.error(`id=${id}: ${error.message}`);
    } else {
      console.log(`OK id=${id}: "${atual.name}" -> "Blusa Com Manga Branca"`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

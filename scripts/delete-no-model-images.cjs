/**
 * Deleta produtos cujas fotos sao apenas a peca solta (sem modelo / sem manequim).
 *
 * Identificados via inspecao visual em grades por categoria.
 * Apenas calca_lisa (IDs 427-443) e ciclista_lisa (IDs 444-465) foram afetadas:
 * o resto da colecao ja tem fotos com modelo.
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NTU5OCwiZXhwIjoyMDkyMjQxNTk4fQ.tXPzd7xT0SoDqEfmyZ1MUkVepQ-unJjtBHSi5U-b6jM";

const BUCKET = "product-images";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const IDS_TO_DELETE = [
  // calca_lisa - peca dobrada no chao
  427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441,
  442, 443,
  // ciclista_lisa - peca solta no chao
  444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458,
  459, 460, 461, 462, 463, 464, 465,
];

async function main() {
  console.log(`Removendo ${IDS_TO_DELETE.length} produtos sem modelo...\n`);
  let okCount = 0;
  let errCount = 0;

  for (const id of IDS_TO_DELETE) {
    const { data: prod, error: fetchErr } = await supabase
      .from("products")
      .select("id, name, category, image_path")
      .eq("id", id)
      .single();

    if (fetchErr || !prod) {
      console.error(`  id=${id} nao encontrado: ${fetchErr?.message}`);
      errCount++;
      continue;
    }

    if (prod.image_path) {
      const { error: stoErr } = await supabase.storage
        .from(BUCKET)
        .remove([prod.image_path]);
      if (stoErr) {
        console.error(`  AVISO storage id=${id}: ${stoErr.message}`);
      }
    }

    const { error: dbErr } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (dbErr) {
      console.error(`  ERRO db id=${id}: ${dbErr.message}`);
      errCount++;
      continue;
    }

    console.log(`  OK id=${id} [${prod.category}] "${prod.name}" deletado`);
    okCount++;
  }

  console.log(`\nResultado: ${okCount} deletados, ${errCount} erros.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

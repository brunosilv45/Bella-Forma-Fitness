/**
 * Lista os produtos cadastrados nesta sessao (ids >= 397) agrupados por
 * categoria + nome, mostrando id e image_url para validacao posterior.
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NjU1OTgsImV4cCI6MjA5MjI0MTU5OH0.PookUbdOMK7fRG4ZMadSamQR64jPKkPoUKYio8zJrDA";

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
const MIN_ID = 397;

(async () => {
  const { data, error } = await sb
    .from("products")
    .select("id, name, category, image_url")
    .gte("id", MIN_ID)
    .order("id", { ascending: true });
  if (error) throw error;

  console.log(`Total cadastrado nesta sessao: ${data.length}\n`);

  const groups = {};
  for (const p of data) {
    const key = `${p.category} | ${p.name}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  }

  for (const key of Object.keys(groups).sort()) {
    const items = groups[key];
    console.log(`\n=== ${key} (${items.length}) ===`);
    for (const it of items) {
      console.log(`  id=${it.id}`);
    }
  }

  require("fs").writeFileSync(
    require("path").resolve(__dirname, "..", "tmp_session_products.json"),
    JSON.stringify(data, null, 2),
  );
  console.log(`\nDump salvo em tmp_session_products.json`);
})();

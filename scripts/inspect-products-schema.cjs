const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NjU1OTgsImV4cCI6MjA5MjI0MTU5OH0.PookUbdOMK7fRG4ZMadSamQR64jPKkPoUKYio8zJrDA";

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

(async () => {
  // pega um produto plus_size pra ver os campos
  const { data: sample } = await sb
    .from("products")
    .select("*")
    .like("category", "plus_size_%")
    .limit(20);
  console.log("Sample plus_size products:");
  console.log(JSON.stringify(sample, null, 2));

  // pega um produto comum tambem
  const { data: any } = await sb.from("products").select("*").limit(1);
  console.log("\nQualquer produto:");
  console.log(JSON.stringify(any, null, 2));

  const { data: maxIdRow } = await sb
    .from("products")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);
  console.log("\nMaior id atual:", maxIdRow?.[0]?.id);
})();

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://dfrjpvwdigdhxqbdgubm.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmpwdndkaWdkaHhxYmRndWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NjU1OTgsImV4cCI6MjA5MjI0MTU5OH0.PookUbdOMK7fRG4ZMadSamQR64jPKkPoUKYio8zJrDA";

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

(async () => {
  const { data, error } = await sb
    .from("products")
    .select("id, name, image_path")
    .eq("category", "ciclista_lisa")
    .order("id");
  if (error) {
    console.error(error);
    return;
  }
  data.forEach((p) => console.log(p.id + " | " + p.name + " | " + p.image_path));
  console.log("Total: " + data.length);
})();

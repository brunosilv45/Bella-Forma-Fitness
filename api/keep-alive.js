import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: "Missing Supabase env vars" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("products")
    .select("id")
    .limit(1);

  if (error) {
    return res.status(500).json({ error: error.message, timestamp: new Date().toISOString() });
  }

  return res.status(200).json({
    ok: true,
    message: "Supabase is alive",
    rows: data?.length ?? 0,
    timestamp: new Date().toISOString(),
  });
}

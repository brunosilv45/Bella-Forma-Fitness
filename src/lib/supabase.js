import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function fetchNoStore(input, init) {
  return fetch(input, { ...init, cache: "no-store" });
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: { fetch: fetchNoStore },
});
export const STORAGE_BUCKET = "product-images";

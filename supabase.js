import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANONKEY;

const __supabase = createClient(supabaseURL, supabaseKey);

export { __supabase };

// utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!; // Supabase service URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Supabase anon/public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

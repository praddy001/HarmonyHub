import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[HarmonyHub] Supabase environment variables are not set. ' +
    'Copy .env.example to .env.local and fill in your project credentials.'
  );
}

export const supabase = createClient(
  supabaseUrl ?? 'http://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-anon-key'
);

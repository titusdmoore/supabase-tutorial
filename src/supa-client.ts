import { createClient } from '@supabase/supabase-js';

const supaAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;
const supaUrl = (import.meta as any).env.VITE_SUPABASE_API_URL;

export const supaClient = createClient(supaUrl, supaAnonKey);
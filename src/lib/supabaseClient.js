import { createClient } from '@supabase/supabase-js'

// Using Vite's environment variables for better security and portability.
// Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are defined in your .env.local file.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

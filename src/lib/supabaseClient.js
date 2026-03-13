import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytqmrqowlyfljiuxbur.supabase.co'
const supabaseAnonKey = 'sb_publishable_tml41LCpTIL8wUguk2yXHQ_NKet_wV0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

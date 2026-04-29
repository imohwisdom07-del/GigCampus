import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env')
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
export const authClient = createClient(supabaseUrl, supabaseAnonKey ?? supabaseServiceRoleKey)

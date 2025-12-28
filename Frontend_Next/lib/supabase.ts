import { createClient } from '@supabase/supabase-js'

// Fallback values to prevent crash during build/dev if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing using placeholders. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

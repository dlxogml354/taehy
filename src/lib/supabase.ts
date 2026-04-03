import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Post = {
  id: string
  title: string
  content: string
  date_label: string
  published: boolean
  created_at: string
}

export type Visitor = {
  id: string
  page: string
  referrer: string
  user_agent: string
  created_at: string
}

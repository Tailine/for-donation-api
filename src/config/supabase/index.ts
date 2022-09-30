import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

function initialize() {
  let supabase: SupabaseClient | null = null

  return function getInstance() {
    if (!supabase) {
      supabase = createClient(supabaseUrl, supabaseKey)
    }
    return supabase
  }
}

const getSupabaseInstance = initialize()

export default getSupabaseInstance()

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During static generation on Vercel, these might be missing.
  // We provide fallbacks to prevent the build from failing, 
  // as the client will only be used at runtime.
  return createBrowserClient(
    url || 'https://placeholder.supabase.co',
    anonKey || 'placeholder'
  )
}

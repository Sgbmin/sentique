export const useSupabaseClient = () => {
  const config = useRuntimeConfig()
  const { createClient } = useNuxtApp().$supabase

  return createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )
}
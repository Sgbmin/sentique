// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui'],
  
  modules: ['@nuxtjs/supabase'],
  
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/products', '/products/*']
    }
  },

  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },

  compatibilityDate: '2024-01-01'
})

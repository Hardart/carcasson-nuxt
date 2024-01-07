// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  headlessui: { prefix: 'H' },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    'nuxt-headlessui',
    '@morev/vue-transitions/nuxt',
    '@vueuse/nuxt',
  ],
})

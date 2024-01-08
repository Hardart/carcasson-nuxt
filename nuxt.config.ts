// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [{ content: 'maximum-scale=1.0, user-scalable=0' }],
    },
  },
  devtools: { enabled: true },
  headlessui: { prefix: 'H' },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', 'nuxt-headlessui', '@morev/vue-transitions/nuxt', '@vueuse/nuxt'],
})

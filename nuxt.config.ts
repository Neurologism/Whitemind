// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 8000,
  },
  routeRules: {
    '/project/**': { ssr: false },
    '/tutorial/**': { ssr: false },
  },
  nitro: {
    preset: 'cloudflare_module',
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  css: ['~/assets/css/tailwind.css'],
  colorMode: {
    preference: 'dark',
  },
  runtimeConfig: {
    public: {
      backmindHost: process.env.BACKMIND_HOST || 'https://api.whitemind.org',
      tutorialAllowUnlistedNodeCreation: false,
      tutorialAllowUnlistedEdgeCreation: false,
      tutorialAllowUnlistedNodeDeletion: false,
      tutorialAllowUnlistedEdgeDeletion: false,
      tutorialAllowUnlistedNodeModification: false,
      tutorialDisplayForbiddenToast: true,
      enableStartingLockedTutorials: false,
      showVerifyEmailModal: false,
    },
  },
});

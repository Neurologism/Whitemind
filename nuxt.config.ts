// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: {
    port: 8000,
  },
  routeRules: {
    '/project/**': { ssr: false },
    '/tutorial/**': { ssr: false },
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  css: ['~/assets/css/tailwind.css', 'animate.css'],
  colorMode: {
    preference: 'dark',
  },
  runtimeConfig: {
    public: {
      backmindHost:
        process.env.BACKMIND_HOST || 'https://backmind.icinoxis.net',
      tutorialAllowUnlistedNodeCreation: true,
      tutorialAllowUnlistedEdgeCreation: true,
      tutorialAllowUnlistedNodeDeletion: false,
      tutorialAllowUnlistedEdgeDeletion: false,
      tutorialAllowUnlistedNodeModification: false,
      tutorialDisplayForbiddenToast: true,
    },
  },
});

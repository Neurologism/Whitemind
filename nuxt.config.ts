// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  devServer: {
    port: 8000
  },
  routeRules: {
    // Render these routes with SPA
    '/project/**': { ssr: false },
  },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
  ],
  css: ["~/assets/css/tailwind.css", "animate.css"],
  colorMode: {
    preference: "dark",
  },
});
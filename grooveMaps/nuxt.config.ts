import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{amber-50}",
      100: "{amber-100}",
      200: "{amber-200}",
      300: "{amber-300}",
      400: "{amber-400}",
      500: "{amber-500}",
      600: "{amber-600}",
      700: "{amber-700}",
      800: "{amber-800}",
      900: "{amber-900}",
    },
    surface: {
            50: "{blue-50}",
            100: "{blue-100}",
            200: "{blue-200}",
            300: "{blue-300}",
            400: "{blue-400}",
            500: "{blue-500}",
            600: "{blue-600}",
            700: "{blue-700}",
            800: "{blue-800}",
            900: "{blue-900}",
        }
  },
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@primevue/nuxt-module", "@pinia/nuxt"],
  css: ["@/assets/css/main.css", "mapbox-gl/dist/mapbox-gl.css", "primeicons/primeicons.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    /* Configuration */
    options: {
      theme: {
        preset: MyPreset,
      },
    },
  },
  runtimeConfig: {
    public: {
      mapboxToken: process.env.MAPBOX_TOKEN,
      apiBaseUrl: process.env.API_BASE_URL || 'https://api.localbuzz.live'
    },
  },
});

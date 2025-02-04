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
  },
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@primevue/nuxt-module"],
  css: ["@/assets/css/main.css", "mapbox-gl/dist/mapbox-gl.css"],
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
    },
  },
});

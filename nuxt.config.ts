import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    css: {
      devSourcemap: true,
    },
  },
  modules: [
    'shadcn-nuxt'
  ],
  shadcn: {
    prefix: '',
    componentDir: 'app/components/ui'
  }
});

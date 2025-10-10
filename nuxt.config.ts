// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/i18n'],
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
  components: [
    { path: 'app/components', pathPrefix: false },
  ],
  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        name: 'English',
        files: ['common/en.yml', 'home/en.yml', 'tools/en.yml'],
        iso: 'en-US'
      },
      {
        code: 'vi',
        name: 'Vietnamese',
        files: ['common/vi.yml', 'home/vi.yml', 'tools/vi.yml'],
        iso: 'vi-VN'
      },
      {
        code: 'ja',
        name: 'Japanese',
        files: ['common/ja.yml', 'home/ja.yml', 'tools/ja.yml'],
        iso: 'ja-JP'
      },
    ],
    defaultLocale: 'en',
  }
})

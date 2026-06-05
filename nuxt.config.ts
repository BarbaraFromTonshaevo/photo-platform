// https://nuxt.com/docs/api/configuration/nuxt-config

// URL is global in Node 18+ — no import needed
const root = new URL('.', import.meta.url).pathname

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    ['@nuxt/icon', {
      mode: 'svg',
      serverBundle: { collections: ['ph'] },
    }],
    '@pinia/nuxt',
    ['@nuxt/fonts', {
      families: [
        {
          name: 'Cormorant Garamond',
          provider: 'google',
          weights: [300, 400, 500, 600, 700],
          styles: ['normal', 'italic'],
        },
        {
          name: 'Hanken Grotesk',
          provider: 'google',
          weights: [300, 400, 500, 600, 700],
          styles: ['normal', 'italic'],
        },
      ],
    }],
  ],

  // FSD layer aliases — folder numbers kept for IDE sorting, aliases are clean
  alias: {
    '@shared':   `${root}app/01.shared`,
    '@entities': `${root}app/02.entities`,
    '@features': `${root}app/03.features`,
    '@widgets':  `${root}app/04.widgets`,
  },

  components: [
    { path: '@shared/ui', pathPrefix: false, extensions: ['vue'] },
    { path: '@widgets', pathPrefix: false, extensions: ['vue'] },
    { path: '@features', pathPrefix: false, extensions: ['vue'] }
  ],

  css: ['~/assets/styles/main.scss'],

  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Only mixin/function files here — no CSS output, so no duplicates in bundles
          additionalData: [
            `@use "${root}app/assets/styles/abstracts/_breakpoints" as *;`,
            `@use "${root}app/assets/styles/abstracts/_mixins" as *;`,
          ].join('\n') + '\n',
        },
      },
    },
  },
})

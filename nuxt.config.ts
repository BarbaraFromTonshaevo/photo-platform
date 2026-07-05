// https://nuxt.com/docs/api/configuration/nuxt-config

// URL is global in Node 18+ — no import needed
const root = new URL('.', import.meta.url).pathname

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
        title: 'Фотограф Елькина Варвара',
        meta: [
            { name: 'description', content: 'Живые эмоции, естественный свет и внимание к деталям.' }
        ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo-rotated.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    ['@nuxt/icon', {
      mode: 'svg',
      serverBundle: { collections: ['ph'] },
    }],
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
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

  i18n: {
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'ru',
    langDir: 'locales',
    strategy: 'no_prefix',
  },

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
      // Merges duplicate @media blocks produced by nesting breakpoint
      // mixins inside selectors instead of grouping by breakpoint —
      // lightningcss/cssnano only merge *adjacent* identical @media rules
      'postcss-combine-media-query': {},
      'postcss-sort-media-queries': { sort: 'desktop-first' },
    },
  },

  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'gsap/ScrollTrigger',
        'swiper/modules',
        'swiper/vue',
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

import { env } from 'node:process'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  ssr: false,

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/eslint',
    'arco-design-nuxt-module',
    'nuxt-lodash',
    'dayjs-nuxt',
  ],
  future: {
    typescriptBundlerResolution: true,
  },
  runtimeConfig: {
    dbUrl: env.DB_URL!,
  },
  imports: {
    dirs: [
      'composables/**',
    ],
  },
  vite: {
    optimizeDeps: {
      include: [
        '@arco-design/web-vue/es/icon',
        '@arco-design/web-vue/es/link/index',
        '@arco-design/web-vue/es/link/style/css.js',
        '@arco-design/web-vue/es/message/style/css.js',
        '@arco-design/web-vue/es',
        '@arco-design/web-vue/es/button/index',
        '@arco-design/web-vue/es/slider/index',
        '@arco-design/web-vue/es/button/style/css.js',
        '@arco-design/web-vue/es/slider/style/css.js',
        '@arco-design/web-vue/es/modal/style/css.js',
        '@arco-design/web-vue/es/input/index',
        '@arco-design/web-vue/es/form/index',
        '@arco-design/web-vue/es/modal/index',
        '@arco-design/web-vue/es/input/style/css.js',
        '@arco-design/web-vue/es/form/style/css.js',
        'nanoid',
        'bignumber.js',
        '@arco-design/web-vue/es/image/index',
        '@arco-design/web-vue/es/image/style/css.js',
        '@arco-design/web-vue',
      ],
    },
  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    // prerender: {
    //   crawlLinks: false,
    //   routes: ['/'],
    // },
    storage: {
      files: {
        driver: 'fs',
        base: '.storage/files',
      },
    },
    experimental: {
      database: true,
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/icon.svg', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  devtools: {
    enabled: true,
  },

  devServer: {
    port: 19995,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  hooks: {
    // 'nitro:config': (nitroConfig) => {
    //   if (!nitroConfig.runtimeConfig?.dbUrl)
    //     throw new Error('Please set DB_URL in .env file')
    // },
  },
  compatibilityDate: '2024-07-04',
})

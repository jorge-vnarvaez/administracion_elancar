import colors from 'vuetify/es5/util/colors'

const appEnv = process.env.NODE_ENV || 'development';

export default {

  publicRuntimeConfig: {
    apiUrl: 'https://corev2.domhhv.cl'
    // appEnv === 'development'
    //  ? 'http://localhost:1338'
    //  : 'https://core.domhhv.cl/'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Administración Elancar',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/vuetify_blocks.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-html2pdf', mode: 'client' }
  ],

  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/]
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/tailwindcss'
  ],

  vuetify: {
    customVariables: ['~/assets/variables.scss', '~/assets/theme_fonts.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  googleFonts: {
    Poppins: true,
    Montserrat: true,
    Inter: true,
  },

  devServerHandlers: []
}

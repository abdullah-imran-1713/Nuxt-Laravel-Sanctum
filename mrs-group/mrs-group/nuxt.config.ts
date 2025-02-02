// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    // '@nuxtjs/axios',
    'nuxt-auth-sanctum',
    // '@nuxtjs/cookies'
  ],
  // axios: {
  //   baseURL: process.env.API_BASE_URL || 'http://localhost:8000/api', // Your API URL
  // },
  sanctum: {
    baseUrl: 'http://localhost:8000', // Your Laravel API
    mode: 'cookie',
    userStateKey: 'sanctum.user.identity',
    redirectIfAuthenticated: false,
    redirectIfUnauthenticated: false,
    endpoints: {
        csrf: '/sanctum/csrf-cookie',
        login: '/login',
        logout: '/logout',
        user: '/api/user',
    },
    csrf: {
        cookie: 'XSRF-TOKEN',
        header: 'X-XSRF-TOKEN',
    },
    client: {
        retry: false,
        initialRequest: true,
    },
    redirect: {
        keepRequestedRoute: false,
        onLogin: '/dashboard',
        onLogout: '/',
        onAuthOnly: '/auth/login',
        onGuestOnly: '/dashboard',
    },
    globalMiddleware: {
        enabled: false,
        allow404WithoutAuth: true,
    },
    logLevel: 3,
    appendPlugin: false,
  }
})

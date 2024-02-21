// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-swiper"],
  css: ["./assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  content: {
    permalink: ":slug",
    page: "/_content",
    generate: [
      // for static build
      "get",
      "getAll",
    ],
    isPost: false,
  },

  api: {
    baseURL:
      process.env.NODE_ENV === "production"
        ? "http://localhost:3000"
        : "https://nuxtent.now.sh",
  },

  env: {
    SERVER_PRESET: process.env.SERVER_PRESET || "netlify_edge",
  },
});

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
  api: {
    baseURL: "",
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
        ? "https://best-weather-forecasts.netlify.app/"
        : "http://myipvps:3000",
  },
});

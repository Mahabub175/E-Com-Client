// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore"],
      },
    ],
    "@nuxt/image",
    "nuxt-swiper",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  image: {
    format: ["webp"],
  },
  css: ["~/assets/css/tailwind.css"],
  runtimeConfig: {
    public: {
      emailjsUserKey: process.env.EMAILJS_SERVICE_ID,
      emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID_CLIENT,
      emailjsTemplateIdRestaurant: process.env.EMAILJS_TEMPLATE_ID_RESTAURANT,
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    },
  },
});

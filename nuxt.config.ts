import { defineNuxtConfig } from "nuxt/config";
import config from "./developer.json";
const siteTitle = `${config.name} | ${config.role}`;
export default defineNuxtConfig({
  ssr: false, 
  compatibilityDate: "2025-12-11",
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: siteTitle,
      meta: [
        { name: "description", content: "Experienced frontend developer specializing in TailWind and Python, Electron, and modern web technologies." },
        { name: "keywords", content: "Frontend Developer, JavaScript, Portfolio, umid, ISroilov Ibroximjon, umid-web, Bro, Isroilov, Engineer, Pyzone, Ibroximjon Isroilov" },
        { name: "author", content: "Ibroximjon Isroilov" },

        { property: "og:title", content: "Isroilov Ibroximjon– Frontend and Back-end Engineer" },
        { property: "og:description", content: "Explore Isroilov’s personal projects, technical skills, and contact details." },
        { property: "og:image", content: "https://senioraka.netlify.app/preview.png" },
        { property: "og:url", content: "https://senioraka.netlify.app" },
        { property: "og:type", content: "website" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Isroilov Ibroximjon– Frontend Developer" },
        { name: "twitter:description", content: "Personal portfolio and contact platform of Ibroxim." },
        { name: "twitter:image", content: "https://senioraka.netlify.app/preview.png" }
      ],
      link: [
        { rel: "manifest", href: "pwa/manifest.json" },
        { rel: "apple-touch-icon", href: "pwa/icons/apple-touch-icon.png" },
      ],
    },
  },

  modules: ["@nuxtjs/tailwindcss"],

  components: { dirs: ["~/components"] },

  tailwindcss: {
    cssPath: "~/assets/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: true,
    viewer: false,
  },

  runtimeConfig: {
    apiSecret: "123",
    public: { apiBase: "/api" },
  },

  nitro: {
    prerender: {
      crawlLinks: true, 
    },
  },
});
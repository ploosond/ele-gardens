import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import home_en from "./locales/en/home.json";
import about_en from "./locales/en/about.json";
import products_en from "./locales/en/products.json";
import product_en from "./locales/en/product.json";
import projects_en from "./locales/en/projects.json";
import project_en from "./locales/en/project.json";
import teams_en from "./locales/en/teams.json";
import contact_en from "./locales/en/contact.json";
import career_en from "./locales/en/career.json";
import header_en from "./locales/en/header.json";
import footer_en from "./locales/en/footer.json";
import newsletter_en from "./locales/en/newsletter.json";

import home_de from "./locales/de/home.json";
import about_de from "./locales/de/about.json";
import products_de from "./locales/de/products.json";
import product_de from "./locales/de/product.json";
import projects_de from "./locales/de/projects.json";
import project_de from "./locales/de/project.json";
import teams_de from "./locales/de/teams.json";
import contact_de from "./locales/de/contact.json";
import career_de from "./locales/de/career.json";
import header_de from "./locales/de/header.json";
import footer_de from "./locales/de/footer.json";
import newsletter_de from "./locales/de/newsletter.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      home: home_en,
      about: about_en,
      products: products_en,
      product: product_en,
      projects: projects_en,
      project: project_en,
      teams: teams_en,
      contact: contact_en,
      career: career_en,
      header: header_en,
      footer: footer_en,
      newsletter: newsletter_en,
    },
    de: {
      home: home_de,
      about: about_de,
      products: products_de,
      product: product_de,
      projects: projects_de,
      project: project_de,
      teams: teams_de,
      contact: contact_de,
      career: career_de,
      header: header_de,
      footer: footer_de,
      newsletter: newsletter_de,
    },
  },
  lng: "de",
  fallbackLng: "en",
  ns: [
    "home",
    "about",
    "products",
    "product",
    "projects",
    "project",
    "teams",
    "contact",
    "career",
    "header",
    "footer",
    "newsletter",
  ],
  defaultNS: "home",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

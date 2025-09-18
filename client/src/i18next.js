import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import home_en from "./locales/en/home.json";
import about_en from "./locales/en/about.json";
import products_en from "./locales/en/products.json";
import projects_en from "./locales/en/projects.json";
import teams_en from "./locales/en/teams.json";
import contact_en from "./locales/en/contact.json";
import career_en from "./locales/en/career.json";

import home_de from "./locales/de/home.json";
import about_de from "./locales/de/about.json";
import products_de from "./locales/de/products.json";
import projects_de from "./locales/de/projects.json";
import teams_de from "./locales/de/teams.json";
import contact_de from "./locales/de/contact.json";
import career_de from "./locales/de/career.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      home: home_en,
      about: about_en,
      products: products_en,
      projects: projects_en,
      teams: teams_en,
      contact: contact_en,
      career: career_en,
    },
    de: {
      home: home_de,
      about: about_de,
      products: products_de,
      projects: projects_de,
      teams: teams_de,
      contact: contact_de,
      career: career_de,
    },
  },
  lng: "de",
  fallbackLng: "en",
  ns: ["home", "about", "products", "projects", "teams", "contact", "career"],
  defaultNS: "home",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

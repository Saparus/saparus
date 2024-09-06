import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/EN.json"
import ka from "./locales/KA.json"
import ru from "./locales/RU.json"

import LanguageDetector from "i18next-browser-languagedetector"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // lng: "en",
    fallbackLng: "en",
    debug: process.env.MODE === "development" ? true : false,

    resources: {
      en: {
        translation: en,
      },
      ka: {
        translation: ka,
      },
      ru: {
        translation: ru,
      },
    },

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })

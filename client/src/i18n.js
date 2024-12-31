import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/EN.json"
import ka from "./locales/KA.json"
import ru from "./locales/RU.json"

import LanguageDetector from "i18next-browser-languagedetector"

const languages = ["en", "ka", "ru"]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    whitelist: languages,
    // debug: process.env.REACT_APP_MODE === "development" ? true : false,
    debug: false,

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
      checkWhitelist: true,
    },
  })

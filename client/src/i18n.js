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
    supportedLngs: languages,
    nonExplicitSupportedLngs: true,
    load: "languageOnly", // if true, variants like "en-US" will resolve to "en" (does not work)
    resources: {
      en: { translation: en },
      ka: { translation: ka },
      ru: { translation: ru },
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

import { create } from "zustand"

const useStore = create((set, get) => ({
  currentLanguage: navigator.language || "en",
  availableLanguages: [
    { name: "english", code: "en" },
    { name: "ქართული", code: "ka" },
    { name: "russian", code: "ru" },
  ],
  setCurrentLanguage: (newLanguage) => set({ currentLanguage: newLanguage }),
}))

export default useStore

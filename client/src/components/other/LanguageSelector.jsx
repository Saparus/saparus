import { useEffect } from "react"
import { useTranslation } from "react-i18next"

const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language.split("-")[0] // Get the base language code

  const availableLanguages = [
    { name: "english", code: "en" },
    { name: "ქართული", code: "ka" },
    { name: "pyccкий", code: "ru" },
  ]

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  useEffect(() => {
    if (!availableLanguages.some((lang) => lang.code === currentLanguage)) {
      changeLanguage("en")
    }
  }, [currentLanguage, availableLanguages])

  const handleChange = (event) => {
    const selectedLanguage = event.target.value
    changeLanguage(selectedLanguage)
  }

  return (
    <select
      className="language-selector"
      defaultValue={currentLanguage}
      onChange={handleChange}
    >
      {availableLanguages.map((language) => (
        <option
          key={language.code}
          value={language.code}
        >
          {language.name}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelector

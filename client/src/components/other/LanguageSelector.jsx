import { useTranslation } from "react-i18next"
import { useEffect } from "react"

const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const availableLanguages = [
    { name: "english", code: "en" },
    { name: "ქართული", code: "ka" },
    { name: "russian", code: "ru" },
  ]

  const changeLanguage = (language) => {
    // setCurrentLanguage(language)
    // localStorage.setItem("language", language)
    i18n.changeLanguage(language)
  }

  const handleChange = (event) => {
    const selectedLanguage = event.target.value

    changeLanguage(selectedLanguage)
  }

  // useEffect(() => {
  //   const systemDefaultLanguage = navigator.language.split("-")[0]

  //   console.log(systemDefaultLanguage)

  //   if (!currentLanguage) {
  //     changeLanguage(systemDefaultLanguage)
  //   } else {
  //     changeLanguage(currentLanguage)
  //   }
  // }, [])

  useEffect(() => {
    // const storedLanguage = localStorage.getItem("language")
    // if (storedLanguage) {
    //   i18n.changeLanguage(storedLanguage)
    // }
  }, [i18n])

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

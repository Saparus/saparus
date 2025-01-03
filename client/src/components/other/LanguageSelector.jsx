import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg"

const LanguageSelector = ({ className }) => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language.split("-")[0] // get the base language code

  const ref = useRef()

  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const availableLanguages = [
    { name: "english", code: "en" },
    { name: "ქართული", code: "ka" },
    { name: "pyccкий", code: "ru" },
  ]

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  useEffect(() => {
    if (!availableLanguages.some((language) => language.code === currentLanguage)) {
      changeLanguage("en")
    }
  }, [currentLanguage, availableLanguages])

  const selectLanguage = (language) => {
    changeLanguage(language)
    setIsSelectOpen(false)
  }

  const handleOpenSelect = () => {
    setIsSelectOpen(!isSelectOpen)
  }

  const handleCloseSelect = () => {
    setIsSelectOpen(false)
  }

  useOnClickOutside(ref, handleCloseSelect)

  const renderLanguageOptions = () => {
    if (!isSelectOpen) return ""

    return (
      <ul className="select-options-list">
        {availableLanguages
          .filter((language) => language.code !== currentLanguage)
          .map((language) => (
            <li key={language.code}>
              <button
                onClick={() => {
                  selectLanguage(language.code)
                }}
              >
                {language.name}
              </button>
            </li>
          ))}
      </ul>
    )
  }

  return (
    <div
      ref={ref}
      className={`language-selector ${className}`}
      defaultValue={currentLanguage}
    >
      <button
        onClick={handleOpenSelect}
        className={`open-select-button ${isSelectOpen ? "open" : ""}`}
      >
        <div>
          {availableLanguages.filter((language) => language.code === currentLanguage)[0].name}{" "}
        </div>
        <Arrow className={`${isSelectOpen ? "open" : ""}`} />
      </button>
      {renderLanguageOptions()}
    </div>
  )
}

export default LanguageSelector

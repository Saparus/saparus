const languages = [
  { code: "en", name: "English" },
  { code: "ka", name: "Georgian" },
  { code: "ru", name: "Russian" },
]

const LanguageSelect = ({ selectedLanguage, setSelectedLanguage }) => {
  return (
    <div className="language-select">
      {languages.map((language) => (
        <button
          key={language.code}
          className={`${selectedLanguage === language.code ? "language-selected" : ""}`}
          onClick={() => {
            setSelectedLanguage(language.code)
          }}
        >
          {language.name}
        </button>
      ))}
    </div>
  )
}

export default LanguageSelect

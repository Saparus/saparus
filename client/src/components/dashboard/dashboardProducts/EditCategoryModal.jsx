import { useState, useRef } from "react"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"

import { useOnClickOutside } from "../../../hooks/useOnClickOutside"
import { getCategories } from "../../../services/categoryServices"

import Loading from "../../other/Loading"

const languageNames = { en: "English", ka: "Georgian", ru: "Russian" }

const EditCategoryModal = ({
  languages,
  categories,
  finishEditing,
  handleAddOrEditCategory,
  editingCategory,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const [newCategories, setNewCategories] = useState(() =>
    languages.reduce((acc, language) => {
      acc[language] = {
        key: Object.keys(categories?.[language]?.[editingCategory] || {})?.[0] || "",
        value: Object.values(categories?.[language]?.[editingCategory] || {})?.[0]?.name || "",
      }
      return acc
    }, {})
  )
  const [companyImage, selectedCompanyImage] = useState("")

  const modalRef = useRef()

  const { data, isLoading, error } = useQuery(["categories"], getCategories)

  const currentCategories = data?.categories

  useOnClickOutside(modalRef, finishEditing)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage = reader.result
        selectedCompanyImage(newImage)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (language, field, value, onlyForSuggestions = false) => {
    setNewCategories((prevState) => ({
      ...prevState,
      [language]: {
        ...prevState?.[language],
        [field]: value,
      },
    }))

    if (!field || !value || onlyForSuggestions) return

    // if a key is selected, update the corresponding key in other languages and clear values
    if (field === "key") {
      let keyToApply

      const entries = Object.entries(currentCategories?.[language] || {})
      keyToApply = entries.find(([key, val]) => val.name === value)?.[0]

      languages.forEach((lang) => {
        if (lang !== language) {
          const entries = Object.entries(currentCategories?.[lang] || {})
          const foundEntry = entries.find(([key, val]) => key === keyToApply)
          const correspondingKey = foundEntry?.[0]
          if (correspondingKey) {
            setNewCategories((prevState) => ({
              ...prevState,
              [lang]: {
                ...prevState[lang],
                key: currentCategories[lang][correspondingKey].name,
                value: "",
              },
            }))
          }
        }
      })
    }

    // if a value is selected, update the corresponding value in other languages
    if (field === "value") {
      let selectedCategoryKey

      const entries = Object.entries(currentCategories?.[language] || {})
      selectedCategoryKey = entries.find(([key, val]) =>
        val.values.some(({ name }) => name === value)
      )?.[0]

      const indexOfValue = currentCategories?.[language]?.[selectedCategoryKey]?.values?.findIndex(
        (item) => item.name === value
      )

      if (selectedCategoryKey) {
        languages.forEach((lang) => {
          if (lang !== language) {
            const correspondingValue =
              currentCategories?.[lang]?.[selectedCategoryKey]?.values[indexOfValue]
            if (correspondingValue) {
              setNewCategories((prevState) => ({
                ...prevState,
                [lang]: {
                  ...prevState[lang],
                  value: correspondingValue?.name,
                },
              }))
            }
          }
        })
      }
    }
  }

  const handleSuggestionClick = (language, field, value) => {
    setNewCategories((prevState) => ({
      ...prevState,
      [language]: {
        ...prevState[language],
        [field]: value,
      },
    }))

    // If a key is selected, update the corresponding key and value in other languages
    if (field === "key") {
      languages.forEach((lang) => {
        if (lang !== language) {
          const entries = Object.entries(currentCategories?.[lang] || {})
          const foundEntry = entries.find(([key, val]) => val.name === value)
          const correspondingKey = foundEntry?.[0]
          if (correspondingKey) {
            const correspondingValue =
              currentCategories[lang][correspondingKey].values[0]?.name || ""
            setNewCategories((prevState) => ({
              ...prevState,
              [lang]: {
                ...prevState[lang],
                key: correspondingKey,
                value: correspondingValue,
              },
            }))
          }
        }
      })
    }

    // If a value is selected, update the corresponding value in other languages
    if (field === "value") {
      const selectedCategoryKey = newCategories[language]?.key
      if (selectedCategoryKey) {
        languages.forEach((lang) => {
          if (lang !== language) {
            const correspondingValue = currentCategories?.[lang]?.[
              selectedCategoryKey
            ]?.values.find((v) => v.name === value)
            if (correspondingValue) {
              setNewCategories((prevState) => ({
                ...prevState,
                [lang]: {
                  ...prevState[lang],
                  value: correspondingValue.name,
                },
              }))
            }
          }
        })
      }
    }
  }

  const getSuggestions = (language, field) => {
    if (field === "key") {
      return Object.keys(currentCategories?.[language] || {}).map(
        (key) => currentCategories[language][key].name
      )
    } else if (field === "value") {
      const selectedCategoryKey = newCategories[language]?.key
      if (selectedCategoryKey) {
        const translatedKey = Object.keys(currentCategories[language]).find(
          (key) => currentCategories[language][key].name === selectedCategoryKey
        )
        return currentCategories?.[language]?.[translatedKey]?.values.map((v) => v.name) || []
      }
    }
    return []
  }

  const handleSubmit = () => {
    const mainKey = editingCategory || newCategories.en.key

    const updatedCategories = languages.reduce((acc, language) => {
      const { key, value } = newCategories?.[language]

      if (key && value) {
        if (!acc?.[language]) {
          acc[language] = {}
        }

        if (!acc?.[language]?.[mainKey]) {
          acc[language][mainKey] = {}
        }

        // if it's a company category, handle the image
        if (key.toLowerCase() === "company" && companyImage) {
          acc[language][mainKey] = {
            [key.toLowerCase()]: {
              name: value,
              image: companyImage || "", // handle the image for the company (on backend, it's handled by uploading the image to S3 and saving the URL in the database)
            },
          }
        } else {
          acc[language][mainKey] = {
            [key.toLowerCase()]: {
              name: value,
            },
          }
        }
      }

      return acc
    }, {})

    handleAddOrEditCategory(updatedCategories)
    finishEditing()
  }

  return (
    <div className="modal">
      <div
        className="modal-content"
        ref={modalRef}
      >
        <h2>{t("Edit Categories")}</h2>
        {newCategories.en.key === "company" ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="categories-modal-upload-image"
            />
            <div className="image-input-button">{t("upload image")}</div>
            {companyImage ? (
              <img
                className="categories-modal-image"
                src={companyImage}
                alt=""
              />
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        {languages.map((language) => (
          <div
            key={language}
            className="language-section"
          >
            <h3>{t(languageNames[language])}</h3>
            <input
              className="category-key"
              placeholder="category"
              value={newCategories?.[language].key || ""} // current category key
              onChange={(e) =>
                handleInputChange(language, "key", e.target.value.toLocaleLowerCase())
              }
              onFocus={(e) =>
                handleInputChange(language, "key", e.target.value.toLocaleLowerCase(), true)
              }
              list={`key-suggestions-${language}`}
            />
            <datalist id={`key-suggestions-${language}`}>
              {getSuggestions(language, "key").map((suggestion) => (
                <option
                  key={suggestion}
                  value={suggestion}
                  onClick={() => handleSuggestionClick(language, "key", suggestion)}
                >
                  {suggestion}
                </option>
              ))}
            </datalist>
            <input
              className="category-value"
              placeholder="value"
              value={newCategories?.[language].value || ""} // category value (name)
              onChange={(e) =>
                handleInputChange(language, "value", e.target.value.toLocaleLowerCase())
              }
              onFocus={(e) =>
                handleInputChange(language, "value", e.target.value.toLocaleLowerCase(), true)
              }
              list={`value-suggestions-${language}`}
            />
            <datalist id={`value-suggestions-${language}`}>
              {getSuggestions(language, "value").map((suggestion) => (
                <option
                  key={suggestion}
                  value={suggestion}
                  onClick={() => handleSuggestionClick(language, "value", suggestion)}
                >
                  {suggestion}
                </option>
              ))}
            </datalist>
          </div>
        ))}
        <div className="modal-actions">
          <button
            onClick={handleSubmit}
            className="save-button"
          >
            {t("Save")}
          </button>
          <button
            onClick={finishEditing}
            className="cancel-button"
          >
            {t("Cancel")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditCategoryModal

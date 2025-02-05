import { useState, useRef } from "react"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"

import { useOnClickOutside } from "../../../hooks/useOnClickOutside"
import { editCategories, getCategories } from "../../../services/categoryServices"

import Loading from "../../other/Loading"

const languageNames = { en: "English", ka: "Georgian", ru: "Russian" }

const EditCategoryModal = ({
  languages,
  categories,
  finishEditing,
  handleAddCategory,
  editingCategory,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const [newCategory, setNewCategory] = useState(
    categories.find((category) => category.key === editingCategory) || {
      key: null,
      names: { en: null, ka: null, ru: null },
      values: { en: null, ka: null, ru: null },
    }
  )

  const [companyImage, selectedCompanyImage] = useState("")

  const modalRef = useRef()

  const { data, isLoading, error } = useQuery(["categories"], getCategories)

  const allCategories = data?.categories

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

  const handleInputChange = (language, key, value, onlyForSuggestions = false) => {
    if (!key || !value || onlyForSuggestions) return

    if (key === "name") {
      setNewCategory((prevState) => ({
        key: prevState.key,
        name: { ...prevState.name, [language]: value },
        value: prevState.value,
      }))
    } else if (key === "value") {
      setNewCategory((prevState) => ({
        key: prevState.key,
        name: prevState.name,
        value: { ...prevState.value, [language]: value },
      }))
    }
  }

  const handleSuggestionClick = (language, key, value) => {
    if (key === "name") {
      setNewCategory((prevState) => ({
        key: prevState.key,
        name: value,
        value: prevState.value,
      }))
    } else if (key === "value") {
      setNewCategory((prevState) => ({
        key: prevState.key,
        name: prevState.name,
        value: value,
      }))
    }
  }

  const handleSubmit = () => {
    handleAddCategory(newCategory)
    finishEditing()
  }

  return (
    <div className="modal">
      <div
        className="modal-content"
        ref={modalRef}
      >
        <h2>{t("Edit Categories")}</h2>
        {newCategory.key === "company" ? (
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
              value={newCategory?.key || ""} // current category key
              onChange={(e) =>
                handleInputChange(language, "key", e.target.value.toLocaleLowerCase())
              }
              onFocus={(e) =>
                handleInputChange(language, "key", e.target.value.toLocaleLowerCase(), true)
              }
              list={`key-suggestions-${language}`}
            />
            <datalist id={`key-suggestions-${language}`}>
              {allCategories.map((categorySuggestion) => (
                <option
                  key={categorySuggestion.key}
                  value={categorySuggestion.name[language]}
                  onClick={() => handleSuggestionClick("name", categorySuggestion.name)}
                >
                  {categorySuggestion.name[language]}
                </option>
              ))}
            </datalist>
            <input
              className="category-value"
              placeholder="value"
              value={categories?.value?.[language] || ""} // category value (name)
              onChange={(e) =>
                handleInputChange(language, "value", e.target.value.toLocaleLowerCase())
              }
              onFocus={(e) =>
                handleInputChange(language, "value", e.target.value.toLocaleLowerCase(), true)
              }
              list={`value-suggestions-${language}`}
            />
            <datalist id={`value-suggestions-${language}`}>
              {allCategories
                .find((category) => category.key === newCategory.key)
                .value.map((value) => (
                  <option
                    key={value[language]}
                    value={value[language]}
                    onClick={() => handleSuggestionClick("value", value)}
                  >
                    {value[language]}
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

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
      key: "tempKey",
      name: { en: "", ka: "", ru: "" },
      value: { en: "", ka: "", ru: "" },
    }
  )

  const [companyImage, selectedCompanyImage] = useState("")

  const modalRef = useRef()

  const { data, isLoading, error } = useQuery(["categories"], getCategories)

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
    if (!field || onlyForSuggestions) return

    if (field === "name") {
      setNewCategory((prevState) => ({
        key: prevState.key,
        name: { ...prevState.name, [language]: value },
        value: prevState.value,
      }))
    } else if (field === "value") {
      setNewCategory((prevState) => ({
        key: prevState.key,
        name: prevState.name,
        value: { ...prevState.value, [language]: value },
      }))
    }
  }

  const handleSuggestionClick = (field, value, resetValue = false) => {
    if (field === "name") {
      setNewCategory((prevState) => ({
        key: prevState.key,
        name: value,
        value: resetValue ? { en: "", ka: "", ru: "" } : prevState.value,
      }))
    } else if (field === "value") {
      setNewCategory((prevState) => ({
        key: prevState.key,
        name: prevState.name,
        value: value,
      }))
    }
  }

  const handleSubmit = () => {
    handleAddCategory({ ...newCategory, key: newCategory.name.en })
    finishEditing()
  }

  const renderNameInput = (language) => {
    return (
      <>
        <input
          className="category-key"
          placeholder="category"
          value={newCategory?.name?.[language] || ""} // current category key
          onChange={(e) => {
            const selectedValue = e.target.value.toLocaleLowerCase()
            const selectedCategory = data?.categories?.find(
              (category) => category.name[language]?.toLocaleLowerCase() === selectedValue
            )

            // console.log(selectedValue)

            if (selectedCategory) {
              handleSuggestionClick("name", selectedCategory.name, true)

              handleInputChange(language, "name", selectedValue, true)
            } else {
              handleInputChange(language, "name", selectedValue)
            }
          }}
          onFocus={(e) =>
            handleInputChange(language, "name", e.target.value.toLocaleLowerCase(), true)
          }
          list={`key-suggestions-${language}`}
        />
        {isLoading ? (
          ""
        ) : (
          <datalist id={`key-suggestions-${language}`}>
            {data?.categories?.map((category) => (
              <option
                key={category.key}
                value={category.name[language]}
                onClick={() => {
                  handleSuggestionClick("name", category)
                }}
              >
                {category.name[language]}
              </option>
            ))}
          </datalist>
        )}
      </>
    )
  }

  const renderValueInput = (language) => {
    return (
      <>
        <input
          className="category-value"
          placeholder="value"
          value={newCategory?.value?.[language] || ""} // category value (name)
          onChange={(e) => {
            const selectedValue = e.target.value.toLocaleLowerCase()

            const categoryIndex = data?.categories?.findIndex((category) =>
              category.value[language]?.some(
                (value) => value?.name?.toLocaleLowerCase() === selectedValue
              )
            )

            const selectedCategory = categoryIndex !== -1 ? data.categories[categoryIndex] : null

            const valueIndex =
              selectedCategory?.value[language]?.findIndex(
                (value) => value?.name?.toLocaleLowerCase() === selectedValue
              ) ?? -1

            if (selectedCategory && valueIndex !== -1) {
              const selectedValues = Object.fromEntries(
                Object.entries(selectedCategory.value).map(([lang, values]) => [
                  lang,
                  values[valueIndex]?.name || null,
                ])
              )

              handleSuggestionClick("value", selectedValues)
              handleInputChange(language, "value", selectedValue, false)
            } else {
              handleInputChange(language, "value", selectedValue)
            }
          }}
          onFocus={(e) =>
            handleInputChange(language, "value", e.target.value.toLocaleLowerCase(), true)
          }
          list={`value-suggestions-${language}`}
        />
        {isLoading ? (
          ""
        ) : (
          <datalist id={`value-suggestions-${language}`}>
            {data?.categories
              ?.find(
                (category) => category.key === newCategory.name.en
                // category.key === newCategory.name.en || category.key === newCategory.key
              )
              ?.value[language].map((value, index) => {
                // if (value.amount === 0) return

                return (
                  <option
                    key={value.name}
                    value={value.name}
                  >
                    {value.name}
                  </option>
                )
              })}
          </datalist>
        )}
      </>
    )
  }

  console.log(newCategory)

  return (
    <div className="modal">
      <div
        className="modal-content"
        ref={modalRef}
      >
        <h2>{t("Edit Categories")}</h2>
        {newCategory.key === "company" || newCategory.name.en === "company" ? (
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
            {renderNameInput(language)}
            {renderValueInput(language)}
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

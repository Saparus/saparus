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
  const [newCategories, setNewCategories] = useState(() =>
    languages.reduce((acc, language) => {
      acc[language] = {
        key: Object.keys(categories?.[language]?.[editingCategory] || {})?.[0] || "",
        value: Object.values(categories?.[language]?.[editingCategory] || {})?.[0]?.name || "",
      }
      return acc
    }, {})
  )

  const modalRef = useRef()

  const { data, isLoading, error } = useQuery(["categories"], getCategories)

  console.log(data?.categories)

  useOnClickOutside(modalRef, finishEditing)

  const handleInputChange = (language, field, value) => {
    setNewCategories((prevState) => ({
      ...prevState,
      [language]: {
        ...prevState?.[language],
        [field]: value,
      },
    }))
  }

  const handleSubmit = () => {
    const mainKey = editingCategory || newCategories.en.key
    console.log(newCategories.en)

    const updatedCategories = languages.reduce((acc, language) => {
      const { key, value, image } = newCategories?.[language]

      if (key && value) {
        if (!acc?.[language]) {
          acc[language] = {}
        }

        if (!acc?.[language]?.[mainKey]) {
          acc[language][mainKey] = {}
        }

        // if it's a company category, handle the image
        if (key.toLowerVase() === "company" && image) {
          acc[language][mainKey] = {
            [key.toLowerVase()]: {
              name: value,
              image: image || "", // Handle the image for the company (on backend, it's handled by uploading the image to S3 and saving the URL in the database)
            },
          }
        } else {
          acc[language][mainKey] = {
            [key.toLowerVase()]: {
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
        <h2>Edit Categories</h2>
        {languages.map((language) => (
          <div
            key={language}
            className="language-section"
          >
            <h3>{languageNames[language]}</h3>
            <input
              className="category-key"
              placeholder="category"
              value={newCategories?.[language].key || ""} // Show current category key
              onChange={(e) => handleInputChange(language, "key", e.target.value)}
            />
            <input
              className="category-value"
              placeholder="value"
              value={newCategories?.[language].value || ""} // Show current category value (name)
              onChange={(e) => handleInputChange(language, "value", e.target.value)}
            />
          </div>
        ))}
        <div className="modal-actions">
          <button
            onClick={handleSubmit}
            className="save-button"
          >
            Save
          </button>
          <button
            onClick={finishEditing}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditCategoryModal

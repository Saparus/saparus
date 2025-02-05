import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg"

import EditCategoryModal from "./EditCategoryModal"
import CategoryItem from "./CategoryItem"

const EditCategoryList = ({
  categories,
  isActive,
  setCurrentProduct,
  handleFieldEditFinish,
  handleFieldEditStart,
  selectedLanguage,
}) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false)

  const handleAddCategory = (newCategory) => {
    setCurrentProduct((prevState) => ({
      ...prevState,
      categories: {
        ...prevState.categories.filter((category) => category.key !== newCategory.key),
        ...newCategory,
      },
    }))
  }

  const removeCategory = (key) => {
    setCurrentProduct((prevState) => {
      const updatedCategories = { ...prevState.categories }

      Object.keys(updatedCategories).forEach((language) => {
        if (updatedCategories[language]?.[key]) {
          delete updatedCategories[language][key]
        }
      })

      return {
        ...prevState,
        categories: updatedCategories,
      }
    })
  }

  return (
    <div className="category-list">
      {categories.names.map((name, index) => (
        <CategoryItem
          key={`${selectedLanguage}-${name}`}
          type={name}
          value={categories.values[index]}
          editCategory={() => setCurrentlyEditing(name)}
          removeCategory={() => removeCategory(name)}
          selectedLanguage={selectedLanguage}
        />
      ))}

      {!currentlyEditing ? (
        <button
          onClick={() => setCurrentlyEditing(true)}
          className="add-category-button"
        >
          <PlusIcon className="icon" />
        </button>
      ) : null}

      {currentlyEditing &&
        createPortal(
          <EditCategoryModal
            languages={["en", "ka", "ru"]}
            categories={categories}
            finishEditing={() => setCurrentlyEditing(false)}
            selectedLanguage={selectedLanguage}
            handleAddCategory={handleAddCategory}
            removeCategory={removeCategory}
            editingCategory={currentlyEditing === true ? "" : currentlyEditing}
          />,
          document.querySelector(".app")
        )}
    </div>
  )
}

export default EditCategoryList

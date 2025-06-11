import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { createPortal } from "react-dom"

import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg"
import { getCategories } from "../../../services/categoryServices"

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
    // console.log(newCategory)

    setCurrentProduct((prevState) => ({
      ...prevState,
      categories: [
        ...prevState?.categories?.filter((category) => category.key !== newCategory.key), // to prevent duplicates from being added
        newCategory,
      ],
    }))
  }

  const removeCategory = (key) => {
    console.log(key)

    setCurrentProduct((prevState) => ({
      ...prevState,
      categories: [...prevState?.categories?.filter((category) => category.key !== key)],
    }))
  }

  const { data, isLoading, error } = useQuery(["categories"], getCategories)

  // console.log(categories)

  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <CategoryItem
          key={`${selectedLanguage}-${category.value[selectedLanguage]}`}
          // type={category.value[selectedLanguage].key}
          name={category.name[selectedLanguage]}
          value={category.value[selectedLanguage]}
          editCategory={() => setCurrentlyEditing(category.key)}
          removeCategory={() => removeCategory(category.key)}
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

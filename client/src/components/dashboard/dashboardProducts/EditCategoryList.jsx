import { useState } from "react"
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

  const categoryArray = Object.entries(categories?.[selectedLanguage] || {}).map(
    ([key, value]) => ({
      key,
      value,
    })
  )

  const handleAddOrEditCategory = (newCategories) => {
    console.log("New Categories:", newCategories)

    setCurrentProduct((prevState) => {
      const mergeCategories = (prevCategories, newCategories) => {
        return Object.keys(newCategories).reduce(
          (acc, language) => {
            acc[language] = {
              ...prevCategories[language],
              ...Object.keys(newCategories[language]).reduce((catAcc, key) => {
                if (Object.values(prevState.categories?.[language]?.[key] || {}).length >= 1) {
                  const [firstKey] = Object.keys(prevState.categories?.[language]?.[key] || {})
                  const { [firstKey]: deletedValue, ...remainingCategories } =
                    prevState.categories[language][key]

                  catAcc[key] = {
                    // ...remainingCategories,
                    ...newCategories[language][key],
                  }
                } else {
                  catAcc[key] = {
                    ...prevCategories[language]?.[key],
                    ...newCategories[language][key],
                  }
                }

                return catAcc
              }, {}),
            }
            return acc
          },
          { ...prevCategories }
        )
      }

      const mergedCategories = mergeCategories(prevState.categories, newCategories)

      console.log("Merged Categories:", mergedCategories)

      return {
        ...prevState,
        categories: mergedCategories,
      }
    })
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

  console.log({ categoryArray })

  return (
    <div className="category-list">
      {categoryArray.map(({ key, value }) => (
        <CategoryItem
          key={`${selectedLanguage}-${key}`}
          type={key}
          value={value}
          editCategory={() => setCurrentlyEditing(key)}
          removeCategory={() => removeCategory(key)}
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
            handleAddOrEditCategory={handleAddOrEditCategory}
            removeCategory={removeCategory}
            editingCategory={currentlyEditing === true ? "" : currentlyEditing}
          />,
          document.querySelector(".app")
        )}
    </div>
  )
}

export default EditCategoryList

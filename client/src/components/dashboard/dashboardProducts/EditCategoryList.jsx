import { useTranslation } from "react-i18next"

import { ReactComponent as XMarkIcon } from "../../../assets/icons/xmark.svg"
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg"

const EditCategoryList = ({
  categories,
  isActive,
  newCategory,
  setNewCategory,
  setCurrentProduct,
  handleFieldEditFinish,
  handleFieldEditStart,
}) => {
  return (
    <div className="category-list">
      {categories.map((category) =>
        category.value ? (
          <CategoryItem
            key={category.key}
            type={category.key}
            value={category.value}
            removeCategory={() => {
              setCurrentProduct((prevState) => {
                const filteredCategories = categories.filter((item) => item.key !== category.key)

                const filteredCategoriesObject = filteredCategories.reduce(
                  (acc, { key, value }) => {
                    acc[key] = value
                    return acc
                  },
                  {}
                )

                return {
                  ...prevState,
                  categories: filteredCategoriesObject,
                }
              })
            }}
          />
        ) : (
          ""
        )
      )}
      {isActive ? (
        <div className="new-category-input">
          <input
            className="category-key"
            value={newCategory.key}
            onChange={(e) => {
              setNewCategory((prevState) => ({ ...prevState, key: e.target.value }))
            }}
            placeholder="key"
          />
          <input
            className="category-value"
            value={newCategory.value}
            onChange={(e) => {
              setNewCategory((prevState) => ({ ...prevState, value: e.target.value }))
            }}
            placeholder="value"
          />
          <button
            onClick={() => {
              setCurrentProduct((prevState) => ({
                ...prevState,
                categories: { ...prevState.categories, [newCategory.key]: newCategory.value },
              }))
              setNewCategory({ key: "", value: "" })
            }}
            className="add-button"
          >
            add
          </button>
          <button
            onClick={() => {
              handleFieldEditFinish("categories")
              setNewCategory({ key: "", value: "" })
            }}
            className="discard-button"
          >
            discard
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            handleFieldEditStart("categories")
          }}
          className="add-category-button"
        >
          <PlusIcon className="icon" />
        </button>
      )}
    </div>
  )
}

export default EditCategoryList

const CategoryItem = ({ type, value, removeCategory }) => {
  const { t } = useTranslation("translation")

  return (
    <div className="category-item">
      <div className="category-item-text">
        <p className={`category-type-key`}>{t(type)}</p>
        <p className={`category-type-key`}>|</p>
        <p className={`category-${type}`}>{t(value)}</p>
      </div>

      <button onClick={removeCategory}>
        <XMarkIcon className="icon" />
      </button>
    </div>
  )
}

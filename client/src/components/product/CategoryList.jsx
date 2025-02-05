import React from "react"

const CategoryList = ({ categories }) => {
  if (!categories) return null

  return (
    <div className="category-list">
      {/* {Object.entries(categories).map(([categoryKey, categoryValue]) => (
        <div
          key={categoryKey}
          className="category-item"
        >
          {Object.entries(categoryValue).map(([subCategoryKey, subCategoryValue]) => (
            <div
              key={subCategoryKey}
              className="sub-category-item"
            >
              <strong>{subCategoryKey}</strong> | {subCategoryValue.name}
            </div>
          ))}
        </div>
      ))} */}
      {categories.names((name, index) => (
        <div
          key={name}
          className="category-item"
        >
          <strong>{name}</strong> | {categories.value[index]}
        </div>
      ))}
    </div>
  )
}

export default CategoryList

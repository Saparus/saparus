const CategoryList = ({ categories }) => {
  const categoryArray = Object.entries(categories).map(([key, value]) => ({ key, value }))

  return (
    <div className="category-list">
      {categoryArray.map((category) =>
        category.value ? (
          <p
            key={category.key}
            className={`category-item category-${category.key}`}
          >
            {category.value}
          </p>
        ) : (
          ""
        )
      )}
    </div>
  )
}

export default CategoryList

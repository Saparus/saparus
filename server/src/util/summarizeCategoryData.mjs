export const summarizeCategoryData = (products, categories) => {
  const categoryData = categories

  const languages = ["en", "ka", "ru"]

  console.log("categories:", JSON.stringify(categories, null, 2))
  console.log("products:", JSON.stringify(products, null, 2))

  let overallMinPrice = Infinity
  let overallMaxPrice = -Infinity

  categories.forEach((category) => {
    // const { key, name, value } = category

    // Initialize valueData for each language
    languages.forEach((language) => {
      category.value[language].forEach((valueItem, index) => {
        if (!valueItem.name) {
          category.value[language][index].name = category[language]
        }

        if (!valueItem.amount) {
          category.value[language][index].amount = 0
        }
      })
    })

    console.log("valueData:", JSON.stringify(valueData, null, 2))

    products.forEach((product) => {
      const { price, categories: productCategories } = product

      if (price !== undefined) {
        overallMinPrice = Math.min(overallMinPrice, price)
        overallMaxPrice = Math.max(overallMaxPrice, price)
      }

      productCategories.forEach((productCategory) => {
        if (productCategory.key === key) {
          languages.forEach((language) => {
            category.value[language].forEach((valueItem, index) => {
              if (productCategory.value[language] === valueItem.name) {
                category.value[language][index].amount += 1
              }
            })
          })
        }
      })
    })

    console.log("valueData:", JSON.stringify(valueData, null, 2))
  })

  console.log("categories:", JSON.stringify(categories, null, 2))

  return {
    categories: categories,
    minPrice: overallMinPrice,
    maxPrice: overallMaxPrice,
  }
}

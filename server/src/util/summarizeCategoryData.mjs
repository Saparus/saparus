export const summarizeCategoryData = (products, categories) => {
  const categoryData = {}
  let overallMinPrice = Infinity
  let overallMaxPrice = -Infinity

  console.log("Initial products:", JSON.stringify(products, null, 2))
  console.log("Initial categories:", JSON.stringify(categories, null, 2))

  products.forEach((product) => {
    const { price, fixedPrice, categories: productCategories } = product

    // if (price !== undefined && fixedPrice) {
    if (price !== undefined) {
      overallMinPrice = Math.min(overallMinPrice, price)
      overallMaxPrice = Math.max(overallMaxPrice, price)
    }

    Object.keys(productCategories).forEach((language) => {
      const languageCategories = productCategories[language]

      if (!categoryData[language]) {
        categoryData[language] = {}
      }

      Object.keys(languageCategories).forEach((categoryKey) => {
        if (!categories[language] || !categories[language][categoryKey]) {
          return
        }

        const categoryValues = languageCategories[categoryKey]

        Object.keys(categoryValues).forEach((subCategoryKey) => {
          const subCategoryValue = categoryValues[subCategoryKey]

          if (!categoryData[language][categoryKey]) {
            categoryData[language][categoryKey] = { name: subCategoryKey, values: [] }
          }

          const existingValue = categoryData[language][categoryKey].values.find(
            (v) => v.name === subCategoryValue.name
          )

          if (existingValue) {
            existingValue.amount = (existingValue.amount || 0) + 1
          } else {
            categoryData[language][categoryKey].values.push({ ...subCategoryValue, amount: 1 })
          }
        })
      })
    })
  })

  console.log("Overall min price:", overallMinPrice)
  console.log("Overall max price:", overallMaxPrice)

  // Iterate over categories to structure the data
  Object.keys(categories).forEach((language) => {
    const languageCategories = categories[language]

    if (!categoryData[language]) {
      categoryData[language] = {}
    }

    console.log(`Processing language: ${language}`)
    console.log(`Language categories:`, JSON.stringify(languageCategories, null, 2))

    Object.keys(languageCategories).forEach((categoryKey) => {
      const categoryValues = languageCategories[categoryKey]

      Object.keys(categoryValues).forEach((subCategoryKey) => {
        const subCategoryValues = categoryValues[subCategoryKey]

        if (!Array.isArray(subCategoryValues)) {
          console.error(`Expected subCategoryValues to be an array, but got:`, subCategoryValues)
          return
        }

        if (!categoryData[language][categoryKey]) {
          categoryData[language][categoryKey] = { name: subCategoryKey, values: [] }
        }

        subCategoryValues.forEach((value) => {
          const existingValue = categoryData[language][categoryKey].values.find(
            (v) => v.name === value.name
          )

          if (!existingValue) {
            categoryData[language][categoryKey].values.push({ ...value, amount: 0 })
          }
        })
      })
    })
  })

  console.log("Final category data:", JSON.stringify(categoryData, null, 2))

  return {
    categories: categoryData,
    minPrice: overallMinPrice,
    maxPrice: overallMaxPrice,
  }
}

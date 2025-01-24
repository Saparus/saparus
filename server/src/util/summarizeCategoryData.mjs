export const summarizeCategoryData = (products, categories) => {
  const categoryData = {}
  let overallMinPrice = Infinity
  let overallMaxPrice = -Infinity

  console.log("Initial products:", JSON.stringify(products, null, 2))
  console.log("Initial categories:", JSON.stringify(categories, null, 2))

  products.forEach((product) => {
    const { price, fixedPrice } = product

    // updates overall minimum and maximum prices if price is defined
    if (price !== undefined && fixedPrice) {
      overallMinPrice = Math.min(overallMinPrice, price)
      overallMaxPrice = Math.max(overallMaxPrice, price)
    }
  })

  console.log("Overall min price:", overallMinPrice)
  console.log("Overall max price:", overallMaxPrice)

  // iterate over categories to structure the data
  Object.keys(categories).forEach((language) => {
    const languageCategories = categories[language]

    if (!categoryData[language]) {
      categoryData[language] = {}
    }

    console.log(`Processing language: ${language}`)
    console.log(`Language categories:`, JSON.stringify(languageCategories, null, 2))

    Object.keys(languageCategories).forEach((categoryKey) => {
      const categoryValues = languageCategories[categoryKey]

      if (!categoryData[language][categoryKey]) {
        categoryData[language][categoryKey] = { name: categoryKey, amount: 0, values: [] }
      }

      console.log(`Processing category key: ${categoryKey}`)
      console.log(`Category values:`, JSON.stringify(categoryValues, null, 2))

      Object.keys(categoryValues).forEach((subCategoryKey) => {
        const subCategoryValues = categoryValues[subCategoryKey]

        if (!Array.isArray(subCategoryValues)) {
          console.log(`Expected subCategoryValues to be an array, but got:`, subCategoryValues)
          return
        }

        subCategoryValues.forEach((value) => {
          if (!categoryData[language][categoryKey].values.some((v) => v.name === value.name)) {
            categoryData[language][categoryKey].values.push(value)
          }
          categoryData[language][categoryKey].amount += 1
        })

        console.log(
          `Updated category data for ${categoryKey}:`,
          JSON.stringify(categoryData[language][categoryKey], null, 2)
        )
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

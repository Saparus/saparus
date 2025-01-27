export const summarizeCategoryData = (products, categories) => {
  const categoryData = {}
  let overallMinPrice = Infinity
  let overallMaxPrice = -Infinity

  console.log("Initial products:", JSON.stringify(products, null, 2))
  console.log("Initial categories:", JSON.stringify(categories, null, 2))

  products.forEach((product) => {
    const { price, fixedPrice, categories: productCategories } = product

    // updates overall minimum and maximum prices if price is defined
    if (price !== undefined && fixedPrice) {
      overallMinPrice = Math.min(overallMinPrice, price)
      overallMaxPrice = Math.max(overallMaxPrice, price)
    }

    // iterate over product categories to update the amount of products for each category
    Object.keys(productCategories).forEach((language) => {
      const languageCategories = productCategories[language]

      if (!categoryData[language]) {
        categoryData[language] = {}
      }

      Object.keys(languageCategories).forEach((categoryKey) => {
        const categoryValues = languageCategories[categoryKey]

        Object.keys(categoryValues).forEach((subCategoryKey) => {
          const subCategoryValues = categoryValues[subCategoryKey]

          if (!categoryData[language][categoryKey]) {
            categoryData[language][categoryKey] = { name: subCategoryKey, amount: 0, values: [] }
          }

          subCategoryValues.forEach((value) => {
            if (!categoryData[language][categoryKey].values.some((v) => v.name === value.name)) {
              categoryData[language][categoryKey].values.push(value)
            }
            categoryData[language][categoryKey].amount += 1
          })
        })
      })
    })
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

      Object.keys(categoryValues).forEach((subCategoryKey) => {
        const subCategoryValues = categoryValues[subCategoryKey]

        if (!Array.isArray(subCategoryValues)) {
          console.error(`Expected subCategoryValues to be an array, but got:`, subCategoryValues)
          return
        }

        if (!categoryData[language][categoryKey]) {
          categoryData[language][categoryKey] = { name: subCategoryKey, amount: 0, values: [] }
        }

        console.log(`Processing sub-category key: ${subCategoryKey}`)
        console.log(`Sub-category values:`, JSON.stringify(subCategoryValues, null, 2))

        subCategoryValues.forEach((value) => {
          if (!categoryData[language][categoryKey].values.some((v) => v.name === value.name)) {
            categoryData[language][categoryKey].values.push(value)
          }
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

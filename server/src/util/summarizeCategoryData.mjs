export const summarizeCategoryData = (products, categories) => {
  const categoryData = {}
  let overallMinPrice = Infinity
  let overallMaxPrice = -Infinity

  products.forEach((product) => {
    const { price, fixedPrice } = product

    // updates overall minimum and maximum prices if price is defined
    if (price !== undefined && fixedPrice) {
      overallMinPrice = Math.min(overallMinPrice, price)
      overallMaxPrice = Math.max(overallMaxPrice, price)
    }
  })

  // iterate over categories to structure the data
  Object.keys(categories).forEach((language) => {
    const languageCategories = categories[language]

    if (!categoryData[language]) {
      categoryData[language] = {}
    }

    Object.keys(languageCategories).forEach((categoryKey) => {
      const categoryValues = languageCategories[categoryKey]

      if (!categoryData[language][categoryKey]) {
        categoryData[language][categoryKey] = { name: categoryKey, amount: 0, values: [] }
      }

      categoryValues.forEach((value) => {
        if (!categoryData[language][categoryKey].values.some((v) => v.name === value.name)) {
          categoryData[language][categoryKey].values.push(value)
        }
        categoryData[language][categoryKey].amount += 1
      })
    })
  })

  return {
    categories: categoryData,
    minPrice: overallMinPrice,
    maxPrice: overallMaxPrice,
  }
}

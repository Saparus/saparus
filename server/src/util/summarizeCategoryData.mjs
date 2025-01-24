export const summarizeCategoryData = (products, categories) => {
  const categoryData = {}
  const companyData = {}
  let overallMinPrice = Infinity
  let overallMaxPrice = -Infinity

  products.forEach((product) => {
    const { price, fixedPrice, categories } = product

    // updates overall minimum and maximum prices if price is defined
    if (price !== undefined && fixedPrice) {
      overallMinPrice = Math.min(overallMinPrice, price)
      overallMaxPrice = Math.max(overallMaxPrice, price)
    }

    // iterates over all keys in categories
    Object.keys(categories).forEach((language) => {
      const languageCategories = categories[language]

      Object.keys(languageCategories).forEach((categoryKey) => {
        const categoryValues = languageCategories[categoryKey]

        Object.keys(categoryValues).forEach((languageSpecificCategory) => {
          const value = categoryValues[languageSpecificCategory]

          // adds company to companyData if defined
          if (categoryKey === "company") {
            if (!companyData[languageSpecificCategory]) {
              companyData[languageSpecificCategory] = { name: languageSpecificCategory, amount: 0 }
            }
            companyData[languageSpecificCategory].amount += 1
          } else {
            // adds other categories to the categoryData
            if (!categoryData[language]) {
              categoryData[language] = {}
            }

            if (!categoryData[language][categoryKey]) {
              categoryData[language][categoryKey] = { name: categoryKey, amount: 0, values: [] }
            }

            if (!categoryData[language][categoryKey].values.includes(languageSpecificCategory)) {
              categoryData[language][categoryKey].values.push(languageSpecificCategory)
            }

            categoryData[language][categoryKey].amount += 1
          }
        })
      })
    })
  })

  const companiesArray = Object.values(companyData)

  return {
    categories: categoryData,
    companies: companiesArray,
    minPrice: overallMinPrice,
    maxPrice: overallMaxPrice,
  }
}

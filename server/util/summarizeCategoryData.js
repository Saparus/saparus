const summarizeCategoryData = (products) => {
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

    // adds company to companyData if defined
    const company = categories.company
    if (company !== undefined) {
      if (!companyData[company]) {
        companyData[company] = { name: company, amount: 0 }
      }
      companyData[company].amount += 1 // Increment the count for this company
    }

    // iterates over all keys in categories, except for the company key
    Object.keys(categories).forEach((key) => {
      if (key !== "company") {
        const categoryValue = categories[key]
        if (!categoryData[key]) {
          categoryData[key] = {}
        }

        if (!categoryData[key][categoryValue]) {
          categoryData[key][categoryValue] = { name: categoryValue, amount: 0 }
        }
        categoryData[key][categoryValue].amount += 1
      }
    })
  })

  // converts categoryData and companyData to the array
  const categoriesArray = {}
  Object.keys(categoryData).forEach((key) => {
    categoriesArray[key] = Object.values(categoryData[key])
  })

  const companiesArray = Object.values(companyData)

  return {
    categories: categoriesArray,
    companies: companiesArray,
    minPrice: overallMinPrice,
    maxPrice: overallMaxPrice,
  }
}

module.exports = summarizeCategoryData

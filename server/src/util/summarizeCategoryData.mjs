export const summarizeCategoryData = (products, categories) => {
  const languages = ["en", "ka", "ru"]

  let overallMinPrice = Infinity
  let overallMaxPrice = -Infinity

  categories.forEach((category) => {
    languages.forEach((language) => {
      category.value[language].forEach((valueItem, index) => {
        if (!valueItem.name && !valueItem.amount) {
          category.value[language][index] = {
            name: valueItem.name,
            amount: 0,
          }
        }
      })
    })

    products.forEach((product) => {
      const { price, categories: productCategories } = product

      if (price !== undefined) {
        overallMinPrice = Math.min(overallMinPrice, price)
        overallMaxPrice = Math.max(overallMaxPrice, price)
      }

      productCategories.forEach((productCategory) => {
        if (productCategory.key === category.key) {
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
  })

  return {
    categories: categories,
    minPrice: overallMinPrice,
    maxPrice: overallMaxPrice,
  }
}

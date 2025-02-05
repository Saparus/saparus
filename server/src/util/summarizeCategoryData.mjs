export const summarizeCategoryData = (products, categories) => {
  const languages = ["en", "ka", "ru"]

  let overallMinPrice = Infinity
  let overallMaxPrice = -Infinity

  categories.forEach((category, categoryIndex) => {
    languages.forEach((language) => {
      category.value[language].forEach((valueItem, index) => {
        if (!valueItem && !valueItem.amount) {
          categories[categoryIndex].value[language][index] = {
            name: valueItem,
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
                categories[index].value[language][index].amount += 1
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

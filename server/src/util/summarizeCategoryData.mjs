export const summarizeCategoryData = (products, categories) => {
  const categoryData = []

  const languages = ["en", "ka", "ru"]

  console.log("categories:", JSON.stringify(categories, null, 2))
  console.log("products:", JSON.stringify(products, null, 2))

  let overallMinPrice = Infinity
  let overallMaxPrice = -Infinity

  categories.forEach((category) => {
    const { key, name, value } = category

    const valueData = {}

    languages.forEach((language) => {
      valueData[language] = []

      value[language].forEach((valueItem) => {
        languages.forEach((language) => {
          if (!valueData[language][valueItem[language]]) {
            valueData[language][valueItem[language]] = 0
          }
        })
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
            value[language].forEach((valueItem) => {
              if (productCategory.value[language] === valueItem[language]) {
                valueData[language][valueItem[language]] += 1
              }
            })
          })
        }
      })
    })

    console.log("valueData:", JSON.stringify(valueData, null, 2))

    const valueArray = {}

    languages.forEach((language) => {
      valueArray[language] = Object.keys(valueData[language]).map((key) => ({
        name: key,
        amount: valueData[language][key],
      }))
    })

    console.log("valueArray:", JSON.stringify(valueArray, null, 2))

    categoryData.push({
      key,
      name,
      value: valueArray,
    })
  })

  return {
    categories: categoryData,
    minPrice: overallMinPrice,
    maxPrice: overallMaxPrice,
  }
}

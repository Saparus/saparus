export const filterProducts = (products, filter, language = "en") => {
  console.log("Initial Products:", JSON.stringify(products, null, 2))
  console.log("Filter:", JSON.stringify(filter, null, 2))
  console.log("Language:", language)

  const appliedFilter = cleanFilter(filter)

  const translatedProducts = products.map((product) => {
    const { name, description, categories } = product

    return {
      ...product,
      name: name[language],
      description: description[language],
      categories: categories,
    }
  })

  console.log("Translated Products:", JSON.stringify(translatedProducts, null, 2))

  const filteredProducts = translatedProducts.filter((item) => {
    const { name, description, categories, price, ...rest } = item

    const matchesFilter = Object.keys(appliedFilter).every((key) => {
      if (key === "name") {
        return name.toLowerCase().includes(appliedFilter[key].toLowerCase())
      }

      if (key === "description") {
        return description.toLowerCase().includes(appliedFilter[key].toLowerCase())
      }

      if (key === "categories") {
        const categoryFilters = appliedFilter[key]

        return Object.keys(categoryFilters).every((categoryKey) => {
          const expectedValue = categoryFilters[categoryKey]
          const actualValues = []

          Object.values(categories).forEach((languageSpecificCategories) => {
            Object.Entries(languageSpecificCategories).forEach(([mainKey, category]) => {
              if (mainKey !== categoryKey) return

              Object.values(category).forEach((value) => {
                actualValues.push(value.name)
              })
            })
          })

          console.log("expectedValue:", JSON.stringify(expectedValue, null, 2))
          console.log("actualValues:", JSON.stringify(actualValues, null, 2))

          return actualValues.includes(expectedValue)
        })
      }

      if (key === "minPrice") {
        return price >= appliedFilter[key]
      }

      if (key === "maxPrice") {
        return price <= appliedFilter[key]
      }

      return rest[key] === appliedFilter[key]
    })

    console.log("Product Matches Filter:", matchesFilter, item)

    return matchesFilter
  })

  console.log("Filtered Products:", JSON.stringify(filteredProducts, null, 2))
  return filteredProducts
}

const cleanFilter = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]
    if (
      value === null ||
      value === "" ||
      (typeof value === "object" && Object.keys(value).length === 0)
    ) {
      return acc
    }
    if (typeof value === "object" && !Array.isArray(value)) {
      const cleaned = cleanFilter(value)
      if (Object.keys(cleaned).length > 0) {
        acc[key] = cleaned
      }
    } else {
      acc[key] = value
    }
    return acc
  }, {})
}

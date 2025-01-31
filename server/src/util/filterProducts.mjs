export const filterProducts = (products, filter, language = "en") => {
  console.log("Initial Products:", JSON.stringify(products, null, 2))
  console.log("Filter:", JSON.stringify(filter, null, 2))
  console.log("Language:", language)

  const appliedFilter = cleanFilter(filter)

  const translatedProducts = products.map((product) => {
    const { name, description, categories } = product

    const translatedCategories = {}
    if (categories && categories.en) {
      Object.keys(categories.en).forEach((categoryKey) => {
        const category = categories.en[categoryKey]
        Object.keys(category).forEach((subKey) => {
          translatedCategories[categoryKey] = category[subKey].name
        })
      })
    }

    return {
      ...product,
      name: name[language],
      description: description[language],
      categories: translatedCategories,
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
          const actualValue = categories[categoryKey]
          return actualValue === expectedValue
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

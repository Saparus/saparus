export const filterProducts = (products, filter, language = "en") => {
  console.log("Initial Products:", JSON.stringify(products, null, 2))
  console.log("Filter:", JSON.stringify(filter, null, 2))
  console.log("Language:", language)

  const appliedFilter = cleanFilter(filter)
  console.log("Applied Filter:", JSON.stringify(appliedFilter, null, 2))

  const translatedProducts = products.map((product) => {
    const { name, description, categories } = product

    console.log("Processing product:", JSON.stringify(product, null, 2))

    // Translate categories based on the selected language
    const translatedCategories = {}
    if (categories && categories[language]) {
      Object.keys(categories[language]).forEach((categoryKey) => {
        const category = categories[language][categoryKey]
        Object.keys(category).forEach((subKey) => {
          translatedCategories[categoryKey] = category[subKey].name
        })
      })
    }

    const translatedProduct = {
      ...product,
      name: name[language],
      description: description[language],
      categories: translatedCategories,
    }

    console.log("Translated Product:", JSON.stringify(translatedProduct, null, 2))
    return translatedProduct
  })

  console.log("Translated Products:", JSON.stringify(translatedProducts, null, 2))

  const filteredProducts = translatedProducts.filter((item) => {
    console.log("Evaluating product for filtering:", JSON.stringify(item, null, 2))

    const { name, description, categories, price, ...rest } = item

    const matchesFilter = Object.keys(appliedFilter).every((key) => {
      console.log("Checking filter key:", key, "with value:", appliedFilter[key])

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
          // Look up the category value in the English part of the categories object
          const actualValue = item.categories.en?.[categoryKey]?.[categoryKey]?.name
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
  console.log("Cleaning filter object:", JSON.stringify(obj, null, 2))

  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]
    console.log("Checking filter key:", key, "with value:", value)

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

    console.log("Updated cleaned filter:", JSON.stringify(acc, null, 2))
    return acc
  }, {})
}

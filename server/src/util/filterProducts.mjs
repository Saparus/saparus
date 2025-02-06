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

        for (const categoryKey in categoryFilters) {
          const expectedValue = categoryFilters[categoryKey]
          let found = false

          for (const language in categories) {
            const languageSpecificCategories = categories[language]

            // if the language does not have the filtered category, skip
            if (!languageSpecificCategories.hasOwnProperty(categoryKey)) continue

            const category = languageSpecificCategories[categoryKey]

            // iterate over subcategories to check the name property
            for (const subKey in category) {
              if (category[subKey].name === expectedValue) {
                found = true
                break
              }
            }
            if (found) break
          }

          console.log("expectedValue:", JSON.stringify(expectedValue, null, 2))
          console.log("found for categoryKey", categoryKey, ":", found)

          // if the expected value was not found for any language, filter does not match
          if (!found) return false
        }
        return true
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

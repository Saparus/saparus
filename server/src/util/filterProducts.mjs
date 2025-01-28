export const filterProducts = (products, filter, language = "en") => {
  console.log("Initial Products:", JSON.stringify(products, null, 2))
  console.log("Filter:", JSON.stringify(filter, null, 2))
  console.log("Language:", language)

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

    const matchesFilter = Object.keys(filter).every((key) => {
      if (key === "name") {
        return name.toLowerCase().includes(filter[key].toLowerCase())
      }

      if (key === "description") {
        return description.toLowerCase().includes(filter[key].toLowerCase())
      }

      if (key === "categories") {
        const categoryFilters = filter[key]
        return Object.keys(categoryFilters).every((categoryKey) => {
          const expectedValue = categoryFilters[categoryKey]
          const actualValue = categories[categoryKey]
          return actualValue === expectedValue
        })
      }

      if (key === "minPrice") {
        return price >= filter[key]
      }

      if (key === "maxPrice") {
        return price <= filter[key]
      }

      return rest[key] === filter[key]
    })

    console.log("Product Matches Filter:", matchesFilter, item)
    return matchesFilter
  })

  console.log("Filtered Products:", JSON.stringify(filteredProducts, null, 2))
  return filteredProducts
}

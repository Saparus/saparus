export const filterProducts = (products, filter, language = "en") => {
  console.log("Initial Products:", JSON.stringify(products, null, 2))
  console.log("Filter:", JSON.stringify(filter, null, 2))
  console.log("Language:", language)

  // Translate products to the specified language
  const translatedProducts = products.map((product) => {
    const { name, description, categories } = product

    // Flatten the categories structure for easier filtering
    const translatedCategories = {}
    if (categories && categories[language]) {
      Object.keys(categories[language]).forEach((categoryKey) => {
        const category = categories[language][categoryKey]
        Object.keys(category).forEach((subKey) => {
          translatedCategories[categoryKey] = category[subKey].name
        })
      })
    }

    return {
      ...product,
      name: name[language],
      description: description[language],
      categories: translatedCategories, // Use flattened categories
    }
  })

  console.log("Translated Products:", JSON.stringify(translatedProducts, null, 2))

  // Filter products based on the filter criteria
  const filteredProducts = translatedProducts.filter((item) => {
    const { name, description, categories, price, ...rest } = item

    // Check if the product matches all filter criteria
    const matchesFilter = Object.keys(filter).every((key) => {
      if (key === "name") {
        // Filter by name (case-insensitive)
        return name.toLowerCase().includes(filter[key].toLowerCase())
      }

      if (key === "description") {
        // Filter by description (case-insensitive)
        return description.toLowerCase().includes(filter[key].toLowerCase())
      }

      if (key === "categories") {
        // Filter by categories
        const categoryFilters = filter[key]
        return Object.keys(categoryFilters).every((categoryKey) => {
          const expectedValue = categoryFilters[categoryKey]
          const actualValue = categories[categoryKey]
          return actualValue === expectedValue
        })
      }

      if (key === "minPrice") {
        // Filter by minimum price
        return price >= filter[key]
      }

      if (key === "maxPrice") {
        // Filter by maximum price
        return price <= filter[key]
      }

      // Filter by other fields (e.g., brand, inStock, etc.)
      return rest[key] === filter[key]
    })

    console.log("Product Matches Filter:", matchesFilter, item)
    return matchesFilter
  })

  console.log("Filtered Products:", JSON.stringify(filteredProducts, null, 2))
  return filteredProducts
}

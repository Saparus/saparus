export const filterProducts = (products, filter, language = "en") => {
  const translatedProducts = products.map((product) => {
    const { name, description, categories } = product

    const translatedProduct = {
      ...product,
      name: name[language],
      description: description[language],
      categories,
    }

    return translatedProduct
  })

  const filteredProducts = translatedProducts.filter((item) => {
    const { name, description, categories, price, ...rest } = item

    const matchesFilter = Object.keys(filter).every((key) => {
      if (key === "name") {
        const match = name.toLowerCase().includes(filter[key].toLowerCase())
        return match
      }

      if (key === "description") {
        const match = description.toLowerCase().includes(filter[key].toLowerCase())

        return match
      }

      if (key === "categories") {
        const categoryFilters = filter.categories
        if (!categoryFilters || Object.keys(categoryFilters).length === 0) return true

        const matchesCategories = Object.entries(categoryFilters).every(
          ([filterKey, expectedValue]) => {
            if (expectedValue === "") return true

            const categoryMatch = categories.some((categoryObj) => {
              if (categoryObj.key !== filterKey) return false
              return Object.values(categoryObj.value).some(
                (val) => val.toString().toLowerCase() === expectedValue.toString().toLowerCase()
              )
            })

            return categoryMatch
          }
        )

        return matchesCategories
      }

      if (key === "minPrice") {
        const match = price >= filter.minPrice

        return match
      }

      if (key === "maxPrice") {
        const match = price <= filter.maxPrice

        return match
      }

      const match = rest[key] === filter[key]

      return match
    })

    return matchesFilter
  })

  return filteredProducts
}

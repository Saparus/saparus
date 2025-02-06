export const filterProducts = (products, filter, language = "en") => {
  console.log("Initial Products:", JSON.stringify(products, null, 2))
  console.log("Filter:", JSON.stringify(filter, null, 2))
  console.log("Language:", language)

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

    const matchesFilter = Object.keys(filter).every((key) => {
      if (key === "name") {
        return name.toLowerCase().includes(appliedFilter[key].toLowerCase())
      }

      if (key === "description") {
        return description.toLowerCase().includes(appliedFilter[key].toLowerCase())
      }

      if (key === "categories") {
        const categoryFilters = filter.categories

        if (!categoryFilters || Object.keys(categoryFilters).length === 0) return true

        const matchesCategories = Object.entries(categoryFilters).every(
          ([filterKey, expectedValue]) => {
            return categories.some((categoryObject) => {
              if (categoryObject.key !== filterKey) return false
              return Object.values(categoryObject.value).some(
                (value) => value.toString().toLowerCase() === expectedValue.toString().toLowerCase()
              )
            })
          }
        )

        if (!matchesCategories) return false
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

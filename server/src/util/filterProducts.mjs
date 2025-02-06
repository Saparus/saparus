export const filterProducts = (products, filter, language = "en") => {
  console.log("Initial Products:", JSON.stringify(products, null, 2))
  console.log("Filter:", JSON.stringify(filter, null, 2))
  console.log("Language:", language)

  const translatedProducts = products.map((product) => {
    const { name, description, categories } = product

    const translatedProduct = {
      ...product,
      name: name[language],
      description: description[language],
      categories,
    }

    console.log("Translated Product:", JSON.stringify(translatedProduct, null, 2))
    return translatedProduct
  })

  console.log("Translated Products:", JSON.stringify(translatedProducts, null, 2))

  const filteredProducts = translatedProducts.filter((item) => {
    const { name, description, categories, price, ...rest } = item

    console.log("Evaluating Product:", JSON.stringify(item, null, 2))

    const matchesFilter = Object.keys(filter).every((key) => {
      console.log("Checking filter key:", key)

      if (key === "name") {
        const match = name.toLowerCase().includes(filter[key].toLowerCase())
        console.log("Name Match:", match, "| Filter Value:", filter[key], "| Product Value:", name)
        return match
      }

      if (key === "description") {
        const match = description.toLowerCase().includes(filter[key].toLowerCase())
        console.log(
          "Description Match:",
          match,
          "| Filter Value:",
          filter[key],
          "| Product Value:",
          description
        )
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
            console.log("Category Match for", filterKey, ":", categoryMatch)
            return categoryMatch
          }
        )

        console.log("Final Category Match:", matchesCategories)
        return matchesCategories
      }

      if (key === "minPrice") {
        const match = price >= filter.minPrice
        console.log(
          "Min Price Match:",
          match,
          "| Filter Value:",
          filter.minPrice,
          "| Product Value:",
          price
        )
        return match
      }

      if (key === "maxPrice") {
        const match = price <= filter.maxPrice
        console.log(
          "Max Price Match:",
          match,
          "| Filter Value:",
          filter.maxPrice,
          "| Product Value:",
          price
        )
        return match
      }

      const match = rest[key] === filter[key]
      console.log(
        "Other Filter Match:",
        match,
        "| Key:",
        key,
        "| Filter Value:",
        filter[key],
        "| Product Value:",
        rest[key]
      )
      return match
    })

    console.log("Product Matches Filter:", matchesFilter, item)
    return matchesFilter
  })

  console.log("Filtered Products:", JSON.stringify(filteredProducts, null, 2))
  return filteredProducts
}

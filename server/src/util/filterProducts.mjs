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
        console.log("category Filters:", JSON.stringify(categoryFilters, null, 2))

        if (!categoryFilters || Object.keys(categoryFilters).length === 0) {
          console.log("no category filters provided; condition matches by default.")
          return true
        }

        const matchesCategories = Object.entries(categoryFilters).every(
          ([filterKey, expectedValue]) => {
            console.log(`checking filter key: ${filterKey} with expected value: ${expectedValue}`)

            const categoryMatch = categories.some((categoryObj) => {
              console.log("evaluating category object:", JSON.stringify(categoryObj, null, 2))

              if (categoryObj.key !== filterKey) {
                console.log(
                  `category key ${categoryObj.key} does not match filter key ${filterKey}.`
                )
                return false
              }

              const valueMatch = Object.values(categoryObj.value).some(
                (val) => val.toString().toLowerCase() === expectedValue.toString().toLowerCase()
              )

              console.log(`value match for category key ${filterKey}: ${valueMatch}`)
              return valueMatch
            })

            console.log(`category match for filter key ${filterKey}: ${categoryMatch}`)
            return categoryMatch
          }
        )

        // if the expected value was not found for any category filter, filter does not match
        if (!matchesCategories) {
          console.log("product does not match category filters.")
          return false
        }

        console.log("product matches category filters.")
      }

      if (key === "minPrice") {
        return price >= appliedFilter[key]
      }

      if (key === "maxPrice") {
        return price <= appliedFilter[key]
      }

      return rest[key] === appliedFilter[key]
    })

    console.log("product Matches Filter:", matchesFilter, item)

    return matchesFilter
  })

  console.log("filtered Products:", JSON.stringify(filteredProducts, null, 2))

  return filteredProducts
}

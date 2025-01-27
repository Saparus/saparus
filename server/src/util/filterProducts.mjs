export const filterProducts = (products, filter, language = "en") => {
  console.log("Initial Products:", JSON.stringify(products, null, 2))
  console.log("Filter:", JSON.stringify(filter, null, 2))
  console.log("Language:", language)

  const translatedProducts = products.map((product) => {
    const { name, description } = product

    const translatedProduct = {
      ...product,
      name: name[language],
      description: description[language],
    }

    console.log("Translated Product:", JSON.stringify(translatedProduct, null, 2))
    return translatedProduct
  })

  const filteredProducts = translatedProducts.filter((item) => {
    const { name, description, categories, ...rest } = item

    const matchesFilter = Object.keys(filter).every((key) => {
      if (key === "name" || key === "description") {
        const nameMatches = name.toLowerCase().includes(filter[key].toLowerCase())
        const descriptionMatches = description.toLowerCase().includes(filter[key].toLowerCase())
        console.log(`Checking ${key}:`, { nameMatches, descriptionMatches })
        return nameMatches || descriptionMatches
      }

      if (key === "categories") {
        const categoryMatches = Object.keys(filter[key]).every((categoryKey) => {
          const categorySubKey = Object.keys(filter[key][categoryKey])?.[0]

          if (filter?.[key]?.[categoryKey]?.[categorySubKey]) {
            return true
          }

          const match = categories[categoryKey] === filter[key][categoryKey]
          console.log(`Checking category ${categoryKey}:`, match)
          return match
        })
        return categoryMatches
      }

      const restMatches = rest[key] === filter[key]
      console.log(`Checking ${key}:`, restMatches)
      return restMatches
    })

    console.log("Matches Filter:", matchesFilter)
    return matchesFilter
  })

  console.log("Filtered Products:", JSON.stringify(filteredProducts, null, 2))
  return filteredProducts
}

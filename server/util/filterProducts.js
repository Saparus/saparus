const filterProducts = (products, filter, language = "en") => {
  const translatedProducts = products.map((product) => {
    const { name, description } = product

    return {
      ...product,
      name: name[language],
      description: description[language],
    }
  })

  const filteredProducts = translatedProducts.filter((item) => {
    const { name, description, categories, ...rest } = item

    const matchesFilter = Object.keys(filter).every((key) => {
      if (key === "name" || key === "description") {
        return (
          name.toLowerCase().includes(filter[key].toLowerCase()) ||
          description.toLowerCase().includes(filter[key].toLowerCase())
        )
      }

      if (key === "categories") {
        return Object.keys(filter[key]).every((categoryKey) => {
          if (filter[key][categoryKey] === "") {
            return true
          }
          return categories[categoryKey] === filter[key][categoryKey]
        })
      }

      return rest[key] === filter[key]
    })

    return matchesFilter
  })

  return filteredProducts
}

module.exports = filterProducts

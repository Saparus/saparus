const filterProducts = (products, filter, language = "en") => {
  const translatedProducts = products.map((product) => {
    const { name, description } = product

    return { ...product, name: name[language], description: description[language] }
  })

  const filteredProducts = translatedProducts.filter((item) => {
    const { name, description, ...rest } = item

    const matchesFilter = Object.keys(filter).every((key) => {
      if (key === "name" || key === "description") {
        return (
          name.includes(filter[key].toLowerCase()) ||
          description.toLowerCase().includes(filter[key].toLowerCase())
        )
      }

      return rest[key] === filter[key]
    })

    return matchesFilter
  })

  return filteredProducts
}

export default filterProducts

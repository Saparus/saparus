const filterProducts = (products, filter, language = "en") => {
  console.log(filter)

  const translatedProducts = products.map((product) => {
    const { name, description } = product

    return { ...product, name: name[language], description: description[language] }
  })

  const filteredProducts = translatedProducts.filter((item) => {
    const { name, description, ...rest } = item

    const matchesFilter = Object.keys(filter).every((key) => {
      if (key === "name" || key === "description") return true

      return rest[key] === filter[key]
    })

    return matchesFilter
  })

  return filteredProducts
}

export default filterProducts

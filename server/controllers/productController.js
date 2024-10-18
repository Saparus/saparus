const productList = require("../data/products")

const filterProducts = require("../util/filterProducts")
const summarizeCategoryData = require("../util/summarizeCategoryData")

const getCategories = async (req, res) => {
  const dataToSend = summarizeCategoryData(productList)

  res.status(201).json(dataToSend)
}

// gets all products (in a passed language) with filtering, pagination, and sorting options
const getProducts = async (req, res) => {
  const { filter, language, limit, page } = req.query

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  // parses filter from the query string
  const parsedFilter = JSON.parse(decodeURIComponent(filter))

  // function to filter products based on minPrice and maxPrice
  const filterProductsByPrice = (products, minPrice, maxPrice) => {
    return products.filter((product) => {
      const productPrice = product.price

      if (!productPrice || !product.fixedPrice) {
        return true
      }

      return (
        (minPrice === undefined || productPrice >= minPrice) &&
        (maxPrice === undefined || productPrice <= maxPrice)
      )
    })
  }

  let filteredProducts

  // checks if filter is present
  if (filter) {
    const { minPrice, maxPrice, ...otherFilters } = parsedFilter

    filteredProducts = filterProducts(productList, otherFilters, languageToApply)

    // checks for minPrice and maxPrice in the parsed filter

    if (minPrice || maxPrice) {
      filteredProducts = filterProductsByPrice(filteredProducts, minPrice, maxPrice)
    }
  } else {
    filteredProducts = productList // if there is no filter, uses all products
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const hasNextPage = endIndex < filteredProducts.length

  const dataToSend = {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      hasNextPage: hasNextPage,
      totalProducts: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
    },
  }

  res.status(200).json(dataToSend)
}

// gets single product (in a passed language)
const getProduct = async (req, res) => {
  const { language } = req.query
  const { id } = req.params

  const product = productList.filter((product) => product.id === Number(id))[0]

  const { name, description } = product

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const productToSend = {
    ...product,
    name: name[languageToApply],
    description: description[languageToApply],
  }

  res.status(201).json(productToSend)
}

// gets single product for editing (it has product in every language, unlike getSingleProduct)
// PROTECTED
const getEditProduct = async (req, res) => {
  const { id } = req.params

  const productToSend = productList.filter((product) => product.id === Number(id))[0]

  res.status(201).json(productToSend)
}

const deleteProduct = async (req, res) => {
  const { id } = req.params

  res.status(201).json({ message: "delete product" })
}

// PROTECTED
const addProduct = async (req, res) => {
  const { name, description, images, inStock, fixedPrice, price, categories } = req.body

  res.status(201).json({ message: "add Product" })
}

// PROTECTED
const editProduct = async (req, res) => {
  const { id, name, description, images, inStock, fixedPrice, price, categories } = req.body

  res.status(201).json({ message: "edit Product" })
}

module.exports = {
  getCategories,
  getProducts,
  getProduct,
  getEditProduct,
  deleteProduct,
  addProduct,
  editProduct,
}

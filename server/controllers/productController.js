const productList = require("../data/products")

const filterProducts = require("../util/filterProducts")

const getCategories = async (req, res) => {}

// gets all products (in a passed language) with filtering, pagination, and sorting options
const getProducts = async (req, res) => {
  const { filter, language, limit, page } = req.query

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const parsedFilter = JSON.parse(decodeURIComponent(filter))

  let filteredProducts

  if (filter) filteredProducts = filterProducts(productList, parsedFilter, languageToApply)
  else filteredProducts = productList

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const hasNextPage = endIndex < filteredProducts.length

  const productsToSend = {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      hasNextPage: hasNextPage,
      totalProducts: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
    },
  }

  res.status(201).json(productsToSend)
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
const addProducts = async (req, res) => {
  const { name, images, inStock, fixedPrice, price } = req.body

  res.status(201).json({ message: "add Product" })
}

// PROTECTED
const editProduct = async (req, res) => {
  const { id, name, description, images, inStock, fixedPrice, price } = req.body

  res.status(201).json({ message: "edit Product" })
}

module.exports = {
  getProducts,
  getProduct,
  getEditProduct,
  deleteProduct,
  addProducts,
  editProduct,
}

// gets all products (in a passed language) with filtering, pagination, and sorting options
const getProducts = async (req, res) => {
  const { name, image, inStock, fixedPrice, price } = req.body
}

// gets single product (in a passed language)
const getSingleProduct = async (req, res) => {
  const { language } = req.body
  const { id } = req.params
}

// gets single product for editing (it has product in every language, unlike getSingleProduct)
// PROTECTED
const getEditProduct = async (req, res) => {
  const { id } = req.params
}

// PROTECTED
const addProducts = async (req, res) => {
  const { name, images, inStock, fixedPrice, price } = req.body
}

// PROTECTED
const updateProduct = async (req, res) => {
  const { id, name, images, inStock, fixedPrice, price } = req.body
}

module.exports = {
  getProducts,
  getSingleProduct,
  getEditProduct,
  addProducts,
  updateProduct,
}

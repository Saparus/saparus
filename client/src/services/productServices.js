import ajax, { authHeaders } from "./ajax"

// edit product details by id (requires token)
export const editProduct = async (
  name,
  description,
  images,
  inStock,
  fixedPrice,
  price,
  categories,
  id,
  token
) => {
  if (!token) throw new Error("token is required")

  try {
    const { data } = await ajax.patch(
      `/product/edit/${id}`,
      { name, description, images, inStock, fixedPrice, price, categories },
      authHeaders(token)
    )
    return data
  } catch (error) {
    console.error(`error editing product with id ${id}:`, error)
    throw error
  }
}

// get product categories
export const getCategories = async () => {
  try {
    const { data } = await ajax.get("/product/categories")
    return data
  } catch (error) {
    console.error("error fetching product categories:", error)
    throw error
  }
}

// add a new product (requires token)
export const addProduct = async (
  name,
  description,
  images,
  inStock,
  fixedPrice,
  price,
  categories,
  token
) => {
  if (!token) throw new Error("token is required")

  try {
    const { data } = await ajax.post(
      "/product/add",
      { name, description, images, inStock, fixedPrice, price, categories },
      authHeaders(token)
    )
    return data
  } catch (error) {
    console.error("error adding product:", error)
    throw error
  }
}

// delete a product by id (requires token)
export const deleteProduct = async (id, token) => {
  if (!token) throw new Error("token is required")

  try {
    const { data } = await ajax.delete(`/product/delete/${id}`, authHeaders(token))
    return data
  } catch (error) {
    console.error(`error deleting product with id ${id}:`, error)
    throw error
  }
}

// get products with filtering, language, limit, and pagination
export const getProducts = async (filter, language, limit = 20, page = 1) => {
  const filterString = encodeURIComponent(JSON.stringify(filter)) // serialize and encode the filter object

  try {
    const { data } = await ajax.get(
      `/product/get?filter=${filterString}&language=${language}&limit=${limit}&page=${page}`
    )
    return data
  } catch (error) {
    console.error("error fetching products:", error)
    throw error
  }
}

// get a single product by id and language
export const getProduct = async (id, language) => {
  try {
    const { data } = await ajax.get(`/product/get/${id}?language=${language}`)
    return data
  } catch (error) {
    console.error(`error fetching product with id ${id}:`, error)
    throw error
  }
}

// get an editable product by id (requires token)
export const getEditProduct = async (id, token) => {
  if (!token) throw new Error("token is required")

  try {
    const { data } = await ajax.get(`/product/getEdit/${id}`, authHeaders(token))
    return data
  } catch (error) {
    console.error(`error fetching editable product with id ${id}:`, error)
    throw error
  }
}

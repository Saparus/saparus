import ajax from "./ajax"

// edit product details by id (requires api_key)
export const editProduct = async (
  name,
  description,
  images,
  inStock,
  fixedPrice,
  price,
  categories,
  id,
  api_key
) => {
  if (!api_key) {
    return
  }

  try {
    const { data } = await ajax.patch(`/products/edit/${id}?api_key=${api_key}`, {
      name,
      description,
      images,
      inStock,
      fixedPrice,
      price,
      categories: categories,
    })

    return data
  } catch (error) {
    console.error(`error editing product with id ${id}:`, error)
    throw error
  }
}

// add a new product (requires api_key)
export const addProduct = async (
  name,
  description,
  images,
  inStock,
  fixedPrice,
  price,
  categories,
  api_key
) => {
  if (!api_key) {
    return
  }

  try {
    const { data } = await ajax.post(`/products?api_key=${api_key}`, {
      name,
      description,
      images,
      inStock,
      fixedPrice,
      price,
      categories,
    })

    return data
  } catch (error) {
    console.error("error adding product:", error)
    throw error
  }
}

// delete a product by id (requires api_key)
export const deleteProduct = async (id, api_key) => {
  if (!api_key) {
    console.error("api_key is required")
    return
  }

  try {
    const { data } = await ajax.delete(`/products/${id}?api_key=${api_key}`)
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
      `/products?${
        filterString ? "filter=" + filterString : ""
      }&language=${language}&limit=${limit}&page=${page}`
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
    const { data } = await ajax.get(`/products/${id}?language=${language}`)
    return data
  } catch (error) {
    console.error(`error fetching product with id ${id}:`, error)
    throw error
  }
}

// get an editable product by id (requires api_key)
export const getEditProduct = async (id, api_key) => {
  if (!api_key) {
    console.error("api_key is required")
    return
  }

  try {
    const { data } = await ajax.get(`/products/admin/${id}?api_key=${api_key}`)
    return data
  } catch (error) {
    console.error(`error fetching editable product with id ${id}:`, error)
    throw error
  }
}

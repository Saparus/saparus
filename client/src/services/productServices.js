import ajax from "./ajax"

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
  if (!token) return

  console.log(token)

  const response = await ajax.patch(
    `/product/edit/${id}`,
    { name, description, images, inStock, fixedPrice, price, categories },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const getCategories = async () => {
  const response = await ajax.get("/product/categories")

  return response.data
}

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
  if (!token) return

  const response = await ajax.post(
    "/product/add",
    { name, description, images, inStock, fixedPrice, price, categories },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const deleteProduct = async (id, token) => {
  if (!token) return

  const response = await ajax.delete(`/product/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const getProducts = async (filter, language, limit = 20, page = 1) => {
  const filterString = encodeURIComponent(JSON.stringify(filter)) // Serialize and encode the filter object

  const response = await ajax.get(
    `/product/get?filter=${filterString}&language=${language}&limit=${limit}&page=${page}`
  )

  return response.data
}

export const getProduct = async (id, language) => {
  const response = await ajax.get(`/product/get/${id}?language=${language}`)

  return response.data
}

export const getEditProduct = async (id, token) => {
  if (!token) return

  const response = await ajax.get(`/product/getEdit/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

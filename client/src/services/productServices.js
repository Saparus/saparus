import ajax from "./ajax"

export const editProduct = async (
  name,
  description,
  images,
  inStock,
  fixedPrice,
  price,
  id,
  token
) => {
  const response = await ajax.patch(
    `/product/edit/${id}`,
    { name, description, images, inStock, fixedPrice, price },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const addProduct = async (name, images, inStock, fixedPrice, price, token) => {
  const response = await ajax.post(
    "/product/add",
    { name, images, inStock, fixedPrice, price },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const deleteProduct = async (id, token) => {
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
  const response = await ajax.get(`/product/getEdit/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

import axios from "axios"

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const ajax = axios.create({
  baseURL: SERVER_URL,
  timeout: 40000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

ajax.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default ajax

// LOGIN

export const login = async ({ email, password }) => {
  return await ajax.post("/auth/login", { email, password })
}

// PRODUCTS

export const editProduct = async (name, image, inStock, fixedPrice, price, id, token) => {
  return await ajax.post(
    `/product/edit/:${id}`,
    { name, image, inStock, fixedPrice, price },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const addProduct = async (name, images, inStock, fixedPrice, price, token) => {
  return await ajax.post(
    "/product/add",
    { name, images, inStock, fixedPrice, price },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const deleteProduct = async ({ id, token }) => {
  return await ajax.delete(
    `/product/:${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const getProducts = async (filter, language, limit = 20, page = 1) => {
  return await ajax.get(
    `/product/get?filter=${filter}&language=${language}&limit=${limit}&page=${page}`
  )
}

export const getProduct = async (id, language) => {
  return await ajax.get(`/product/get/:${id}?language=${language}`)
}

// NEWS

export const getNews = async (language, limit = 5) => {
  return await ajax.get(`/news/get?language=${language}&limit=${limit}`)
}

export const addNews = async (title, date, text, image, token) => {
  return await ajax.post(
    "/about/add",
    { title, text, date, image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

// ABOUT

export const getAboutItems = async (language) => {
  return await ajax.get(`/about?language=${language}`)
}

export const editAboutItem = async (title, text, image, id, token) => {
  return await ajax.patch(
    `/about/edit/:${id}`,
    { title, text, image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const addAboutItem = async (title, text, image, token) => {
  return await ajax.post(
    "/about",
    { title, text, image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const removeAboutItem = async (title, text, image, token) => {
  return await ajax.delete(
    "/about",
    { title, text, image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

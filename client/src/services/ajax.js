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

export const login = ({ email, password }) => {
  return ajax.post("/auth/login", { email, password })
}

export const editProduct = ({ name, image, inStock, fixedPrice, price, id }) => {
  return ajax.post(`/product/edit/:${id}`, { name, image, inStock, fixedPrice, price })
}

export const addProduct = ({ name, image, inStock, fixedPrice, price }) => {
  return ajax.post("/product/add", { name, image, inStock, fixedPrice, price })
}

export const deleteProduct = ({ id }) => {
  return ajax.delete(`/product/:${id}`)
}

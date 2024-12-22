import axios from "axios"

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const CLIENT_URL = process.env.REACT_APP_CLIENT_URL

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
    config.headers["Access-Control-Allow-Origin"] = CLIENT_URL
    config.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default ajax

// utility function to include authorization headers
export const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

import axios from "axios"

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const ajax = axios.create({
  baseURL: SERVER_URL,
  timeout: 40000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
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

// utility function to include authorization headers
export const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

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

const MAX_RETRIES = 0

ajax.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const config = error.config
    if (!config || !config.retry) {
      config.retry = 0
    }

    if (config.retry >= MAX_RETRIES) {
      return Promise.reject(error)
    }

    config.retry += 1

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ajax(config))
      }, 1000) // Retry delay in milliseconds
    })
  }
)

export default ajax

// utility function to include authorization headers
export const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

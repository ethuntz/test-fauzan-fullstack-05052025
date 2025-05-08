import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data)
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Request error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default client
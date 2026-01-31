import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

// 每次 request 都自動加上 token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

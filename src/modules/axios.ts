import axios from 'axios'
import { UserModule } from '@/types'

export const install: UserModule = ({ app, router }) => {
  // Request interceptor
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
  
  // Response interceptor
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      
      // If the error is 401 and we haven't retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        
        try {
          // Try to refresh the token
          const response = await axios.post('/api/auth/refresh-token', {
            refreshToken: localStorage.getItem('refreshToken')
          })
          
          const { token } = response.data
          localStorage.setItem('token', token)
          
          // Update the token in the auth store
          const auth = useAuth()
          auth.token = token
          
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`
          return axios(originalRequest)
        } catch (refreshError) {
          // If refresh token fails, logout the user
          const auth = useAuth()
          auth.logout()
          router.push('/login')
          return Promise.reject(refreshError)
        }
      }
      
      return Promise.reject(error)
    }
  )
}

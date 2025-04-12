import axios from "axios"
import { defineStore } from "pinia"

interface User {
    id: string
    email: string
    name: string
    roles: string[]
  }

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
  }

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
      user: null,
      token: localStorage.getItem('token') || null,
      isAuthenticated: false,
      isLoading: true,
    }),
    
    getters: {
      hasRole: (state) => (role: string) => state.user?.roles.includes(role) || false,
      hasAnyRole: (state) => (roles: string[]) => roles.some(role => state.user?.roles.includes(role)) || false,
    },
    
    actions: {
      async login(email: string, password: string) {
        try {
          const response = await axios.post('/api/auth/login', { email, password })
          this.token = response.data.token
          localStorage.setItem('token', this.token as string)
          await this.fetchUser()
          return true
        } catch (error) {
          console.error('Login failed:', error)
          return false
        }
      },
      
      async fetchUser() {
        if (!this.token) return false
        
        try {
          const response = await axios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${this.token}` }
          })
          this.user = response.data
          this.isAuthenticated = true
          return true
        } catch (error) {
          this.logout()
          return false
        } finally {
          this.isLoading = false
        }
      },
      
      logout() {
        this.user = null
        this.token = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
      },

      toggleLoading(newLoading?: boolean) {
        this.isLoading = newLoading || !!this.isLoading
      },

      setIsAuthenticated(newIsAuthenticated: boolean) {
        this.isAuthenticated = newIsAuthenticated
      }
    }
  })

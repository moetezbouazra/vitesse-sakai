import axios from 'axios'
import { UserModule } from '@/types'

export const install: UserModule = ({ router }) => {
  // Setup axios defaults if needed
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || ''

  // Navigation guards
  router.beforeEach(async (to, from, next) => {
    const auth = useAuth()

    // Check if we already have a token but no user (app initialization)
    if (auth.token && !auth.user && !auth.isLoading) {
      auth.toggleLoading(true)
      await auth.fetchUser()
    }
    
    // Get meta requirements from the route
    const requiresAuth = to.meta.requiresAuth || false
    const requiredRoles = to.meta.requiredRoles as string[] || []
    
    // Handle public routes
    if (!requiresAuth) {
      next()
      return
    }
    
    // Handle auth required routes
    if (requiresAuth && !auth.isAuthenticated) {
      next({ path: '/auth/login', query: { redirect: to.fullPath } })
      return
    }
    
    // Handle role-based access
    if (requiredRoles.length > 0 && !auth.hasAnyRole(requiredRoles)) {
      next({ path: '/auth/unauthorized' })
      return
    }
    
    next()
  })
}
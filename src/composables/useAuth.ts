import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

// Humm.. You may wonder why we're using this hook instead of the auth store directly, here's why:
// Abstraction layer: The composable provides an abstraction over the store implementation.
// If you later change how authentication works, you only need to modify the composable rather than updating every component.
// Simplified API: The composable slightly simplifies the API by returning computed properties and methods directly.
// Future extensibility: You could add additional authentication-related logic to the composable without changing the store.
// @TODO: refactor the rest of the code to use this hook.
export function useAuth() {
  const authStore = useAuthStore()
  
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const token = computed(() => authStore.token)
  const isLoading = computed(() => authStore.isLoading)
  
  const hasRole = (role: string) => authStore.hasRole(role)
  const hasAnyRole = (roles: string[]) => authStore.hasAnyRole(roles)
  
  const login = (email: string, password: string) => authStore.login(email, password)
  const logout = () => authStore.logout()
  const fetchUser = () => authStore.fetchUser()
  const toggleLoading = (isLoading?: boolean) => isLoading ? authStore.toggleLoading(Boolean(isLoading)) : authStore.toggleLoading()
  const setIsAuthenticated = (isAuthenticated: boolean) => authStore.setIsAuthenticated(isAuthenticated)
  
  return {
    isAuthenticated,
    user,
    isLoading,
    token,
    hasRole,
    hasAnyRole,
    login,
    logout,
    fetchUser,
    toggleLoading,
    setIsAuthenticated
  }
}

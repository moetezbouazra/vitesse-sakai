<!-- pages/reset-password/[token].vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const token = route.params.token as string

const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const isSubmitting = ref(false)
const isTokenValid = ref(true)

// Validate token on page load
const validateToken = async () => {
  try {
    await axios.get(`/api/auth/validate-reset-token/${token}`)
  } catch (e) {
    isTokenValid.value = false
    error.value = 'This password reset link is invalid or has expired'
  }
}

validateToken()

const resetPassword = async () => {
  error.value = ''
  
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  
  isSubmitting.value = true
  
  try {
    await axios.post('/api/auth/reset-password', {
      token,
      password: password.value
    })
    
    router.push({
      path: '/login',
      query: { passwordReset: 'true' }
    })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      error.value = e.response.data.message || 'Password reset failed'
    } else {
      error.value = 'An unexpected error occurred'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

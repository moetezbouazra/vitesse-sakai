<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const error = ref('')
const isSubmitting = ref(false)

const register = async () => {
  error.value = ''
  
  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  
  isSubmitting.value = true
  
  try {
    await axios.post('/api/auth/register', {
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    })
    
    router.push({
      path: '/login',
      query: { registered: 'true' }
    })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      error.value = e.response.data.message || 'Registration failed'
    } else {
      error.value = 'An unexpected error occurred'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <h1>Create Account</h1>
    
    <form @submit.prevent="register">
      <div v-if="error" class="error">{{ error }}</div>
      
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="formData.name" type="text" required />
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="formData.email" type="email" required />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="formData.password" type="password" required />
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" v-model="formData.confirmPassword" type="password" required />
      </div>
      
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Creating Account...' : 'Create Account' }}
      </button>
      
      <div class="login-link">
        Already have an account? <router-link to="/login">Login</router-link>
      </div>
    </form>
  </div>
</template>

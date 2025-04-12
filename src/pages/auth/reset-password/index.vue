<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const message = ref('')
const isSubmitting = ref(false)
const isSuccess = ref(false)

const requestReset = async () => {
  message.value = ''
  isSubmitting.value = true
  
  try {
    await axios.post('/api/auth/forgot-password', { email: email.value })
    isSuccess.value = true
    message.value = 'Password reset instructions have been sent to your email'
  } catch (e) {
    isSuccess.value = false
    message.value = 'Failed to send password reset email'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="forgot-password-container">
    <h1>Reset Your Password</h1>
    
    <div v-if="isSuccess" class="success-message">
      <p>{{ message }}</p>
      <router-link to="/login">Return to Login</router-link>
    </div>
    
    <form v-else @submit.prevent="requestReset">
      <p>Enter your email address and we'll send you instructions to reset your password.</p>
      
      <div v-if="message" class="message" :class="{ 'error': !isSuccess }">
        {{ message }}
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Sending...' : 'Send Reset Instructions' }}
      </button>
      
      <div class="login-link">
        Remember your password? <router-link to="/login">Login</router-link>
      </div>
    </form>
  </div>
</template>

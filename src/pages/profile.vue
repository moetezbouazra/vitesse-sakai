<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import axios from 'axios'

defineOptions({
  meta: {
    requiresAuth: true
  }
})

const { user } = useAuth()
const isUpdating = ref(false)
const updateMessage = ref('')
const formData = ref({
  name: user.value?.name || '',
})

const updateProfile = async () => {
  isUpdating.value = true
  updateMessage.value = ''
  
  try {
    await axios.put('/api/auth/profile', formData.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    updateMessage.value = 'Profile updated successfully'
  } catch (error) {
    updateMessage.value = 'Failed to update profile'
    console.error('Profile update failed:', error)
  } finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <div>
    <h1>Your Profile</h1>
    
    <div v-if="user" class="profile-info">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Roles:</strong> {{ user.roles.join(', ') }}</p>
      
      <form @submit.prevent="updateProfile" class="profile-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" v-model="formData.name" type="text" required />
        </div>
        
        <button type="submit" :disabled="isUpdating">
          {{ isUpdating ? 'Updating...' : 'Update Profile' }}
        </button>
        
        <p v-if="updateMessage" class="message">{{ updateMessage }}</p>
      </form>
    </div>
  </div>
</template>

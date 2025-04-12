<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const props = defineProps<{
  roles?: string[]
}>()

const { isAuthenticated, hasAnyRole, isLoading } = useAuth()

const canAccess = computed(() => {
  if (isLoading.value) return false
  if (!props.roles || props.roles.length === 0) return isAuthenticated.value
  return isAuthenticated.value && hasAnyRole(props.roles)
})
</script>

<template>
  <div v-if="isLoading" class="loading">
    Loading...
  </div>
  <slot v-else-if="canAccess" />
  <slot v-else name="unauthorized">
    <div class="unauthorized">
      You don't have permission to view this content.
    </div>
  </slot>
</template>
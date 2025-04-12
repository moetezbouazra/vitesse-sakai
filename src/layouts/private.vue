<script setup lang="ts">

const auth = useAuth()
const router = useRouter()

onMounted(() => {
  if (!auth.isAuthenticated) {
    router.push(`/`)
  }
})
</script>




<template>
  <AppLayout />
</template>

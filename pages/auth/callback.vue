<script setup lang="ts">
// This page handles OAuth callbacks from providers like Google
const router = useRouter()

onMounted(() => {
  // Redirect to home after successful OAuth
  setTimeout(() => {
    router.push('/')
  }, 2000)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50 dark:from-amber-950 dark:via-emerald-950 dark:to-blue-950">
    <UCard class="w-full max-w-md text-center">
      <div class="flex flex-col items-center gap-4 p-8">
        <UIcon name="i-lucide-loader-2" class="text-6xl text-amber-500 animate-spin" />
        <h2 class="text-2xl font-bold">Authenticating...</h2>
        <p class="text-muted">Please wait while we sign you in.</p>
      </div>
    </UCard>
  </div>
</template>

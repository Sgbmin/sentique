<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50 dark:from-amber-950 dark:via-emerald-950 dark:to-blue-950">
    <UCard class="w-full max-w-md text-center">
      <div class="p-8">
        <UIcon name="i-lucide-alert-triangle" class="text-6xl text-amber-500 mb-4 inline-block" />
        <h1 class="text-4xl font-bold mb-2">{{ error?.statusCode }}</h1>
        <h2 class="text-xl font-semibold mb-4">{{ error?.statusMessage }}</h2>
        <p class="text-muted mb-6">{{ error?.message }}</p>
        <UButton @click="handleError" color="amber" size="lg">
          Go Home
        </UButton>
      </div>
    </UCard>
  </div>
</template>

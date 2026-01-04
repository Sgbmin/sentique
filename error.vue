<script setup lang="ts">

const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-[#0B1C2D] text-white">
    
    <div class="glass-effect w-full max-w-lg text-center p-12 border border-[#D4AF37]/20 shadow-2xl">
      
      <div class="mb-6">
        <UIcon name="i-heroicons-sparkles" class="text-6xl text-[#D4AF37] opacity-80" />
      </div>

      <h1 class="text-8xl font-serif font-bold text-[#D4AF37] mb-2 tracking-tighter">
        {{ error?.statusCode || '404' }}
      </h1>

      <h2 class="text-xl font-light uppercase tracking-[0.4em] mb-6 text-white/80">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}
      </h2>

      <p class="text-gray-400 mb-10 italic font-light">
        "حتی بهترین عطرها هم گاهی نت‌هایشان را گم می‌کنند. اجازه دهید شما را به خانه بازگردانیم."
      </p>

      <UButton
        @click="handleError"
        size="xl"
        variant="solid"
        class="bg-[#0F766E] hover:bg-[#0D665F] text-white px-10 py-3 rounded-full transition-all duration-300 hover:scale-105 tracking-widest font-bold"
      >
        RETURN TO SENTIQUE
      </UButton>

    </div>
  </div>
</template>

<style scoped>

div {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
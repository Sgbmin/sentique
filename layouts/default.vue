<template>
  <div>
    <header class="flex justify-between items-center p-6">
      <h1 class="font-bold text-xl text-[#D4AF37]">Sentique</h1>
      <nav class="space-x-4">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <NuxtLink to="/custom" class="hover:underline">Custom</NuxtLink>
        <NuxtLink to="/products" class="hover:underline">Products</NuxtLink>
        <NuxtLink to="/login" class="hover:underline">Login</NuxtLink>
      </nav>
    </header>
    <NuxtPage />
  </div>
</template>
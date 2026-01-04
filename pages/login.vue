<script setup lang="ts">
import { ref } from 'vue'
const email = ref('')
const password = ref('')

function login() {
  alert(`Email: ${email.value}\nPassword: ${password.value}\n(Mock login)`)
}
</script>

<template>
  <UPageCard class="w-full max-w-md glass-effect">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <UFormField label="Email">
      <UInput v-model="email" placeholder="your@email.com"/>
    </UFormField>
    <UFormField label="Password">
      <UInput type="password" v-model="password" placeholder="Password"/>
    </UFormField>
    <UButton color="amber" class="mt-4" @click="login">Login</UButton>
  </UPageCard>
</template>
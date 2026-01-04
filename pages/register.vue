<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const password = ref('')

function register() {
  alert(`Name: ${name.value}\nEmail: ${email.value}\nPassword: ${password.value}\n(Mock register)`)
}
</script>

<template>
  <UPageCard class="w-full max-w-md glass-effect">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <UFormField label="Full Name">
      <UInput v-model="name" placeholder="John Doe"/>
    </UFormField>
    <UFormField label="Email">
      <UInput v-model="email" placeholder="your@email.com"/>
    </UFormField>
    <UFormField label="Password">
      <UInput type="password" v-model="password" placeholder="Password"/>
    </UFormField>
    <UButton color="emerald" class="mt-4" @click="register">Create Account</UButton>
  </UPageCard>
</template>
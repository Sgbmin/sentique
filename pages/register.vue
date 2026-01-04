<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

const fields: AuthFormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true,
    icon: 'i-lucide-user'
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'your.email@example.com',
    required: true,
    icon: 'i-lucide-mail'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Create a password',
    required: true,
    icon: 'i-lucide-lock'
  }
]

function onSubmit(data: Record<string, any>) {
  // فقط نمایش Toast شبیه ثبت نام موفق
  alert(`Demo Registration:\nName: ${data.name}\nEmail: ${data.email}`)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#D4AF37]/20 via-[#00A86B]/20 to-[#000080]/20">
    <UPageCard class="w-full max-w-md glass-effect">
      <UAuthForm
        title="Create Account"
        icon="i-lucide-user-plus"
        :fields="fields"
        @submit="onSubmit"
      >
        <template #description>
          Begin your journey to your signature scent
        </template>
        
        <template #footer>
          <p class="text-center text-sm text-white/70">
            Already have an account? 
            <ULink to="/login" class="text-[#D4AF37] font-semibold">
              Sign in
            </ULink>
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

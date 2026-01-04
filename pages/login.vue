<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

const fields: AuthFormField[] = [
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
    placeholder: 'Enter your password',
    required: true,
    icon: 'i-lucide-lock'
  }
]

const providers = [
  {
    label: 'Continue with Google',
    icon: 'i-simple-icons-google',
    color: 'neutral' as const,
    onClick: () => alert('Demo: Google login clicked')
  }
]

function onSubmit(data: Record<string, any>) {

  alert(`Demo Login:\nEmail: ${data.email}`)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#D4AF37]/20 via-[#00A86B]/20 to-[#000080]/20">
    <UPageCard class="w-full max-w-md glass-effect">
      <UAuthForm
        title="Welcome Back"
        icon="i-lucide-sparkles"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      >
        <template #description>
          Sign in to access your bespoke perfume collection
        </template>
        
        <template #password-hint>
          <ULink to="/reset-password" class="text-[#D4AF37] font-medium" tabindex="-1">
            Forgot password?
          </ULink>
        </template>
        
        <template #footer>
          <p class="text-center text-sm text-white/70">
            Don't have an account? 
            <ULink to="/register" class="text-[#D4AF37] font-semibold">
              Create one
            </ULink>
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

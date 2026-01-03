<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

const supabase = useSupabaseClient()
const toast = useToast()
const sent = ref(false)

const schema = z.object({
  email: z.string().email('Invalid email')
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { error } = await supabase.auth.resetPasswordForEmail(event.data.email, {
    redirectTo: `${window.location.origin}/update-password`
  })

  if (error) {
    toast.add({ 
      title: 'Error', 
      description: error.message, 
      color: 'error' 
    })
  } else {
    sent.value = true
    toast.add({ 
      title: 'Email Sent', 
      description: 'Check your email for password reset instructions',
      color: 'success' 
    })
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50 dark:from-amber-950 dark:via-emerald-950 dark:to-blue-950">
    <UPageCard class="w-full max-w-md">
      <div v-if="!sent">
        <div class="text-center mb-6">
          <UIcon name="i-lucide-key" class="text-5xl text-amber-500 mb-3 inline-block" />
          <h1 class="text-2xl font-bold mb-2">Reset Password</h1>
          <p class="text-muted">Enter your email to receive reset instructions</p>
        </div>

        <UForm :schema="schema" @submit="onSubmit" class="space-y-4">
          <UFormField name="email" label="Email">
            <UInput 
              type="email" 
              placeholder="your.email@example.com"
              icon="i-lucide-mail"
              size="lg"
            />
          </UFormField>

          <UButton type="submit" color="amber" size="lg" block>
            Send Reset Link
          </UButton>

          <UButton to="/login" variant="ghost" size="lg" block>
            Back to Login
          </UButton>
        </UForm>
      </div>

      <div v-else class="text-center py-8">
        <UIcon name="i-lucide-mail-check" class="text-6xl text-emerald-500 mb-4 inline-block" />
        <h2 class="text-2xl font-bold mb-2">Check Your Email</h2>
        <p class="text-muted mb-6">We've sent password reset instructions to your email.</p>
        <UButton to="/login" color="amber" size="lg">
          Back to Login
        </UButton>
      </div>
    </UPageCard>
  </div>
</template>

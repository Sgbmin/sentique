<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

const supabase = useSupabaseClient()
const toast = useToast()
const router = useRouter()

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'your.email@example.com',
  required: true,
  icon: 'i-lucide-mail'
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true,
  icon: 'i-lucide-lock'
}]

const providers = [{
  label: 'Continue with Google',
  icon: 'i-simple-icons-google',
  color: 'neutral' as const,
  onClick: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) {
      toast.add({ title: 'Error', description: error.message, color: 'error' })
    }
  }
}]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 6 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { error } = await supabase.auth.signInWithPassword({
    email: event.data.email,
    password: event.data.password
  })

  if (error) {
    toast.add({ 
      title: 'Login Failed', 
      description: error.message, 
      color: 'error',
      icon: 'i-lucide-x-circle'
    })
  } else {
    toast.add({ 
      title: 'Welcome Back', 
      description: 'Successfully logged in', 
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    router.push('/custom')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50 dark:from-amber-950 dark:via-emerald-950 dark:to-blue-950">
    <UPageCard class="w-full max-w-md glass-effect">
      <UAuthForm
        :schema="schema"
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
          <ULink to="/reset-password" class="text-amber-600 dark:text-amber-400 font-medium" tabindex="-1">
            Forgot password?
          </ULink>
        </template>
        
        <template #footer>
          <p class="text-center text-sm text-muted">
            Don't have an account? 
            <ULink to="/register" class="text-amber-600 dark:text-amber-400 font-semibold">
              Create one
            </ULink>
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

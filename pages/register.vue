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
  name: 'name',
  type: 'text',
  label: 'Full Name',
  placeholder: 'John Doe',
  required: true,
  icon: 'i-lucide-user'
}, {
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
  placeholder: 'Create a password',
  required: true,
  icon: 'i-lucide-lock'
}]

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { error } = await supabase.auth.signUp({
    email: event.data.email,
    password: event.data.password,
    options: {
      data: {
        full_name: event.data.name
      }
    }
  })

  if (error) {
    toast.add({ title: 'Registration Failed', description: error.message, color: 'error' })
  } else {
    toast.add({ title: 'Success', description: 'Please check your email to confirm', color: 'success' })
    router.push('/login')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50 dark:from-amber-950 dark:via-emerald-950 dark:to-blue-950">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Create Account"
        icon="i-lucide-user-plus"
        :fields="fields"
        @submit="onSubmit"
      >
        <template #description>
          Begin your journey to your signature scent
        </template>
        
        <template #footer>
          <p class="text-center text-sm text-muted">
            Already have an account? 
            <ULink to="/login" class="text-amber-600 dark:text-amber-400 font-semibold">
              Sign in
            </ULink>
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

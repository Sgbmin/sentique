<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const supabase = useSupabaseClient()
const toast = useToast()
const router = useRouter()

const fields: AuthFormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your name',
    required: true,
    icon: 'i-lucide-user'
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
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

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const { data, error } = await supabase.auth.signUp({
    email: payload.data.email,
    password: payload.data.password,
    options: {
      data: {
        full_name: payload.data.name
      }
    }
  })

  if (error) {
    toast.add({ 
      title: 'Registration Failed', 
      description: error.message, 
      color: 'error' 
    })
  } else {
    toast.add({ 
      title: 'Account created!', 
      description: 'Please check your email to verify your account',
      color: 'success' 
    })
    router.push('/auth/login')
  }
}
</script>

<template>
  <div class="min-h-screen bg-luxury-gradient flex items-center justify-center p-4">
    <UContainer>
      <div class="max-w-md mx-auto">
        <UPageCard class="backdrop-blur-sm bg-white/95">
          <UAuthForm
            :schema="schema"
            :fields="fields"
            title="Create Account"
            icon="i-lucide-wand-sparkles"
            @submit="onSubmit"
          >
            <template #description>
              Join us to create your unique perfume. 
              Already have an account? 
              <ULink to="/auth/login" class="text-gold font-semibold">
                Sign in
              </ULink>
            </template>

            <template #footer>
              By creating an account, you agree to our 
              <ULink to="/terms" class="text-gold font-medium">
                Terms of Service
              </ULink>
            </template>
          </UAuthForm>
        </UPageCard>
      </div>
    </UContainer>
  </div>
</template>

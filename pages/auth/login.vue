<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const supabase = useSupabaseClient()
const toast = useToast()
const router = useRouter()

const fields: AuthFormField[] = [
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
    placeholder: 'Enter your password',
    required: true,
    icon: 'i-lucide-lock'
  },
  {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox'
  }
]

const providers = [
  {
    label: 'Continue with Google',
    icon: 'i-simple-icons-google',
    color: 'neutral' as const,
    variant: 'subtle' as const,
    block: true,
    onClick: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) {
        toast.add({ 
          title: 'Error', 
          description: error.message, 
          color: 'error' 
        })
      }
    }
  }
]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const { error } = await supabase.auth.signInWithPassword({
    email: payload.data.email,
    password: payload.data.password
  })

  if (error) {
    toast.add({ 
      title: 'Login Failed', 
      description: error.message, 
      color: 'error' 
    })
  } else {
    toast.add({ 
      title: 'Welcome back!', 
      color: 'success' 
    })
    router.push('/dashboard')
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
            :providers="providers"
            title="Welcome Back"
            icon="i-lucide-sparkles"
            @submit="onSubmit"
          >
            <template #description>
              Sign in to create your custom perfume. 
              Don't have an account? 
              <ULink to="/auth/register" class="text-gold font-semibold">
                Sign up
              </ULink>
            </template>

            <template #password-hint>
              <ULink to="/auth/forgot-password" class="text-jade font-medium">
                Forgot password?
              </ULink>
            </template>

            <template #footer>
              By signing in, you agree to our 
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
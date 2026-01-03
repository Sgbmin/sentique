<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

async function signOut() {
  await supabase.auth.signOut()
  navigateTo('/')
}

const links = [{
  label: 'Home',
  to: '/'
}, {
  label: 'Products',
  to: '/products'
}, {
  label: 'Custom Perfume',
  to: '/custom'
}]
</script>

<template>
  <UApp>
    <UHeader>
      <template #logo>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-sparkles" class="text-2xl text-amber-500" />
          <span class="font-bold text-xl">Perfume Luxe</span>
        </div>
      </template>

      <template #center>
        <UNavigationMenu :links="links" />
      </template>

      <template #right>
        <div v-if="user" class="flex items-center gap-3">
          <UButton to="/custom" icon="i-lucide-flask-conical" color="emerald" variant="subtle">
            Create
          </UButton>
          <UDropdownMenu>
            <UButton icon="i-lucide-user" variant="ghost" />
            <template #content>
              <UDropdownMenuItem label="Profile" icon="i-lucide-user" />
              <UDropdownMenuItem label="Orders" icon="i-lucide-package" />
              <UDropdownMenuItem label="Sign Out" icon="i-lucide-log-out" @click="signOut" />
            </template>
          </UDropdownMenu>
        </div>
        <UButton v-else to="/login" icon="i-lucide-user" color="amber">
          Sign In
        </UButton>
      </template>
    </UHeader>

    <slot />

    <UFooter>
      <template #left>
        <p class="text-muted text-sm">© 2024 Perfume Luxe. Crafted with excellence.</p>
      </template>
      <template #right>
        <div class="flex gap-4">
          <ULink to="/about" class="text-sm">About</ULink>
          <ULink to="/contact" class="text-sm">Contact</ULink>
          <ULink to="/privacy" class="text-sm">Privacy</ULink>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>

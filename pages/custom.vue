<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const supabase = useSupabaseClient()
const toast = useToast()

const customPerfume = ref({
  name: '',
  topNotes: [],
  heartNotes: [],
  baseNotes: [],
  intensity: 50
})

const noteOptions = {
  top: ['Bergamot', 'Lemon', 'Mandarin', 'Pink Pepper', 'Lavender'],
  heart: ['Rose', 'Jasmine', 'Ylang-Ylang', 'Iris', 'Geranium'],
  base: ['Oud', 'Sandalwood', 'Vanilla', 'Amber', 'Musk', 'Patchouli']
}

async function saveCustomPerfume() {
  const { error } = await supabase
    .from('custom_perfumes')
    .insert([{
      user_id: (await supabase.auth.getUser()).data.user?.id,
      ...customPerfume.value
    }])

  if (error) {
    toast.add({ title: 'Error', description: error.message, color: 'error' })
  } else {
    toast.add({ 
      title: 'Success', 
      description: 'Your custom perfume has been saved!',
      color: 'success'
    })
  }
}
</script>

<template>
  <UMain>
    <UContainer>
      <UPageHeader
        title="Create Your Signature Scent"
        description="Build a unique fragrance by selecting your favorite notes"
        icon="i-lucide-flask-conical"
        class="mb-8"
      />

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Builder -->
        <div class="lg:col-span-2 space-y-6">
          <UCard>
            <UFormField label="Perfume Name" required>
              <UInput
                v-model="customPerfume.name"
                placeholder="My Signature Scent"
                size="lg"
              />
            </UFormField>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-sparkles" class="text-amber-500" />
                Top Notes
              </h3>
            </template>
            <UCheckboxGroup
              v-model="customPerfume.topNotes"
              :options="noteOptions.top"
              class="grid grid-cols-2 gap-3"
            />
          </UCard>

          <UCard>
            <template #header>
              <h3 class="font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-heart" class="text-emerald-500" />
                Heart Notes
              </h3>
            </template>
            <UCheckboxGroup
              v-model="customPerfume.heartNotes"
              :options="noteOptions.heart"
              class="grid grid-cols-2 gap-3"
            />
          </UCard>

          <UCard>
            <template #header>
              <h3 class="font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-layers" class="text-blue-500" />
                Base Notes
              </h3>
            </template>
            <UCheckboxGroup
              v-model="customPerfume.baseNotes"
              :options="noteOptions.base"
              class="grid grid-cols-2 gap-3"
            />
          </UCard>

          <UCard>
            <UFormField label="Intensity">
              <USlider v-model="customPerfume.intensity" :min="0" :max="100" />
              <p class="text-sm text-muted mt-2">{{ customPerfume.intensity }}% intensity</p>
            </UFormField>
          </UCard>
        </div>

        <!-- Preview -->
        <div class="lg:col-span-1">
          <UCard class="sticky top-4">
            <template #header>
              <h3 class="font-semibold">Your Creation</h3>
            </template>

            <div class="space-y-4">
              <div class="aspect-square bg-gradient-to-br from-amber-100 to-emerald-100 dark:from-amber-950 dark:to-emerald-950 rounded-lg flex items-center justify-center">
                <UIcon name="i-lucide-flask-conical" class="text-6xl text-amber-600" />
              </div>

              <div>
                <h4 class="font-semibold text-xl mb-2">
                  {{ customPerfume.name || 'Unnamed Perfume' }}
                </h4>
                <div class="space-y-2 text-sm">
                  <p><strong>Top:</strong> {{ customPerfume.topNotes.join(', ') || 'None selected' }}</p>
                  <p><strong>Heart:</strong> {{ customPerfume.heartNotes.join(', ') || 'None selected' }}</p>
                  <p><strong>Base:</strong> {{ customPerfume.baseNotes.join(', ') || 'None selected' }}</p>
                </div>
              </div>

              <div class="pt-4 border-t border-default space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-muted">Estimated Price</span>
                  <span class="text-2xl font-bold text-amber-600 dark:text-amber-400">$350</span>
                </div>

                <UButton
                  color="amber"
                  block
                  size="lg"
                  icon="i-lucide-save"
                  @click="saveCustomPerfume"
                >
                  Save Formula
                </UButton>

                <UButton
                  color="emerald"
                  variant="outline"
                  block
                  size="lg"
                  icon="i-lucide-shopping-cart"
                >
                  Order Custom Bottle
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </UMain>
</template>

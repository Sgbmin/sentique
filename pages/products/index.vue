<script setup lang="ts">
const supabase = useSupabaseClient()

// Fetch perfumes from Supabase
const { data: perfumes, pending } = await useAsyncData('perfumes', async () => {
  const { data, error } = await supabase
    .from('perfumes')
    .select('*')
  
  if (error) throw error
  return data
})

const filters = ref({
  category: 'all',
  priceRange: 'all',
  notes: []
})

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Floral', value: 'floral' },
  { label: 'Woody', value: 'woody' },
  { label: 'Citrus', value: 'citrus' },
  { label: 'Oriental', value: 'oriental' }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Page Header -->
    <UPageHeader
      class="bg-gradient-to-r from-navy to-jade text-white"
      title="Our Collection"
      description="Discover our curated selection of luxury perfumes"
    />

    <UContainer class="py-12">
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:col-span-1">
          <UCard variant="subtle">
            <template #header>
              <h3 class="text-lg font-semibold text-navy">Filters</h3>
            </template>

            <div class="space-y-6">
              <!-- Category Filter -->
              <div>
                <label class="text-sm font-medium text-slate-700 mb-2 block">
                  Category
                </label>
                <URadioGroup
                  v-model="filters.category"
                  :options="categories"
                />
              </div>

              <!-- Price Range -->
              <div>
                <label class="text-sm font-medium text-slate-700 mb-2 block">
                  Price Range
                </label>
                <USlider
                  v-model="filters.priceRange"
                  :min="0"
                  :max="500"
                  :step="10"
                  color="primary"
                />
              </div>
            </div>
          </UCard>
        </aside>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <div v-if="pending" class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <USkeleton v-for="i in 6" :key="i" class="h-96" />
          </div>

          <UPageGrid v-else>
            <UCard
              v-for="perfume in perfumes"
              :key="perfume.id"
              variant="subtle"
              class="hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              @click="navigateTo(`/products/${perfume.id}`)"
            >
              <div class="relative overflow-hidden rounded-lg mb-4">
                <img
                  :src="perfume.image_url || '/images/placeholder-perfume.jpg'"
                  :alt="perfume.name"
                  class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <UBadge
                  v-if="perfume.is_new"
                  class="absolute top-2 right-2"
                  color="primary"
                  label="New"
                />
              </div>

              <div class="space-y-2">
                <h3 class="text-xl font-semibold text-navy">
                  {{ perfume.name }}
                </h3>
                <p class="text-slate-600 text-sm line-clamp-2">
                  {{ perfume.description }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-bold text-gold">
                    ${{ perfume.price }}
                  </span>
                  <UButton
                    color="primary"
                    size="sm"
                    label="View Details"
                    trailing-icon="i-lucide-arrow-right"
                  />
                </div>
              </div>
            </UCard>
          </UPageGrid>
        </div>
      </div>
    </UContainer>
  </div>
</template>

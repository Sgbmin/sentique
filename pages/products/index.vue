<script setup lang="ts">
const supabase = useSupabaseClient()

// Fetch products from Supabase
const { data: products, pending } = await useAsyncData('products', async () => {
  const { data } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  
  return data || []
})

// Fallback data if no products in database
const defaultProducts = [{
  id: 1,
  name: 'Midnight Oud',
  description: 'Deep, woody notes with hints of amber',
  base_notes: ['Oud', 'Amber', 'Sandalwood'],
  price: 285,
  image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400'
}, {
  id: 2,
  name: 'Rose Lumière',
  description: 'Delicate rose with jasmine undertones',
  base_notes: ['Rose', 'Jasmine', 'Musk'],
  price: 245,
  image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400'
}, {
  id: 3,
  name: 'Citrus Noir',
  description: 'Fresh bergamot with dark leather',
  base_notes: ['Bergamot', 'Leather', 'Vetiver'],
  price: 265,
  image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400'
}]

const displayProducts = computed(() => 
  products.value?.length ? products.value : defaultProducts
)

const filters = ref({
  search: '',
  baseNote: ''
})
</script>

<template>
  <UMain>
    <UContainer>
      <UPageHeader
        title="Our Collections"
        description="Discover exquisite fragrances crafted with the finest ingredients"
        class="mb-8"
      />

      <!-- Filters -->
      <div class="flex gap-4 mb-8">
        <UInput
          v-model="filters.search"
          icon="i-lucide-search"
          placeholder="Search perfumes..."
          class="flex-1"
          size="lg"
        />
        <USelectMenu
          v-model="filters.baseNote"
          :options="['All', 'Oud', 'Rose', 'Citrus', 'Vanilla', 'Musk']"
          placeholder="Filter by note"
          size="lg"
          class="w-48"
        />
      </div>

      <!-- Products Grid -->
      <UPageGrid v-if="!pending" :columns="3">
        <UCard
          v-for="product in displayProducts"
          :key="product.id"
          class="group hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300"
        >
          <template #header>
            <div class="aspect-square overflow-hidden rounded-lg">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </template>

          <div class="space-y-3">
            <div>
              <h3 class="text-xl font-semibold text-highlighted">{{ product.name }}</h3>
              <p class="text-sm text-muted mt-1">{{ product.description }}</p>
            </div>

            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="note in product.base_notes"
                :key="note"
                color="emerald"
                variant="subtle"
                size="xs"
              >
                {{ note }}
              </UBadge>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-default">
              <span class="text-2xl font-bold text-amber-600 dark:text-amber-400">
                ${{ product.price }}
              </span>
              <UButton
                :to="`/products/${product.id}`"
                color="amber"
                icon="i-lucide-arrow-right"
              >
                View Details
              </UButton>
            </div>
          </div>
        </UCard>
      </UPageGrid>

      <div v-else class="grid grid-cols-3 gap-6">
        <USkeleton v-for="i in 6" :key="i" class="h-96" />
      </div>
    </UContainer>
  </UMain>
</template>

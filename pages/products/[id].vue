<script setup lang="ts">
const route = useRoute()
const toast = useToast()

// Mock data array to simulate a database
const allProducts = [
  {
    id: '1',
    name: 'Midnight Oud',
    description: 'A luxurious blend of deep, woody oud with warm amber and hints of spice. Perfect for evening wear.',
    base_notes: ['Oud', 'Amber', 'Sandalwood', 'Cardamom'],
    top_notes: ['Bergamot', 'Pink Pepper'],
    heart_notes: ['Rose', 'Saffron'],
    price: 285,
    volume: '50ml',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800'
  }
]

// Simulate loading state
const { data: product, pending } = await useAsyncData(`product-${route.params.id}`, () => {
  const found = allProducts.find(p => p.id === route.params.id)
  // Return found product or the first one as fallback
  return Promise.resolve(found || allProducts[0])
})

const quantity = ref(1)

function addToCart() {
  toast.add({ 
    title: 'Added to Cart', 
    description: `${product.value?.name} has been added to your cart.`,
    color: 'emerald',
    icon: 'i-lucide-shopping-bag'
  })
}
</script>

<template>
  <UMain>
    <UContainer class="py-8">
      <!-- Back Button -->
      <UButton
        to="/products"
        variant="ghost"
        icon="i-lucide-arrow-left"
        class="mb-6"
        color="gray"
      >
        Back to Products
      </UButton>

      <div v-if="!pending && product" class="grid lg:grid-cols-2 gap-12">
        <!-- Product Image (Left Column) -->
        <div>
          <div class="aspect-square overflow-hidden rounded-2xl shadow-2xl">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Product Info (Right Column) -->
        <div class="space-y-6">
          <div>
            <UBadge color="amber" variant="subtle" class="mb-3">
              Signature Collection
            </UBadge>
            <h1 class="text-4xl font-bold mb-3">{{ product.name }}</h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">{{ product.description }}</p>
          </div>

          <!-- Fragrance Notes -->
          <div class="space-y-4">
            <!-- Top Notes -->
            <div>
              <h3 class="font-semibold mb-2 flex items-center gap-2">
                <UIcon name="i-lucide-sparkles" class="text-amber-500" />
                Top Notes
              </h3>

                            <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="note in product.top_notes"
                  :key="note"
                  color="amber"
                  variant="soft"
                >
                  {{ note }}
                </UBadge>
              </div>
            </div>

            <!-- Heart Notes -->
            <div>
              <h3 class="font-semibold mb-2 flex items-center gap-2">
                <UIcon name="i-lucide-heart" class="text-emerald-500" />
                Heart Notes
              </h3>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="note in product.heart_notes"
                  :key="note"
                  color="emerald"
                  variant="soft"
                >
                  {{ note }}
                </UBadge>
              </div>
            </div>

            <!-- Base Notes -->
            <div>
              <h3 class="font-semibold mb-2 flex items-center gap-2">
                <UIcon name="i-lucide-layers" class="text-blue-500" />
                Base Notes
              </h3>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="note in product.base_notes"
                  :key="note"
                  color="blue"
                  variant="soft"
                >
                  {{ note }}
                </UBadge>
              </div>
            </div>
          </div>

          <UDivider />

          <!-- Price and Actions -->
          <div class="space-y-4">
            <div class="flex items-baseline gap-3">
              <span class="text-4xl font-bold text-amber-600 dark:text-amber-400">
                ${{ product.price }}
              </span>
              <span class="text-gray-500">{{ product.volume }}</span>
            </div>

            <div class="flex items-center gap-4">
              <!-- Note: In Nuxt UI v3, use UInput type="number" if UInputNumber is missing -->
              <UInput v-model="quantity" type="number" :min="1" :max="10" class="w-32" size="xl" />
              <UButton
                color="amber"
                size="xl"
                icon="i-lucide-shopping-bag"
                class="flex-1"
                @click="addToCart"
              >
                Add to Cart
              </UButton>
            </div>

            <UButton
              to="/custom"
              variant="outline"
              color="emerald"
              size="xl"
              icon="i-lucide-flask-conical"
              block
            >
              Customize This Fragrance
            </UButton>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="flex flex-col gap-8">
        <USkeleton class="h-12 w-1/2" />
        <div class="grid lg:grid-cols-2 gap-12">
          <USkeleton class="h-[500px] w-full" />
          <div class="space-y-4">
            <USkeleton class="h-8 w-full" />
            <USkeleton class="h-8 w-3/4" />
            <USkeleton class="h-32 w-full" />
          </div>
        </div>
      </div>
    </UContainer>
  </UMain>
</template>
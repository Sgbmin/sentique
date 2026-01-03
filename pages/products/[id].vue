<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()
const toast = useToast()
const user = useSupabaseUser()

const { data: product, pending } = await useAsyncData(`product-${route.params.id}`, async () => {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('id', route.params.id)
    .single()
  
  // Fallback product
  return data || {
    id: route.params.id,
    name: 'Midnight Oud',
    description: 'A luxurious blend of deep, woody oud with warm amber and hints of spice. Perfect for evening wear.',
    base_notes: ['Oud', 'Amber', 'Sandalwood', 'Cardamom'],
    top_notes: ['Bergamot', 'Pink Pepper'],
    heart_notes: ['Rose', 'Saffron'],
    price: 285,
    volume: '50ml',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800'
  }
})

const quantity = ref(1)

async function addToCart() {
  if (!user.value) {
    toast.add({ 
      title: 'Please login', 
      description: 'You need to be logged in to add items to cart',
      color: 'warning' 
    })
    return
  }

  toast.add({ 
    title: 'Added to Cart', 
    description: `${product.value.name} has been added to your cart`,
    color: 'success',
    icon: 'i-lucide-shopping-bag'
  })
}
</script>

<template>
  <UMain>
    <UContainer>
      <UButton
        to="/products"
        variant="ghost"
        icon="i-lucide-arrow-left"
        class="mb-6"
      >
        Back to Products
      </UButton>

      <div v-if="!pending && product" class="grid lg:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div>
          <div class="aspect-square overflow-hidden rounded-2xl shadow-2xl">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <div>
            <UBadge color="amber" variant="subtle" class="mb-3">
              Signature Collection
            </UBadge>
            <h1 class="text-4xl font-bold text-highlighted mb-3">{{ product.name }}</h1>
            <p class="text-lg text-muted">{{ product.description }}</p>
          </div>

          <!-- Notes -->
          <div class="space-y-4">
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

          <USeparator />

          <!-- Price and Actions -->
          <div class="space-y-4">
            <div class="flex items-baseline gap-3">
              <span class="text-4xl font-bold text-amber-600 dark:text-amber-400">
                ${{ product.price }}
              </span>
              <span class="text-muted">{{ product.volume }}</span>
            </div>

            <div class="flex items-center gap-4">
              <UInputNumber v-model="quantity" :min="1" :max="10" class="w-32" />
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

      <USkeleton v-else class="h-96" />
    </UContainer>
  </UMain>
</template>
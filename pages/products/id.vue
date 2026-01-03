<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()
const toast = useToast()

const { data: perfume } = await useAsyncData(`perfume-${route.params.id}`, async () => {
  const { data, error } = await supabase
    .from('perfumes')
    .select(`
      *,
      base_notes:perfume_notes!base_note_id(*),
      middle_notes:perfume_notes!middle_note_id(*),
      top_notes:perfume_notes!top_note_id(*)
    `)
    .eq('id', route.params.id)
    .single()
  
  if (error) throw error
  return data
})

const selectedSize = ref('50ml')
const quantity = ref(1)

const sizes = [
  { label: '30ml', value: '30ml', price: 89 },
  { label: '50ml', value: '50ml', price: 129 },
  { label: '100ml', value: '100ml', price: 199 }
]

async function addToCart() {
  toast.add({
    title: 'Added to cart',
    description: `${perfume.value?.name} (${selectedSize.value})`,
    color: 'success'
  })
}

function openCustomizer() {
  navigateTo('/customize?base=' + perfume.value?.id)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <UContainer class="py-12">
      <div v-if="perfume" class="grid lg:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div class="space-y-4">
          <div class="aspect-square rounded-2xl overflow-hidden bg-white p-8">
            <img
              :src="perfume.image_url || '/images/placeholder-perfume.jpg'"
              :alt="perfume.name"
              class="w-full h-full object-contain"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <div>
            <UBadge
              v-if="perfume.is_new"
              color="primary"
              label="New Arrival"
              class="mb-4"
            />
            <h1 class="text-4xl font-bold text-navy mb-4">
              {{ perfume.name }}
            </h1>
            <p class="text-xl text-slate-600">
              {{ perfume.description }}
            </p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-bold text-gold">
              ${{ perfume.price }}
            </span>
            <span class="text-slate-500">({{ selectedSize }})</span>
          </div>

          <!-- Perfume Notes -->
          <UCard variant="subtle">
            <template #header>
              <h3 class="font-semibold text-navy">Fragrance Profile</h3>
            </template>

            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-jade mb-2">Top Notes</h4>
                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="note in perfume.top_notes"
                    :key="note.id"
                    variant="soft"
                    color="primary"
                  >
                    {{ note.name }}
                  </UBadge>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-medium text-jade mb-2">Middle Notes</h4>
                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="note in perfume.middle_notes"
                    :key="note.id"
                    variant="soft"
                    color="secondary"
                  >
                    {{ note.name }}
                  </UBadge>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-medium text-jade mb-2">Base Notes</h4>
                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="note in perfume.base_notes"
                    :key="note.id"
                    variant="soft"
                    color="neutral"
                  >
                    {{ note.name }}
                  </UBadge>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Size Selection -->
          <div>
            <label class="text-sm font-medium text-slate-700 mb-2 block">
              Select Size
            </label>
            <URadioGroup
              v-model="selectedSize"
              :options="sizes"
              option-attribute="label"
            />
          </div>

          <!-- Quantity -->
          <div>
            <label class="text-sm font-medium text-slate-700 mb-2 block">
              Quantity
            </label>
            <UInputNumber v-model="quantity" :min="1" :max="10" />
          </div>

          <!-- Actions -->
          <div class="flex gap-4">
            <UButton
              color="primary"
              size="xl"
              block
              label="Add to Cart"
              icon="i-lucide-shopping-cart"
              @click="addToCart"
            />
            <UButton
              color="secondary"
              size="xl"
              variant="outline"
              label="Customize"
              icon="i-lucide-wand-sparkles"
              @click="openCustomizer"
            />
          </div>

          <!-- Additional Info -->
          <UCard variant="soft">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-check-circle" class="text-jade w-5 h-5" />
                <span class="text-sm">Free shipping on orders over $100</span>
              </div>
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-sparkles" class="text-gold w-5 h-5" />
                <span class="text-sm">Handcrafted with premium ingredients</span>
              </div>
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-shield-check" class="text-navy w-5 h-5" />
                <span class="text-sm">30-day satisfaction guarantee</span>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

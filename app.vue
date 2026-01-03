<script setup lang="ts">
const features = [{
  icon: 'i-lucide-sparkles',
  title: 'Bespoke Fragrances',
  description: 'Create your signature scent with our master perfumers'
}, {
  icon: 'i-lucide-flask-conical',
  title: 'Premium Ingredients',
  description: 'Rare essences from around the world'
}, {
  icon: 'i-lucide-award',
  title: 'Artisan Crafted',
  description: 'Handcrafted with centuries-old techniques'
}]

const testimonials = [{
  name: 'Sophia Laurent',
  role: 'Fashion Designer',
  avatar: 'https://i.pravatar.cc/150?img=1',
  quote: 'My custom perfume is absolutely divine. It captures my essence perfectly.'
}, {
  name: 'Marcus Chen',
  role: 'CEO',
  avatar: 'https://i.pravatar.cc/150?img=12',
  quote: 'The quality and personalization exceeded all my expectations.'
}, {
  name: 'Isabella Rose',
  role: 'Artist',
  avatar: 'https://i.pravatar.cc/150?img=5',
  quote: 'A truly luxurious experience from start to finish.'
}]

const { data: user } = useSupabaseUser()
</script>

<template>
  <UMain>
    <!-- Hero Section -->
    <UPageHero
      title="Craft Your Signature Scent"
      description="Experience the art of bespoke perfumery. Create a unique fragrance that tells your story."
      class="relative overflow-hidden"
    >
      <template #headline>
        <UBadge color="amber" variant="subtle" class="mb-4">
          <span class="text-amber-400">✨</span> Luxury Perfumery
        </UBadge>
      </template>

      <template #links>
        <UButton
          to="/products"
          color="amber"
          size="xl"
          icon="i-lucide-sparkles"
          class="shadow-lg shadow-amber-500/50"
        >
          Explore Collections
        </UButton>
        <UButton
          to="/custom"
          color="emerald"
          variant="outline"
          size="xl"
          icon="i-lucide-flask-conical"
        >
          Create Custom Perfume
        </UButton>
      </template>

      <template #default>
        <div class="absolute inset-0 luxury-gradient opacity-20" />
      </template>
    </UPageHero>

    <!-- Features Section -->
    <UPageSection
      title="The Art of Perfumery"
      description="Discover what makes our fragrances extraordinary"
      class="bg-gradient-to-b from-transparent to-amber-50/10 dark:to-amber-950/10"
    >
      <UPageGrid>
        <UPageCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :icon="feature.icon"
          class="hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300"
        />
      </UPageGrid>
    </UPageSection>

    <!-- Product Preview Section -->
    <UPageSection
      title="Signature Collections"
      description="Explore our curated fragrance families"
    >
      <UPageGrid :columns="3">
        <UCard 
          v-for="i in 3" 
          :key="i"
          class="group hover:scale-105 transition-transform duration-300"
        >
          <div class="aspect-square bg-gradient-to-br from-amber-100 to-emerald-100 dark:from-amber-950 dark:to-emerald-950 rounded-lg mb-4" />
          <h3 class="text-xl font-semibold mb-2">Collection {{ i }}</h3>
          <p class="text-muted mb-4">Discover timeless elegance</p>
          <UButton to="/products" color="amber" variant="subtle" block>
            View Collection
          </UButton>
        </UCard>
      </UPageGrid>
    </UPageSection>

    <!-- Testimonials -->
    <UPageSection
      title="Client Stories"
      description="What our clients say about their bespoke fragrances"
      class="bg-gradient-to-b from-emerald-50/10 to-blue-50/10 dark:from-emerald-950/10 dark:to-blue-950/10"
    >
      <UPageGrid :columns="3">
        <UCard v-for="testimonial in testimonials" :key="testimonial.name">
          <div class="flex items-center gap-3 mb-4">
            <UAvatar :src="testimonial.avatar" :alt="testimonial.name" size="lg" />
            <div>
              <h4 class="font-semibold">{{ testimonial.name }}</h4>
              <p class="text-sm text-muted">{{ testimonial.role }}</p>
            </div>
          </div>
          <p class="text-muted italic">"{{ testimonial.quote }}"</p>
        </UCard>
      </UPageGrid>
    </UPageSection>

    <!-- CTA Section -->
    <UPageCTA
      title="Ready to Create Your Signature Scent?"
      description="Join thousands of clients who have discovered their perfect fragrance"
      :links="[
        { label: 'Get Started', to: user ? '/custom' : '/login', size: 'xl', color: 'amber' },
        { label: 'Learn More', to: '/about', size: 'xl', variant: 'outline', color: 'emerald' }
      ]"
      class="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10"
    />
  </UMain>
</template>

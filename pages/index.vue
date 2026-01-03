<script setup lang="ts">
const features = [
  {
    icon: 'i-lucide-flask-conical',
    title: 'Custom Fragrances',
    description: 'Create your signature scent with our master perfumers'
  },
  {
    icon: 'i-lucide-sparkles',
    title: 'Premium Ingredients',
    description: 'Only the finest natural and rare ingredients'
  },
  {
    icon: 'i-lucide-heart',
    title: 'Personalized Experience',
    description: 'Your unique journey to the perfect perfume'
  }
]

const heroLinks = [
  {
    label: 'Create Your Perfume',
    to: '/customize',
    size: 'xl',
    color: 'primary',
    icon: 'i-lucide-wand-sparkles'
  },
  {
    label: 'Browse Collection',
    to: '/products',
    size: 'xl',
    color: 'neutral',
    variant: 'outline'
  }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section with Luxury Gradient -->
    <UPageHero
      class="bg-luxury-gradient text-white"
      headline="Luxury Perfumery"
      title="Craft Your Signature Scent"
      description="Discover the art of bespoke perfumery. Create a unique fragrance that tells your story with our master perfumers and premium ingredients."
      :links="heroLinks"
      orientation="horizontal"
    >
      <template #default>
        <UCard class="backdrop-blur-sm bg-white/10 border border-white/20">
          <img 
            src="/images/perfume-hero.jpg" 
            alt="Luxury Perfume Bottles" 
            class="rounded-lg w-full h-auto object-cover"
          />
        </UCard>
      </template>
    </UPageHero>

    <!-- Features Section -->
    <UPageSection class="py-24 bg-slate-50">
      <UContainer>
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-navy mb-4">Why Choose Us</h2>
          <p class="text-xl text-slate-600">Experience luxury personalized perfumery</p>
        </div>

        <UPageGrid>
          <UCard 
            v-for="feature in features" 
            :key="feature.title"
            variant="subtle"
            class="hover:shadow-xl transition-all duration-300"
          >
            <div class="text-center space-y-4">
              <div class="flex justify-center">
                <div class="p-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full">
                  <UIcon :name="feature.icon" class="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 class="text-2xl font-semibold text-navy">{{ feature.title }}</h3>
              <p class="text-slate-600">{{ feature.description }}</p>
            </div>
          </UCard>
        </UPageGrid>
      </UContainer>
    </UPageSection>

    <!-- How It Works -->
    <UPageSection class="py-24 bg-white">
      <UContainer>
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-navy mb-4">Your Journey</h2>
          <p class="text-xl text-slate-600">Three simple steps to your perfect perfume</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center space-y-4">
            <div class="w-16 h-16 mx-auto bg-jade text-white rounded-full flex items-center justify-center text-2xl font-bold">
              1
            </div>
            <h3 class="text-xl font-semibold text-navy">Discover</h3>
            <p class="text-slate-600">Explore our collection or start from scratch</p>
          </div>
          <div class="text-center space-y-4">
            <div class="w-16 h-16 mx-auto bg-gold text-white rounded-full flex items-center justify-center text-2xl font-bold">
              2
            </div>
            <h3 class="text-xl font-semibold text-navy">Customize</h3>
            <p class="text-slate-600">Select your preferred notes and intensity</p>
          </div>
          <div class="text-center space-y-4">
            <div class="w-16 h-16 mx-auto bg-navy text-white rounded-full flex items-center justify-center text-2xl font-bold">
              3
            </div>
            <h3 class="text-xl font-semibold text-navy">Create</h3>
            <p class="text-slate-600">Receive your unique, handcrafted perfume</p>
          </div>
        </div>
      </UContainer>
    </UPageSection>

    <!-- CTA Section -->
    <UPageCTA
      class="bg-gradient-to-r from-navy via-jade to-gold text-white"
      title="Ready to Create Your Signature Scent?"
      description="Join thousands of satisfied customers who found their perfect fragrance"
      :links="[
        { label: 'Get Started', size: 'xl', color: 'white', variant: 'solid', to: '/auth/register' },
        { label: 'Learn More', size: 'xl', color: 'white', variant: 'outline', to: '/about' }
      ]"
    />
  </div>
</template>
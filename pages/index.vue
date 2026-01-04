<script setup lang="ts">
// داده‌های بخش ویژگی‌ها
const features = [
  {
    icon: 'i-lucide-sparkles',
    title: 'Bespoke Fragrances',
    description: 'Create your signature scent with our master perfumers'
  },
  {
    icon: 'i-lucide-flask-conical',
    title: 'Premium Ingredients',
    description: 'Rare essences from around the world'
  },
  {
    icon: 'i-lucide-award',
    title: 'Artisan Crafted',
    description: 'Handcrafted with centuries-old techniques'
  }
]

// داده‌های بخش نظرات مشتریان
const testimonials = [
  {
    name: 'Sophia Laurent',
    role: 'Fashion Designer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    quote: 'My custom perfume is absolutely divine. It captures my essence perfectly.'
  },
  {
    name: 'Marcus Chen',
    role: 'CEO',
    avatar: 'https://i.pravatar.cc/150?img=12',
    quote: 'The quality and personalization exceeded all my expectations.'
  },
  {
    name: 'Isabella Rose',
    role: 'Artist',
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote: 'A truly luxurious experience from start to finish.'
  }
]
</script>

<template>
  <div class="space-y-24 pb-20">

    <!-- Hero Section -->
    <section class="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl mt-4 mx-4 shadow-2xl">
      <div class="absolute inset-0 luxury-gradient opacity-90" />
      <div class="relative z-10 text-center px-6 max-w-4xl space-y-8">
        <UBadge color="white" variant="soft" class="px-4 py-1 text-sm tracking-widest uppercase">
          ✨ Exclusive Perfumery
        </UBadge>

        <h1 class="text-6xl md:text-8xl font-serif font-bold text-white tracking-tighter">
          Your Scent, <br/>
          <span class="text-[#D4AF37]">Your Legacy</span>
        </h1>

        <p class="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
          ما در سنتیک، هنر عطرسازی را با احساسات شما ترکیب می‌کنیم تا رایحه‌ای خلق کنیم که فقط متعلق به شماست.
        </p>

        <div class="flex flex-col md:flex-row gap-4 justify-center pt-6">
          <UButton
            to="/custom"
            size="xl"
            class="bg-white text-[#0B1C2D] hover:bg-[#D4AF37] hover:text-white px-10 py-4 font-bold transition-all rounded-lg"
          >
            Start Creating
          </UButton>
          <UButton
            to="/products"
            variant="outline"
            size="xl"
            class="border-white text-white hover:bg-white/10 px-10 py-4 rounded-lg"
          >
            Explore Collections
          </UButton>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-4xl font-bold text-[#D4AF37] font-serif">The Art of Sentique</h2>
        <p class="text-gray-400">چرا ما متمایز هستیم؟</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title"
             class="glass-effect p-8 hover:border-[#D4AF37]/50 transition-all group text-center rounded-xl">
          <div class="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <UIcon :name="feature.icon" class="text-3xl text-[#D4AF37]" />
          </div>
          <h3 class="text-xl font-bold mb-4 text-white">{{ feature.title }}</h3>
          <p class="text-gray-400 font-light leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center text-[#D4AF37] mb-12 font-serif italic">Client Stories</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="t in testimonials" :key="t.name" class="glass-effect p-8 border border-white/5 rounded-xl">
          <div class="flex items-center gap-4 mb-6">
            <UAvatar :src="t.avatar" size="lg" class="ring-2 ring-[#D4AF37]/50" />
            <div>
              <h4 class="font-bold text-white">{{ t.name }}</h4>
              <p class="text-xs text-[#00A86B] tracking-widest uppercase">{{ t.role }}</p>
            </div>
          </div>
          <p class="text-gray-300 italic">"{{ t.quote }}"</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="px-6">
      <div class="max-w-5xl mx-auto luxury-gradient p-16 rounded-[3rem] text-center shadow-2xl">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Create Your Signature Scent?</h2>
        <p class="text-white/80 mb-10 max-w-xl mx-auto">به هزاران مشتری بپیوندید که رایحه منحصر به فرد خود را با سنتیک پیدا کرده‌اند.</p>
        <UButton to="/custom" size="xl" class="bg-[#0B1C2D] text-white hover:bg-black px-12 py-4 rounded-full font-bold transition-transform hover:scale-105">
          Get Started Now
        </UButton>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center py-10 opacity-50">
      <p class="text-xs tracking-[0.5em] uppercase">© 2024 Sentique Luxury Perfumes</p>
    </footer>

  </div>
</template>
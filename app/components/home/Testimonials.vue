<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Star, MessageCircle } from 'lucide-vue-next'

const { t } = useI18n()

const testimonials = computed(() => {
  const items = []
  for (let i = 0; i < 4; i++) {
    const ratingValue = t(`home.testimonials.items.${i}.rating`)
    items.push({
      name: t(`home.testimonials.items.${i}.name`),
      major: t(`home.testimonials.items.${i}.major`),
      year: t(`home.testimonials.items.${i}.year`),
      avatar: t(`home.testimonials.items.${i}.avatar`),
      content: t(`home.testimonials.items.${i}.content`),
      rating:
        typeof ratingValue === 'number'
          ? ratingValue
          : parseInt(ratingValue) || 5,
    })
  }
  return items
})
</script>

<template>
  <section
    id="testimonials"
    class="py-20 md:py-24 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden"
  >
    <div class="absolute top-0 left-0 w-full h-full">
      <div
        class="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
      ></div>
      <div
        class="absolute bottom-10 left-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
      ></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-foreground mb-6">
          {{ t('home.testimonials.title') }}
        </h2>
        <p
          class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          {{ t('home.testimonials.subtitle') }}
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
        >
          <div class="flex items-center mb-4">
            <div class="text-3xl mr-3">{{ testimonial.avatar }}</div>
            <div>
              <h4 class="font-bold text-card-foreground">
                {{ testimonial.name }}
              </h4>
              <p class="text-sm text-muted-foreground">
                {{ testimonial.major }} - {{ testimonial.year }}
              </p>
            </div>
          </div>

          <div class="flex mb-3">
            <Star
              v-for="star in testimonial.rating"
              :key="star"
              class="w-5 h-5 text-yellow-400 fill-current"
            />
          </div>

          <p class="text-muted-foreground leading-relaxed text-sm">
            "{{ testimonial.content }}"
          </p>
        </div>
      </div>

      <div class="text-center mt-12">
        <div
          class="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full"
        >
          <MessageCircle class="w-5 h-5 mr-2" />
          <span class="font-semibold">{{
            t('home.testimonials.trustBadge')
          }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

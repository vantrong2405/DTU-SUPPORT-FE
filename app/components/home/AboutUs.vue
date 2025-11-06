<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/animations/useScrollReveal'
import { useHoverEffect } from '@/composables/animations/useHoverEffect'

const { t } = useI18n()

const teamMembers = computed(() => {
  const members = []
  for (let i = 0; i < 5; i++) {
    members.push({
      name: t(`home.about.teamMembers.${i}.name`),
      role: t(`home.about.teamMembers.${i}.role`),
      avatar: t(`home.about.teamMembers.${i}.avatar`),
      description: t(`home.about.teamMembers.${i}.description`),
    })
  }
  return members
})

const { target: headerRef } = useScrollReveal({ threshold: 0.1, animation: 'fade' })
const { target: contentRef } = useScrollReveal({ threshold: 0.1, animation: 'slide', direction: 'up' })
</script>

<template>
  <section
    id="about-us"
    class="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-muted to-background relative overflow-hidden"
  >
    <div class="absolute top-0 left-0 w-full h-full">
      <div
        class="absolute top-10 sm:top-20 right-10 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 bg-primary/5 rounded-full blur-xl"
      ></div>
      <div
        class="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-24 h-24 sm:w-32 sm:h-32 bg-primary/5 rounded-full blur-2xl"
      ></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10 max-w-8xl">
      <div ref="headerRef" class="text-center mb-10 sm:mb-12 md:mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4 sm:mb-6 px-2">
          {{ t('home.about.title') }}
        </h2>
        <p
          class="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4"
        >
          {{ t('home.about.description') }}
        </p>
      </div>

      <div class="max-w-7xl mx-auto">
        <div class="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl">
          <div class="text-center mb-6 sm:mb-8">
            <h3 class="text-xl sm:text-2xl font-bold text-card-foreground mb-3 sm:mb-4">
              {{ t('home.about.teamTitle') }}
            </h3>
            <p class="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
              {{ t('home.about.teamSubtitle') }}
            </p>
          </div>

          <div ref="contentRef" class="grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <div
              v-for="member in teamMembers"
              :key="member.name"
              class="text-center p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/5 to-primary/5 hover:from-primary/10 hover:to-primary/10 transition-all duration-300 border border-border shadow-md hover:shadow-lg hover:scale-105 will-change-transform"
            >
              <div class="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4">{{ member.avatar }}</div>
              <h4 class="text-sm sm:text-base md:text-lg font-bold text-card-foreground mb-1 sm:mb-2">
                {{ member.name }}
              </h4>
              <p class="text-xs sm:text-sm md:text-base text-primary font-semibold mb-1 sm:mb-2">{{ member.role }}</p>
              <p class="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-none">
                {{ member.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

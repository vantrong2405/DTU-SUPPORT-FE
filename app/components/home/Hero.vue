<script setup lang="ts">
import logoDtu from '@/assets/images/logo-dtu.png'
import { useI18n } from 'vue-i18n'
import { useNavigation } from '@/composables/common/useNavigation'

const { t } = useI18n()
const { navigateTo } = useNavigation()
</script>

<template>
  <section class="relative overflow-hidden bg-background text-foreground">
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary/5 pointer-events-none"
    ></div>
    <div
      class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none"
    >
      <div
        class="w-full h-full bg-gradient-to-l from-primary-foreground/20 to-transparent"
      ></div>
    </div>
    <div class="relative z-10">
      <div class="container mx-auto px-4 py-24 md:py-32">
        <div class="max-w-4xl mx-auto text-center">
          <div class="mb-8">
            <div
              class="bg-primary text-primary-foreground rounded-2xl p-6 inline-block"
            >
              <img
                :src="logoDtu"
                alt="DTU Logo"
                class="w-32 h-24 object-contain"
              />
            </div>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {{ t('home.hero.title') }}
          </h1>
          <p
            class="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            {{ t('home.hero.subtitle') }}
          </p>

          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <NuxtLink
              :to="navigateTo('/tools')"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-4 text-lg font-semibold"
            >
              {{ t('home.hero.primaryCta') }}
            </NuxtLink>
            <NuxtLink
              :to="navigateTo('/about')"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-8 py-4 text-lg font-semibold"
            >
              {{ t('home.hero.secondaryCta') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

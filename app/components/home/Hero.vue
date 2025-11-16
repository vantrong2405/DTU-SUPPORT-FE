<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useNavigation } from '@/composables/common/useNavigation'
import heroImage from '@/assets/images/hero-student.jpg'

const { t } = useI18n()
const { navigateTo } = useNavigation()
</script>

<template>
  <section class="relative overflow-hidden bg-background text-foreground">
    <div class="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div class="max-w-6xl mx-auto">
        <div class="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-8 sm:p-10 shadow-xl">
          <div class="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div class="order-2 lg:order-1">
              <h1 class="text-4xl sm:text-5xl md:text-[48px] font-black leading-[1em] tracking-[-0.05em] mb-4 text-foreground">
                {{ t('home.hero.title') }}
              </h1>
              <p
                class="text-base text-muted-foreground leading-[1.5em] mb-6"
              >
                {{ t('home.hero.subtitle') }}
              </p>

              <div
                class="flex flex-col sm:flex-row gap-4"
              >
                <NuxtLink
                  :to="navigateTo('/tools')"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-5 text-base font-bold transition-colors"
                >
                  {{ t('home.hero.primaryCta') }}
                </NuxtLink>
                <NuxtLink
                  :to="navigateTo('/marketplace')"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-muted text-foreground hover:bg-muted/80 h-12 px-5 text-base font-bold transition-colors border border-border"
                >
                  {{ t('home.hero.secondaryCta') }}
                </NuxtLink>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <div class="rounded-lg overflow-hidden bg-muted relative">
                <img
                  :src="heroImage"
                  alt="DTU Students"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

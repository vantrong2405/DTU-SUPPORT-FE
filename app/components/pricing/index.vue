<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PricingList from './PricingList.vue'
import * as Icon from '@/components/ui/icon'

const { t } = useI18n()
const SCOPE = 'pricing'
</script>

<template>
  <section class="bg-background text-foreground py-12 sm:py-14 md:py-20">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-5xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent ring-1 ring-accent/20 text-xs sm:text-sm mb-3 sm:mb-4">
          <Icon.CreditCard class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{{ t(`${SCOPE}.badge`) }}</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight px-2">
          <span class="text-foreground">{{ t(`${SCOPE}.title`) }}</span>
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            {{ t(`${SCOPE}.titleHighlight`) }}
          </span>
        </h1>
        <p class="text-foreground/80 mt-3 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          {{ t(`${SCOPE}.subtitle`) }}
        </p>
      </div>

      <PricingList />
    </div>
  </section>
</template>

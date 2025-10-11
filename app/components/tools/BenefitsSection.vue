<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const SCOPE = 'tools.benefits'
</script>

<template>
  <section class="py-20 md:py-24 bg-background">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-foreground mb-6">
          {{ t(`${SCOPE}.titlePrefix`) }}
          <span class="text-primary">{{ t(`${SCOPE}.titlePrimary`) }}</span>
          {{ t(`${SCOPE}.titleSuffix`) }}
        </h2>
        <p
          class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          {{ t('tools.benefits.subtitle') }}
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <div
          v-for="i in [0, 1, 2, 3, 4, 5]"
          :key="i"
          class="text-center p-6 rounded-2xl bg-gradient-to-br from-muted to-background hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-border shadow-sm hover:shadow-lg"
        >
          <div
            class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br from-primary/10 to-primary/20"
          >
            {{ t(`${SCOPE}.items.${i}.icon`) }}
          </div>
          <h3 class="text-xl font-bold text-foreground mb-3">
            {{ t(`${SCOPE}.items.${i}.title`) }}
          </h3>
          <p class="text-muted-foreground leading-relaxed">
            {{ t(`${SCOPE}.items.${i}.description`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

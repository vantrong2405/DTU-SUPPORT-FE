<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="py-16 sm:py-20 md:py-24 bg-background">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-4xl mx-auto">
        <div
          class="bg-gradient-to-r from-primary to-primary rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 text-center text-primary-foreground relative overflow-hidden"
        >
          <div class="relative z-10">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-2">
              {{ t('tools.cta.title') }}
            </h2>
            <p class="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto px-4">
              {{ t('tools.cta.subtitle') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

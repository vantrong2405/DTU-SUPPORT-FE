<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>

<template>
  <section class="py-20 md:py-24 bg-background">
    <div class="container mx-auto">
      <div class="max-w-4xl mx-auto">
        <div class="bg-gradient-to-r from-primary to-primary rounded-3xl p-12 md:p-16 text-center text-primary-foreground relative overflow-hidden">
          <div class="relative z-10">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">{{ t('tools.cta.title') }}</h2>
            <p class="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">{{ t('tools.cta.subtitle') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

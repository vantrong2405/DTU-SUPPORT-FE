<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import Hero from '@/components/common/Hero.vue'
import ToolsGrid from '@/components/tools/ToolsGrid.vue'
import BenefitsSection from '@/components/tools/BenefitsSection.vue'
import ToolsCTA from '@/components/tools/ToolsCTA.vue'
</script>

<template>
  <div>
    <Hero
      :title="t('tools.hero.title')"
      :subtitle="t('tools.hero.subtitle')"
      :show-buttons="false"
    />
    <ToolsGrid />
    <BenefitsSection />
    <ToolsCTA />
  </div>
</template>

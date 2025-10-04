<script setup lang="ts">
import Hero from '~/components/common/Hero.vue'
import ToolsGrid from '~/components/tools/ToolsGrid.vue'
import BenefitsSection from '~/components/tools/BenefitsSection.vue'
import ToolsCTA from '~/components/tools/ToolsCTA.vue'
</script>

<template>
  <div>
    <Hero
      title="Công cụ hỗ trợ học tập"
      subtitle="Bộ sưu tập các công cụ được thiết kế đặc biệt cho sinh viên DTU"
      :show-buttons="false"
    />
    <ToolsGrid />
    <BenefitsSection />
    <ToolsCTA />
  </div>
</template>

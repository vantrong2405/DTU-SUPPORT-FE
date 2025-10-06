<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import Hero from '@/components/common/Hero.vue'
import WhatWeDo from '@/components/home/WhatWeDo.vue'
import AboutUs from '@/components/home/AboutUs.vue'
import Testimonials from '@/components/home/Testimonials.vue'
import FAQ from '@/components/home/FAQ.vue'
import ScrollToTop from '@/components/common/ScrollToTop.vue'
</script>

<template>
  <div>
    <Hero
      :title="t('home.hero.title')"
      :subtitle="t('home.hero.subtitle')"
    />
    <WhatWeDo />
    <AboutUs />
    <Testimonials />
    <FAQ />
    <ScrollToTop />
  </div>

</template>

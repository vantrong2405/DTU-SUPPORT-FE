<script setup lang="ts">
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
      title="DTU Help Center"
      subtitle="Nền tảng hỗ trợ học tập toàn diện cho sinh viên Đại học Duy Tân"
    />
    <WhatWeDo />
    <AboutUs />
    <Testimonials />
    <FAQ />
    <ScrollToTop />
  </div>

</template>

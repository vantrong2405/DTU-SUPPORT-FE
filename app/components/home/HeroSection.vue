<script setup lang="ts">
import { computed } from 'vue'
import logoUrl from '~/assets/images/logo-dtu.png'
import Button from '@/components/ui/button/Button.vue'

const title = computed(() => 'DTU Help Center')
const subtitle = computed(() => 'Khám phá các công cụ hỗ trợ học tập toàn diện cho sinh viên DTU')
const primaryCta = computed(() => ({ label: 'Khám phá các tool', to: '/tools' }))
const secondaryCta = computed(() => ({ label: 'Tìm hiểu thêm', to: '/about' }))
</script>

<template>
  <section class="relative overflow-hidden bg-dtu-red text-dtu-white">
    <div class="absolute inset-0 bg-gradient-to-br from-dtu-red/90 to-dtu-red"></div>
    <div class="relative z-10">
      <div class="container mx-auto px-4 py-24 md:py-32">
        <div class="max-w-4xl mx-auto text-center">
          <div class="flex justify-center mb-8">
              <div class="bg-dtu-white/10 backdrop-blur-sm rounded-2xl p-4 border border-dtu-white/20">
                <img :src="logoUrl" alt="Đại học Duy Tân" class="h-16 w-auto md:h-20" />
              </div>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {{ title }}
          </h1>
          <p class="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-12">
            {{ subtitle }}
          </p>
          <div class="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
            <Button as="NuxtLink" :to="primaryCta.to" variant="secondary" size="lg" class="w-full sm:w-auto bg-dtu-white text-dtu-red hover:bg-dtu-white/90 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300">
              {{ primaryCta.label }}
            </Button>
            <Button as="NuxtLink" :to="secondaryCta.to" variant="outline" size="lg" class="w-full sm:w-auto border-2 border-dtu-white/30 bg-dtu-white/10 backdrop-blur-sm text-dtu-white hover:bg-dtu-white/20 hover:border-dtu-white/50 hover:scale-105 transition-all duration-300">
              {{ secondaryCta.label }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

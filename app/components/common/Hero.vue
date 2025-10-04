<script setup lang="ts">
import logoDtu from '~/assets/images/logo-dtu.png'

interface Props {
  title: string
  subtitle: string
  showButtons?: boolean
  primaryCta?: {
    label: string
    to: string
  }
  secondaryCta?: {
    label: string
    to: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  showButtons: true,
  primaryCta: () => ({
    label: 'Khám phá các công cụ',
    to: '/tools'
  }),
  secondaryCta: () => ({
    label: 'Tìm hiểu thêm',
    to: '/about'
  })
})
</script>

<template>
  <section class="relative overflow-hidden bg-dtu-red text-dtu-white">
    <div class="absolute inset-0 bg-gradient-to-br from-dtu-red/90 to-dtu-red"></div>
    <div class="absolute top-0 right-0 w-1/3 h-full opacity-10">
      <div class="w-full h-full bg-gradient-to-l from-dtu-white/20 to-transparent"></div>
    </div>
    <div class="relative z-10">
      <div class="container mx-auto px-4 py-24 md:py-32">
        <div class="max-w-4xl mx-auto text-center">
          <div class="mb-8">
            <div class="bg-dtu-white/10 backdrop-blur-sm rounded-2xl p-6 border border-dtu-white/20 inline-block">
              <img :src="logoDtu" alt="DTU Logo" class="w-32 h-24 object-contain">
            </div>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {{ props.title }}
          </h1>
          <p class="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-8">
            {{ props.subtitle }}
          </p>

          <div v-if="props.showButtons" class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink :to="props.primaryCta.to"
              class="bg-dtu-white text-dtu-red px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dtu-white/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              {{ props.primaryCta.label }}
            </NuxtLink>
            <NuxtLink :to="props.secondaryCta.to"
              class="bg-dtu-white/10 text-dtu-white px-8 py-4 rounded-xl font-semibold text-lg border border-dtu-white/30 hover:bg-dtu-white/20 hover:scale-105 transition-all duration-300">
              {{ props.secondaryCta.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

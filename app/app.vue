<template>
  <div class="min-h-dvh bg-background text-foreground">
    <LoadingScreen :is-loading="isLoading" :progress="progress" />

    <div v-show="!isLoading" class="transition-opacity duration-500">
      <Header />
      <NuxtPage />
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import LoadingScreen from '@/components/common/LoadingScreen.vue'
import { useLoadingLogic } from '@/composables/common/useLoadingLogic'

const { isLoading, progress, initLoading } = useLoadingLogic()

onMounted(() => {
  initLoading()
})
</script>

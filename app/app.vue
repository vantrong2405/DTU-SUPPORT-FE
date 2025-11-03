<template>
  <div class="min-h-dvh bg-background text-foreground">
    <LoadingScreen :is-loading="isLoading" :progress="progress" />

    <div v-show="!isLoading" class="transition-opacity duration-500">
      <Header />
      <Analytics />
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
import { useAuth } from '@/composables/common/useAuth'
import { useAuthStore } from '@/stores/auth'
import { Analytics } from '@vercel/analytics/nuxt';

const { isLoading, progress, initLoading } = useLoadingLogic()

onMounted(() => {
  initLoading()
  const { getCurrentUser } = useAuth()
  const auth = useAuthStore()
  if (!(auth as unknown as { hasSessionChecked: boolean }).hasSessionChecked) {
    getCurrentUser()
  }
})
</script>

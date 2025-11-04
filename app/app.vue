<template>
  <div class="min-h-dvh bg-background text-foreground">
    <LoadingScreen :is-loading="isLoading" :progress="progress" />

    <div v-show="!isLoading" class="transition-opacity duration-500">
      <Header />
      <Analytics />
      <NuxtPage />
      <ChatDock v-if="showChatDock" />
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import LoadingScreen from '@/components/common/LoadingScreen.vue'
import ChatDock from '@/components/gpa/ChatDock.vue'
import { useLoadingLogic } from '@/composables/common/useLoadingLogic'
import { useAuth } from '@/composables/auth'
import { useAuthStore } from '@/stores/auth'
import { Analytics } from '@vercel/analytics/nuxt';
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const { isLoading, progress, initLoading } = useLoadingLogic()

onMounted(() => {
  initLoading()
  const { getCurrentUser } = useAuth()
  const auth = useAuthStore()
  if (!(auth as unknown as { hasSessionChecked: boolean }).hasSessionChecked) {
    getCurrentUser()
  }
})

const route = useRoute()
const showChatDock = computed(() => route.path.startsWith('/tools/gpa'))
</script>

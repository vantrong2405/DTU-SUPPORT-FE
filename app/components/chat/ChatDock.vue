<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as Icon from '@/components/ui/icon'
import ChatBox from '@/components/chat/index.vue'

const isOpen = ref(false)

const handleToggle = () => {
  isOpen.value = !isOpen.value
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
  <div class="fixed right-4 sm:right-6 md:right-8 z-50" :style="{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)' }">
    <Transition name="dock">
      <div
        v-show="isOpen"
        class="mb-3 w-[92vw] max-w-sm sm:max-w-md md:max-w-md rounded-2xl border border-border/30 bg-card text-card-foreground shadow-2xl overflow-hidden ring-1 ring-border/30"
      >
        <div class="h-[55vh] sm:h-[60vh] min-h-[420px] max-h-[560px] w-full">
          <ChatBox @close="isOpen = false" />
        </div>
      </div>
    </Transition>

    <button
      type="button"
      aria-label="Toggle AI Chat"
      class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/40"
      @click="handleToggle"
      v-show="!isOpen"
    >
      <Icon.Bot class="w-6 h-6" />
    </button>
  </div>
  </Teleport>
</template>

<style scoped>
.dock-enter-active,
.dock-leave-active { transition: all 0.2s ease; }
.dock-enter-from,
.dock-leave-to { opacity: 0; transform: translateY(8px) scale(0.98); }
</style>

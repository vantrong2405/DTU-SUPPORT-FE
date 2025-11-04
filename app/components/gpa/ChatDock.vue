<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as Icon from '@/components/ui/icon'
import ChatBox from '@/components/gpa/ChatBox.vue'

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
  <div class="fixed right-4 z-50 sm:right-6" :style="{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }">
    <Transition name="dock">
      <div
        v-if="isOpen"
        class="mb-3 w-[92vw] max-w-sm sm:max-w-md md:max-w-lg rounded-xl border border-border/30 bg-card text-card-foreground shadow-xl overflow-hidden"
      >
        <div class="h-[65vh] sm:h-[70vh] max-h-[520px] sm:max-h-[640px] w-full">
          <ChatBox />
        </div>
      </div>
    </Transition>

    <button
      type="button"
      aria-label="Toggle AI Chat"
      class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/40"
      @click="handleToggle"
    >
      <Icon.Bot v-if="!isOpen" class="w-6 h-6" />
      <Icon.X v-else class="w-6 h-6" />
    </button>
  </div>
  </Teleport>
</template>

<style scoped>
.dock-enter-active,
.dock-leave-active {
  transition: all 0.2s ease;
}
.dock-enter-from,
.dock-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>



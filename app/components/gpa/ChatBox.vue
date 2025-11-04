<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as Icon from '@/components/ui/icon'
import { useGpaChatConversation } from '@/composables/gpa/useGpaChatConversation'
import { cn } from '@/lib/utils'
import type { ToolResult, UiComponent } from '@/types/chat'
import GpaResultCard from './GpaResultCard.vue'
import PeResultCard from './PeResultCard.vue'

const { t } = useI18n()
const SCOPE = 'tools.gpa'

const { messages, isLoading, error, sendUserMessage, clearConversation } = useGpaChatConversation()
const inputValue = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const handleSend = async () => {
  if (!inputValue.value.trim() || isLoading.value) return

  const content = inputValue.value.trim()
  inputValue.value = ''
  await sendUserMessage(content)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSend()
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

watch(messages, () => {
  scrollToBottom()
}, { deep: true })

const getToolComponent = (uiComponent: UiComponent) => {
  const componentMap: Record<UiComponent, any> = {
    GpaResultCard,
    PeResultCard,
  }
  return componentMap[uiComponent]
}
</script>

<template>
  <div class="flex flex-col h-[600px] sm:h-[700px] rounded-xl sm:rounded-2xl border border-border/30 bg-card text-card-foreground shadow-lg backdrop-blur-sm overflow-hidden bg-gradient-to-b from-card to-card/95">
    <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent" ref="messagesContainer">
      <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
        <div class="relative mb-6">
          <div class="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>
          <div class="relative bg-accent/10 rounded-full p-4 ring-2 ring-accent/20">
            <Icon.Bot class="w-12 h-12 sm:w-16 sm:h-16 text-accent relative z-10" />
          </div>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-foreground mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          {{ t(`${SCOPE}.chat.empty.title`) }}
        </h3>
        <p class="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
          {{ t(`${SCOPE}.chat.empty.description`) }}
        </p>
      </div>

      <TransitionGroup name="message" tag="div" class="space-y-4">
        <div v-for="msg in messages" :key="msg.id" class="flex flex-col gap-2 animate-slide-up">
          <div
            :class="cn(
              'flex gap-3 max-w-[85%] sm:max-w-[75%] transition-all duration-300',
              msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            )"
          >
            <div
              v-if="msg.role === 'assistant'"
              class="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center ring-2 ring-accent/20 shadow-sm"
            >
              <Icon.Bot class="w-5 h-5 text-accent" />
            </div>

            <div class="flex flex-col gap-2">
              <div
                :class="cn(
                  'rounded-2xl px-4 py-3 text-sm sm:text-base shadow-sm transition-all duration-200',
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-tr-sm shadow-primary/20'
                    : 'bg-muted/80 backdrop-blur-sm text-muted-foreground rounded-tl-sm border border-border/30'
                )"
              >
                <p class="whitespace-pre-wrap break-words leading-relaxed">{{ msg.content }}</p>
              </div>

              <component
                v-if="msg.toolResult && msg.toolResult.uiComponent"
                :is="getToolComponent(msg.toolResult.uiComponent)"
                :data="msg.toolResult.data"
                class="max-w-full"
              />
            </div>

            <div
              v-if="msg.role === 'user'"
              class="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-2 ring-primary/20 shadow-sm"
            >
              <Icon.MessageCircle class="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </TransitionGroup>

      <Transition name="fade" mode="out-in">
        <div v-if="isLoading" class="flex gap-3 max-w-[75%] mr-auto items-start">
          <div class="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center ring-2 ring-accent/20 shadow-sm animate-pulse">
            <Icon.Bot class="w-5 h-5 text-accent" />
          </div>
          <div class="bg-muted/80 backdrop-blur-sm text-muted-foreground rounded-2xl rounded-tl-sm px-4 py-3 border border-border/30 shadow-sm">
            <div class="flex gap-1.5">
              <span class="w-2 h-2 bg-accent rounded-full animate-bounce" style="animation-delay: 0s"></span>
              <span class="w-2 h-2 bg-accent rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
              <span class="w-2 h-2 bg-accent rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="fade" mode="out-in">
        <div v-if="error" class="flex gap-3 max-w-[75%] mr-auto items-start">
          <div class="flex-shrink-0 w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center ring-2 ring-destructive/20 shadow-sm">
            <Icon.AlertCircle class="w-5 h-5 text-destructive" />
          </div>
          <div class="bg-destructive/10 text-destructive rounded-2xl rounded-tl-sm px-4 py-3 border border-destructive/30 shadow-sm backdrop-blur-sm">
            <p class="text-sm font-medium">{{ t(`${SCOPE}.chat.error.message`) }}</p>
          </div>
        </div>
      </Transition>
    </div>

    <div class="border-t border-border/30 p-4 sm:p-6 bg-gradient-to-t from-muted/50 to-transparent backdrop-blur-sm">
      <div class="flex gap-2 sm:gap-3">
        <Input
          v-model="inputValue"
          :placeholder="t(`${SCOPE}.chat.placeholder`)"
          :disabled="isLoading"
          @keydown="handleKeyDown"
          class="flex-1 border-border/30 focus-visible:ring-primary/20 shadow-sm"
        />
        <Button
          @click="handleSend"
          :disabled="isLoading || !inputValue.trim()"
          size="lg"
          class="shadow-sm hover:shadow-md transition-shadow"
        >
          <Icon.ChevronRight class="w-4 h-4" />
          <span class="hidden sm:inline ml-2">
            {{ isLoading ? t(`${SCOPE}.chat.sending`) : t(`${SCOPE}.chat.send`) }}
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.message-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.message-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.message-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.4s ease-out;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: hsl(var(--border));
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: hsl(var(--border) / 0.8);
}
</style>

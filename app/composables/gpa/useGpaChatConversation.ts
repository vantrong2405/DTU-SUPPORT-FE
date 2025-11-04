import { ref } from 'vue'
import type { Message, ToolResult, ChatMessage } from '@/types/chat'
import { useGpaChatApi } from './useGpaChatApi'
import { CHAT_SYSTEM_MESSAGE } from '@/constants/gpa/chat'

export const useGpaChatConversation = () => {
  const { sendMessage } = useGpaChatApi()
  const messages = ref<Message[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const addMessage = (
    role: 'user' | 'assistant',
    content: string,
    toolResult?: ToolResult
  ) => {
    messages.value.push({
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
      toolResult,
    })
  }

  const sendUserMessage = async (content: string) => {
    if (!content.trim() || isLoading.value) return

    addMessage('user', content)
    isLoading.value = true
    error.value = null

    try {
      const chatMessages: ChatMessage[] = [
        {
          role: 'system',
          content: CHAT_SYSTEM_MESSAGE,
        },
        ...messages.value.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      ]

      const response = await sendMessage(chatMessages)

      addMessage('assistant', response.content, response.toolResult)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      addMessage(
        'assistant',
        'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.'
      )
    } finally {
      isLoading.value = false
    }
  }

  const clearConversation = () => {
    messages.value = []
    error.value = null
  }

  return {
    messages,
    isLoading,
    error,
    sendUserMessage,
    clearConversation,
  }
}

import type { ChatMessage, ChatResponseData } from '@/types/chat'
import { useApiFetch } from '@/lib/api'
import { ref } from 'vue'

export const useChatApi = () => {
  const requestPayload = ref<{ messages: ChatMessage[] } | null>(null)
  const requestQuery = ref<{ tone?: string } | null>(null)
  const {
    pending: isSending,
    error: apiError,
    data: response,
    execute: executeChatRequest,
  } = useApiFetch<ChatResponseData>('/api/chat', {
    method: 'POST',
    immediate: false,
    body: requestPayload,
    query: requestQuery,
  })

  const sendChatMessage = async (messages: ChatMessage[], tone?: string): Promise<ChatResponseData> => {
    requestPayload.value = { messages }
    requestQuery.value = tone ? { tone } : {}
    await executeChatRequest()
    if (apiError.value) {
      throw new Error(apiError.value.message || 'Failed to send message')
    }
    const payload = response.value?.data
    if (!payload) {
      throw new Error('Invalid response from server')
    }
    return payload
  }

  return {
    isSending,
    apiError,
    sendChatMessage,
  }
}

import type { ChatMessage, ChatResponseData } from '@/types/chat'
import type { ApiResponse } from '@/types/common'
import { useApiFetch } from '@/lib/api'

export const useGpaChatApi = () => {
  const sendMessage = async (messages: ChatMessage[]): Promise<ChatResponseData> => {
    const { data, error } = await useApiFetch<ChatResponseData>('/api/chat', {
      method: 'POST',
      body: {
        messages,
      },
    })

    if (error.value) {
      throw new Error(error.value.message || 'Failed to send message')
    }

    if (!data.value?.data) {
      throw new Error('Invalid response from server')
    }

    return data.value.data
  }

  return {
    sendMessage,
  }
}

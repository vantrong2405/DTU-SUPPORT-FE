import type { User } from '@/types/common'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const getUser = () => user.value

  const setUser = (userData: User | null) => {
    user.value = userData
  }

  return {
    user,
    getUser,
    setUser,
  }
})

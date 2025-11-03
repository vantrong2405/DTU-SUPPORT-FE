import type { User } from '@/types/common'
import { useAuthStore } from '@/stores/auth'
import { createApiClient } from '@/lib/api'
import { USER_API } from '@/constants/api/user.api'
import { AUTH_API } from '@/constants/api/auth.api'
import { ErrorMessage } from '@/constants/common/http'

export const useAuth = () => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const authStore = useAuthStore()

  const isLoading = ref(false)

  const getBackendUrl = () => {
    return config.public.backendUrl as string
  }

  const redirectToGoogleLogin = (returnUrl?: string) => {
    if (import.meta.client) {
      const backendUrl = getBackendUrl()
      const currentReturnUrl = returnUrl || window.location.href
      const loginUrl = `${backendUrl}${AUTH_API.googleRedirect(currentReturnUrl)}`
      window.location.href = loginUrl
    }
  }

  const getCurrentUser = async () => {
    if (import.meta.server) {
      return null
    }

    if (authStore.getUser()) {
      return authStore.getUser()
    }

    isLoading.value = true

    try {
      const api = createApiClient()
      const result = await api.get<User>(USER_API.me())
      authStore.setUser(result.data)
      return result.data
    } catch (error) {
      if (error instanceof Error && error.message === ErrorMessage.UNAUTHORIZED) {
        authStore.setUser(null)
        return null
      }
      console.error('Error fetching current user:', error)
      authStore.setUser(null)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const handleLogout = async () => {
    authStore.setUser(null)
    await router.push('/login')
  }

  const checkAuthAndRedirect = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      await router.push('/login')
      return false
    }
    return true
  }

  const isAuthenticated = computed(() => authStore.getUser() !== null)

  return {
    user: authStore.user,
    isLoading,
    isAuthenticated,
    redirectToGoogleLogin,
    getCurrentUser,
    handleLogout,
    checkAuthAndRedirect,
  }
}

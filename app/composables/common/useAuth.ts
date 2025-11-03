import type { User } from '@/types/common'
import { useAuthStore } from '@/stores/auth'
import { createApiClient } from '@/lib/api'
import { USER_API } from '@/constants/api/user.api'
import { AUTH_API } from '@/constants/api/auth.api'
import { ErrorMessage } from '@/constants/common/http'

export const useAuth = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const isLoading = ref(false)
  const isRedirecting = ref(false)

  const redirectToGoogleLogin = () => {
    if (!import.meta.client) return
    if (isRedirecting.value) return
    isRedirecting.value = true

    const backendUrl = config.public.backendUrl as string
    const route = useRoute()
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    const targetPath = redirect.startsWith('/') ? redirect : '/'
    const returnUrl = `${window.location.origin}${targetPath}`
    const loginUrl = `${backendUrl}${AUTH_API.googleRedirect(returnUrl)}`
    window.location.replace(loginUrl)
  }

  const getCurrentUser = async () => {
    if (import.meta.server) {
      return null
    }

    if (authStore.user) {
      return authStore.user
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
    ;(authStore as unknown as { setHasSessionChecked: (v: boolean) => void }).setHasSessionChecked(true)
    }
  }

  const isAuthenticated = computed(() => !!authStore.user)

  return {
    user: authStore.user,
    isLoading,
    isRedirecting,
    isAuthenticated,
    redirectToGoogleLogin,
    getCurrentUser,
  }
}

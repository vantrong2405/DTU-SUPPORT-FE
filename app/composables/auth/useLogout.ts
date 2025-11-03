import { useApiFetch } from '@/lib/api'
import { USER_API } from '@/constants/api/user.api'
import { useAuthStore } from '@/stores/auth'
import { useNavigation } from '@/composables/common/useNavigation'

export const useLogout = () => {
  const router = useRouter()
  const { navigateTo } = useNavigation()
  const { setUser } = useAuthStore()

  const { pending, error, execute } = useApiFetch<void>(USER_API.logout(), {
    method: 'DELETE',
    immediate: false,
  })

  const logout = async (redirectPath: string = '/') => {
    if (pending.value) return false

    try {
      await execute()
      if (error.value) {
        throw error.value
      }
      setUser(null)
      const target = navigateTo(redirectPath)
      await router.push(target)
      return true
    } catch {
      return false
    }
  }

  return {
    isLoggingOut: pending,
    error,
    logout,
  }
}

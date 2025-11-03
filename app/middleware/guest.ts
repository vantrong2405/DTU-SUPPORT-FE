import { useAuthStore } from '@/stores/auth'
import { createApiClient } from '@/lib/api'
import { USER_API } from '@/constants/api/user.api'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  if (!auth.user) {
    try {
      const api = createApiClient()
      const res = await api.get<import('@/types/common').User>(USER_API.me())
      auth.setUser(res.data as import('@/types/common').User)
    } catch {
      auth.setUser(null)
    }
  }

  if (auth.user) {
    const redirect = typeof to.query.redirect === 'string' ? to.query.redirect : '/'
    return navigateTo(redirect)
  }
})

import type { ApiResponse } from '@/types/common'
import type { UseFetchOptions } from 'nuxt/app'

export const useApiFetch = <T>(
  endpoint: string,
  options?: UseFetchOptions<ApiResponse<T>>
) => {
  const config = useRuntimeConfig()
  const backendUrl = config.public.backendUrl as string
  const url = `${backendUrl}${endpoint}`

  const defaultOptions: UseFetchOptions<ApiResponse<T>> = {
    credentials: 'include',
    ...options,
  }

  return useFetch<ApiResponse<T>>(url, defaultOptions)
}

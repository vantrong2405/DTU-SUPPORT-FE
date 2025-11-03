import type { ApiResponse, ApiErrorResponse } from '@/types/common'
import { HttpStatus, ErrorMessage } from '@/constants/common/http'

export const createApiClient = () => {
  const config = useRuntimeConfig()
  const backendUrl = config.public.backendUrl as string

  const _fetch = async <T>(
    endpoint: string,
    method: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> => {
    const headers: Record<string, string> = {}

    if (options?.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value
        })
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value
        })
      } else {
        Object.assign(headers, options.headers)
      }
    }

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      headers['Content-Type'] = 'application/json'
    }

    const { headers: _, method: __, body: ___, credentials: ____, ...restOptions } = options || {}

    const response = await fetch(`${backendUrl}${endpoint}`, {
      ...restOptions,
      method,
      headers,
      credentials: 'include',
      ...(body ? { body: JSON.stringify(body) } : {}),
    })

    if (!response.ok) {
      if (response.status === HttpStatus.UNAUTHORIZED) {
        if (import.meta.client) {
          await navigateTo('/login')
        }
        throw new Error(ErrorMessage.UNAUTHORIZED)
      }

      let errorMessage: string
      try {
        const errorData: ApiErrorResponse = await response.json()
        errorMessage = errorData.errors?.[0]?.message || `HTTP error! status: ${response.status}`
      } catch {
        errorMessage = `HTTP error! status: ${response.status}`
      }

      throw new Error(errorMessage)
    }

    return response.json()
  }

  return {
    get: <T>(endpoint: string, options?: RequestInit) =>
      _fetch<T>(endpoint, 'GET', undefined, options),

    post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
      _fetch<T>(endpoint, 'POST', body, options),

    put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
      _fetch<T>(endpoint, 'PUT', body, options),

    patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
      _fetch<T>(endpoint, 'PATCH', body, options),

    delete: <T>(endpoint: string, options?: RequestInit) =>
      _fetch<T>(endpoint, 'DELETE', undefined, options),
  }
}

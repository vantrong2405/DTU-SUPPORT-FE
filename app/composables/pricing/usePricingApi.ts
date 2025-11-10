import type { SubscriptionPlan, SubscriptionPlansResponse } from '@/types/pricing'
import { useApiFetch, extractErrorMessage } from '@/lib/api'
import { PRICING_API } from '@/constants/api/pricing.api'

export const usePricingApi = () => {
  const fetchPlans = async (): Promise<SubscriptionPlan[]> => {
    const { data, error, execute } = useApiFetch<SubscriptionPlansResponse>(PRICING_API.subscriptionPlans(), {
      method: 'GET',
      immediate: false,
    })

    await execute()

    if (data.value?.data) {
      return data.value.data.plans || []
    } else if (error.value) {
      const errorMessage = extractErrorMessage(error.value)
      throw new Error(errorMessage || 'Failed to fetch subscription plans')
    }

    return []
  }

  return { fetchPlans }
}

import type { Payment, CreatePaymentRequest } from '@/types/pricing'
import { useApiFetch, apiFetch, extractErrorMessage } from '@/lib/api'
import { PRICING_API } from '@/constants/api/pricing.api'

export const usePaymentApi = () => {
  const requestPayload = ref<CreatePaymentRequest | null>(null)

  const {
    pending: isCreating,
    error: createError,
    data: createResponse,
    execute: executeCreate,
  } = useApiFetch<Payment>(PRICING_API.createPayment(), {
    method: 'POST',
    immediate: false,
    body: requestPayload,
    watch: false,
  })

  const createPayment = async (subscriptionPlanId: number): Promise<Payment> => {
    requestPayload.value = {
      payment: {
        subscription_plan_id: subscriptionPlanId,
        payment_method: 'senpay',
      },
    }

    await executeCreate()

    if (createError.value) {
      const errorMessage = extractErrorMessage(createError.value)
      throw new Error(errorMessage || 'Failed to create payment')
    }

    const payload = createResponse.value?.data
    if (!payload) {
      throw new Error('Invalid response from server')
    }

    return payload
  }

  const getPayment = async (paymentId: number): Promise<Payment> => {
    try {
      const response = await apiFetch<Payment>(PRICING_API.getPayment(paymentId), {
        method: 'GET',
      })

      const payload = response.data
      if (!payload) {
        throw new Error('Invalid response from server')
      }

      return payload
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      throw new Error(errorMessage || 'Failed to fetch payment')
    }
  }

  const submitToSenPay = (payment: Payment) => {
    const { checkout_url, form_data } = payment

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = checkout_url
    form.style.display = 'none'

    Object.keys(form_data).forEach((key) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = String(form_data[key as keyof typeof form_data])
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
  }

  return {
    isCreating,
    createError,
    createPayment,
    getPayment,
    submitToSenPay,
  }
}

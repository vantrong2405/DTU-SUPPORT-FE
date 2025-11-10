export const PRICING_API = {
  subscriptionPlans: () => '/api/subscription-plans',
  createPayment: () => '/payments',
  getPayment: (id: number) => `/payments/${id}`,
} as const

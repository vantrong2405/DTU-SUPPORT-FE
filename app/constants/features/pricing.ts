import type { SubscriptionPlan } from '@/types/pricing'

export interface DefaultPricingPlan extends Omit<SubscriptionPlan, 'name' | 'description'> {
  i18n_key: 'basic' | 'premium' | 'pro'
}

export const DEFAULT_PRICING_PLANS: DefaultPricingPlan[] = [
  {
    id: 1,
    i18n_key: 'basic',
    price: 100000,
    duration_days: 30,
    features: {
      ai_limit: 50,
      marketplace_access: true,
      course_registration: false,
      priority_support: false,
    },
    is_active: true,
  },
  {
    id: 2,
    i18n_key: 'premium',
    price: 200000,
    duration_days: 30,
    features: {
      ai_limit: 200,
      marketplace_access: true,
      course_registration: true,
      priority_support: false,
    },
    is_active: true,
  },
  {
    id: 3,
    i18n_key: 'pro',
    price: 300000,
    duration_days: 30,
    features: {
      ai_limit: 500,
      marketplace_access: true,
      course_registration: true,
      priority_support: true,
    },
    is_active: true,
  },
]

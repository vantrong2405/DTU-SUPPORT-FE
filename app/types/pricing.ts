export interface SubscriptionPlan {
  id: number
  name: string
  description: string
  price: number
  duration_days: number
  features: {
    ai_limit?: number
    marketplace_access?: boolean
    course_registration?: boolean
    priority_support?: boolean
  }
  is_active: boolean
}

export interface Payment {
  id: number
  amount: number
  payment_method: string
  status: 'pending' | 'success' | 'failed' | 'expired' | 'cancelled'
  checkout_url: string
  form_data: {
    merchant: string
    order_amount: number
    order_invoice_number: string
    order_description: string
    return_url: string
    ipn_url: string
    signature: string
  }
  expires_at: string | null
  subscription_plan: SubscriptionPlan
  timestamps: {
    created_at: string
    updated_at: string
  }
}

export interface CreatePaymentRequest {
  payment: {
    subscription_plan_id: number
    payment_method: 'senpay'
  }
}

export interface SubscriptionPlansResponse {
  plans: SubscriptionPlan[]
}

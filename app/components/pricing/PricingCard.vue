<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import * as Icon from '@/components/ui/icon'
import type { SubscriptionPlan } from '@/types/pricing'
import type { DefaultPricingPlan } from '@/constants/features/pricing'
import { usePaymentApi } from '@/composables/pricing/usePaymentApi'
import { useAuthStore } from '@/stores/auth'
import { cn } from '@/lib/utils'

interface Props {
  plan: SubscriptionPlan | DefaultPricingPlan
  isPopular?: boolean
  currentPlanId?: number | null
}

const props = defineProps<Props>()

const { t } = useI18n()
const SCOPE = 'pricing'
const auth = useAuthStore()
const { isCreating, createPayment, submitToSenPay } = usePaymentApi()

const isCurrentPlan = computed(() => props.currentPlanId === props.plan.id)
const isProcessing = ref(false)
const errorMessage = ref<string | null>(null)

const handleSubscribe = async () => {
  if (!auth.user) {
    const redirect = encodeURIComponent('/pricing')
    navigateTo(`/login?redirect=${redirect}`)
    return
  }

  if (isCurrentPlan.value) {
    return
  }

  errorMessage.value = null

  try {
    isProcessing.value = true
    const payment = await createPayment(props.plan.id)
    submitToSenPay(payment)
  } catch (error) {
    console.error('Payment creation failed:', error)
    errorMessage.value = error instanceof Error ? error.message : t(`${SCOPE}.errors.failed`)
  } finally {
    isProcessing.value = false
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}
</script>

<template>
  <Card
    :class="
      cn(
        'relative flex flex-col transition-all duration-300 hover:shadow-lg',
        isPopular && 'border-primary shadow-md scale-105',
        isCurrentPlan && 'border-accent bg-accent/5'
      )
    "
  >
    <CardHeader class="text-center pb-4">
      <div v-if="isPopular" class="absolute -top-4 left-1/2 -translate-x-1/2">
        <div class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          <Icon.Sparkles class="w-3 h-3" />
          {{ t(`${SCOPE}.popular`) }}
        </div>
      </div>

      <div class="flex items-center justify-center mb-2">
        <div
          :class="
            cn(
              'w-12 h-12 rounded-full flex items-center justify-center',
              isPopular ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            )
          "
        >
          <Icon.Crown v-if="isPopular" class="w-6 h-6" />
          <Icon.Zap v-else class="w-6 h-6" />
        </div>
      </div>

      <CardTitle class="text-xl font-bold">
        {{ 'i18n_key' in plan ? t(`${SCOPE}.plans.${plan.i18n_key}.name`) : plan.name }}
      </CardTitle>
      <CardDescription class="text-sm mt-2">
        {{ 'i18n_key' in plan ? t(`${SCOPE}.plans.${plan.i18n_key}.description`) : plan.description }}
      </CardDescription>
    </CardHeader>

    <CardContent class="flex-1 space-y-4">
      <div class="text-center">
        <div class="text-3xl font-extrabold text-foreground mb-1">{{ formatPrice(plan.price) }}</div>
        <div class="text-xs text-muted-foreground">{{ t(`${SCOPE}.perMonth`) }}</div>
      </div>

      <ul class="space-y-2">
        <li v-if="plan.features.ai_limit" class="flex items-start gap-2 text-sm">
          <Icon.CheckCircle class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <span>{{ t(`${SCOPE}.features.aiLimit`, { count: plan.features.ai_limit }) }}</span>
        </li>
        <li v-if="plan.features.marketplace_access" class="flex items-start gap-2 text-sm">
          <Icon.CheckCircle class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <span>{{ t(`${SCOPE}.features.marketplace`) }}</span>
        </li>
        <li v-if="plan.features.course_registration" class="flex items-start gap-2 text-sm">
          <Icon.CheckCircle class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <span>{{ t(`${SCOPE}.features.courseRegistration`) }}</span>
        </li>
        <li v-if="plan.features.priority_support" class="flex items-start gap-2 text-sm">
          <Icon.CheckCircle class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <span>{{ t(`${SCOPE}.features.prioritySupport`) }}</span>
        </li>
      </ul>
    </CardContent>

    <CardFooter class="pt-4 space-y-2">
      <div v-if="errorMessage" class="rounded-lg border border-destructive/30 bg-destructive/10 p-3 flex items-start gap-2">
        <Icon.AlertCircle class="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
        <p class="text-xs text-destructive font-medium">{{ errorMessage }}</p>
      </div>
      <Button
        :class="cn('w-full', isPopular && 'bg-primary hover:bg-primary/90')"
        :disabled="isCurrentPlan || isProcessing || isCreating"
        @click="handleSubscribe"
      >
        <Icon.CreditCard v-if="!isProcessing && !isCreating" class="w-4 h-4 mr-2" />
        <Icon.Loader2 v-else class="w-4 h-4 mr-2 animate-spin" />
        {{
          isCurrentPlan
            ? t(`${SCOPE}.currentPlan`)
            : isProcessing || isCreating
              ? t(`${SCOPE}.processing`)
              : t(`${SCOPE}.subscribe`)
        }}
      </Button>
    </CardFooter>
  </Card>
</template>

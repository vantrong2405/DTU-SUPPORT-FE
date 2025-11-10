<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PricingCard from './PricingCard.vue'
import { usePricingApi } from '@/composables/pricing/usePricingApi'
import { useAuthStore } from '@/stores/auth'
import * as Icon from '@/components/ui/icon'
import type { SubscriptionPlan } from '@/types/pricing'
import { DEFAULT_PRICING_PLANS } from '@/constants/features/pricing'
import type { DefaultPricingPlan } from '@/constants/features/pricing'

const { t } = useI18n()
const SCOPE = 'pricing'

const auth = useAuthStore()
const { fetchPlans } = usePricingApi()
const plans = ref<(SubscriptionPlan | DefaultPricingPlan)[]>([])
const isLoading = ref(false)

const currentPlanId = computed(() => auth.user?.subscription_plan_id || null)

onMounted(async () => {
  isLoading.value = true
  try {
    const fetchedPlans = await fetchPlans()
    plans.value = fetchedPlans.length > 0 ? fetchedPlans : DEFAULT_PRICING_PLANS
  } catch (error) {
    console.error('Failed to fetch plans:', error)
    plans.value = DEFAULT_PRICING_PLANS
  } finally {
    isLoading.value = false
  }
})

const popularPlanIndex = computed(() => {
  if (plans.value.length < 2) return -1
  return 1
})
</script>

<template>
  <div class="w-full">
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <Icon.Loader2 class="w-8 h-8 animate-spin text-primary" />
    </div>

    <div v-else-if="plans.length === 0" class="text-center py-12">
      <p class="text-muted-foreground">{{ t(`${SCOPE}.noPlans`) }}</p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
    >
      <PricingCard
        v-for="(plan, index) in plans"
        :key="plan.id"
        :plan="plan as SubscriptionPlan | DefaultPricingPlan"
        :is-popular="index === popularPlanIndex"
        :current-plan-id="currentPlanId"
      />
    </div>
  </div>
</template>

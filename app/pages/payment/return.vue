<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import * as Icon from '@/components/ui/icon'
import { usePaymentApi } from '@/composables/pricing/usePaymentApi'
import { useNavigation } from '@/composables/common/useNavigation'

const { t } = useI18n()
const SCOPE = 'payment'
const route = useRoute()
const { navigateTo } = useNavigation()

const paymentId = computed(() => {
  const id = route.query.order_invoice_number || route.query.payment_id
  return id ? Number(id) : null
})

const paymentStatus = ref<'pending' | 'success' | 'failed' | null>(null)
const isLoading = ref(true)
const pollInterval = ref<NodeJS.Timeout | null>(null)

const { getPayment } = usePaymentApi()

const checkPaymentStatus = async () => {
  if (!paymentId.value) {
    paymentStatus.value = 'failed'
    isLoading.value = false
    return
  }

  try {
    const payment = await getPayment(paymentId.value)
    paymentStatus.value = payment.status as 'pending' | 'success' | 'failed'

    if (payment.status === 'pending') {
      startPolling()
    } else {
      stopPolling()
      isLoading.value = false
    }
  } catch (error) {
    console.error('Failed to check payment status:', error)
    paymentStatus.value = 'failed'
    isLoading.value = false
  }
}

const startPolling = () => {
  stopPolling()
  pollInterval.value = setInterval(async () => {
    if (!paymentId.value) return

    try {
      const payment = await getPayment(paymentId.value)
      if (payment.status !== 'pending') {
        paymentStatus.value = payment.status as 'success' | 'failed'
        stopPolling()
        isLoading.value = false

        if (payment.status === 'success') {
          setTimeout(() => {
            navigateTo('/pricing')
          }, 2000)
        }
      }
    } catch (error) {
      console.error('Failed to poll payment status:', error)
    }
  }, 3000)

  setTimeout(() => {
    stopPolling()
    if (paymentStatus.value === 'pending') {
      paymentStatus.value = 'failed'
      isLoading.value = false
    }
  }, 5 * 60 * 1000)
}

const stopPolling = () => {
  if (pollInterval.value) {
    clearInterval(pollInterval.value)
    pollInterval.value = null
  }
}

onMounted(() => {
  checkPaymentStatus()
})

onUnmounted(() => {
  stopPolling()
})
</script>

<template>
  <section class="bg-background text-foreground min-h-screen flex items-center justify-center py-12 sm:py-14 md:py-20">
    <div class="container mx-auto px-4 sm:px-6 w-full">
      <div class="max-w-md mx-auto">
        <Card class="rounded-xl sm:rounded-2xl border border-border/20 bg-card text-card-foreground shadow-md backdrop-blur-sm">
          <CardHeader class="text-center p-6 sm:p-8">
            <div v-if="isLoading || paymentStatus === 'pending'" class="mb-4">
              <div class="relative mx-auto w-16 h-16 mb-4">
                <div class="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
                <Icon.Loader2 class="w-16 h-16 text-primary animate-spin relative z-10" />
              </div>
              <CardTitle class="text-xl font-bold">{{ t(`${SCOPE}.processing.title`) }}</CardTitle>
              <CardDescription class="mt-2">{{ t(`${SCOPE}.processing.description`) }}</CardDescription>
            </div>

            <div v-else-if="paymentStatus === 'success'" class="mb-4">
              <div class="relative mx-auto w-16 h-16 mb-4">
                <div class="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
                <Icon.CheckCircle class="w-16 h-16 text-primary relative z-10" />
              </div>
              <CardTitle class="text-xl font-bold text-primary">{{ t(`${SCOPE}.success.title`) }}</CardTitle>
              <CardDescription class="mt-2">{{ t(`${SCOPE}.success.description`) }}</CardDescription>
            </div>

            <div v-else-if="paymentStatus === 'failed'" class="mb-4">
              <div class="relative mx-auto w-16 h-16 mb-4">
                <div class="absolute inset-0 bg-accent/10 rounded-full blur-xl"></div>
                <Icon.XCircle class="w-16 h-16 text-accent relative z-10" />
              </div>
              <CardTitle class="text-xl font-bold text-accent">{{ t(`${SCOPE}.failed.title`) }}</CardTitle>
              <CardDescription class="mt-2">{{ t(`${SCOPE}.failed.description`) }}</CardDescription>
            </div>
          </CardHeader>

          <CardContent class="p-6 sm:p-8 pt-0">
            <div class="flex flex-col gap-3">
              <Button v-if="paymentStatus === 'success'" size="lg" class="w-full" @click="navigateTo('/pricing')">
                <Icon.Check class="w-4 h-4 mr-2" />
                {{ t(`${SCOPE}.success.button`) }}
              </Button>
              <Button v-else-if="paymentStatus === 'failed'" size="lg" variant="outline" class="w-full" @click="navigateTo('/pricing')">
                <Icon.RotateCcw class="w-4 h-4 mr-2" />
                {{ t(`${SCOPE}.failed.button`) }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

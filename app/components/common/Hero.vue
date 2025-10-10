<script setup lang="ts">
import logoDtu from '@/assets/images/logo-dtu.png'
import * as SU from '@/components/ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface IProps {
  title: string
  subtitle: string
  showButtons?: boolean
  primaryCta?: {
    label: string
    to: string
  }
  secondaryCta?: {
    label: string
    to: string
  }
}

const props = withDefaults(defineProps<IProps>(), {
  showButtons: true,
    primaryCta: () => ({
      label: '',
      to: '/tools'
  }),
  secondaryCta: () => ({
    label: '',
    pCHAT: '/about'
  })
})

const primaryCtaLabel = computed(() => props.primaryCta?.label || t('home.hero.primaryCta'))
const secondaryCtaLabel = computed(() => props.secondaryCta?.label || t('home.hero.secondaryCta'))
</script>

<template>
  <section class="relative overflow-hidden bg-background text-foreground">
    <div class="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary/5 pointer-events-none"></div>
    <div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
      <div class="w-full h-full bg-gradient-to-l from-primary-foreground/20 to-transparent"></div>
    </div>
    <div class="relative z-10">
      <div class="container mx-auto px-4 py-24 md:py-32">
        <div class="max-w-4xl mx-auto text-center">
          <div class="mb-8">
            <div class="bg-primary text-primary-foreground rounded-2xl p-6 inline-block">
              <img :src="logoDtu" alt="DTU Logo" class="w-32 h-24 object-contain">
            </div>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {{ props.title }}
          </h1>
          <p class="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-8">
            {{ props.subtitle }}
          </p>

          <div v-if="props.showButtons" class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink :to="props.primaryCta.to">
              <SU.Button as="NuxtLink" :to="props.primaryCta.to" class="px-8 py-4 text-lg font-semibold">
                {{ primaryCtaLabel }}
              </SU.Button>
            </NuxtLink>
            <SU.Button as="NuxtLink" :to="props.secondaryCta.to" variant="outline" class="px-8 py-4 text-lg font-semibold">
              {{ secondaryCtaLabel }}
            </SU.Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

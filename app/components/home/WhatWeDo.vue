<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useScrollReveal } from '@/composables/animations/useScrollReveal'
import iconGpa from '@/assets/images/icon-gpa.svg'
import iconDegree from '@/assets/images/icon-degree.svg'
import iconMarketplace from '@/assets/images/icon-marketplace.svg'
import iconSupport from '@/assets/images/icon-support.svg'

const { t } = useI18n()

const SCOPE = 'home.whatWeDo'

const { target: headerRef } = useScrollReveal({ threshold: 0.1, animation: 'fade' })
const { target: contentRef } = useScrollReveal({ threshold: 0.1, animation: 'slide', direction: 'up' })
const { target: featuresRef } = useScrollReveal({ threshold: 0.1, animation: 'fade' })

const featureIcons = [iconGpa, iconDegree, iconMarketplace, iconSupport]
</script>

<template>
  <section id="what-we-do" class="py-12 sm:py-16 md:py-20 bg-background/50">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div ref="headerRef" class="mb-8 sm:mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground">
            {{ t('home.whatWeDo.title') }}
          </h2>
        </div>

        <div ref="featuresRef" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            v-for="i in [0, 1, 2, 3]"
            :key="i"
            class="bg-card border-border hover:shadow-lg transition-all duration-300"
          >
            <CardHeader class="p-5">
              <div class="w-[30px] h-9 mb-3 flex items-center justify-center">
                <img :src="featureIcons[i]" :alt="t(`${SCOPE}.features.${i}.title`)" class="w-full h-full object-contain" />
              </div>
              <CardTitle class="text-base font-bold text-foreground mb-2 leading-[1.5em]">
                {{ t(`${SCOPE}.features.${i}.title`) }}
              </CardTitle>
              <CardDescription class="text-sm text-muted-foreground leading-[1.43em]">
                {{ t(`${SCOPE}.features.${i}.description`) }}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

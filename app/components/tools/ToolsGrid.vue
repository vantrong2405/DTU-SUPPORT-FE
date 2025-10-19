<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useI18n } from 'vue-i18n'
import { useNavigation } from '@/composables/common/useNavigation'
import { Lightbulb, Clock, Circle } from 'lucide-vue-next'

const { t } = useI18n()
const { navigateTo } = useNavigation()

const SCOPE = 'tools.grid'
</script>

<template>
  <section
    class="py-20 md:py-24 bg-gradient-to-br from-muted to-background relative overflow-hidden"
  >
    <div class="absolute top-0 left-0 w-full h-full">
      <div
        class="absolute top-10 right-10 w-20 h-20 bg-primary/5 rounded-full blur-xl"
      ></div>
      <div
        class="absolute bottom-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
      ></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-foreground mb-6">
          {{ t(`${SCOPE}.titlePrefix`) }}
          <span class="text-primary">{{ t(`${SCOPE}.titlePrimary`) }}</span>
          {{ t(`${SCOPE}.titleSuffix`) }}
        </h2>
        <p
          class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          {{ t('tools.grid.subtitle') }}
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        <Card
          v-for="i in [0, 1, 2]"
          :key="i"
          class="relative overflow-hidden border-border"
        >
          <!-- Coming Soon Badge -->
          <div
            v-if="t(`${SCOPE}.items.${i}.status`) === 'coming-soon'"
            class="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10"
          >
            {{ t('tools.grid.badgeComing') }}
          </div>

          <CardHeader>
            <!-- Icon -->
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4"
              >
                <span class="text-2xl text-white">{{
                  t(`${SCOPE}.items.${i}.icon`)
                }}</span>
              </div>
            </div>

            <CardTitle class="text-xl font-bold text-foreground">
              {{ t(`${SCOPE}.items.${i}.title`) }}
            </CardTitle>

            <CardDescription class="text-muted-foreground leading-relaxed">
              {{ t(`${SCOPE}.items.${i}.desc`) }}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <!-- Key Features -->
            <div class="mb-6">
              <div class="flex items-center mb-3">
                <Lightbulb class="w-4 h-4 text-yellow-500 mr-2" />
                <h4 class="text-sm font-semibold text-foreground">
                  {{ t(`${SCOPE}.featuresHeading`) }}
                </h4>
              </div>
              <ul class="space-y-1">
                <li
                  v-for="f in [0, 1, 2, 3, 4]"
                  :key="f"
                  class="text-xs text-muted-foreground flex items-start"
                >
                  <Circle class="w-2 h-2 text-muted-foreground mr-2 mt-1.5 fill-current" />
                  {{ t(`${SCOPE}.items.${i}.features.${f}`) }}
                </li>
              </ul>
            </div>

            <!-- Button -->
            <div class="mt-auto">
              <NuxtLink
                v-if="t(`${SCOPE}.items.${i}.status`) === 'available'"
                :to="navigateTo(t(`${SCOPE}.items.${i}.to`)).path"
                :query="navigateTo(t(`${SCOPE}.items.${i}.to`)).query"
                class="block"
              >
                <Button class="w-full py-3 px-4 font-medium flex items-center justify-center">
                  {{ t(`${SCOPE}.button.useNow`) }}
                </Button>
              </NuxtLink>
              <Button
                v-else
                disabled
                variant="secondary"
                class="w-full py-3 px-4 font-medium cursor-not-allowed flex items-center justify-center"
              >
                <Clock class="w-4 h-4 mr-2" />
                {{ t(`${SCOPE}.button.coming`) }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

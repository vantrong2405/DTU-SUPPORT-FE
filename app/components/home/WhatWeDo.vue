<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import * as Icon from '@/components/ui/icon'

const { t } = useI18n()

const SCOPE = 'home.whatWeDo'
</script>

<template>
  <section id="what-we-do" class="py-16 sm:py-20 md:py-24 bg-background">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4 sm:mb-6 px-2">
            {{ t('home.whatWeDo.title') }}
          </h2>
          <p class="text-base sm:text-lg md:text-xl text-foreground max-w-3xl mx-auto leading-relaxed px-4">
            {{ t('home.whatWeDo.subtitle') }}
          </p>
        </div>

        <!-- Main Content -->
        <div class="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mb-10 sm:mb-12 md:mb-16">
          <!-- Left: Description -->
          <div class="order-2 lg:order-1">
            <h3 class="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">
              {{ t('home.whatWeDo.helpTitle') }}
            </h3>
            <div class="space-y-3 sm:space-y-4 text-sm sm:text-base text-foreground leading-relaxed">
              <p v-for="i in [0, 1, 2]" :key="i">
                {{ t(`${SCOPE}.paragraphs.${i}`) }}
              </p>
            </div>
          </div>

          <!-- Right: Visual -->
          <div class="relative order-1 lg:order-2">
            <div
              class="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border"
            >
              <div class="text-center">
                <div
                  class="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6"
                >
                  <Icon.GraduationCap class="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
                </div>
                <h4 class="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                  {{ t('home.whatWeDo.visual.audience') }}
                </h4>
                <p class="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-2">
                  {{ t('home.whatWeDo.visual.trust') }}
                </p>
                <div class="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                    <div class="text-xl sm:text-2xl font-bold text-primary">95%</div>
                    <div class="text-xs sm:text-sm text-muted-foreground">
                      {{ t('home.whatWeDo.visual.metrics.accuracy') }}
                    </div>
                  </div>
                  <div>
                    <div class="text-xl sm:text-2xl font-bold text-primary">24/7</div>
                    <div class="text-xs sm:text-sm text-muted-foreground">
                      {{ t('home.whatWeDo.visual.metrics.support') }}
                    </div>
                  </div>
                  <div>
                    <div class="text-xl sm:text-2xl font-bold text-primary">100%</div>
                    <div class="text-xs sm:text-sm text-muted-foreground">
                      {{ t('home.whatWeDo.visual.metrics.free') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <Card
            v-for="i in [0, 1, 2]"
            :key="i"
            class="text-center hover:from-primary/5 hover:to-primary/10 transition-all duration-300 hover:shadow-lg border-border"
          >
            <CardHeader class="p-4 sm:p-6">
              <div
                class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl bg-gradient-to-br from-primary/10 to-primary/20"
              >
                {{ t(`${SCOPE}.features.${i}.icon`) }}
              </div>
              <CardTitle class="text-lg sm:text-xl font-bold text-foreground">
                {{ t(`${SCOPE}.features.${i}.title`) }}
              </CardTitle>
              <CardDescription class="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {{ t(`${SCOPE}.features.${i}.description`) }}
              </CardDescription>
            </CardHeader>

            <CardContent class="p-4 sm:p-6 pt-0">
              <ul class="space-y-1 sm:space-y-1.5">
                <li
                  v-for="b in [0, 1, 2]"
                  :key="b"
                  class="text-xs sm:text-sm text-primary flex items-center justify-center"
                >
                  <Icon.Check class="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                  <span class="text-left">{{ t(`${SCOPE}.features.${i}.benefits.${b}`) }}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

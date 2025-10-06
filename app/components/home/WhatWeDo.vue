<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as SU from '@/components/ui'

const { t } = useI18n()

const SCOPE = 'home.whatWeDo'
</script>

<template>
  <section id="what-we-do" class="py-20 md:py-24 bg-background">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-foreground mb-6">
            {{ t('home.whatWeDo.title') }}
          </h2>
          <p class="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
            {{ t('home.whatWeDo.subtitle') }}
          </p>
        </div>

        <!-- Main Content -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <!-- Left: Description -->
          <div>
            <h3 class="text-3xl font-bold text-foreground mb-6">
              {{ t('home.whatWeDo.helpTitle') }}
            </h3>
            <div class="space-y-4 text-foreground leading-relaxed">
              <p v-for="i in [0,1,2]" :key="i">
                {{ t(`${SCOPE}.paragraphs.${i}`) }}
              </p>
            </div>
          </div>

          <!-- Right: Visual -->
          <div class="relative">
            <div class="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 border border-border">
              <div class="text-center">
                <div class="w-20 h-20 mx-auto bg-primary rounded-2xl flex items-center justify-center mb-6">
                  <span class="text-3xl text-primary-foreground">🎓</span>
                </div>
                <h4 class="text-2xl font-bold text-foreground mb-4">{{ t('home.whatWeDo.visual.audience') }}</h4>
                <p class="text-muted-foreground mb-6">
                  {{ t('home.whatWeDo.visual.trust') }}
                </p>
                <div class="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div class="text-2xl font-bold text-primary">95%</div>
                    <div class="text-sm text-muted-foreground">{{ t('home.whatWeDo.visual.metrics.accuracy') }}</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-primary">24/7</div>
                    <div class="text-sm text-muted-foreground">{{ t('home.whatWeDo.visual.metrics.support') }}</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-primary">100%</div>
                    <div class="text-sm text-muted-foreground">{{ t('home.whatWeDo.visual.metrics.free') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-3 gap-8">
          <SU.Card v-for="i in [0,1,2]" :key="i"
            class="text-center hover:from-primary/5 hover:to-primary/10 transition-all duration-300 hover:shadow-lg border-border">
            <SU.CardHeader>
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br from-primary/10 to-primary/20">
                {{ t(`${SCOPE}.features.${i}.icon`) }}
              </div>
              <SU.CardTitle class="text-xl font-bold text-foreground">
                {{ t(`${SCOPE}.features.${i}.title`) }}
              </SU.CardTitle>
              <SU.CardDescription class="text-muted-foreground leading-relaxed">
                {{ t(`${SCOPE}.features.${i}.description`) }}
              </SU.CardDescription>
            </SU.CardHeader>

            <SU.CardContent>
              <ul class="space-y-1">
                <li v-for="b in [0,1,2]" :key="b"
                  class="text-sm text-primary flex items-center justify-center">
                  <span class="mr-2">✓</span>
                  {{ t(`${SCOPE}.features.${i}.benefits.${b}`) }}
                </li>
              </ul>
            </SU.CardContent>
          </SU.Card>
        </div>
      </div>
    </div>
  </section>
</template>

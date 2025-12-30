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
import newsImage1 from '@/assets/images/news-1.jpg'
import newsImage2 from '@/assets/images/news-2.jpg'
import newsImage3 from '@/assets/images/news-3.jpg'

const { t } = useI18n()

const SCOPE = 'home.news'

const { target: headerRef } = useScrollReveal({ threshold: 0.1, animation: 'fade' })
const { target: cardsRef } = useScrollReveal({ threshold: 0.1, animation: 'slide', direction: 'up' })

const newsImages = [newsImage1, newsImage2, newsImage3]
</script>

<template>
  <section id="news" class="py-12 sm:py-16 md:py-20 bg-background/50">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div ref="headerRef" class="mb-8 sm:mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground">
            {{ t(`${SCOPE}.title`) }}
          </h2>
        </div>

        <div ref="cardsRef" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="i in [0, 1, 2]"
            :key="i"
            class="bg-card border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div class="w-full h-[212px] bg-muted relative overflow-hidden">
              <img
                :src="newsImages[i]"
                :alt="t(`${SCOPE}.items.${i}.title`)"
                class="w-full h-full object-cover"
              />
            </div>
            <CardHeader class="p-5">
              <CardTitle class="text-lg font-bold text-foreground mb-2 leading-[1.56em] line-clamp-2">
                {{ t(`${SCOPE}.items.${i}.title`) }}
              </CardTitle>
              <CardDescription class="text-sm text-muted-foreground leading-[1.43em] line-clamp-3">
                {{ t(`${SCOPE}.items.${i}.description`) }}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

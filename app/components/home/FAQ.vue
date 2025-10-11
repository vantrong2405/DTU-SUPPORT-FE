<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Accordion from '@/components/ui/accordion/Accordion.vue'
import AccordionContent from '@/components/ui/accordion/AccordionContent.vue'
import AccordionItem from '@/components/ui/accordion/AccordionItem.vue'
import AccordionTrigger from '@/components/ui/accordion/AccordionTrigger.vue'

const { t } = useI18n()

const SCOPE = 'home.faq'
</script>

<template>
  <section
    id="faq"
    class="py-20 md:py-24 bg-gradient-to-br from-muted to-background relative overflow-hidden"
  >
    <div class="absolute top-0 left-0 w-full h-full">
      <div
        class="absolute top-20 right-20 w-24 h-24 bg-primary/5 rounded-full blur-xl"
      ></div>
      <div
        class="absolute bottom-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
      ></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-foreground mb-6">
          {{ t(`${SCOPE}.title`) }}
        </h2>
        <p
          class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          {{ t(`${SCOPE}.subtitle`) }}
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <Accordion type="single" collapsible class="space-y-4">
          <AccordionItem
            v-for="index in [0, 1, 2, 3, 4]"
            :key="index"
            :value="`item-${index}`"
            class="bg-card rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <AccordionTrigger
              class="px-8 py-6 text-left hover:bg-muted transition-colors duration-300 [&[data-state=open]>svg]:rotate-180"
            >
              <h3
                class="text-lg font-bold text-card-foreground pr-4 group-hover:text-primary transition-colors duration-300"
              >
                {{ t(`${SCOPE}.items.${index}.question`) }}
              </h3>
            </AccordionTrigger>
            <AccordionContent class="px-8 pb-6 border-t border-border">
              <div class="pt-4">
                <p class="text-muted-foreground leading-relaxed">
                  👉 {{ t(`${SCOPE}.items.${index}.answer`) }}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import * as Icon from '@/components/ui/icon'
import TargetCalculator from '@/components/gpa/TargetCalculator.vue'
import GraduationInfo from '@/components/gpa/GraduationInfo.vue'
import PeCalculator from '@/components/gpa/PeCalculator.vue'

const { t } = useI18n()
const SCOPE = 'tools.gpa'
const DEFAULT_TAB = 'target'
</script>

<template>
  <section class="bg-background text-foreground py-12 sm:py-14 md:py-20">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-5xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent ring-1 ring-accent/20 text-xs sm:text-sm mb-3 sm:mb-4">
          <Icon.Calculator class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{{ t(`${SCOPE}.badge`) }}</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight px-2">
          <span class="text-foreground">{{ t(`${SCOPE}.title`) }}</span>
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">{{ t(`${SCOPE}.titleHighlight`) }}</span>
        </h1>
        <p class="text-foreground/80 mt-3 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          {{ t(`${SCOPE}.subtitle`) }}
        </p>
      </div>

      <div class="max-w-5xl mx-auto">
        <Tabs :default-value="DEFAULT_TAB" class="block">
          <TabsList class="inline-flex h-auto items-center justify-center rounded-lg bg-muted/20 border-0 p-0.5 text-muted-foreground overflow-x-auto shadow-sm w-full sm:w-auto">
            <TabsTrigger value="target" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-150 hover:text-foreground hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-offset-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=active]:shadow-md flex-shrink-0">
              <Icon.Target class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
              <span class="hidden sm:inline">{{ t(`${SCOPE}.tabs.target`) }}</span>
              <span class="sm:hidden">{{ t(`${SCOPE}.tabs.targetShort`) }}</span>
            </TabsTrigger>
            <TabsTrigger value="gpa" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-150 hover:text-foreground hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-offset-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=active]:shadow-md flex-shrink-0">
              <Icon.Calculator class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
              <span class="hidden sm:inline">{{ t(`${SCOPE}.tabs.gpa`) }}</span>
              <span class="sm:hidden">{{ t(`${SCOPE}.tabs.gpaShort`) }}</span>
            </TabsTrigger>
            <TabsTrigger value="pe" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-150 hover:text-foreground hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-offset-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=active]:shadow-md flex-shrink-0">
              <Icon.Dumbbell class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
              <span class="hidden sm:inline">{{ t(`${SCOPE}.tabs.pe`) }}</span>
              <span class="sm:hidden">{{ t(`${SCOPE}.tabs.peShort`) }}</span>
            </TabsTrigger>
            <TabsTrigger value="pass" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-150 hover:text-foreground hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-offset-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=active]:shadow-md flex-shrink-0">
              <Icon.ClipboardCheck class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
              <span class="hidden sm:inline">{{ t(`${SCOPE}.tabs.pass`) }}</span>
              <span class="sm:hidden">{{ t(`${SCOPE}.tabs.passShort`) }}</span>
            </TabsTrigger>
            <TabsTrigger value="ai" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-150 hover:text-foreground hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-offset-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=active]:shadow-md flex-shrink-0">
              <Icon.Bot class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
              <span class="hidden sm:inline">{{ t(`${SCOPE}.tabs.ai`) }}</span>
              <span class="sm:hidden">{{ t(`${SCOPE}.tabs.aiShort`) }}</span>
            </TabsTrigger>
          </TabsList>

          <div class="mt-6 sm:mt-8">
            <TabsContent value="target" class="block">
              <TargetCalculator />
            </TabsContent>

            <TabsContent value="gpa" class="mt-6 sm:mt-8">
              <div class="rounded-xl sm:rounded-2xl border border-border/20 bg-card text-card-foreground p-6 sm:p-7 md:p-8 shadow-md backdrop-blur-sm">
                <div class="flex flex-col items-center justify-center text-center">
                  <div class="relative mb-3 sm:mb-4">
                    <div class="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
                    <Icon.Calculator class="w-10 h-10 sm:w-12 sm:h-12 text-primary/60 relative z-10" />
                  </div>
                  <h3 class="text-base sm:text-lg font-bold text-foreground mb-1.5 px-2">{{ t(`${SCOPE}.gpa.title`) }}</h3>
                  <p class="text-xs sm:text-sm text-muted-foreground max-w-md px-4">{{ t(`${SCOPE}.gpa.description`) }}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pe" class="mt-6 sm:mt-8">
              <PeCalculator />
            </TabsContent>

            <TabsContent value="pass" class="mt-6 sm:mt-8">
              <div class="rounded-xl sm:rounded-2xl border border-border/20 bg-card text-card-foreground p-6 sm:p-7 md:p-8 shadow-md backdrop-blur-sm">
                <div class="flex flex-col items-center justify-center text-center">
                  <div class="relative mb-3 sm:mb-4">
                    <div class="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
                    <Icon.ClipboardCheck class="w-10 h-10 sm:w-12 sm:h-12 text-primary/60 relative z-10" />
                  </div>
                  <h3 class="text-base sm:text-lg font-bold text-foreground mb-1.5 px-2">{{ t(`${SCOPE}.pass.title`) }}</h3>
                  <p class="text-xs sm:text-sm text-muted-foreground max-w-md px-4">{{ t(`${SCOPE}.pass.description`) }}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai" class="mt-6 sm:mt-8">
              <div class="rounded-xl sm:rounded-2xl border border-border/20 bg-card text-card-foreground p-6 sm:p-7 md:p-8 shadow-md backdrop-blur-sm">
                <div class="flex flex-col items-center justify-center text-center">
                  <div class="relative mb-3 sm:mb-4">
                    <div class="absolute inset-0 bg-accent/10 rounded-full blur-xl"></div>
                    <Icon.Bot class="w-10 h-10 sm:w-12 sm:h-12 text-accent/60 relative z-10" />
                  </div>
                  <h3 class="text-base sm:text-lg font-bold text-foreground mb-1.5 px-2">{{ t(`${SCOPE}.ai.title`) }}</h3>
                  <p class="text-xs sm:text-sm text-muted-foreground max-w-md px-4">{{ t(`${SCOPE}.ai.description`) }}</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div class="mt-12 sm:mt-16 md:mt-20">
          <GraduationInfo />
        </div>
      </div>
    </div>
  </section>
</template>

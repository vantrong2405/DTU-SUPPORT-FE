<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import * as Icon from '@/components/ui/icon'
import FieldControl from '@/components/common/FieldControl.vue'
import { useTargetCalculator } from '@/composables/gpa/useTargetCalculator'
import { cn } from '@/lib/utils'
import { getBadgeClasses } from '@/lib/ui'

const { t } = useI18n()
const SCOPE = 'tools.gpa'

const { targetResult, onTargetSubmit, isSubmitting } = useTargetCalculator()

// moved to '@/lib/ui'
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
    <div class="rounded-xl sm:rounded-2xl border border-border/20 bg-card text-card-foreground p-4 sm:p-5 md:p-6 shadow-md backdrop-blur-sm">
      <div class="mb-4 sm:mb-5">
        <h2 class="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1.5 flex items-center gap-2">
          <Icon.Target class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
          {{ t(`${SCOPE}.target.inputTitle`) }}
        </h2>
        <p class="text-xs sm:text-xs text-muted-foreground">{{ t(`${SCOPE}.target.inputSubtitle`) }}</p>
      </div>
      <form @submit="onTargetSubmit" class="space-y-3 sm:space-y-4">
        <FieldControl
          name="completedCredits"
          :label="t(`${SCOPE}.target.fields.completedCredits`)"
          type="number"
          step="1"
          :placeholder="t(`${SCOPE}.target.placeholders.completedCredits`)"
          required
        />
        <FieldControl
          name="currentGpa"
          :label="t(`${SCOPE}.target.fields.currentGpa`)"
          type="number"
          step="0.01"
          :placeholder="t(`${SCOPE}.target.placeholders.currentGpa`)"
          required
        />
        <FieldControl
          name="targetGpa"
          :label="t(`${SCOPE}.target.fields.targetGpa`)"
          type="number"
          step="0.01"
          :placeholder="t(`${SCOPE}.target.placeholders.targetGpa`)"
          required
        />
        <FieldControl
          name="remainingCredits"
          :label="t(`${SCOPE}.target.fields.remainingCredits`)"
          type="number"
          step="1"
          :placeholder="t(`${SCOPE}.target.placeholders.remainingCredits`)"
          required
        />
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
          <Button type="submit" :disabled="isSubmitting" size="lg" class="flex-1 sm:flex-none">
            <Icon.Calculator />
            {{ isSubmitting ? t(`${SCOPE}.target.buttons.calculating`) : t(`${SCOPE}.target.buttons.calculate`) }}
          </Button>
          <Button type="reset" variant="outline" size="lg" class="flex-1 sm:flex-none">
            <Icon.RotateCcw />
            {{ t(`${SCOPE}.target.buttons.reset`) }}
          </Button>
        </div>
      </form>
    </div>

    <div class="rounded-xl sm:rounded-2xl border border-border/20 bg-card text-card-foreground p-4 sm:p-5 md:p-6 shadow-md backdrop-blur-sm min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
      <div v-if="targetResult.maxGpaWithAllA === null" class="w-full flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/20 text-center px-4 sm:px-6 py-6 sm:py-8 transition-all duration-300">
        <div class="relative mb-3 sm:mb-4">
          <div class="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
          <Icon.Target class="w-10 h-10 sm:w-12 sm:h-12 text-primary/60 relative z-10" />
        </div>
        <h3 class="text-base sm:text-lg font-bold text-foreground mb-1.5 px-2">{{ t(`${SCOPE}.target.empty.title`) }}</h3>
        <p class="text-xs text-muted-foreground max-w-sm px-2">{{ t(`${SCOPE}.target.empty.description`) }}</p>
      </div>
      <div v-else class="w-full space-y-3 sm:space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div class="text-center mb-3 sm:mb-4">
          <h3 class="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1">{{ t(`${SCOPE}.target.results.title`) }}</h3>
          <p class="text-xs text-muted-foreground">{{ t(`${SCOPE}.target.results.subtitle`) }}</p>
        </div>

        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 rounded-xl sm:rounded-2xl blur-2xl"></div>
          <div class="relative bg-gradient-to-br from-card to-card/50 rounded-xl sm:rounded-2xl border border-primary/20 p-4 sm:p-5 md:p-6 shadow-xl">
            <div class="flex flex-col items-center justify-center">
              <div class="mb-3 sm:mb-4">
                <div class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary mb-1 tracking-tight">
                  {{ targetResult.maxGpaWithAllA.toFixed(3) }}
                </div>
                <div class="text-xs text-muted-foreground text-center mt-1 mb-2">{{ t(`${SCOPE}.target.results.scale`) }}</div>
                <div v-if="targetResult.graduationClassification" :class="getBadgeClasses(targetResult.graduationClassification.badgeColor)">
                  <component :is="Icon[targetResult.graduationClassification.iconName as keyof typeof Icon]" class="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{{ t(`${SCOPE}.target.classifications.${targetResult.graduationClassification.rankKey}`) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div :class="[
          'rounded-lg sm:rounded-xl border p-3 sm:p-4 transition-all duration-300',
          targetResult.canReachTargetWithAllA
            ? 'bg-primary/5 border-primary/30'
            : 'bg-accent/5 border-accent/30'
        ]">
          <div class="flex items-start gap-2 sm:gap-3">
            <div :class="[
              'flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center',
              targetResult.canReachTargetWithAllA
                ? 'bg-primary/20 text-primary'
                : 'bg-accent/20 text-accent'
            ]">
              <Icon.CheckCircle v-if="targetResult.canReachTargetWithAllA" class="w-4 h-4 sm:w-5 sm:h-5" />
              <Icon.AlertTriangle v-else class="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div class="flex-1 min-w-0">
              <h4 :class="[
                'text-xs sm:text-sm font-semibold mb-1',
                targetResult.canReachTargetWithAllA ? 'text-primary' : 'text-accent'
              ]">
                {{ targetResult.canReachTargetWithAllA ? t(`${SCOPE}.target.results.success.title`) : t(`${SCOPE}.target.results.warning.title`) }}
              </h4>
              <p class="text-xs text-muted-foreground leading-relaxed">
                {{ targetResult.canReachTargetWithAllA
                  ? t(`${SCOPE}.target.results.success.message`, { gpa: targetResult.maxGpaWithAllA.toFixed(3) })
                  : t(`${SCOPE}.target.results.warning.message`, { gpa: targetResult.maxGpaWithAllA.toFixed(3) })
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

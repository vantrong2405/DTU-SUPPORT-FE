<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import * as Icon from '@/components/ui/icon'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ToolResult } from '@/types/chat'

const { t } = useI18n()
const SCOPE = 'tools.gpa'

interface Props {
  data: ToolResult['data']
}

const props = defineProps<Props>()

const maxGpa = computed(() => {
  return props.data.maxGpaWithAllA as number || props.data.finalGpa as number || 0
})

const graduationClassification = computed(() => {
  return props.data.graduationClassification as {
    rank: string
    minGpa: number
    maxGpa: number
  } | undefined
})

const canReachTarget = computed(() => {
  return props.data.canReachTarget as boolean || props.data.canReachTargetWithAllA as boolean
})

const distributionSummary = computed(() => {
  return props.data.distributionSummary as string | undefined
})

const isSimulation = computed(() => {
  return !!props.data.finalGpa
})

const getBadgeClasses = (badgeColor: string) => {
  const baseClasses = 'inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border'

  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    muted: 'bg-muted text-muted-foreground border-border',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
  }

  return cn(baseClasses, colorMap[badgeColor] || colorMap.primary)
}
</script>

<template>
  <Card class="mt-3 rounded-xl border border-primary/20 bg-gradient-to-br from-card to-card/50 shadow-md">
    <CardContent class="p-4 space-y-3">
      <div class="text-center">
        <div class="text-3xl sm:text-4xl font-extrabold text-primary mb-1 tracking-tight">
          {{ maxGpa.toFixed(3) }}
        </div>
        <div class="text-xs text-muted-foreground mb-2">{{ t(`${SCOPE}.results.scale`) }}</div>
        <div v-if="graduationClassification" :class="getBadgeClasses('primary')">
          <Icon.GraduationCap class="w-4 h-4" />
          <span>{{ t(`${SCOPE}.classification.${graduationClassification.rank}`) }}</span>
        </div>
      </div>

      <div v-if="canReachTarget !== undefined" :class="[
        'rounded-lg border p-3 transition-all',
        canReachTarget
          ? 'bg-primary/5 border-primary/30'
          : 'bg-accent/5 border-accent/30'
      ]">
        <div class="flex items-start gap-2">
          <div :class="[
            'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center',
            canReachTarget
              ? 'bg-primary/20 text-primary'
              : 'bg-accent/20 text-accent'
          ]">
            <Icon.CheckCircle v-if="canReachTarget" class="w-4 h-4" />
            <Icon.AlertTriangle v-else class="w-4 h-4" />
          </div>
          <div class="flex-1 min-w-0">
              <p class="text-xs text-muted-foreground leading-relaxed">
                {{ canReachTarget
                  ? t(`${SCOPE}.results.success.message`, { gpa: maxGpa.toFixed(3) })
                  : t(`${SCOPE}.results.warning.message`, { gpa: maxGpa.toFixed(3) })
                }}
              </p>
          </div>
        </div>
      </div>

      <div v-if="distributionSummary && isSimulation" class="rounded-lg border border-border/30 bg-muted/10 p-3">
        <div class="flex items-start gap-2">
          <Icon.Lightbulb class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="text-xs font-semibold text-foreground mb-1">{{ t(`${SCOPE}.simulation.distribution.title`) }}</div>
            <div class="text-xs text-muted-foreground">{{ distributionSummary }}</div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

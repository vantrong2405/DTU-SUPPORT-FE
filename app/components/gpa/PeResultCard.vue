<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import * as Icon from '@/components/ui/icon'
import { Card, CardContent } from '@/components/ui/card'
import type { ToolResult } from '@/types/chat'

const { t } = useI18n()
const SCOPE = 'tools.gpa'

interface Props {
  data: ToolResult['data']
}

const props = defineProps<Props>()

const average = computed(() => {
  return props.data.average as number || 0
})

const isPass = computed(() => {
  return props.data.isPass as boolean || false
})

const inputs = computed(() => {
  return props.data.inputs as {
    pe1: number
    pe2: number
    pe3: number
  } | undefined
})
</script>

<template>
  <Card class="mt-3 rounded-xl border border-primary/20 bg-gradient-to-br from-card to-card/50 shadow-md">
    <CardContent class="p-4 space-y-3">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3" :class="[
          isPass ? 'bg-primary/15 text-primary' : 'bg-destructive/15 text-destructive'
        ]">
          <Icon.ClipboardCheck v-if="isPass" class="w-5 h-5" />
          <Icon.AlertTriangle v-else class="w-5 h-5" />
        </div>
        <div :class="[
          'text-2xl font-extrabold tracking-tight mb-2',
          isPass ? 'text-primary' : 'text-destructive'
        ]">
          {{ isPass ? t(`${SCOPE}.pe.results.headline.pass`) : t(`${SCOPE}.pe.results.headline.fail`) }}
        </div>
        <div class="text-3xl font-extrabold text-primary leading-none mb-1">{{ average.toFixed(2) }}</div>
        <div class="text-xs text-muted-foreground mb-2">{{ t(`${SCOPE}.pe.results.scale`) }}</div>
        <div :class="[
          'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border',
          isPass ? 'bg-primary/10 text-primary border-primary/20' : 'bg-destructive/10 text-destructive border-destructive/20'
        ]">
          <Icon.CheckCircle v-if="isPass" class="w-4 h-4" />
          <Icon.XCircle v-else class="w-4 h-4" />
          <span>{{ isPass ? t(`${SCOPE}.pe.results.pass`) : t(`${SCOPE}.pe.results.fail`) }}</span>
        </div>
      </div>

      <div v-if="inputs" class="grid grid-cols-3 gap-2">
        <div class="rounded-lg border border-border/30 bg-muted/10 p-3 text-center">
          <div class="text-xs text-muted-foreground mb-1">{{ t(`${SCOPE}.pe.results.courses.c1`) }}</div>
          <div class="text-lg font-bold text-foreground">{{ inputs.pe1.toFixed(1) }}</div>
        </div>
        <div class="rounded-lg border border-border/30 bg-muted/10 p-3 text-center">
          <div class="text-xs text-muted-foreground mb-1">{{ t(`${SCOPE}.pe.results.courses.c2`) }}</div>
          <div class="text-lg font-bold text-foreground">{{ inputs.pe2.toFixed(1) }}</div>
        </div>
        <div class="rounded-lg border border-border/30 bg-muted/10 p-3 text-center">
          <div class="text-xs text-muted-foreground mb-1">{{ t(`${SCOPE}.pe.results.courses.c3`) }}</div>
          <div class="text-lg font-bold text-foreground">{{ inputs.pe3.toFixed(1) }}</div>
        </div>
      </div>

      <div class="rounded-lg border border-border/30 bg-primary/5 p-3">
        <div class="flex items-start gap-2">
          <Icon.Lightbulb class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="text-xs font-semibold text-foreground mb-1">{{ t(`${SCOPE}.pe.results.analysis.title`) }}</div>
            <div class="text-xs text-muted-foreground">
              {{ isPass ? t(`${SCOPE}.pe.results.analysis.pass`, { gpa: average.toFixed(2) }) : t(`${SCOPE}.pe.results.analysis.fail`, { gpa: average.toFixed(2) }) }}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

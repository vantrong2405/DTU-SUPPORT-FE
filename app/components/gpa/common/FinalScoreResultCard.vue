<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as Icon from '@/components/ui/icon'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ToolResult } from '@/types/chat'

const { t } = useI18n()
const SCOPE = 'tools.pass'

interface Props {
  data: ToolResult['data']
}

const props = defineProps<Props>()

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

const getLetterGradeColor = (letterGrade: string) => {
  if (letterGrade === 'A+' || letterGrade === 'A') return 'primary'
  if (letterGrade === 'A-' || letterGrade === 'B+' || letterGrade === 'B') return 'accent'
  if (letterGrade === 'B-' || letterGrade === 'C+' || letterGrade === 'C' || letterGrade === 'C-') return 'muted'
  if (letterGrade === 'D') return 'muted'
  return 'destructive'
}
</script>

<template>
  <Card class="mt-3 rounded-xl border border-primary/20 bg-gradient-to-br from-card to-card/50 shadow-md">
    <CardContent class="p-4 space-y-3">
      <div v-if="props.data.requiredFinalScore !== undefined" class="space-y-3">
        <div class="text-center">
          <div v-if="props.data.canPass === false" class="rounded-lg border border-destructive/30 bg-destructive/10 p-4 flex flex-col items-center text-center mb-3">
            <Icon.AlertCircle class="w-12 h-12 text-destructive mb-3" />
            <p class="text-sm font-bold text-destructive">
              {{ t(`${SCOPE}.results.cannotPass.title`) }}
            </p>
            <p class="text-xs text-destructive/80 mt-1">
              {{ t(`${SCOPE}.results.cannotPass.message`) }}
            </p>
          </div>

          <div v-else class="space-y-2">
            <div class="text-3xl sm:text-4xl font-extrabold text-primary mb-1 tracking-tight">
              {{ (props.data.requiredFinalScore as number)?.toFixed(2) }}
            </div>
            <div class="text-xs text-muted-foreground mb-2">{{ t(`${SCOPE}.results.cards.requiredScore`) }}</div>
            <div class="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p class="text-xs text-muted-foreground mb-1">{{ t(`${SCOPE}.results.requiredMessage`, {
                score: (props.data.requiredFinalScore as number)?.toFixed(2),
                weight: (props.data.finalExamWeight as number)?.toFixed(0)
              }) }}</p>
              <p class="text-xs text-muted-foreground/80">{{ props.data.formula as string }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border border-border/20 bg-muted/30 p-3">
            <div class="flex items-center gap-2 mb-2">
              <Icon.TrendingUp class="w-4 h-4 text-primary" />
              <p class="text-xs text-muted-foreground">{{ t(`${SCOPE}.results.cards.currentScore`) }}</p>
            </div>
            <p class="text-xl font-bold text-foreground">
              {{ (props.data.partialScore as number)?.toFixed(2) }} / 10.0
            </p>
          </div>

          <div class="rounded-lg border border-border/20 bg-muted/30 p-3">
            <div class="flex items-center gap-2 mb-2">
              <Icon.Target class="w-4 h-4 text-primary" />
              <p class="text-xs text-muted-foreground">{{ t(`${SCOPE}.results.cards.finalExamContribution`) }}</p>
            </div>
            <p class="text-xl font-bold text-foreground">
              {{ (props.data.finalExamWeight as number)?.toFixed(0) }}%
            </p>
          </div>
        </div>
      </div>

      <div v-if="props.data.finalScore !== undefined" class="space-y-3">
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-extrabold text-primary mb-1 tracking-tight">
            {{ (props.data.finalScore as number)?.toFixed(2) }}
          </div>
          <div class="text-xs text-muted-foreground mb-2">{{ t(`${SCOPE}.prediction.finalScore`) }}</div>
          <div :class="getBadgeClasses(getLetterGradeColor(props.data.letterGrade as string))">
            <Icon.GraduationCap class="w-4 h-4" />
            <span>{{ props.data.letterGrade }} ({{ (props.data.finalScoreGpa as number)?.toFixed(2) }})</span>
          </div>
        </div>

        <div :class="[
          'rounded-lg border p-3 transition-all',
          (props.data.isPass as boolean)
            ? 'bg-primary/5 border-primary/30'
            : 'bg-destructive/5 border-destructive/30'
        ]">
          <div class="flex items-start gap-2">
            <div :class="[
              'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center',
              (props.data.isPass as boolean)
                ? 'bg-primary/20 text-primary'
                : 'bg-destructive/20 text-destructive'
            ]">
              <Icon.CheckCircle v-if="(props.data.isPass as boolean)" class="w-4 h-4" />
              <Icon.XCircle v-else class="w-4 h-4" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-muted-foreground leading-relaxed">
                {{ (props.data.isPass as boolean)
                  ? t(`${SCOPE}.prediction.pass`)
                  : t(`${SCOPE}.prediction.fail`)
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border border-border/20 bg-muted/30 p-3">
            <div class="flex items-center gap-2 mb-2">
              <Icon.TrendingUp class="w-4 h-4 text-primary" />
              <p class="text-xs text-muted-foreground">{{ t(`${SCOPE}.results.cards.currentScore`) }}</p>
            </div>
            <p class="text-xl font-bold text-foreground">
              {{ (props.data.partialScore as number)?.toFixed(2) }} / 10.0
            </p>
          </div>

          <div class="rounded-lg border border-border/20 bg-muted/30 p-3">
            <div class="flex items-center gap-2 mb-2">
              <Icon.Calculator class="w-4 h-4 text-primary" />
              <p class="text-xs text-muted-foreground">{{ t(`${SCOPE}.prediction.gpa4`) }}</p>
            </div>
            <p class="text-xl font-bold text-foreground">
              {{ (props.data.finalScoreGpa as number)?.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

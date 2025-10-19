<script setup lang="ts">
import { ref, computed } from 'vue'
import * as Icon from '@/components/ui/icon'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const { t } = useI18n()

interface TargetCalculationResult {
  requiredGpa: number
  difficulty: 'easy' | 'medium' | 'hard' | 'impossible'
  classification: 'excellent' | 'good' | 'average' | 'belowAverage'
  warning?: string
}

const completedCredits = ref<number>(0)
const currentGpa = ref<number>(0)
const targetGpa = ref<number>(0)
const remainingCredits = ref<number>(0)
const isCalculating = ref<boolean>(false)
const result = ref<TargetCalculationResult | null>(null)

const isFormValid = computed(() => {
  return completedCredits.value > 0 &&
         currentGpa.value > 0 &&
         targetGpa.value > 0 &&
         remainingCredits.value > 0
})

const calculateTarget = async () => {
  if (!isFormValid.value) return

  isCalculating.value = true

  await new Promise(resolve => setTimeout(resolve, 1000))

  const totalCredits = completedCredits.value + remainingCredits.value
  const currentPoints = completedCredits.value * currentGpa.value
  const targetPoints = totalCredits * targetGpa.value
  const requiredPoints = targetPoints - currentPoints
  const requiredGpa = requiredPoints / remainingCredits.value

  let difficulty: 'easy' | 'medium' | 'hard' | 'impossible' = 'easy'
  let classification: 'excellent' | 'good' | 'average' | 'belowAverage' = 'belowAverage'
  let warning: string | undefined

  if (requiredGpa > 4.0) {
    difficulty = 'impossible'
  } else if (requiredGpa > 3.5) {
    difficulty = 'hard'
  } else if (requiredGpa > 3.0) {
    difficulty = 'medium'
  }

  if (targetGpa.value >= 3.6) {
    classification = 'excellent'
  } else if (targetGpa.value >= 3.2) {
    classification = 'good'
  } else if (targetGpa.value >= 2.5) {
    classification = 'average'
  }

  if (remainingCredits.value > completedCredits.value * 0.05) {
    warning = t('gpa.improvementWarning')
  }

  result.value = {
    requiredGpa: Math.round(requiredGpa * 100) / 100,
    difficulty,
    classification,
    warning
  }

  isCalculating.value = false
}

const resetForm = () => {
  completedCredits.value = 0
  currentGpa.value = 0
  targetGpa.value = 0
  remainingCredits.value = 0
  result.value = null
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'text-green-600'
    case 'medium': return 'text-yellow-600'
    case 'hard': return 'text-orange-600'
    case 'impossible': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return Icon.CheckCircle
    case 'medium': return Icon.AlertTriangle
    case 'hard': return Icon.AlertTriangle
    case 'impossible': return Icon.XCircle
    default: return Icon.AlertTriangle
  }
}

const getClassificationColor = (classification: string) => {
  switch (classification) {
    case 'excellent': return 'text-purple-600'
    case 'good': return 'text-blue-600'
    case 'average': return 'text-green-600'
    case 'belowAverage': return 'text-orange-600'
    default: return 'text-gray-600'
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Icon.Target class="w-5 h-5" />
          {{ t('gpa.calculateTarget') }}
          <Button variant="ghost" size="sm" class="ml-auto">
            <Icon.HelpCircle class="w-4 h-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          {{ t('gpa.targetDescription') }}
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground">
              {{ t('gpa.completedCredits') }} *
            </label>
            <div class="relative">
              <Input
                v-model.number="completedCredits"
                type="number"
                :placeholder="t('gpa.completedCreditsPlaceholder')"
                class="pr-16"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {{ t('gpa.credits') }}
              </span>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground">
              {{ t('gpa.currentGpa') }} *
            </label>
            <Input
              v-model.number="currentGpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              :placeholder="t('gpa.currentGpaPlaceholder')"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground">
              {{ t('gpa.targetGpa') }} *
            </label>
            <Input
              v-model.number="targetGpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              :placeholder="t('gpa.targetGpaPlaceholder')"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground">
              {{ t('gpa.remainingCredits') }} *
            </label>
            <div class="relative">
              <Input
                v-model.number="remainingCredits"
                type="number"
                :placeholder="t('gpa.remainingCreditsPlaceholder')"
                class="pr-16"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {{ t('gpa.credits') }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <Button
            @click="calculateTarget"
            :disabled="!isFormValid || isCalculating"
            class="flex-1"
          >
            <Icon.Target class="w-4 h-4 mr-2" />
            {{ isCalculating ? t('gpa.calculating') : t('gpa.calculateTargetButton') }}
          </Button>

          <Button variant="outline" @click="resetForm" :disabled="isCalculating">
            <Icon.RotateCcw class="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>{{ t('gpa.results') }}</CardTitle>
        <CardDescription>
          {{ t('gpa.resultsDescription') }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="!result" class="text-center py-12">
          <Icon.Calculator class="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 class="text-lg font-semibold mb-2">{{ t('gpa.readyToCalculate') }}</h3>
          <p class="text-muted-foreground">{{ t('gpa.readyDescription') }}</p>
        </div>

        <div v-else class="space-y-6">
          <div class="text-center p-6 bg-muted/50 rounded-lg">
            <h3 class="text-2xl font-bold text-primary mb-2">
              {{ result.requiredGpa }}
            </h3>
            <p class="text-sm text-muted-foreground">{{ t('gpa.requiredGpa') }}</p>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 border rounded-lg">
              <div class="flex items-center gap-3">
                <component
                  :is="getDifficultyIcon(result.difficulty)"
                  :class="getDifficultyColor(result.difficulty)"
                  class="w-5 h-5"
                />
                <span class="font-medium">{{ t('gpa.difficulty') }}</span>
              </div>
              <span :class="getDifficultyColor(result.difficulty)" class="font-semibold">
                {{ t(`gpa.difficultyLevels.${result.difficulty}`) }}
              </span>
            </div>

            <div class="flex items-center justify-between p-4 border rounded-lg">
              <div class="flex items-center gap-3">
                <Icon.GraduationCap class="w-5 h-5 text-primary" />
                <span class="font-medium">{{ t('gpa.graduationClassification') }}</span>
              </div>
              <span :class="getClassificationColor(result.classification)" class="font-semibold">
                {{ t(`gpa.${result.classification}`) }}
              </span>
            </div>
          </div>

          <div v-if="result.warning" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex items-start gap-3">
              <Icon.AlertTriangle class="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 class="font-medium text-yellow-800">{{ t('gpa.warning') }}</h4>
                <p class="text-sm text-yellow-700 mt-1">{{ result.warning }}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

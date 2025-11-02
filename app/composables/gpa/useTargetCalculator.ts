import { reactive } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useI18n } from 'vue-i18n'
import { GRADUATION_CLASSIFICATIONS } from '@/constants/gpa/graduation'
import { createTargetSchema, type TargetValues } from '@/schemas/gpa/target'

export const useTargetCalculator = () => {
  const { t } = useI18n()

  const targetSchema = createTargetSchema(t)
  const targetResult = reactive<{
    maxGpaWithAllA: number | null
    canReachTargetWithAllA: boolean | null
    graduationClassification: typeof GRADUATION_CLASSIFICATIONS[number] | null
  }>({
    maxGpaWithAllA: null,
    canReachTargetWithAllA: null,
    graduationClassification: null,
  })

  const getGraduationClassification = (gpa: number): typeof GRADUATION_CLASSIFICATIONS[number] | null => {
    for (const classification of GRADUATION_CLASSIFICATIONS) {
      if (gpa >= classification.minGpa && gpa <= classification.maxGpa) {
        return classification
      }
    }
    return null
  }

  const { handleSubmit, isSubmitting } = useForm<TargetValues>({
    validationSchema: toTypedSchema(targetSchema),
    validateOnMount: false,
    initialValues: {
      completedCredits: 0,
      currentGpa: 0,
      targetGpa: 0,
      remainingCredits: 1,
    },
  })

  const onTargetSubmit = handleSubmit((values: TargetValues) => {
    const total = values.completedCredits + values.remainingCredits
    if (total <= 0) {
      targetResult.maxGpaWithAllA = null
      targetResult.canReachTargetWithAllA = null
      targetResult.graduationClassification = null
      return
    }

    const currentPoints = values.completedCredits * values.currentGpa
    const futurePointsAllA = values.remainingCredits * 4
    const maxGpa = (currentPoints + futurePointsAllA) / total
    const rounded = Math.round(maxGpa * 1000) / 1000
    targetResult.maxGpaWithAllA = rounded
    targetResult.canReachTargetWithAllA = rounded >= values.targetGpa
    targetResult.graduationClassification = getGraduationClassification(rounded)
  })

  return {
    targetResult,
    onTargetSubmit,
    isSubmitting,
  }
}

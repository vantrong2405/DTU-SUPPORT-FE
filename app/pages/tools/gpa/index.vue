<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import * as Icon from '@/components/ui/icon'
const DEFAULT_TAB = 'target'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import FieldControl from '@/components/gpa/FieldControl.vue'

const targetSchema = z.object({
  completedCredits: z.coerce.number().int().min(0),
  currentGpa: z.coerce.number().min(0).max(4),
  targetGpa: z.coerce.number().min(0.01).max(4),
  remainingCredits: z.coerce.number().int().min(1),
})

type TargetValues = z.infer<typeof targetSchema>

const targetResult = reactive<{ maxGpaWithAllA: number | null, canReachTargetWithAllA: boolean | null}>({
  maxGpaWithAllA: null,
  canReachTargetWithAllA: null,
})

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
    return
  }

  const currentPoints = values.completedCredits * values.currentGpa
  const futurePointsAllA = values.remainingCredits * 4
  const maxGpa = (currentPoints + futurePointsAllA) / total
  const rounded = Math.round(maxGpa * 1000) / 1000
  targetResult.maxGpaWithAllA = rounded
  targetResult.canReachTargetWithAllA = rounded >= values.targetGpa
})
</script>

<template>
  <section class="bg-background text-foreground py-14 md:py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto text-center mb-12 md:mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent ring-1 ring-accent/20 text-sm mb-4">
          <Icon.Calculator class="w-4 h-4" />
          <span>Công cụ tính GPA thông minh</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          <span class="text-foreground">Công cụ tính GPA</span>
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">thông minh</span>
        </h1>
        <p class="text-foreground/80 mt-3 md:mt-4 text-base md:text-lg max-w-2xl mx-auto">
          Tính toán GPA & dự đoán kết quả. Hỏi AI để nhận gợi ý học tập thông minh.
        </p>
      </div>

      <div class="max-w-5xl mx-auto">
        <Tabs :default-value="DEFAULT_TAB" class="block">
          <TabsList class="inline-flex h-12 items-center justify-center rounded-2xl bg-muted/60 p-1.5 text-muted-foreground overflow-x-auto shadow-sm">
            <TabsTrigger value="target" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:ring-1 data-[state=active]:ring-primary/30">
              <Icon.Target class="w-4 h-4 mr-2" />
              Tính toán mục tiêu
            </TabsTrigger>
            <TabsTrigger value="gpa" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:ring-1 data-[state=active]:ring-primary/30">
              <Icon.Calculator class="w-4 h-4 mr-2" />
              Tính toán GPA
            </TabsTrigger>
            <TabsTrigger value="pe" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:ring-1 data-[state=active]:ring-primary/30">
              <Icon.Dumbbell class="w-4 h-4 mr-2" />
              GPA thể dục
            </TabsTrigger>
            <TabsTrigger value="pass" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:ring-1 data-[state=active]:ring-primary/30">
              <Icon.ClipboardCheck class="w-4 h-4 mr-2" />
              Tính điểm qua môn
            </TabsTrigger>
            <TabsTrigger value="ai" class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:ring-1 data-[state=active]:ring-primary/30">
              <Icon.Bot class="w-4 h-4 mr-2" />
              Hỏi AI
            </TabsTrigger>
          </TabsList>

          <div class="mt-8">
            <TabsContent value="target" class="block">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="rounded-2xl border border-border bg-card text-card-foreground p-8 shadow-sm ring-1 ring-border/50">
                  <form @submit="onTargetSubmit" class="grid gap-4">
                <FieldControl
                  name="completedCredits"
                  label="Số tín đã học"
                  type="number"
                  step="1"
                  placeholder="Nhập số tín đã học"
                />
                <FieldControl
                  name="currentGpa"
                  label="GPA hiện tại"
                  type="number"
                  step="0.01"
                  placeholder="Nhập GPA hiện tại (0–4.00)"
                />
                <FieldControl
                  name="targetGpa"
                  label="GPA mục tiêu"
                  type="number"
                  step="0.01"
                  placeholder="Nhập GPA mục tiêu (0–4.00)"
                />
                <FieldControl
                  name="remainingCredits"
                  label="Số tín còn lại"
                  type="number"
                  step="1"
                  placeholder="Nhập số tín còn lại"
                />
                  <div class="md:col-span-2 flex gap-4">
                    <Button type="submit" :disabled="isSubmitting" class="h-11 px-6">
                      Tính toán
                    </Button>
                    <Button type="reset" variant="outline" class="h-11 px-6">
                      Đặt lại
                    </Button>
                  </div>
                  </form>
                </div>

                <div class="rounded-2xl border border-border bg-card text-card-foreground p-8 flex items-center justify-center shadow-sm ring-1 ring-border/50">
                  <div class="w-full h-80 md:h-96 lg:h-full flex flex-col items-center justify-center rounded-xl bg-muted/40 border border-border text-center px-6">
                    <Icon.FileText class="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 class="text-xl font-semibold text-foreground mb-1">Sẵn sàng tính toán</h3>
                    <p class="text-sm text-muted-foreground max-w-md">Nhập thông tin hoặc đặt câu hỏi để xem kết quả dự đoán.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gpa" class="rounded-xl border border-border bg-card text-card-foreground p-6">
              <div class="text-center text-sm text-muted-foreground">
                Tính GPA hiện tại hoặc GPA tích lũy theo số tín đã/đang học.
              </div>
            </TabsContent>

            <TabsContent value="pe" class="rounded-xl border border-border bg-card text-card-foreground p-6">
              <div class="text-center text-sm text-muted-foreground">
                Công cụ tính GPA thể dục theo thang DTU.
              </div>
            </TabsContent>

            <TabsContent value="pass" class="rounded-xl border border-border bg-card text-card-foreground p-6">
              <div class="text-center text-sm text-muted-foreground">
                Tính điểm cần ở bài thi cuối để qua môn theo trọng số.
              </div>
            </TabsContent>

            <TabsContent value="ai" class="rounded-xl border border-border bg-card text-card-foreground p-6">
              <div class="text-center text-sm text-muted-foreground">
                Đặt câu hỏi cho AI để nhận lời khuyên học tập thông minh.
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  </section>
</template>

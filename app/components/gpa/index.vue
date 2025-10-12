<script setup lang="ts">
import { ref } from 'vue'
import { Calculator, Target, TrendingUp, Brain, GraduationCap } from 'lucide-vue-next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import TargetCalculator from './TargetCalculator.vue'

const { t } = useI18n()

const activeTab = ref('target')
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Calculator class="w-4 h-4" />
          {{ t('gpa.smartTool') }}
        </div>

        <h1 class="text-4xl font-bold text-foreground mb-4">
          {{ t('gpa.calculateGpa') }}
          <span class="text-accent">& {{ t('gpa.predictResults') }}</span>
        </h1>

        <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
          {{ t('gpa.mainDescription') }}
        </p>
      </div>

      <div class="max-w-6xl mx-auto">
        <Tabs v-model="activeTab" class="w-full">
          <TabsList class="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="target" class="flex items-center gap-2">
              <Target class="w-4 h-4" />
              {{ t('gpa.calculateTarget') }}
            </TabsTrigger>
            <TabsTrigger value="gpa" class="flex items-center gap-2">
              <Calculator class="w-4 h-4" />
              {{ t('gpa.calculateGpaTab') }}
            </TabsTrigger>
            <TabsTrigger value="pe" class="flex items-center gap-2">
              <TrendingUp class="w-4 h-4" />
              {{ t('gpa.peGpa') }}
            </TabsTrigger>
            <TabsTrigger value="pass" class="flex items-center gap-2">
              <Target class="w-4 h-4" />
              {{ t('gpa.calculatePass') }}
            </TabsTrigger>
            <TabsTrigger value="ai" class="flex items-center gap-2">
              <Brain class="w-4 h-4" />
              {{ t('gpa.askAi') }}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="target">
            <TargetCalculator />
          </TabsContent>

          <TabsContent value="gpa">
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <Calculator class="w-5 h-5" />
                  {{ t('gpa.calculateGpa') }}
                </CardTitle>
                <CardDescription>
                  {{ t('gpa.gpaDescription') }}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="text-center py-12">
                  <Calculator class="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 class="text-lg font-semibold mb-2">{{ t('gpa.comingSoon') }}</h3>
                  <p class="text-muted-foreground">{{ t('gpa.comingSoonDescription') }}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pe">
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <TrendingUp class="w-5 h-5" />
                  {{ t('gpa.peGpa') }}
                </CardTitle>
                <CardDescription>
                  {{ t('gpa.peDescription') }}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="text-center py-12">
                  <TrendingUp class="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 class="text-lg font-semibold mb-2">{{ t('gpa.comingSoon') }}</h3>
                  <p class="text-muted-foreground">{{ t('gpa.comingSoonDescription') }}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pass">
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <Target class="w-5 h-5" />
                  {{ t('gpa.calculatePass') }}
                </CardTitle>
                <CardDescription>
                  {{ t('gpa.passDescription') }}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="text-center py-12">
                  <Target class="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 class="text-lg font-semibold mb-2">{{ t('gpa.comingSoon') }}</h3>
                  <p class="text-muted-foreground">{{ t('gpa.comingSoonDescription') }}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <Brain class="w-5 h-5" />
                  {{ t('gpa.askAi') }}
                </CardTitle>
                <CardDescription>
                  {{ t('gpa.aiDescription') }}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="text-center py-12">
                  <Brain class="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 class="text-lg font-semibold mb-2">{{ t('gpa.comingSoon') }}</h3>
                  <p class="text-muted-foreground">{{ t('gpa.comingSoonDescription') }}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div class="max-w-4xl mx-auto mt-16">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <GraduationCap class="w-5 h-5" />
              {{ t('gpa.graduationClassification') }}
            </CardTitle>
            <CardDescription>
              {{ t('gpa.classificationDescription') }}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                <h3 class="font-semibold text-lg">{{ t('gpa.excellent') }}</h3>
                <p class="text-purple-100">3.60 - 4.00</p>
              </div>
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                <h3 class="font-semibold text-lg">{{ t('gpa.good') }}</h3>
                <p class="text-blue-100">3.20 - 3.59</p>
              </div>
              <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg">
                <h3 class="font-semibold text-lg">{{ t('gpa.average') }}</h3>
                <p class="text-green-100">2.50 - 3.19</p>
              </div>
              <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                <h3 class="font-semibold text-lg">{{ t('gpa.belowAverage') }}</h3>
                <p class="text-orange-100">2.00 - 2.49</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

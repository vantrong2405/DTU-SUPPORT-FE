<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import * as Icon from '@/components/ui/icon'
import { useAuth } from '@/composables/auth'

const { t } = useI18n()
const { redirectToGoogleLogin, isRedirecting } = useAuth()
const SCOPE = 'common.auth.login'

definePageMeta({
  middleware: 'guest',
})
</script>

<template>
  <section class="bg-background text-foreground min-h-screen flex items-center justify-center py-12 sm:py-14 md:py-20">
    <div class="container mx-auto px-4 sm:px-6 w-full">
      <div class="max-w-md mx-auto">
        <div class="text-center mb-6 sm:mb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent ring-1 ring-accent/20 text-xs sm:text-sm mb-3 sm:mb-4">
            <Icon.LogIn class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{{ t('common.auth.login.button') }}</span>
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight px-2">
            <span class="text-foreground">{{ t(`${SCOPE}.title`) }}</span>
          </h1>
          <p class="text-foreground/80 mt-3 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4">
            {{ t(`${SCOPE}.subtitle`) }}
          </p>
        </div>

        <Card class="rounded-xl sm:rounded-2xl border border-border/20 bg-card text-card-foreground shadow-md backdrop-blur-sm">
          <CardHeader class="p-4 sm:p-5 md:p-6">
            <CardTitle class="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1.5 flex items-center gap-2">
              <Icon.Lock class="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              {{ t(`${SCOPE}.title`) }}
            </CardTitle>
            <CardDescription class="text-xs sm:text-sm text-muted-foreground">
              {{ t(`${SCOPE}.subtitle`) }}
            </CardDescription>
          </CardHeader>
          <CardContent class="p-4 sm:p-5 md:p-6 pt-0">
            <div class="flex flex-col gap-4">
              <Button size="lg" class="w-full" type="button" :disabled="isRedirecting" @click="redirectToGoogleLogin">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {{ t(`${SCOPE}.buttons.google`) }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

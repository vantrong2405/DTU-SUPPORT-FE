<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-muted text-foreground">
    <div class="container mx-auto px-4 py-12">
      <div class="grid gap-8 md:grid-cols-4 justify-items-center md:justify-items-start text-center md:text-left max-w-5xl mx-auto">
        <div class="md:col-span-1">
          <div class="flex items-center justify-center md:justify-start mb-4">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
              <span class="text-primary-foreground text-lg">🎓</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-foreground">{{ t('common.brand.titleFull') }}</h3>
              <p class="text-sm text-muted-foreground">{{ t('common.brand.subtitle') }}</p>
            </div>
          </div>
          <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
            {{ t('common.footer.intro') }}
          </p>
        </div>

        <div>
          <h4 class="text-lg font-bold text-foreground mb-4">{{ t('common.footer.sections.services') }}</h4>
          <ul class="space-y-3">
            <li><NuxtLink to="/gpa" class="text-muted-foreground hover:text-foreground transition-colors text-sm">{{ t('common.footer.links.gpa') }}</NuxtLink></li>
            <li><NuxtLink to="/predict" class="text-muted-foreground hover:text-foreground transition-colors text-sm">{{ t('common.footer.links.predict') }}</NuxtLink></li>
            <li><NuxtLink to="/schedule" class="text-muted-foreground hover:text-foreground transition-colors text-sm">{{ t('common.footer.links.schedule') }}</NuxtLink></li>
            <li><NuxtLink to="/marketplace" class="text-muted-foreground hover:text-foreground transition-colors text-sm">{{ t('common.footer.links.marketplace') }}</NuxtLink></li>
            <li><NuxtLink to="/tools" class="text-muted-foreground hover:text-foreground transition-colors text-sm">{{ t('common.footer.links.tools') }}</NuxtLink></li>
            <li><NuxtLink to="/help" class="text-muted-foreground hover:text-foreground transition-colors text-sm">{{ t('common.footer.links.help') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-bold text-foreground mb-4">{{ t('common.footer.sections.support') }}</h4>
          <ul class="space-y-3">
            <li><NuxtLink to="/faq" class="text-muted-foreground hover:text-foreground transition-colors text-sm">{{ t('common.footer.links.faq') }}</NuxtLink></li>
            <li><NuxtLink to="/payment" class="text-muted-foreground hover:text-foreground transition-colors text-sm">{{ t('common.footer.links.payment') }}</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="text-muted-foreground hover:text-foreground transition-colors text-sm">{{ t('common.footer.links.privacy') }}</NuxtLink></li>
            <li><NuxtLink to="/terms" class="text-muted-foreground hover:text-foreground transition-colors text-sm">{{ t('common.footer.links.terms') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-bold text-foreground mb-4">{{ t('common.footer.sections.contact') }}</h4>
          <ul class="space-y-3">
            <li class="flex items-center justify-center md:justify-start">
              <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3">
                <span class="text-primary-foreground text-xs">💬</span>
              </div>
              <span class="text-muted-foreground text-sm">{{ t('common.footer.contact.messenger') }}</span>
            </li>
            <li class="flex items-center justify-center md:justify-start">
              <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3">
                <span class="text-primary-foreground text-xs">f</span>
              </div>
              <span class="text-muted-foreground text-sm">{{ t('common.footer.contact.facebook') }}</span>
            </li>
            <li class="flex items-center justify-center md:justify-start">
              <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3">
                <span class="text-primary-foreground text-xs">⏰</span>
              </div>
              <span class="text-muted-foreground text-sm">{{ t('common.footer.contact.response') }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-border mt-12 pt-8 text-center max-w-5xl mx-auto">
        <p class="text-muted-foreground text-sm">
          {{ t('common.footer.copyright', { year: currentYear }) }}
        </p>
        <p class="text-muted-foreground text-xs mt-2">
          {{ t('common.footer.crafted') }}
        </p>
      </div>
    </div>
  </footer>
</template>

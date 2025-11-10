<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as Icon from '@/components/ui/icon'
import { useNavigation } from '@/composables/common/useNavigation'
import { useScrollReveal } from '@/composables/animations/useScrollReveal'

const { t } = useI18n()
const { navigateTo } = useNavigation()
const { target: footerRef } = useScrollReveal({ threshold: 0.1, animation: 'fade' })
</script>

<template>
  <footer ref="footerRef" class="bg-muted text-foreground">
    <div class="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
      <div
        class="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4 justify-items-center md:justify-items-start text-center md:text-left max-w-5xl mx-auto"
      >
        <div class="md:col-span-1 w-full md:w-auto">
          <div class="flex items-center justify-center md:justify-start mb-3 sm:mb-4">
            <div
              class="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0"
            >
              <Icon.GraduationCap class="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div class="min-w-0">
              <h3 class="text-base sm:text-lg font-bold text-foreground truncate">
                {{ t('common.brand.titleFull') }}
              </h3>
              <p class="text-xs sm:text-sm text-muted-foreground truncate">
                {{ t('common.brand.subtitle') }}
              </p>
            </div>
          </div>
          <p class="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed max-w-xs md:max-w-none mx-auto md:mx-0">
            {{ t('common.footer.intro') }}
          </p>
        </div>

        <div class="w-full md:w-auto">
          <h4 class="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">
            {{ t('common.footer.sections.services') }}
          </h4>
          <ul class="space-y-2 sm:space-y-3">
            <li>
              <NuxtLink
                :to="navigateTo('/tools/gpa')"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-sm block"
                >{{ t('common.footer.links.gpa') }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-sm block"
                >{{ t('common.footer.links.predict') }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-sm block"
                >{{ t('common.footer.links.schedule') }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-sm block"
                >{{ t('common.footer.links.marketplace') }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                :to="navigateTo('/tools')"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-sm block"
                >{{ t('common.footer.links.tools') }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-sm block"
                >{{ t('common.footer.links.help') }}</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div class="w-full md:w-auto">
          <h4 class="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">
            {{ t('common.footer.sections.support') }}
          </h4>
          <ul class="space-y-2 sm:space-y-3">
            <li>
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-sm block"
                >{{ t('common.footer.links.faq') }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-sm block"
                >{{ t('common.footer.links.payment') }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-sm block"
                >{{ t('common.footer.links.privacy') }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-sm block"
                >{{ t('common.footer.links.terms') }}</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div class="w-full md:w-auto">
          <h4 class="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">
            {{ t('common.footer.sections.contact') }}
          </h4>
          <ul class="space-y-2 sm:space-y-3">
            <li class="flex items-center justify-center md:justify-start">
              <div
                class="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3"
              >
                <Icon.MessageCircle class="w-4 h-4 text-primary-foreground" />
              </div>
              <span class="text-muted-foreground text-sm">{{
                t('common.footer.contact.messenger')
              }}</span>
            </li>
            <li class="flex items-center justify-center md:justify-start">
              <div
                class="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3"
              >
                <span class="text-primary-foreground text-xs">f</span>
              </div>
              <span class="text-muted-foreground text-sm">{{
                t('common.footer.contact.facebook')
              }}</span>
            </li>
            <li class="flex items-center justify-center md:justify-start">
              <div
                class="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3"
              >
                <Icon.Clock class="w-4 h-4 text-primary-foreground" />
              </div>
              <span class="text-muted-foreground text-sm">{{
                t('common.footer.contact.response')
              }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-border mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-7 md:pt-8 text-center max-w-5xl mx-auto px-4"
      >
        <p class="text-muted-foreground text-xs sm:text-sm">
          {{ t('common.footer.copyright', { year: new Date().getFullYear() }) }}
        </p>
        <p class="text-muted-foreground text-xs mt-2">
          {{ t('common.footer.crafted') }}
        </p>
      </div>
    </div>
  </footer>
</template>

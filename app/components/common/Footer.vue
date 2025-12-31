<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as Icon from '@/components/ui/icon'
import { useNavigation } from '@/composables/common/useNavigation'
import { useScrollReveal } from '@/composables/animations/useScrollReveal'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const { navigateTo } = useNavigation()
const route = useRoute()
const router = useRouter()
const { target: footerRef } = useScrollReveal({ threshold: 0.1, animation: 'fade' })

const scrollToSection = (sectionId: string) => {
  const element = document.querySelector(sectionId)
  if (element) { element.scrollIntoView({ behavior: 'smooth' }) }
}

const handleAboutClick = async (event: MouseEvent) => {
  event.preventDefault()
  const homeLink = navigateTo('/')
  if (route.path !== homeLink.path) {
    await router.push(homeLink)
    setTimeout(() => scrollToSection('#about-us'), 300)
  } else {
    scrollToSection('#about-us')
  }
}
</script>

<template>
  <footer ref="footerRef" class="bg-card border-t border-border">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="border-t border-border py-8">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-muted-foreground">
              {{ t('common.footer.copyright', { year: new Date().getFullYear() }) }}
            </p>
            <div class="flex gap-6">
              <NuxtLink
                to="/privacy-policy"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </NuxtLink>
              <NuxtLink
                to="/terms"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {{ t('common.footer.links.contact') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

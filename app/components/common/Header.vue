<script setup lang="ts">
import logoDtu from '@/assets/images/logo-dtu.png'
import { Button } from '@/components/ui/button'
import { Theme } from '@/components/ui/theme-selector'
import LocaleSwitcher from './LocaleSwitcher.vue'
import { useI18n } from 'vue-i18n'
import { NAV_ITEMS } from '@/constants/features/home'
import { useNavigation } from '@/composables/common/useNavigation'
import { Menu, X } from 'lucide-vue-next'

const { t } = useI18n()
const { navigateTo } = useNavigation()

const isMenuOpen = ref(false)
const route = useRoute()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const scrollToSection = (sectionId: string) => {
  closeMenu()
  const element = document.querySelector(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleNavClick = (
  event: MouseEvent,
  item: { to: string; scroll?: boolean }
) => {
  if (item.scroll) {
    event.preventDefault()
    scrollToSection(item.to)
  }
}

const getNavLink = (item: { to: string; scroll?: boolean }) => {
  if (item.scroll) {
    return route.path
  }
  return navigateTo(item.to)
}

const handleMobileNavClick = (
  event: MouseEvent,
  item: { to: string; scroll?: boolean }
) => {
  handleNavClick(event, item)
  if (!item.scroll) closeMenu()
}

const navItems = computed(() => {
  if (route.path !== '/') {
    return []
  }

  return NAV_ITEMS.map((item) => ({
    label: t(`common.header.menu.${item.key}`),
    to: item.to,
    scroll: 'scroll' in item ? item.scroll : false,
  }))
})
</script>

<template>
  <header class="bg-background shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-3 sm:px-4">
      <div class="flex items-center justify-between h-16">
        <NuxtLink
          :to="navigateTo('/')"
          class="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-shrink-0"
          @click="closeMenu"
        >
          <div
            class="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center border-0 flex-shrink-0"
          >
            <img
              :src="logoDtu"
              alt="DTU Logo"
              class="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
          </div>

          <div class="hidden sm:block flex-shrink-0 min-w-0">
            <h1 class="text-lg sm:text-xl font-bold text-foreground truncate">
              {{ t('common.brand.titleFull') }}
            </h1>
            <p class="text-xs text-muted-foreground truncate">
              {{ t('common.brand.subtitle') }}
            </p>
          </div>

          <div class="sm:hidden flex-shrink-0">
            <h1 class="text-sm font-bold text-foreground">
              {{ t('common.brand.titleShort') }}
            </h1>
          </div>
        </NuxtLink>
        <div></div>

        <nav class="hidden lg:flex items-center space-x-3 xl:space-x-4 2xl:space-x-6">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="getNavLink(item)"
            class="text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--accent)/0.16)] rounded-md px-2 py-1 transition-colors duration-150 font-medium text-sm whitespace-nowrap"
            active-class="text-primary"
            @click="handleNavClick($event, item)"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="hidden lg:flex items-center space-x-2 flex-shrink-0">
          <Theme />
          <LocaleSwitcher />
          <div class="h-6 w-px bg-border"></div>
          <Button
            as="NuxtLink"
            :to="navigateTo('/login')"
            size="sm"
            class="text-sm whitespace-nowrap"
            >{{ t('common.auth.login') }}</Button
          >
        </div>

        <Button
          as="button"
          variant="ghost"
          size="icon"
          @click="toggleMenu"
          class="lg:hidden text-foreground rounded-lg w-10 h-10 hover:bg-[hsl(var(--accent)/0.12)] active:bg-[hsl(var(--accent)/0.16)] transition-colors duration-150 flex items-center flex-shrink-0"
          aria-label="Toggle menu"
        >
          <Menu v-if="!isMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </Button>
      </div>

      <div
        v-if="isMenuOpen"
        class="lg:hidden border-t border-border bg-background"
      >
        <nav class="py-4 space-y-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="getNavLink(item)"
            class="block text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--accent)/0.16)] rounded-md px-3 py-2 transition-colors duration-150 font-medium"
            active-class="text-primary bg-accent/10"
            @click="handleMobileNavClick($event, item)"
          >
            {{ item.label }}
          </NuxtLink>

          <div class="pt-4 border-t border-border space-y-3">
            <div class="flex items-center justify-center gap-3 pb-2">
              <Theme />
              <LocaleSwitcher />
            </div>

            <div class="space-y-2 px-3">
              <Button
                as="NuxtLink"
                :to="navigateTo('/login')"
                class="w-full justify-center"
                @click="closeMenu"
              >
                {{ t('common.auth.login') }}
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

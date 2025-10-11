<script setup lang="ts">
import { Palette } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useI18n } from 'vue-i18n'
import { THEMES } from '@/constants/common/ui'
import { useThemeLogic } from '@/composables/useThemeLogic'

const { t } = useI18n()

const { currentTheme, isShowingLightMode, themeIconColor, handleThemeSwitch, getThemeDisplayLabel, setHtmlAttributes } = useThemeLogic()

setHtmlAttributes()
</script>

<template>
  <DropdownMenu>
      <DropdownMenuTrigger as-child>
      <Button variant="outline" size="sm" class="gap-2 rounded-lg">
        <Palette class="h-[1.2rem] w-[1.2rem]" :style="{ color: themeIconColor }" />
        <span class="hidden sm:inline">{{ t('common.ui.theme.label') }}</span>
      </Button>
    </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56 bg-card text-card-foreground border border-border rounded-xl shadow-2xl ring-1 ring-border backdrop-blur-sm z-[9999]" align="end">
        <DropdownMenuLabel class="text-card-foreground">{{ t('common.ui.theme.selectLabel') }}</DropdownMenuLabel>
      <div class="border-t border-border mt-1" />

      <div class="p-2">
        <div class="flex items-center gap-2 px-2 pb-3">
          <Button size="sm" :variant="isShowingLightMode === 'light' ? 'default' : 'outline'" @click="isShowingLightMode = 'light'">Light</Button>
          <Button size="sm" :variant="isShowingLightMode === 'dark' ? 'default' : 'outline'" @click="isShowingLightMode = 'dark'">Dark</Button>
        </div>

        <div v-if="isShowingLightMode === 'light'" class="grid grid-cols-2 gap-1">
          <Button
            as="button"
            variant="ghost"
            size="sm"
            v-for="theme in THEMES.light"
            :key="theme.value"
            @click="handleThemeSwitch(theme.value)"
            :class="[
              'justify-start gap-2 text-xs hover:bg-muted rounded-md transition-colors',
              currentTheme === theme.value ? 'bg-muted ring-1 ring-border' : ''
            ]"
          >
            <div class="w-3 h-3 rounded-full border border-border" :style="{ backgroundColor: theme.color }" />
            <span class="truncate">{{ getThemeDisplayLabel(theme.value) }}</span>
          </Button>
        </div>

        <div v-else class="grid grid-cols-2 gap-1">
          <Button
            as="button"
            variant="ghost"
            size="sm"
            v-for="theme in THEMES.dark"
            :key="theme.value"
            @click="handleThemeSwitch(theme.value)"
            :class="[
              'justify-start gap-2 text-xs hover:bg-muted rounded-md transition-colors',
              currentTheme === theme.value ? 'bg-muted ring-1 ring-border' : ''
            ]"
          >
            <div class="w-3 h-3 rounded-full border border-border" :style="{ backgroundColor: theme.color }" />
            <span class="truncate">{{ getThemeDisplayLabel(theme.value) }}</span>
          </Button>
        </div>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

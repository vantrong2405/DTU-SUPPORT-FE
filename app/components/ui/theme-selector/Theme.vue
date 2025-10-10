<script setup lang="ts">
import { Palette } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const themes = {
  light: [
    { value: 'red-light', color: '#C8102E' },
    { value: 'blue-light', color: '#3B82F6' },
    { value: 'green-light', color: '#10B981' },
    { value: 'purple-light', color: '#8B5CF6' },
    { value: 'orange-light', color: '#F97316' },
    { value: 'pink-light', color: '#EC4899' }
  ],
  dark: [
    { value: 'red-dark', color: '#EF4444' },
    { value: 'blue-dark', color: '#60A5FA' },
    { value: 'green-dark', color: '#34D399' },
    { value: 'purple-dark', color: '#A78BFA' },
    { value: 'orange-dark', color: '#FB923C' },
    { value: 'pink-dark', color: '#F472B6' }
  ]
}

const route = useRoute()
const router = useRouter()

const currentTheme = computed(() => route.query.theme as string)
const currentMode = computed(() => (currentTheme.value || '').includes('-dark') ? 'dark' : 'light')

const showingMode = ref<'light' | 'dark'>(currentMode.value as 'light' | 'dark')
watch(currentMode, (m) => {
  showingMode.value = m as 'light' | 'dark'
})

const iconColor = computed(() => {
  const allThemes = [...themes.light, ...themes.dark]
  const theme = allThemes.find(t => t.value === currentTheme.value)
  return theme?.color || '#C8102E'
})

const applyTheme = (themeValue: string) => {
  router.push({ query: { ...route.query, theme: themeValue } })
}

const getThemeLabel = (value: string) => {
  const base = (value || '').split('-')[0] as 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'pink'
  return t(`common.ui.theme.names.${base}`)
}

useHead(() => ({
  htmlAttrs: {
    'data-theme': currentTheme.value || 'red-light',
    'data-mode': currentMode.value
  }
}))
</script>

<template>
  <DropdownMenu>
      <DropdownMenuTrigger as-child>
      <Button variant="outline" size="sm" class="gap-2 rounded-lg">
        <Palette class="h-[1.2rem] w-[1.2rem]" :style="{ color: iconColor }" />
        <span class="hidden sm:inline">{{ $t('common.ui.theme.label') }}</span>
      </Button>
    </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56 bg-card text-card-foreground border border-border rounded-xl shadow-2xl ring-1 ring-border backdrop-blur-sm z-[9999]" align="end">
        <DropdownMenuLabel class="text-card-foreground">{{ $t('common.ui.theme.selectLabel') }}</DropdownMenuLabel>
      <div class="border-t border-border mt-1" />

      <div class="p-2">
        <div class="flex items-center gap-2 px-2 pb-3">
          <Button size="sm" :variant="showingMode === 'light' ? 'default' : 'outline'" @click="showingMode = 'light'">Light</Button>
          <Button size="sm" :variant="showingMode === 'dark' ? 'default' : 'outline'" @click="showingMode = 'dark'">Dark</Button>
        </div>

        <div v-if="showingMode === 'light'" class="grid grid-cols-2 gap-1">
          <Button
            as="button"
            variant="ghost"
            size="sm"
            v-for="theme in themes.light"
            :key="theme.value"
            @click="applyTheme(theme.value)"
            :class="[
              'justify-start gap-2 text-xs hover:bg-muted rounded-md transition-colors',
              currentTheme === theme.value ? 'bg-muted ring-1 ring-border' : ''
            ]"
          >
            <div class="w-3 h-3 rounded-full border border-border" :style="{ backgroundColor: theme.color }" />
            <span class="truncate">{{ getThemeLabel(theme.value) }}</span>
          </Button>
        </div>

        <div v-else class="grid grid-cols-2 gap-1">
          <Button
            as="button"
            variant="ghost"
            size="sm"
            v-for="theme in themes.dark"
            :key="theme.value"
            @click="applyTheme(theme.value)"
            :class="[
              'justify-start gap-2 text-xs hover:bg-muted rounded-md transition-colors',
              currentTheme === theme.value ? 'bg-muted ring-1 ring-border' : ''
            ]"
          >
            <div class="w-3 h-3 rounded-full border border-border" :style="{ backgroundColor: theme.color }" />
            <span class="truncate">{{ getThemeLabel(theme.value) }}</span>
          </Button>
        </div>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

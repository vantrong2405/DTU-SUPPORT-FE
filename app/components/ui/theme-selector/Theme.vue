<script setup lang="ts">
import { Palette } from 'lucide-vue-next'
import * as SU from '@/components/ui'

const themes = {
  light: [
    { name: 'Đỏ DTU', value: 'red-light', color: '#C8102E' },
    { name: 'Xanh Dương', value: 'blue-light', color: '#3B82F6' },
    { name: 'Xanh Lá', value: 'green-light', color: '#10B981' },
    { name: 'Tím Hoàng Gia', value: 'purple-light', color: '#8B5CF6' },
    { name: 'Cam Hoàng Hôn', value: 'orange-light', color: '#F97316' },
    { name: 'Hồng Hoa Hồng', value: 'pink-light', color: '#EC4899' }
  ],
  dark: [
    { name: 'Đỏ DTU', value: 'red-dark', color: '#EF4444' },
    { name: 'Xanh Dương', value: 'blue-dark', color: '#60A5FA' },
    { name: 'Xanh Lá', value: 'green-dark', color: '#34D399' },
    { name: 'Tím Hoàng Gia', value: 'purple-dark', color: '#A78BFA' },
    { name: 'Cam Hoàng Hôn', value: 'orange-dark', color: '#FB923C' },
    { name: 'Hồng Hoa Hồng', value: 'pink-dark', color: '#F472B6' }
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

useHead(() => ({
  htmlAttrs: {
    'data-theme': currentTheme.value || 'red-light',
    'data-mode': currentMode.value
  }
}))
</script>

<template>
  <SU.DropdownMenu>
    <SU.DropdownMenuTrigger as-child>
      <SU.Button variant="outline" size="sm" class="gap-2 rounded-lg">
        <Palette class="h-[1.2rem] w-[1.2rem]" :style="{ color: iconColor }" />
        <span class="hidden sm:inline">Màu sắc</span>
      </SU.Button>
    </SU.DropdownMenuTrigger>
      <SU.DropdownMenuContent class="w-56 bg-card text-card-foreground border border-border rounded-xl shadow-2xl ring-1 ring-border backdrop-blur-sm z-[9999]" align="end">
        <SU.DropdownMenuLabel class="text-card-foreground">Chọn giao diện</SU.DropdownMenuLabel>
      <SU.DropdownMenuSeparator class="bg-border" />

      <div class="p-2">
        <div class="flex items-center gap-2 px-2 pb-3">
          <SU.Button size="sm" :variant="showingMode === 'light' ? 'default' : 'outline'" @click="showingMode = 'light'">Light</SU.Button>
          <SU.Button size="sm" :variant="showingMode === 'dark' ? 'default' : 'outline'" @click="showingMode = 'dark'">Dark</SU.Button>
        </div>

        <div v-if="showingMode === 'light'" class="grid grid-cols-2 gap-1">
          <SU.Button
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
            <span class="truncate">{{ theme.name }}</span>
          </SU.Button>
        </div>

        <div v-else class="grid grid-cols-2 gap-1">
          <SU.Button
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
            <span class="truncate">{{ theme.name }}</span>
          </SU.Button>
        </div>
      </div>
    </SU.DropdownMenuContent>
  </SU.DropdownMenu>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const resolvedLocales = computed(() => {
  return (locales.value as any[]).map((l: any) => {
    const code = typeof l === 'string' ? l : l.code
    const label = code === 'vi' ? 'VI' : code === 'en' ? 'EN' : 'JA'
    const name = typeof l === 'string' ? label : l.name
    const englishName = code === 'vi' ? 'VIETNAMESE' : code === 'en' ? 'ENGLISH' : 'JAPANESE'
    return { code, name, label, englishName }
  })
})

const isActive = (code: string) => locale.value === code

const handleSwitch = async (code: 'en' | 'vi' | 'ja') => {
  if (locale.value === code) return
  const currentY = window.scrollY
  const to = switchLocalePath(code)
  await router.push(to)
  requestAnimationFrame(() => {
    window.scrollTo({ top: currentY, behavior: 'auto' })
  })
}
</script>

<template>
  <div class="flex items-center">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" size="sm" class="gap-2 rounded-lg">
          <span>{{ (resolvedLocales.find((l: any) => isActive(l.code))?.englishName) || 'ENGLISH' }}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56 bg-card text-card-foreground border border-border rounded-xl shadow-2xl ring-1 ring-border backdrop-blur-sm z-[9999]" align="end">
        <DropdownMenuLabel class="text-card-foreground">{{ $t('common.ui.language.selectLabel') }}</DropdownMenuLabel>
        <div class="border-t border-border mt-1" />
        <div class="p-2 grid grid-cols-3 gap-1">
          <Button
            as="button"
            variant="ghost"
            size="sm"
            v-for="l in resolvedLocales"
            :key="`dd-${l.code}`"
            @click="handleSwitch(l.code as 'en' | 'vi' | 'ja')"
            :class="[
              'justify-start gap-2 text-xs hover:bg-muted rounded-md transition-colors',
              isActive(l.code) ? 'bg-muted ring-1 ring-border' : ''
            ]"
          >
            <div class="w-3 h-3 rounded-full border border-border bg-primary" />
            <span class="truncate">{{ l.label }}</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

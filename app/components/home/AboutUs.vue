<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const teamMembers = computed(() => {
  const members = []
  for (let i = 0; i < 5; i++) {
    members.push({
      name: t(`home.about.teamMembers.${i}.name`),
      role: t(`home.about.teamMembers.${i}.role`),
      avatar: t(`home.about.teamMembers.${i}.avatar`),
      description: t(`home.about.teamMembers.${i}.description`)
    })
  }
  return members
})
</script>

<template>
  <section id="about-us" class="py-20 md:py-24 bg-gradient-to-br from-muted to-background relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-20 right-20 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
      <div class="absolute bottom-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10 max-w-8xl">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-foreground mb-6">
          {{ t('home.about.title') }}
        </h2>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {{ t('home.about.description') }}
        </p>
      </div>

      <div class="max-w-7xl mx-auto">
        <div class="bg-card rounded-3xl p-8 md:p-12 shadow-2xl">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-card-foreground mb-4">{{ t('home.about.teamTitle') }}</h3>
            <p class="text-muted-foreground leading-relaxed">
              {{ t('home.about.teamSubtitle') }}
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <div v-for="member in teamMembers" :key="member.name"
              class="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/5 hover:from-primary/10 hover:to-primary/10 transition-all duration-300 border border-border shadow-md hover:shadow-lg">
              <div class="text-4xl mb-4">{{ member.avatar }}</div>
              <h4 class="text-lg font-bold text-card-foreground mb-2">{{ member.name }}</h4>
              <p class="text-primary font-semibold mb-2">{{ member.role }}</p>
              <p class="text-sm text-muted-foreground">{{ member.description }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<template>
  <div class="min-h-dvh bg-background text-foreground">
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/common/Header.vue'
import Footer from '~/components/common/Footer.vue'
</script>

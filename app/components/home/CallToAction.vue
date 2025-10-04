<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
</script>

<template>
  <section class="py-20 md:py-24 bg-white">
    <div class="container mx-auto">
      <div class="max-w-4xl mx-auto">
        <div class="bg-gradient-to-r from-dtu-red to-dtu-red rounded-3xl p-12 md:p-16 text-center text-dtu-white relative overflow-hidden">
          <div class="relative z-10">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">Sẵn sàng tối ưu kết quả học tập?</h2>
            <p class="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl mx-auto">Bắt đầu với công cụ tính GPA và theo dõi mục tiêu của bạn ngay hôm nay.</p>
            <Button as="NuxtLink" to="/gpa" variant="secondary" size="lg" class="bg-dtu-white text-dtu-red shadow-2xl hover:bg-dtu-white/90 hover:shadow-3xl hover:-translate-y-1 min-w-[200px]">
              Bắt đầu ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-dtu-gray text-dtu-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid gap-8 md:grid-cols-4">
        <div class="md:col-span-2">
          <h3 class="text-2xl font-bold text-dtu-red mb-4">DTU Help Center</h3>
          <p class="text-muted-foreground mb-4 max-w-md">
            Nền tảng hỗ trợ học tập toàn diện cho sinh viên Đại học Duy Tân.
            Tính GPA, dự đoán xếp loại và chia sẻ tài liệu học tập.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-dtu-red transition-colors">
              <span class="sr-only">Facebook</span>
              📘
            </a>
            <a href="#" class="text-gray-400 hover:text-dtu-red transition-colors">
              <span class="sr-only">Instagram</span>
              📷
            </a>
            <a href="#" class="text-gray-400 hover:text-dtu-red transition-colors">
              <span class="sr-only">YouTube</span>
              📺
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">Tính năng</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/gpa" class="text-gray-300 hover:text-dtu-red transition-colors">Tính GPA</NuxtLink></li>
            <li><NuxtLink to="/predict" class="text-gray-300 hover:text-dtu-red transition-colors">Dự đoán xếp loại</NuxtLink></li>
            <li><NuxtLink to="/path" class="text-gray-300 hover:text-dtu-red transition-colors">Lộ trình tín chỉ</NuxtLink></li>
            <li><NuxtLink to="/market" class="text-gray-300 hover:text-dtu-red transition-colors">Marketplace</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">Hỗ trợ</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/help" class="text-gray-300 hover:text-dtu-red transition-colors">Trung tâm trợ giúp</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-gray-300 hover:text-dtu-red transition-colors">Liên hệ</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="text-gray-300 hover:text-dtu-red transition-colors">Chính sách bảo mật</NuxtLink></li>
            <li><NuxtLink to="/terms" class="text-gray-300 hover:text-dtu-red transition-colors">Điều khoản sử dụng</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-border mt-8 pt-8 text-center">
        <p class="text-muted-foreground">
          © {{ currentYear }} DTU Help Center. Tất cả quyền được bảo lưu.
        </p>
        <p class="text-muted-foreground/70 text-sm mt-2">
          Được phát triển bởi sinh viên DTU với ❤️
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>

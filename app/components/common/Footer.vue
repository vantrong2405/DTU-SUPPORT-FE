<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-dtu-gray text-dtu-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid gap-8 md:grid-cols-4">
        <!-- Cột 1: Thông tin thương hiệu -->
        <div class="md:col-span-1">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-dtu-red rounded-lg flex items-center justify-center mr-3">
              <span class="text-dtu-white text-lg">🎓</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-dtu-white">DTU Help Center</h3>
              <p class="text-sm text-muted-foreground">Duy Tân University</p>
            </div>
          </div>
          <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
            Đồng hành cùng sinh viên DTU trong hành trình học tập và phát triển sự nghiệp.
          </p>
        </div>

        <!-- Cột 2: Dịch vụ -->
        <div>
          <h4 class="text-lg font-bold text-dtu-white mb-4">Dịch vụ</h4>
          <ul class="space-y-3">
            <li><NuxtLink to="/gpa" class="text-muted-foreground hover:text-dtu-white transition-colors text-sm">Tính toán GPA</NuxtLink></li>
            <li><NuxtLink to="/predict" class="text-muted-foreground hover:text-dtu-white transition-colors text-sm">Dự đoán xếp loại</NuxtLink></li>
            <li><NuxtLink to="/schedule" class="text-muted-foreground hover:text-dtu-white transition-colors text-sm">Lộ trình tín chỉ</NuxtLink></li>
            <li><NuxtLink to="/marketplace" class="text-muted-foreground hover:text-dtu-white transition-colors text-sm">Marketplace</NuxtLink></li>
            <li><NuxtLink to="/tools" class="text-muted-foreground hover:text-dtu-white transition-colors text-sm">Công cụ hỗ trợ</NuxtLink></li>
            <li><NuxtLink to="/help" class="text-muted-foreground hover:text-dtu-white transition-colors text-sm">Hỗ trợ học tập</NuxtLink></li>
          </ul>
        </div>

        <!-- Cột 3: Hỗ trợ -->
        <div>
          <h4 class="text-lg font-bold text-dtu-white mb-4">Hỗ trợ</h4>
          <ul class="space-y-3">
            <li><NuxtLink to="/faq" class="text-muted-foreground hover:text-dtu-white transition-colors text-sm">Câu hỏi thường gặp</NuxtLink></li>
            <li><NuxtLink to="/payment" class="text-muted-foreground hover:text-dtu-white transition-colors text-sm">Hướng dẫn thanh toán</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="text-muted-foreground hover:text-dtu-white transition-colors text-sm">Chính sách bảo mật</NuxtLink></li>
            <li><NuxtLink to="/terms" class="text-muted-foreground hover:text-dtu-white transition-colors text-sm">Điều khoản dịch vụ</NuxtLink></li>
          </ul>
        </div>

        <!-- Cột 4: Liên hệ -->
        <div>
          <h4 class="text-lg font-bold text-dtu-white mb-4">Liên hệ</h4>
          <ul class="space-y-3">
            <li class="flex items-center">
              <div class="w-6 h-6 bg-dtu-red rounded-full flex items-center justify-center mr-3">
                <span class="text-dtu-white text-xs">💬</span>
              </div>
              <span class="text-muted-foreground text-sm">Messenger 24/7</span>
            </li>
            <li class="flex items-center">
              <div class="w-6 h-6 bg-dtu-red rounded-full flex items-center justify-center mr-3">
                <span class="text-dtu-white text-xs">f</span>
              </div>
              <span class="text-muted-foreground text-sm">Facebook Page</span>
            </li>
            <li class="flex items-center">
              <div class="w-6 h-6 bg-dtu-red rounded-full flex items-center justify-center mr-3">
                <span class="text-dtu-white text-xs">⏰</span>
              </div>
              <span class="text-muted-foreground text-sm">Phản hồi trong 30 phút</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Phần bản quyền -->
      <div class="border-t border-border mt-12 pt-8 text-center">
        <p class="text-muted-foreground text-sm">
          © {{ currentYear }} DTU Help Center. Tất cả quyền được bảo lưu.
        </p>
        <p class="text-muted-foreground/70 text-xs mt-2">
          Được thiết kế với ❤️ cho sinh viên Duy Tân
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>

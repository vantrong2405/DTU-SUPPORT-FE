<script setup lang="ts">
const tools = [
  {
    title: 'Hỗ trợ học tập & tính toán GPA',
    desc: 'Công cụ toàn diện giúp bạn quản lý và tối ưu hóa kết quả học tập',
    to: '/gpa',
    icon: '📊',
    features: [
      'Tính điểm trung bình tích lũy (GPA) chính xác',
      'Phân loại học lực: Giỏi/Khá/Trung bình/Yếu',
      'Dự đoán học lực với số tín chỉ còn lại',
      'Đưa ra lời khuyên học phần cần ưu tiên',
      'Theo dõi tiến độ học tập theo từng kỳ'
    ],
    status: 'available',
    buttonText: '→ Sử dụng ngay'
  },
  {
    title: 'Đăng ký tín chỉ & đề xuất lịch học',
    desc: 'Hỗ trợ thông minh trong việc lập kế hoạch học tập và sắp xếp thời khóa biểu',
    to: '/schedule',
    icon: '📅',
    features: [
      'Gợi ý học phần phù hợp theo chuyên ngành',
      'Tự động xếp thời khóa biểu tối ưu',
      'Kiểm tra điều kiện tiên quyết',
      'Tránh xung đột lịch học và thi',
      'Dự báo khối lượng học tập mỗi kỳ'
    ],
    status: 'coming-soon',
    buttonText: 'Đang phát triển'
  },
  {
    title: 'Mua bán tài liệu học tập',
    desc: 'Marketplace chia sẻ tài liệu, đề thi, bài tập',
    to: '/marketplace',
    icon: '📚',
    features: [
      'Mua bán tài liệu học tập chất lượng',
      'Chia sẻ đề thi, bài tập mẫu',
      'Đánh giá và phản hồi tài liệu',
      'Tìm kiếm theo môn học, chuyên ngành',
      'Hệ thống thanh toán an toàn'
    ],
    status: 'coming-soon',
    buttonText: 'Đang phát triển'
  },
]
</script>

<template>
  <section class="py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-10 right-10 w-20 h-20 bg-dtu-red/5 rounded-full blur-xl"></div>
      <div class="absolute bottom-20 left-10 w-32 h-32 bg-dtu-red/5 rounded-full blur-2xl"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Chọn <span class="text-dtu-red">công cụ</span> phù hợp
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Khám phá các công cụ hỗ trợ học tập được thiết kế riêng cho sinh viên DTU
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        <div v-for="tool in tools" :key="tool.title"
          class="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden">

          <!-- Coming Soon Badge -->
          <div v-if="tool.status === 'coming-soon'"
            class="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Coming Soon
          </div>

          <!-- Icon -->
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-dtu-red rounded-lg flex items-center justify-center mr-4">
              <span class="text-2xl text-white">{{ tool.icon }}</span>
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            {{ tool.title }}
          </h3>

          <!-- Description -->
          <p class="text-gray-600 text-sm mb-4 leading-relaxed">
            {{ tool.desc }}
          </p>

          <!-- Key Features -->
          <div class="mb-6">
            <div class="flex items-center mb-3">
              <span class="text-yellow-500 mr-2">💡</span>
              <h4 class="text-sm font-semibold text-gray-800">Tính năng chính:</h4>
            </div>
            <ul class="space-y-1">
              <li v-for="feature in tool.features" :key="feature"
                class="text-xs text-gray-600 flex items-start">
                <span class="text-gray-400 mr-2 mt-1">•</span>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Button -->
          <div class="mt-auto">
            <NuxtLink v-if="tool.status === 'available'" :to="tool.to"
              class="w-full bg-dtu-red hover:bg-dtu-red/90 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
              {{ tool.buttonText }}
            </NuxtLink>
            <button v-else disabled
              class="w-full bg-gray-300 text-gray-500 font-medium py-3 px-4 rounded-lg cursor-not-allowed flex items-center justify-center">
              <span class="mr-2">⏰</span>
              {{ tool.buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import * as SU from '@/components/ui'

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
  <section class="py-20 md:py-24 bg-gradient-to-br from-muted to-background relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-10 right-10 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
      <div class="absolute bottom-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-foreground mb-6">
          Chọn <span class="text-primary">công cụ</span> phù hợp
        </h2>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Khám phá các công cụ hỗ trợ học tập được thiết kế riêng cho sinh viên DTU
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        <SU.Card v-for="tool in tools" :key="tool.title" class="relative overflow-hidden border-border">
          <!-- Coming Soon Badge -->
          <div v-if="tool.status === 'coming-soon'"
            class="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            Coming Soon
          </div>

          <SU.CardHeader>
            <!-- Icon -->
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl text-white">{{ tool.icon }}</span>
              </div>
            </div>

            <SU.CardTitle class="text-xl font-bold text-foreground">
              {{ tool.title }}
            </SU.CardTitle>

            <SU.CardDescription class="text-muted-foreground leading-relaxed">
              {{ tool.desc }}
            </SU.CardDescription>
          </SU.CardHeader>

          <SU.CardContent>
            <!-- Key Features -->
            <div class="mb-6">
              <div class="flex items-center mb-3">
                <span class="text-yellow-500 mr-2">💡</span>
                <h4 class="text-sm font-semibold text-foreground">Tính năng chính:</h4>
              </div>
              <ul class="space-y-1">
                <li v-for="feature in tool.features" :key="feature"
                  class="text-xs text-muted-foreground flex items-start">
                  <span class="text-muted-foreground mr-2 mt-1">•</span>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Button -->
            <div class="mt-auto">
              <SU.Button
                v-if="tool.status === 'available'"
                as="NuxtLink"
                :to="tool.to"
                class="w-full py-3 px-4 font-medium flex items-center justify-center"
              >
                {{ tool.buttonText }}
              </SU.Button>
              <SU.Button
                v-else
                disabled
                variant="secondary"
                class="w-full py-3 px-4 font-medium cursor-not-allowed flex items-center justify-center"
              >
                <span class="mr-2">⏰</span>
                {{ tool.buttonText }}
              </SU.Button>
            </div>
          </SU.CardContent>
        </SU.Card>
      </div>
    </div>
  </section>
</template>

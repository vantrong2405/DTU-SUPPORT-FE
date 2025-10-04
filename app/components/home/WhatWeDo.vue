<script setup lang="ts">
import * as SU from '@/components/ui'

const features = [
  {
    icon: '📊',
    title: 'Tính toán GPA',
    description: 'Công cụ tính điểm trung bình tích lũy chính xác, giúp bạn theo dõi kết quả học tập một cách khoa học.',
    benefits: ['Tính GPA chính xác', 'Dự đoán xếp loại', 'Lập kế hoạch học tập']
  },
  {
    icon: '📅',
    title: 'Lập lịch học',
    description: 'Hỗ trợ đăng ký tín chỉ và sắp xếp thời khóa biểu tối ưu, tránh xung đột lịch học.',
    benefits: ['Gợi ý học phần', 'Xếp thời khóa biểu', 'Kiểm tra điều kiện']
  },
  {
    icon: '📚',
    title: 'Marketplace tài liệu',
    description: 'Nền tảng mua bán tài liệu học tập, đề thi, bài tập từ sinh viên các khóa.',
    benefits: ['Tài liệu chất lượng', 'Đề thi mẫu', 'Hệ thống đánh giá']
  }
]
</script>

<template>
  <section id="what-we-do" class="py-20 md:py-24 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            DTU Help Center là gì?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nền tảng hỗ trợ học tập toàn diện được thiết kế đặc biệt cho sinh viên Đại học Duy Tân
          </p>
        </div>

        <!-- Main Content -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <!-- Left: Description -->
          <div>
            <h3 class="text-3xl font-bold text-gray-900 mb-6">
              Chúng tôi giúp gì cho bạn?
            </h3>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong class="text-dtu-red">DTU Help Center</strong> là nền tảng được phát triển bởi sinh viên DTU,
                dành riêng cho cộng đồng sinh viên Duy Tân với mục tiêu hỗ trợ quá trình học tập hiệu quả.
              </p>
              <p>
                Chúng tôi cung cấp các công cụ tính toán GPA, lập kế hoạch học tập, và marketplace
                tài liệu học tập để giúp bạn đạt được kết quả học tập tốt nhất.
              </p>
              <p>
                Tất cả các công cụ đều được thiết kế dựa trên quy chế đào tạo của Đại học Duy Tân,
                đảm bảo tính chính xác và phù hợp với chương trình học của bạn.
              </p>
            </div>
          </div>

          <!-- Right: Visual -->
          <div class="relative">
            <div class="bg-gradient-to-br from-dtu-red/10 to-dtu-red/5 rounded-3xl p-8 border border-gray-300/50">
              <div class="text-center">
                <div class="w-20 h-20 mx-auto bg-dtu-red rounded-2xl flex items-center justify-center mb-6">
                  <span class="text-3xl text-dtu-white">🎓</span>
                </div>
                <h4 class="text-2xl font-bold text-gray-900 mb-4">Sinh viên DTU</h4>
                <p class="text-gray-600 mb-6">
                  Hơn 1000+ sinh viên đã tin tưởng sử dụng các công cụ của chúng tôi
                </p>
                <div class="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div class="text-2xl font-bold text-dtu-red">95%</div>
                    <div class="text-sm text-gray-600">Độ chính xác</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-dtu-red">24/7</div>
                    <div class="text-sm text-gray-600">Hỗ trợ</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-dtu-red">100%</div>
                    <div class="text-sm text-gray-600">Miễn phí</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-3 gap-8">
          <SU.Card v-for="feature in features" :key="feature.title"
            class="text-center hover:from-dtu-red/5 hover:to-dtu-red/10 transition-all duration-300 hover:shadow-lg border-gray-300/50">
            <SU.CardHeader>
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br from-dtu-red/10 to-dtu-red/20">
                {{ feature.icon }}
              </div>
              <SU.CardTitle class="text-xl font-bold text-gray-900">
                {{ feature.title }}
              </SU.CardTitle>
              <SU.CardDescription class="text-gray-600 leading-relaxed">
                {{ feature.description }}
              </SU.CardDescription>
            </SU.CardHeader>

            <SU.CardContent>
              <ul class="space-y-1">
                <li v-for="benefit in feature.benefits" :key="benefit"
                  class="text-sm text-dtu-red flex items-center justify-center">
                  <span class="mr-2">✓</span>
                  {{ benefit }}
                </li>
              </ul>
            </SU.CardContent>
          </SU.Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: 'Nguyễn Văn An',
    major: 'Công nghệ thông tin',
    year: 'Năm 3',
    avatar: '👨‍🎓',
    content: 'DTU Help Center giúp mình tính GPA rất chính xác và dự đoán xếp loại bằng rất hữu ích. Công cụ này đã giúp mình lập kế hoạch học tập tốt hơn.',
    rating: 5
  },
  {
    name: 'Trần Thị Bình',
    major: 'Kinh tế',
    year: 'Năm 4',
    avatar: '👩‍🎓',
    content: 'Marketplace tài liệu học tập rất tiện lợi! Mình đã mua được nhiều tài liệu ôn thi chất lượng từ các anh chị khóa trên.',
    rating: 5
  },
  {
    name: 'Lê Minh Cường',
    major: 'Điện tử viễn thông',
    year: 'Năm 2',
    avatar: '👨‍🎓',
    content: 'Giao diện đẹp, dễ sử dụng. Tính năng lộ trình tín chỉ giúp mình biết cần học những môn gì để đạt mục tiêu GPA.',
    rating: 5
  },
  {
    name: 'Phạm Thị Dung',
    major: 'Quản trị kinh doanh',
    year: 'Năm 3',
    avatar: '👩‍🎓',
    content: 'Công cụ dự đoán xếp loại bằng rất chính xác. Mình đã sử dụng để lập kế hoạch học tập và đạt được mục tiêu.',
    rating: 5
  }
]
</script>

<template>
  <section id="testimonials" class="py-20 md:py-24 bg-gradient-to-br from-dtu-red/5 to-dtu-red/10 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-10 right-10 w-20 h-20 bg-dtu-red/10 rounded-full blur-xl"></div>
      <div class="absolute bottom-10 left-10 w-24 h-24 bg-dtu-red/10 rounded-full blur-2xl"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Sinh viên nói gì về <span class="text-dtu-red">chúng mình</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Những phản hồi chân thực từ cộng đồng sinh viên DTU
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="testimonial in testimonials" :key="testimonial.name"
          class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div class="flex items-center mb-4">
            <div class="text-3xl mr-3">{{ testimonial.avatar }}</div>
            <div>
              <h4 class="font-bold text-gray-900">{{ testimonial.name }}</h4>
              <p class="text-sm text-gray-600">{{ testimonial.major }} - {{ testimonial.year }}</p>
            </div>
          </div>

          <div class="flex mb-3">
            <div v-for="star in testimonial.rating" :key="star" class="text-yellow-400 text-lg">⭐</div>
          </div>

          <p class="text-gray-700 leading-relaxed text-sm">
            "{{ testimonial.content }}"
          </p>
        </div>
      </div>

      <div class="text-center mt-12">
        <div class="inline-flex items-center bg-dtu-red/10 text-dtu-red px-6 py-3 rounded-full">
          <span class="mr-2">💬</span>
          <span class="font-semibold">Hơn 1000+ sinh viên đã tin tưởng sử dụng</span>
        </div>
      </div>
    </div>
  </section>
</template>

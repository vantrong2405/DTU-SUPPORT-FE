<script setup lang="ts">
const features = [
  { title: 'Tính GPA', desc: 'Tính điểm trung bình tích lũy chính xác và nhanh chóng', to: '/gpa', icon: '📊' },
  { title: 'Dự đoán xếp loại', desc: 'Theo dõi mục tiêu bằng giỏi/khá/trung bình', to: '/predict', icon: '🎯' },
  { title: 'Lộ trình tín chỉ', desc: 'Gợi ý số tín chỉ cần đạt theo mục tiêu', to: '/path', icon: '🗺️' },
  { title: 'Marketplace tài liệu', desc: 'Mua/bán tài liệu học tập và ôn thi', to: '/market', icon: '📚' },
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
          Công cụ <span class="text-dtu-red">mạnh mẽ</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Bộ sưu tập các công cụ được thiết kế đặc biệt để nâng cao trải nghiệm học tập của bạn
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink v-for="(f, index) in features" :key="f.title" :to="f.to"
          class="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden">

          <div class="absolute inset-0 bg-gradient-to-br from-dtu-red/5 to-dtu-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="absolute -top-2 -right-2 w-8 h-8 bg-dtu-red text-dtu-white text-sm font-bold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {{ index + 1 }}
          </div>

          <div class="relative z-10">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-dtu-red/10 to-dtu-red/10 rounded-2xl flex items-center justify-center group-hover:from-dtu-red/20 group-hover:to-dtu-red/20 transition-all duration-300">
                <span class="text-3xl group-hover:scale-110 transition-transform duration-300">{{ f.icon }}</span>
              </div>
              <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-dtu-red rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-dtu-red transition-colors duration-300">
              {{ f.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">
              {{ f.desc }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

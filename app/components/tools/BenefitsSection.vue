<script setup lang="ts">
const benefits = [
  {
    icon: '📈',
    title: 'Tối ưu hóa kết quả',
    description: 'Giúp bạn đạt GPA cao hơn thông qua lập kế hoạch học tập khoa học'
  },
  {
    icon: '⏰',
    title: 'Tiết kiệm thời gian',
    description: 'Tự động hóa các tính toán phức tạp, giảm thời gian làm việc thủ công'
  },
  {
    icon: '🧠',
    title: 'Quyết định thông minh',
    description: 'Dựa trên dữ liệu để đưa ra những lựa chọn học tập tốt nhất'
  },
  {
    icon: '🎯',
    title: 'Mục tiêu rõ ràng',
    description: 'Xác định mục tiêu cụ thể và lộ trình để đạt được chúng'
  },
  {
    icon: '🏆',
    title: 'Kết quả xuất sắc',
    description: 'Hỗ trợ đạt học bổng, bằng khen và các thành tích học tập'
  },
  {
    icon: '📖',
    title: 'Học tập hiệu quả',
    description: 'Tối ưu thời gian biểu, cân bằng giữa học tập và nghỉ ngơi'
  }
]
</script>

<template>
  <section class="py-20 md:py-24 bg-background">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-foreground mb-6">
          Tại sao nên <span class="text-primary">sử dụng?</span>
        </h2>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Những lợi ích thiết thực mà công cụ mang lại cho việc học tập của bạn
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <div v-for="benefit in benefits" :key="benefit.title"
          class="text-center p-6 rounded-2xl bg-gradient-to-br from-muted to-background hover:from-primary/5 hover:to-primary/10 transition-all duration-300 border border-border shadow-sm hover:shadow-lg">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br from-primary/10 to-primary/20">
            {{ benefit.icon }}
          </div>
          <h3 class="text-xl font-bold text-foreground mb-3">{{ benefit.title }}</h3>
          <p class="text-muted-foreground leading-relaxed">{{ benefit.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

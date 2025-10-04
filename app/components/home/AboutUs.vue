<script setup lang="ts">
const teamMembers = [
  {
    name: 'Nguyễn Minh Tuấn',
    role: 'Frontend Developer',
    avatar: '👨‍💻',
    description: 'Chuyên về React, Vue.js và UI/UX Design'
  },
  {
    name: 'Trần Thị Hương',
    role: 'Backend Developer',
    avatar: '👩‍💻',
    description: 'Chuyên về Node.js, Python và Database'
  },
  {
    name: 'Lê Đức Anh',
    role: 'Data Analyst',
    avatar: '👨‍🔬',
    description: 'Chuyên về phân tích dữ liệu và AI/ML'
  },
  {
    name: 'Phạm Văn Hùng',
    role: 'Backend Developer',
    avatar: '👨‍💻',
    description: 'Chuyên về Java, Spring Boot và Microservices'
  },
  {
    name: 'Nguyễn Thị Mai',
    role: 'Marketing Specialist',
    avatar: '👩‍💼',
    description: 'Chuyên về Digital Marketing và Content Creation'
  }
]
</script>

<template>
  <section id="about-us" class="py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-20 right-20 w-24 h-24 bg-dtu-red/5 rounded-full blur-xl"></div>
      <div class="absolute bottom-20 left-20 w-32 h-32 bg-dtu-red/5 rounded-full blur-2xl"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10 max-w-7xl">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Về <span class="text-dtu-red">chúng tôi</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Chúng tôi là nhóm sinh viên chuyên build các công cụ để phục vụ cho sinh viên <span class="whitespace-nowrap">Duy Tân</span>
        </p>
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Đội ngũ phát triển</h3>
            <p class="text-gray-600 leading-relaxed">
              Đội ngũ đa dạng với chuyên môn sâu về công nghệ và marketing
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            <div v-for="member in teamMembers" :key="member.name"
              class="text-center p-6 rounded-2xl bg-gradient-to-br from-dtu-red/5 to-dtu-red/5 hover:from-dtu-red/10 hover:to-dtu-red/10 transition-all duration-300 border border-gray-200 shadow-md hover:shadow-lg">
              <div class="text-4xl mb-4">{{ member.avatar }}</div>
              <h4 class="text-lg font-bold text-gray-900 mb-2">{{ member.name }}</h4>
              <p class="text-dtu-red font-semibold mb-2">{{ member.role }}</p>
              <p class="text-sm text-gray-600">{{ member.description }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

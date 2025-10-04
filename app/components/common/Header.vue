<script setup lang="ts">
import logoDtu from '~/assets/images/logo-dtu.png'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const scrollToSection = (sectionId: string) => {
  closeMenu()
  const element = document.querySelector(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const navItems = [
  { label: 'Trang chủ', to: '/' },
  { label: 'DTU Helper là gì?', to: '#what-we-do', scroll: true },
  { label: 'Về chúng tôi', to: '#about-us', scroll: true },
  { label: 'Sinh viên nói gì', to: '#testimonials', scroll: true },
  { label: 'FAQ', to: '#faq', scroll: true }
]
</script>

<template>
  <header class="bg-dtu-white shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center space-x-3" @click="closeMenu">
          <div class="w-10 h-10 bg-dtu-red rounded-lg flex items-center justify-center">
            <img :src="logoDtu" alt="DTU Logo" class="w-8 h-8 object-contain">
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">DTU Help Center</h1>
            <p class="text-xs text-gray-600">Duy Tân University</p>
          </div>
        </NuxtLink>

        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-gray-700 hover:text-dtu-red transition-colors duration-200 font-medium"
            active-class="text-dtu-red"
            @click="item.scroll ? scrollToSection(item.to) : null"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="hidden md:flex items-center space-x-3">
          <NuxtLink
            to="/login"
            class="text-gray-700 hover:text-dtu-red transition-colors duration-200 font-medium px-4 py-2"
          >
            Đăng nhập
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="bg-dtu-red text-dtu-white px-6 py-2 rounded-lg font-semibold hover:bg-dtu-red/90 transition-colors duration-200"
          >
            Đăng ký
          </NuxtLink>
        </div>

        <button
          @click="toggleMenu"
          class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

        <div v-if="isMenuOpen" class="md:hidden border-t border-gray-200 py-4">
          <nav class="flex flex-col space-y-4">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="text-gray-700 hover:text-dtu-red transition-colors duration-200 font-medium py-2"
              active-class="text-dtu-red"
              @click="item.scroll ? scrollToSection(item.to) : closeMenu()"
            >
              {{ item.label }}
            </NuxtLink>
          <div class="pt-4 border-t border-gray-200 space-y-3">
            <NuxtLink
              to="/login"
              class="block text-gray-700 hover:text-dtu-red transition-colors duration-200 font-medium text-center py-2"
              @click="closeMenu"
            >
              Đăng nhập
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="block bg-dtu-red text-dtu-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-dtu-red/90 transition-colors duration-200"
              @click="closeMenu"
            >
              Đăng ký
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

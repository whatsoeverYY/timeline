<template>
  <div class="min-h-screen bg-gradient-to-br from-s-pink-10 to-s-purple-10 dark:from-dark-bg-primary dark:to-dark-bg-secondary">
    <!-- Header -->
    <div 
      ref="headerRef"
      class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-dark-bg-secondary/95 backdrop-blur-md shadow-lg border-b border-s-pink-30 dark:border-dark-accent-pink/20 transition-all duration-300 ease-out"
      :class="{ 'py-3': isScrolled, 'py-6': !isScrolled }"
    >
      <div class="container mx-auto px-4">
        <!-- Navigation Row -->
        <div class="flex items-center justify-between mb-4" :class="{ 'mb-2': isScrolled, 'mb-4': !isScrolled }">
          <router-link 
            to="/" 
            class="flex items-center text-s-purple-70 dark:text-dark-accent-purple hover:text-s-purple-50 dark:hover:text-dark-accent-pink transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            <span :class="{ 'hidden sm:inline': isScrolled }">返回相册</span>
          </router-link>
          <div class="flex items-center space-x-4">
            <router-link 
              to="/compress" 
              class="text-s-purple-70 dark:text-dark-accent-purple hover:text-s-purple-50 dark:hover:text-dark-accent-pink transition-colors text-sm"
              :class="{ 'hidden md:block': isScrolled }"
            >
              图片压缩
            </router-link>
            <router-link 
              to="/ai" 
              class="text-s-purple-70 dark:text-dark-accent-purple hover:text-s-purple-50 dark:hover:text-dark-accent-pink transition-colors text-sm"
              :class="{ 'hidden md:block': isScrolled }"
            >
              AI标注
            </router-link>
            <router-link 
              to="/all" 
              class="text-s-purple-70 dark:text-dark-accent-purple hover:text-s-purple-50 dark:hover:text-dark-accent-pink transition-colors text-sm"
              :class="{ 'hidden md:block': isScrolled }"
            >
              照片墙
            </router-link>
          </div>
        </div>
        
        <!-- Title Row -->
        <div class="flex items-center justify-between" :class="{ 'hidden': isScrolled && isMobile }">
          <div class="flex items-center space-x-4">
            <div 
              class="bg-gradient-to-r from-s-pink-50 to-s-purple-50 dark:from-dark-accent-pink dark:to-dark-accent-purple rounded-full transition-all duration-300"
              :class="{ 'p-2': isScrolled, 'p-3': !isScrolled }"
            >
              <svg 
                class="text-white transition-all duration-300" 
                :class="{ 'w-6 h-6': isScrolled, 'w-8 h-8': !isScrolled }"
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h1 
                class="font-bold text-s-purple-80 dark:text-dark-text-primary transition-all duration-300"
                :class="{ 'text-xl': isScrolled, 'text-3xl': !isScrolled }"
              >
                疫苗接种记录
              </h1>
              <p 
                class="text-s-gray-60 dark:text-dark-text-secondary transition-all duration-300"
                :class="{ 'hidden': isScrolled, 'block': !isScrolled }"
              >
                宝宝健康成长的足迹 💕
              </p>
            </div>
          </div>
          <div class="text-right">
            <div 
              class="font-bold text-s-purple-70 dark:text-dark-accent-purple transition-all duration-300"
              :class="{ 'text-lg': isScrolled, 'text-2xl': !isScrolled }"
            >
              {{ vaccineRecords.length }}
            </div>
            <div 
              class="text-s-gray-60 dark:text-dark-text-muted transition-all duration-300"
              :class="{ 'text-xs': isScrolled, 'text-sm': !isScrolled }"
            >
              已完成接种
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Spacer -->
    <div :class="{ 'h-20': isScrolled, 'h-32': !isScrolled }" class="transition-all duration-300"></div>

    <!-- Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid gap-6">
        <div 
          v-for="(record, index) in vaccineRecords" 
          :key="record.id"
          class="bg-white/90 dark:bg-dark-bg-secondary/90 backdrop-blur-sm rounded-2xl shadow-xl border border-s-pink-30/50 dark:border-dark-accent-pink/20 overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 transform"
        >
          <div class="p-6">
            <!-- Date Badge -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="bg-gradient-to-r from-s-pink-40 to-s-purple-40 dark:from-dark-accent-pink dark:to-dark-accent-purple text-white px-4 py-2 rounded-full text-sm font-semibold">
                  第{{ index + 1 }}次接种
                </div>
                <div class="text-s-gray-60 dark:text-dark-text-muted text-sm">
                  {{ formatDate(record.date) }}
                </div>
              </div>
              <div class="text-right">
                <div class="text-lg font-semibold text-s-purple-70 dark:text-dark-accent-purple">{{ record.age }}</div>
                <div class="text-xs text-s-gray-50 dark:text-dark-text-muted">年龄</div>
              </div>
            </div>

            <!-- Vaccine Info -->
            <div class="mb-6">
              <h3 class="text-xl font-bold text-s-purple-80 dark:text-dark-text-primary mb-2">{{ record.vaccineName }}</h3>
              <div class="flex items-center space-x-4 text-sm text-s-gray-60 dark:text-dark-text-secondary">
                <span>🏥 {{ record.hospital }}</span>
                <span>👨‍⚕️ {{ record.doctor }}</span>
              </div>
            </div>

            <!-- Reactions -->
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-s-purple-70 dark:text-dark-accent-purple mb-2">接种后反应</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="reaction in record.reactions" 
                  :key="reaction"
                  class="bg-s-pink-20 dark:bg-dark-accent-pink/20 text-s-purple-80 dark:text-dark-text-primary px-3 py-1 rounded-full text-sm"
                >
                  {{ reaction }}
                </span>
              </div>
            </div>

            <!-- Notes -->
            <div v-if="record.notes" class="mb-6">
              <h4 class="text-sm font-semibold text-s-purple-70 dark:text-dark-accent-purple mb-2">记录</h4>
              <p class="text-s-gray-70 dark:text-dark-text-secondary bg-s-purple-10 dark:bg-dark-bg-tertiary p-3 rounded-lg italic">
                "{{ record.notes }}"
              </p>
            </div>

            <!-- Video Link -->
            <div v-if="record.videoLink" class="flex items-center justify-between">
              <div class="text-sm text-s-gray-60 dark:text-dark-text-muted">
                📹 记录视频
              </div>
              <a 
                :href="record.videoLink" 
                target="_blank"
                class="bg-gradient-to-r from-s-pink-50 to-s-purple-50 dark:from-dark-accent-pink dark:to-dark-accent-purple text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                观看视频 ▶️
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Card -->
      <div class="mt-8 bg-gradient-to-r from-s-pink-20 to-s-purple-20 dark:from-dark-bg-secondary dark:to-dark-bg-tertiary rounded-2xl p-6 text-center">
        <div class="text-6xl mb-2">🎉</div>
        <h3 class="text-2xl font-bold text-s-purple-80 dark:text-dark-text-primary mb-2">宝宝真棒！</h3>
        <p class="text-s-gray-60 dark:text-dark-text-secondary">
          已完成 {{ vaccineRecords.length }} 次疫苗接种，为健康成长保驾护航 ✨
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { vaccineRecords } from '@/data/vaccine'

const isScrolled = ref(false)
const headerRef = ref<HTMLElement>()

// 检测移动端
const isMobile = computed(() => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768
  }
  return false
})

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 50
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初始检查
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
/* Smooth hover transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom gradient animations */
@keyframes gentle-glow {
  0%, 100% { 
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(159, 122, 234, 0.3);
  }
  50% { 
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(159, 122, 234, 0.5);
  }
}

/* Enhanced hover effect */
.grid > div:hover {
  animation: gentle-glow 2s ease-in-out infinite;
}

/* Smooth scale and translate combination */
.transform {
  will-change: transform, box-shadow;
}
</style>
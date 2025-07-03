<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-dark-bg-primary dark:to-dark-bg-secondary">
    <!-- Header -->
    <div 
      ref="headerRef"
      class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-dark-bg-secondary/95 backdrop-blur-md shadow-lg border-b border-orange-200 dark:border-dark-accent-pink/20 transition-all duration-300 ease-out"
      :class="{ 'py-3': isScrolled, 'py-6': !isScrolled }"
    >
      <div class="container mx-auto px-4">
        <!-- Navigation Row -->
        <div class="flex items-center justify-between mb-4" :class="{ 'mb-2': isScrolled, 'mb-4': !isScrolled }">
          <router-link 
            to="/" 
            class="flex items-center text-orange-600 dark:text-dark-accent-purple hover:text-orange-500 dark:hover:text-dark-accent-pink transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            <span :class="{ 'hidden sm:inline': isScrolled }">返回相册</span>
          </router-link>
          <div class="flex items-center space-x-4">
            <router-link 
              to="/vaccine" 
              class="text-orange-600 dark:text-dark-accent-purple hover:text-orange-500 dark:hover:text-dark-accent-pink transition-colors text-sm"
              :class="{ 'hidden md:block': isScrolled }"
            >
              疫苗记录
            </router-link>
            <router-link 
              to="/all" 
              class="text-orange-600 dark:text-dark-accent-purple hover:text-orange-500 dark:hover:text-dark-accent-pink transition-colors text-sm"
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
              class="bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-dark-accent-pink dark:to-dark-accent-purple rounded-full transition-all duration-300"
              :class="{ 'p-2': isScrolled, 'p-3': !isScrolled }"
            >
              <svg 
                class="text-white transition-all duration-300" 
                :class="{ 'w-6 h-6': isScrolled, 'w-8 h-8': !isScrolled }"
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <h1 
                class="font-bold text-orange-700 dark:text-dark-text-primary transition-all duration-300"
                :class="{ 'text-xl': isScrolled, 'text-3xl': !isScrolled }"
              >
                宝宝成长记录
              </h1>
              <p 
                class="text-orange-600 dark:text-dark-text-secondary transition-all duration-300"
                :class="{ 'hidden': isScrolled, 'block': !isScrolled }"
              >
                记录每一个珍贵的第一次 🌟
              </p>
            </div>
          </div>
          <div class="text-right">
            <div 
              class="font-bold text-orange-600 dark:text-dark-accent-purple transition-all duration-300"
              :class="{ 'text-lg': isScrolled, 'text-2xl': !isScrolled }"
            >
              {{ growthMilestones.length }}
            </div>
            <div 
              class="text-orange-500 dark:text-dark-text-muted transition-all duration-300"
              :class="{ 'text-xs': isScrolled, 'text-sm': !isScrolled }"
            >
              成长里程碑
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Spacer -->
    <div :class="{ 'h-20': isScrolled, 'h-32': !isScrolled }" class="transition-all duration-300"></div>

    <!-- Filter Bar -->
    <div class="container mx-auto px-4 mb-6">
      <div class="bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            @click="activeFilter = 'all'"
            :class="{ 
              'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg': activeFilter === 'all',
              'bg-gray-100 dark:bg-dark-bg-tertiary text-gray-600 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-bg-secondary': activeFilter !== 'all'
            }"
            class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
          >
            全部 ({{ growthMilestones.length }})
          </button>
          <button
            v-for="(config, category) in categoryConfig"
            :key="category"
            @click="activeFilter = category"
            :class="{ 
              'bg-gradient-to-r text-white shadow-lg': activeFilter === category,
              'bg-gray-100 dark:bg-dark-bg-tertiary text-gray-600 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-bg-secondary': activeFilter !== category
            }"
            class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center space-x-1"
            :style="activeFilter === category ? `background: linear-gradient(135deg, ${getCategoryGradient(category)})` : ''"
          >
            <span>{{ config.icon }}</span>
            <span>{{ config.name }} ({{ getMilestonesByCategory(category).length }})</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Timeline Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-orange-400 to-pink-400 rounded-full shadow-lg"></div>
        
        <!-- Timeline Items -->
        <div class="space-y-12">
          <div 
            v-for="(milestone, index) in filteredMilestones" 
            :key="milestone.id"
            class="relative md:min-h-[400px]"
          >
            <!-- Timeline Dot -->
            <div class="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10 top-8">
              <div 
                class="w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold"
                :style="`background: linear-gradient(135deg, ${getCategoryGradient(milestone.category)})`"
              >
                {{ categoryConfig[milestone.category].icon }}
              </div>
            </div>

            <!-- Content Card -->
            <div 
              class="ml-16 group md:absolute md:w-1/2"
              :class="{ 
                'md:left-0 md:pr-8': index % 2 === 0,
                'md:right-0 md:pl-8': index % 2 === 1
              }"
            >
              <div class="bg-white/95 dark:bg-dark-bg-secondary/95 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200/50 dark:border-dark-accent-pink/20 overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 transform group-hover:rotate-1">
                <!-- Photo Gallery -->
                <div v-if="milestone.photos && milestone.photos.length > 0" class="relative">
                  <div 
                    v-if="milestone.photos.length === 1"
                    class="h-48 bg-gradient-to-br from-yellow-200 to-orange-200 dark:from-dark-accent-pink/20 dark:to-dark-accent-purple/20 flex items-center justify-center"
                  >
                    <div class="text-6xl">📸</div>
                  </div>
                  <div v-else class="grid grid-cols-2 gap-1 h-48">
                    <div 
                      v-for="(_, photoIndex) in milestone.photos.slice(0, 4)" 
                      :key="photoIndex"
                      class="bg-gradient-to-br from-yellow-200 to-orange-200 dark:from-dark-accent-pink/20 dark:to-dark-accent-purple/20 flex items-center justify-center"
                      :class="{ 'col-span-2': milestone.photos.length === 3 && photoIndex === 0 }"
                    >
                      <div class="text-2xl">📸</div>
                    </div>
                  </div>
                  <div class="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                    {{ milestone.photos.length }} 张照片
                  </div>
                </div>

                <!-- Card Content -->
                <div class="p-6">
                  <!-- Date and Age -->
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-2">
                      <div 
                        class="px-3 py-1 rounded-full text-white text-sm font-semibold shadow-md"
                        :style="`background: linear-gradient(135deg, ${getCategoryGradient(milestone.category)})`"
                      >
                        {{ milestone.age }}
                      </div>
                      <div class="text-orange-600 dark:text-dark-text-muted text-sm">
                        {{ formatDate(milestone.date) }}
                      </div>
                    </div>
                    <div 
                      v-if="milestone.importance === 'high'"
                      class="text-yellow-400 text-lg animate-pulse"
                    >
                      ⭐
                    </div>
                  </div>

                  <!-- Milestone Title -->
                  <h3 class="text-xl font-bold text-orange-700 dark:text-dark-text-primary mb-3 group-hover:text-orange-600 transition-colors">
                    {{ milestone.milestone }}
                  </h3>

                  <!-- Category Tag -->
                  <div class="flex items-center space-x-2 mb-3">
                    <span class="text-lg">{{ categoryConfig[milestone.category].icon }}</span>
                    <span class="text-sm font-medium text-orange-600 dark:text-dark-accent-purple">
                      {{ categoryConfig[milestone.category].name }}
                    </span>
                  </div>

                  <!-- Description -->
                  <p class="text-gray-700 dark:text-dark-text-secondary mb-4 leading-relaxed">
                    {{ milestone.description }}
                  </p>

                  <!-- Notes -->
                  <div v-if="milestone.notes" class="mb-4">
                    <div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-dark-bg-tertiary dark:to-dark-bg-secondary p-4 rounded-lg border-l-4 border-orange-400">
                      <p class="text-gray-700 dark:text-dark-text-secondary italic">
                        "{{ milestone.notes }}"
                      </p>
                    </div>
                  </div>

                  <!-- Video Link -->
                  <div v-if="milestone.videoLink" class="flex items-center justify-between">
                    <div class="text-sm text-gray-600 dark:text-dark-text-muted flex items-center space-x-2">
                      <span>🎬</span>
                      <span>精彩瞬间</span>
                    </div>
                    <a 
                      :href="milestone.videoLink" 
                      target="_blank"
                      class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                    >
                      <span>观看视频</span>
                      <span>▶️</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(config, category) in categoryConfig" 
          :key="category"
          class="bg-white/90 dark:bg-dark-bg-secondary/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div class="text-4xl mb-3">{{ config.icon }}</div>
          <h3 class="text-lg font-bold text-gray-800 dark:text-dark-text-primary mb-2">
            {{ config.name }}
          </h3>
          <div class="text-2xl font-bold text-orange-600 dark:text-dark-accent-purple mb-1">
            {{ getMilestonesByCategory(category).length }}
          </div>
          <div class="text-sm text-gray-600 dark:text-dark-text-muted">
            个里程碑
          </div>
        </div>
      </div>

      <!-- Celebration Card -->
      <div class="mt-12 bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 dark:from-dark-bg-secondary dark:to-dark-bg-tertiary rounded-2xl p-8 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse"></div>
        <div class="relative z-10">
          <div class="text-6xl mb-4 animate-bounce">🎉</div>
          <h3 class="text-3xl font-bold text-orange-700 dark:text-dark-text-primary mb-3">
            成长的足迹
          </h3>
          <p class="text-lg text-gray-700 dark:text-dark-text-secondary mb-4">
            {{ growthMilestones.length }} 个珍贵的第一次，见证宝宝的精彩成长历程
          </p>
          <div class="flex justify-center space-x-4 text-2xl">
            <span class="animate-pulse">🌟</span>
            <span class="animate-pulse" style="animation-delay: 0.5s">✨</span>
            <span class="animate-pulse" style="animation-delay: 1s">💫</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { growthMilestones, categoryConfig } from '@/data/growth'

const isScrolled = ref(false)
const headerRef = ref<HTMLElement>()
const activeFilter = ref<string>('all')

// 检测移动端
const isMobile = computed(() => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768
  }
  return false
})

// 过滤的里程碑数据
const filteredMilestones = computed(() => {
  if (activeFilter.value === 'all') {
    return growthMilestones
  }
  return growthMilestones.filter(milestone => milestone.category === activeFilter.value)
})

// 按类别获取里程碑
const getMilestonesByCategory = (category: string) => {
  return growthMilestones.filter(milestone => milestone.category === category)
}

// 获取类别渐变色
const getCategoryGradient = (category: string) => {
  const gradients = {
    motor: '#10b981, #059669', // green
    cognitive: '#3b82f6, #1d4ed8', // blue  
    social: '#ec4899, #db2777', // pink
    language: '#8b5cf6, #7c3aed' // purple
  }
  return gradients[category as keyof typeof gradients] || '#f59e0b, #d97706'
}

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 50
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
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
/* 平滑过渡效果 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 时间线动画 */
@keyframes timeline-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(251, 146, 60, 0.3);
  }
  50% { 
    box-shadow: 0 0 30px rgba(251, 146, 60, 0.5);
  }
}

/* 卡片悬停效果 */
.group:hover .transform {
  animation: timeline-glow 2s ease-in-out infinite;
}

/* 平滑缩放和旋转 */
.transform {
  will-change: transform, box-shadow;
}

/* 渐变背景动画 */
@keyframes gentle-pulse {
  0%, 100% { 
    opacity: 0.1;
  }
  50% { 
    opacity: 0.3;
  }
}

.animate-pulse {
  animation: gentle-pulse 2s ease-in-out infinite;
}

/* 弹跳动画 */
@keyframes gentle-bounce {
  0%, 100% { 
    transform: translateY(0);
  }
  50% { 
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: gentle-bounce 2s ease-in-out infinite;
}
</style>
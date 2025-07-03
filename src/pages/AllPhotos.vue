<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 relative overflow-hidden">
    <!-- 导航栏 -->
    <div class="flex items-center justify-between px-8 pt-8 pb-4 relative z-10">
      <router-link 
        to="/" 
        class="flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        返回相册
      </router-link>
      <div class="flex items-center space-x-4">
        <router-link 
          to="/compress" 
          class="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors text-sm"
        >
          图片压缩
        </router-link>
        <router-link 
          to="/ai" 
          class="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors text-sm"
        >
          AI标注
        </router-link>
        <router-link 
          to="/vaccine" 
          class="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors text-sm"
        >
          疫苗记录
        </router-link>
      </div>
    </div>
    
    <!-- 页面标题 -->
    <div class="text-center pt-4 pb-8 relative z-10">
      <h1 class="text-4xl font-bold text-pink-600 dark:text-pink-400 tracking-wide">life-line</h1>
    </div>

    <!-- 装饰元素 -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <!-- 心形装饰 -->
      <div class="absolute top-20 left-10 text-pink-300 dark:text-pink-600 text-2xl animate-pulse">💝</div>
      <div class="absolute top-32 right-16 text-pink-300 dark:text-pink-600 text-xl animate-bounce">🌸</div>
      <div class="absolute bottom-32 left-20 text-purple-300 dark:text-purple-600 text-lg animate-pulse">✨</div>
      <div class="absolute bottom-40 right-32 text-pink-300 dark:text-pink-600 text-2xl animate-bounce">🦋</div>
      <div class="absolute top-40 left-1/3 text-purple-300 dark:text-purple-600 text-xl animate-pulse">🌺</div>
      <div class="absolute bottom-20 left-1/2 text-pink-300 dark:text-pink-600 text-lg animate-bounce">💫</div>
    </div>

    <!-- 走马灯照片墙 -->
    <div class="relative px-8 pb-16">
      <div class="max-w-6xl mx-auto">
        <div 
          class="flex space-x-6 transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }"
        >
          <div 
            v-for="(photo, index) in allPhotos" 
            :key="index"
            class="flex-shrink-0 group cursor-pointer"
            :style="{ width: `${slideWidth}px` }"
            @click="openPhoto(photo)"
          >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div class="aspect-square overflow-hidden rounded-lg mb-3">
                <img 
                  :src="photo.imagePath" 
                  :alt="photo.desc"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div class="text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {{ formatDate(photo.date) }}
                </p>
                <p v-if="photo.desc" class="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
                  {{ photo.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 导航按钮 -->
      <button 
        v-if="canGoPrev"
        @click="goToPrev"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-pink-500 dark:text-pink-400 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <button 
        v-if="canGoNext"
        @click="goToNext"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-pink-500 dark:text-pink-400 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- 照片模态框 -->
    <div 
      v-if="selectedPhoto"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      @click="closePhoto"
    >
      <div class="relative max-w-4xl max-h-full">
        <img 
          :src="selectedPhoto.imagePath" 
          :alt="selectedPhoto.desc"
          class="max-w-full max-h-full object-contain rounded-lg"
          @click.stop
        />
        <button 
          @click="closePhoto"
          class="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { imageData, type ImageDetail } from '@/data'

// 所有照片数据
const allPhotos = computed(() => {
  const photos: ImageDetail[] = []
  imageData.forEach(monthData => {
    photos.push(...monthData.details)
  })
  // 按日期排序
  return photos.sort((a, b) => a.date.localeCompare(b.date))
})

// 走马灯状态
const currentIndex = ref(0)
const slideWidth = ref(280) // 每个照片卡片的宽度
const visibleCount = ref(4) // 可见的照片数量

// 计算导航状态
const canGoPrev = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => currentIndex.value < allPhotos.value.length - visibleCount.value)

// 照片模态框
const selectedPhoto = ref<ImageDetail | null>(null)

// 导航方法
const goToPrev = () => {
  if (canGoPrev.value) {
    currentIndex.value = Math.max(0, currentIndex.value - 1)
  }
}

const goToNext = () => {
  if (canGoNext.value) {
    currentIndex.value = Math.min(allPhotos.value.length - visibleCount.value, currentIndex.value + 1)
  }
}

// 照片操作
const openPhoto = (photo: ImageDetail) => {
  selectedPhoto.value = photo
}

const closePhoto = () => {
  selectedPhoto.value = null
}

// 格式化日期
const formatDate = (dateStr: string) => {
  if (dateStr.length === 8) {
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)
    return `${year}.${month}.${day}`
  }
  return dateStr
}

// 响应式处理
const updateLayout = () => {
  const width = window.innerWidth
  if (width < 640) {
    slideWidth.value = 200
    visibleCount.value = 1
  } else if (width < 1024) {
    slideWidth.value = 240
    visibleCount.value = 2
  } else if (width < 1280) {
    slideWidth.value = 260
    visibleCount.value = 3
  } else {
    slideWidth.value = 280
    visibleCount.value = 4
  }
}

// 键盘导航
const handleKeydown = (e: KeyboardEvent) => {
  if (selectedPhoto.value) {
    if (e.key === 'Escape') {
      closePhoto()
    }
    return
  }
  
  if (e.key === 'ArrowLeft') {
    goToPrev()
  } else if (e.key === 'ArrowRight') {
    goToNext()
  }
}

onMounted(() => {
  updateLayout()
  window.addEventListener('resize', updateLayout)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
  window.removeEventListener('keydown', handleKeydown)
})
</script>
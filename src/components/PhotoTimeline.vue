<template>
    <div class="min-h-screen bg-gradient-to-br from-s-blue-10 to-s-purple-10">
        <div class="container mx-auto px-4 py-8">
            <!-- 标题区域 -->
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-s-purple-500 mb-4">
                    <i class="ri-camera-fill mr-3"></i>
                    Photo Timeline
                </h2>
                <p class="text-xl text-s-gray-70">Your memories since {{ getEarliestYear() }}</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <!-- 左侧时间线 -->
                <div class="lg:col-span-4">
                    <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                        <h2 class="text-2xl font-semibold text-s-gray-90 mb-6 flex items-center">
                            <i class="ri-time-line mr-2"></i>
                            Timeline
                        </h2>
                        <div class="space-y-4 max-h-96 overflow-y-auto">
                            <TimelineItem v-for="month in imageData" :key="month.month" :month="month.month"
                                :count="month.count" :isActive="selectedMonth === month.month"
                                @click="selectMonth(month)" />
                        </div>
                    </div>
                </div>

                <!-- 右侧照片展示区域 -->
                <div class="lg:col-span-8">
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <!-- 当前选中月份的标题 -->
                        <div class="bg-gradient-to-r from-s-blue-60 to-s-purple-60 text-white p-6">
                            <h3 class="text-2xl font-bold">
                                {{ formatMonthTitle(selectedMonth) }}
                            </h3>
                            <p class="text-s-blue-20 mt-2">
                                {{ selectedMonthData?.count || 0 }} photos
                            </p>
                        </div>

                        <!-- 照片网格 -->
                        <div class="p-6">
                            <PhotoGrid v-if="selectedMonthData" :photos="selectedMonthData.details"
                                @photo-click="openPhotoModal" />
                            <div v-else class="text-center py-12">
                                <div class="text-6xl text-s-gray-30 mb-4">
                                    <i class="ri-camera-off-line"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-s-gray-70 mb-2">
                                    Your Photo Journey
                                </h3>
                                <p class="text-s-gray-50">
                                    This is where your memories will be displayed. The slideshow will automatically
                                    start from {{ getEarliestYear() }}.
                                </p>
                                <div class="mt-6">
                                    <button @click="startSlideshow"
                                        class="bg-gradient-to-r from-s-blue-60 to-s-purple-60 text-white px-6 py-3 rounded-xl hover:from-s-blue-70 hover:to-s-purple-70 transition-all duration-300 flex items-center mx-auto">
                                        <i class="ri-play-line mr-2"></i>
                                        Start Slideshow
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Summer Memories 卡片 -->
                    <div class="mt-8 bg-gradient-to-r from-s-rose-40 to-s-rose-50 rounded-2xl shadow-lg p-8 text-white">
                        <h3 class="text-2xl font-bold mb-4 flex items-center">
                            <i class="ri-sun-line mr-3"></i>
                            Summer Memories
                        </h3>
                        <p class="text-rose-100 mb-6">
                            Start your photo journey from {{ getEarliestYear() }}. Click play to begin the slideshow or
                            select a specific month from the timeline.
                        </p>
                        <div class="flex items-center text-rose-100">
                            <i class="ri-calendar-line mr-2"></i>
                            <span>{{ formatDate(getEarliestDate()) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 照片模态框 -->
        <PhotoModal v-if="selectedPhoto" :photo="selectedPhoto" @close="closePhotoModal" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { imageData, type ImageDetail, type MonthData } from '../data'
import PhotoGrid from './PhotoGrid.vue'
import PhotoModal from './PhotoModal.vue'
import TimelineItem from './TimelineItem.vue'

// 响应式数据
const selectedMonth = ref<string>('')
const selectedPhoto = ref<ImageDetail | null>(null)

// 计算属性
const selectedMonthData = computed(() => {
    return imageData.find(month => month.month === selectedMonth.value)
})

// 方法
const selectMonth = (month: MonthData) => {
    selectedMonth.value = month.month
}

const openPhotoModal = (photo: ImageDetail) => {
    selectedPhoto.value = photo
}

const closePhotoModal = () => {
    selectedPhoto.value = null
}

const formatMonthTitle = (monthStr: string) => {
    if (!monthStr) return ''
    const [year, month] = monthStr.split('-')
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return `${monthNames[parseInt(month) - 1]} ${year}`
}

const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)
    return `${month}/${day}/${year}`
}

const getEarliestYear = () => {
    if (imageData.length === 0) return new Date().getFullYear()
    const earliest = imageData.reduce((prev, current) =>
        prev.month < current.month ? prev : current
    )
    return earliest.month.split('-')[0]
}

const getEarliestDate = () => {
    if (imageData.length === 0) return ''
    const earliest = imageData.reduce((prev, current) =>
        prev.month < current.month ? prev : current
    )
    return earliest.details.length > 0 ? earliest.details[0].date : ''
}

const startSlideshow = () => {
    if (imageData.length > 0) {
        const firstMonth = imageData.reduce((prev, current) =>
            prev.month < current.month ? prev : current
        )
        selectMonth(firstMonth)
    }
}

// 生命周期
onMounted(() => {
    // 默认选择最早的月份
    if (imageData.length > 0) {
        const earliest = imageData.reduce((prev, current) =>
            prev.month < current.month ? prev : current
        )
        selectedMonth.value = earliest.month
    }
})
</script>

<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    @apply bg-s-gray-20 rounded-full;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    @apply bg-s-gray-40 rounded-full hover:bg-s-gray-50;
}
</style>
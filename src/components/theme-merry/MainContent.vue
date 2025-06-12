<template>
    <!-- 桌面端主内容区 -->
    <div class="main-content w-[70%] bg-white rounded-r-[20px] p-[30px] flex flex-col relative overflow-hidden md:flex">
        <!-- Decorative Shapes -->
        <div class="decorative-shapes shape-1"></div>
        <div class="decorative-shapes shape-2"></div>
        <div class="decorative-shapes shape-3"></div>

        <!-- Photo Display Area -->
        <div v-if="currentMonthData?.details?.length"
            class="flex-1 bg-gray-100 rounded-[20px] overflow-hidden relative shadow-md mb-1 min-h-[60%] flex items-center justify-center">
            <div class="w-full h-full relative">
                <!-- 主图片展示 -->
                <div class="w-full h-full flex items-center justify-center bg-black rounded-[20px] overflow-hidden">
                    <img :src="currentImage?.imagePath" :alt="currentImage?.desc"
                        class="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out"
                        @error="handleImageError" />
                </div>
            </div>
        </div>
        <div v-else
            class="flex-1 bg-gray-100 rounded-[20px] overflow-hidden relative shadow-md mb-5 min-h-[60%] flex items-center justify-center">
            <div
                class="w-full h-full flex flex-col items-center justify-center text-gray-400 text-center p-5 slide-transition">
                <i class="ri-gallery-line text-6xl mb-4 text-purple-300"></i>
                <h3 class="text-xl mb-2.5 text-gray-500">Your Photo Journey</h3>
                <p class="text-sm max-w-[80%]">This is where your memories will be displayed. The slideshow will
                    automatically start from August 2024.
                </p>
            </div>
        </div>

        <!-- Thumbnail Strip -->
        <div v-if="currentMonthData?.details?.length" class="mb-5">
            <div class="text-sm opacity-80 text-center">
                {{ currentImageIndex + 1 }} / {{ currentMonthData.details.length }}
            </div>
            <div class="flex space-x-2 justify-center overflow-x-auto pb-2 scrollbar-hide">
                <div v-for="(image, index) in currentMonthData.details" :key="image.imagePath"
                    @click="selectImage(index)" :class="[
                        'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2',
                        currentImageIndex === index
                            ? 'border-purple-400 shadow-lg scale-110'
                            : 'border-gray-200 hover:border-purple-300 hover:scale-105'
                    ]">
                    <img :src="image.imagePath" :alt="image.desc" class="w-full h-full object-cover"
                        @error="handleImageError" />
                </div>
            </div>
        </div>

        <!-- Photo Information -->
        <div class="p-4 bg-purple-50 rounded-2xl mb-5 shadow-sm slide-transition">
            <h3 class="text-lg text-purple-600 mb-1">Memories</h3>
            <p class="text-sm text-gray-500">
                <template v-if="currentMonthData">
                    {{ currentImage?.desc }}
                </template>
                <template v-else>
                    Start your photo journey from August 2024. Click play to begin the slideshow or select a specific
                    month from the timeline.
                </template>
            </p>
            <div class="flex items-center mt-2.5 text-xs text-gray-400">
                <i class="ri-time-line mr-1 text-pink-300"></i>
                <span>{{ formatDate(currentImage?.date || '') }}</span>
                <span v-if="isPlaying" class="ml-4 flex items-center">
                    <i class="ri-play-circle-line mr-1 text-green-400"></i>
                    Playing
                </span>
            </div>
        </div>

        <!-- Controls -->
        <div class="flex justify-between items-center">
            <!-- Month Indicator -->
            <div class="flex items-center bg-purple-50 px-5 py-2.5 rounded-full shadow-md">
                <i class="ri-calendar-event-fill text-xl text-pink-300"></i>
                <h2 class="font-sans text-purple-600 text-xl mx-2.5 my-0">{{ currentMonthData?.month }}</h2>
            </div>

            <!-- Playback Controls -->
            <div class="flex items-center">
                <div @click="previousImage" :class="[
                    'last w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center mx-1.5 cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:scale-110',
                    !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
                ]">
                    <i class="ri-skip-back-fill text-2xl text-white"></i>
                </div>
                <div @click="togglePlayback" :class="[
                    'play w-14 h-14 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center mx-1.5 cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:scale-110',
                    !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
                ]">
                    <i :class="isPlaying ? 'ri-pause-fill' : 'ri-play-fill'" class="text-2xl text-white"></i>
                </div>
                <div @click="nextImage" :class="[
                    'next w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center mx-1.5 cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:scale-110',
                    !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
                ]">
                    <i class="ri-skip-forward-fill text-2xl text-white"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- 移动端主内容区 -->
    <div class="main-content-mobile w-full bg-white p-4 flex flex-col relative overflow-hidden flex-1 md:hidden">
        <!-- Photo Display Area - 固定高度 -->
        <div v-if="currentMonthData?.details?.length"
            class="bg-gray-100 rounded-[16px] overflow-hidden relative shadow-md mb-3 h-[300px] sm:h-[350px] flex items-center justify-center">
            <div class="w-full h-full relative">
                <!-- 主图片展示 -->
                <div class="w-full h-full flex items-center justify-center bg-black rounded-[16px] overflow-hidden">
                    <img :src="currentImage?.imagePath" :alt="currentImage?.desc"
                        class="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out"
                        @error="handleImageError" />
                </div>
            </div>
        </div>
        <div v-else
            class="bg-gray-100 rounded-[16px] overflow-hidden relative shadow-md mb-3 h-[300px] sm:h-[350px] flex items-center justify-center">
            <div
                class="w-full h-full flex flex-col items-center justify-center text-gray-400 text-center p-4 slide-transition">
                <i class="ri-gallery-line text-4xl mb-3 text-purple-300"></i>
                <h3 class="text-lg mb-2 text-gray-500">Your Photo Journey</h3>
                <p class="text-xs max-w-[90%] text-center">This is where your memories will be displayed. The slideshow
                    will
                    automatically start from August 2024.
                </p>
            </div>
        </div>

        <!-- Photo Information - 移动端样式 -->
        <div class="p-3 bg-purple-50 rounded-2xl mb-3 shadow-sm slide-transition">
            <div class="flex justify-between items-start mb-2">
                <div class="flex-1">
                    <h3 class="text-base text-purple-600 mb-1">Memories</h3>
                    <p class="text-sm text-gray-500 pr-2">
                        <template v-if="currentMonthData">
                            {{ currentImage?.desc }}
                        </template>
                        <template v-else>
                            Start your photo journey from August 2024.
                        </template>
                    </p>
                </div>
                <!-- Month Indicator - 移动端位置 -->
                <div class="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm ml-2">
                    <i class="ri-calendar-event-fill text-sm text-pink-300"></i>
                    <span class="font-sans text-purple-600 text-sm ml-1">
                        {{ currentMonthData?.month || 'Timeline' }}</span>
                </div>
            </div>
            <div class="flex items-center justify-between text-xs text-gray-400">
                <div class="flex items-center">
                    <i class="ri-time-line mr-1 text-pink-300"></i>
                    <span>{{ formatDate(currentImage?.date || '') }}</span>
                    <span v-if="isPlaying" class="ml-3 flex items-center">
                        <i class="ri-play-circle-line mr-1 text-green-400"></i>
                        Playing
                    </span>
                </div>
                <div v-if="currentMonthData?.details?.length" class="text-xs opacity-80">
                    {{ currentImageIndex + 1 }} / {{ currentMonthData.details.length }}
                </div>
            </div>
        </div>

        <!-- Thumbnail Strip - 移动端样式 -->
        <div v-if="currentMonthData?.details?.length" class="mb-3">
            <div class="flex space-x-2 justify-start overflow-x-auto pb-2 scrollbar-hide px-1">
                <div v-for="(image, index) in currentMonthData.details" :key="image.imagePath"
                    @click="selectImage(index)" :class="[
                        'flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2',
                        currentImageIndex === index
                            ? 'border-purple-400 shadow-lg scale-110'
                            : 'border-gray-200 hover:border-purple-300'
                    ]">
                    <img :src="image.imagePath" :alt="image.desc" class="w-full h-full object-cover"
                        @error="handleImageError" />
                </div>
            </div>
        </div>

        <!-- Controls - 移动端样式 -->
        <div class="flex justify-center items-center gap-2">
            <div @click="previousImage" :class="[
                'w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 ease-in-out active:scale-95',
                !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
            ]">
                <i class="ri-skip-back-fill text-lg text-white"></i>
            </div>
            <div @click="togglePlayback" :class="[
                'w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 ease-in-out active:scale-95',
                !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
            ]">
                <i :class="isPlaying ? 'ri-pause-fill' : 'ri-play-fill'" class="text-xl text-white"></i>
            </div>
            <div @click="nextImage" :class="[
                'w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 ease-in-out active:scale-95',
                !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
            ]">
                <i class="ri-skip-forward-fill text-lg text-white"></i>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSelectedDate } from '@/composable/useSelectedDate';
import { imageData, type ImageDetail } from '@/data';
import { formatDate } from '@/util/date';
import { computed, onUnmounted, ref, watch } from 'vue';

const { selectedDate } = useSelectedDate();

// 响应式状态
const currentImageIndex = ref(0);
const isPlaying = ref(false);
let autoPlayTimer: number | null = null;

// 计算属性
const currentMonthData = computed(() => {
    return imageData.find(month => month.month === selectedDate.value)
});

const currentImage = computed((): ImageDetail | null => {
    const monthData = currentMonthData.value;
    if (!monthData?.details?.length) return null;
    return monthData.details[currentImageIndex.value] || null;
});

// 监听选中的月份变化，重置图片索引
watch(selectedDate, () => {
    currentImageIndex.value = 0;
    stopAutoPlay();
});

// 方法
const selectImage = (index: number) => {
    if (!currentMonthData.value?.details?.length) return;
    currentImageIndex.value = index;
    stopAutoPlay(); // 点击缩略图时停止自动播放
};

const previousImage = () => {
    if (!currentMonthData.value?.details?.length) return;
    stopAutoPlay();
    const totalImages = currentMonthData.value.details.length;
    currentImageIndex.value = currentImageIndex.value === 0 ? totalImages - 1 : currentImageIndex.value - 1;
};

const nextImage = () => {
    if (!currentMonthData.value?.details?.length) return;
    stopAutoPlay();
    const totalImages = currentMonthData.value.details.length;
    currentImageIndex.value = (currentImageIndex.value + 1) % totalImages;
};

const togglePlayback = () => {
    if (!currentMonthData.value?.details?.length) return;

    if (isPlaying.value) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
};

const startAutoPlay = () => {
    if (!currentMonthData.value?.details?.length) return;

    isPlaying.value = true;
    autoPlayTimer = setInterval(() => {
        const totalImages = currentMonthData.value!.details.length;
        currentImageIndex.value = (currentImageIndex.value + 1) % totalImages;
    }, 1000); // 每3秒切换一张图片
};

const stopAutoPlay = () => {
    isPlaying.value = false;
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
};

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTQwQzExNi41NjkgMTQwIDEzMCAxMjYuNTY5IDEzMCAxMTBDMTMwIDkzLjQzMTUgMTE2LjU2OSA4MCAxMDAgODBDODMuNDMxNSA4MCA3MCA5My40MzE1IDcwIDExMEM3MCAxMjYuNTY5IDgzLjQzMTUgMTQwIDEwMCAxNDBaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWMTQwSDYwVjYwWiIgc3Ryb2tlPSIjOUI5QkEzIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPC9zdmc+Cg==';
};

// 组件卸载时清理定时器
onUnmounted(() => {
    stopAutoPlay();
});
</script>

<style scoped>
/* 隐藏滚动条但保持滚动功能 */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* 平滑过渡动画 */
.slide-transition {
    transition: all 0.3s ease-in-out;
}

/* 如果需要保留装饰性形状的样式，可以在这里添加 */
</style>
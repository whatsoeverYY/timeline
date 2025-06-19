<template>
    <!-- 桌面端主内容区 -->
    <div class="main-content w-[70%] bg-white rounded-r-[20px] p-[30px] flex flex-col relative overflow-hidden md:flex">
        <!-- Photo Display Area -->
        <div v-if="currentMonthData?.details?.length"
            class="flex-1 bg-white rounded-[20px] overflow-hidden relative shadow-lg mb-4 min-h-[60%] flex items-center justify-center border-2 border-blue-100">
            <div class="w-full h-full relative">
                <!-- 主图片展示 -->
                <div class="w-full h-full flex items-center justify-center bg-gray-50 rounded-[18px] overflow-hidden">
                    <img :src="currentImage?.imagePath" :alt="currentImage?.desc"
                        class="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out"
                        @error="handleImageError" />
                </div>
            </div>
        </div>
        <div v-else
            class="flex-1 bg-white rounded-[20px] overflow-hidden relative shadow-lg mb-4 min-h-[60%] flex items-center justify-center border-2 border-blue-100">
            <div class="w-full h-full flex flex-col items-center justify-center text-gray-400 text-center p-5 slide-transition">
                <div class="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <i class="ri-image-line text-3xl text-blue-400"></i>
                </div>
                <h3 class="text-xl mb-2.5 text-gray-600">照片加载中...</h3>
                <p class="text-sm max-w-[80%] text-gray-500">这里将显示您的珍贵回忆</p>
            </div>
        </div>

        <!-- Photo Information -->
        <div class="p-5 bg-blue-50 rounded-2xl mb-4 shadow-sm slide-transition border border-blue-100">
            <h3 class="text-lg text-blue-600 mb-2 font-bold">{{ currentMonthData?.month || '时间线' }}</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
                <template v-if="currentMonthData">
                    {{ getDescription(currentImage) }}
                </template>
                <template v-else>
                    欢迎来到我的照片时间线，这里记录着美好的回忆
                </template>
            </p>
            <div class="flex items-center justify-between mt-3">
                <div class="flex items-center text-xs text-gray-500">
                    <i class="ri-time-line mr-1 text-blue-400"></i>
                    <span>{{ formatDate(currentImage?.date || '') }}</span>
                    <span v-if="isPlaying" class="ml-4 flex items-center text-green-600">
                        <i class="ri-play-circle-line mr-1"></i>
                        播放中
                    </span>
                </div>
                <div v-if="currentMonthData?.details?.length" class="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {{ currentImageIndex + 1 }} / {{ currentMonthData.details.length }}
                </div>
            </div>
        </div>

        <!-- Thumbnail Strip -->
        <div v-if="currentMonthData?.details?.length" class="mb-4">
            <div class="flex space-x-2 justify-center overflow-x-auto pb-2 scrollbar-hide">
                <div v-for="(image, index) in currentMonthData.details" :key="image.imagePath"
                    @click="selectImage(index)" :class="[
                        'flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 shadow-sm',
                        currentImageIndex === index
                            ? 'border-blue-400 shadow-lg scale-110 shadow-blue-200'
                            : 'border-gray-200 hover:border-blue-300 hover:scale-105'
                    ]">
                    <img :src="image.imagePath" :alt="image.desc" class="w-full h-full object-cover"
                        @error="handleImageError" />
                </div>
            </div>
        </div>

        <!-- Controls -->
        <div class="flex justify-center items-center">
            <!-- Playback Controls -->
            <div class="flex items-center bg-white rounded-full shadow-lg p-2 border border-blue-100">
                <div @click="previousImage" :class="[
                    'w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center mx-1 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105',
                    !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
                ]">
                    <i class="ri-skip-back-fill text-xl text-blue-600"></i>
                </div>
                <div @click="togglePlayback" :class="[
                    'w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center mx-2 cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:scale-105',
                    !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
                ]">
                    <i :class="isPlaying ? 'ri-pause-fill' : 'ri-play-fill'" class="text-2xl text-white"></i>
                </div>
                <div @click="nextImage" :class="[
                    'w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center mx-1 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105',
                    !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
                ]">
                    <i class="ri-skip-forward-fill text-xl text-blue-600"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- 移动端主内容区 -->
    <div class="main-content-mobile w-full bg-white p-4 flex flex-col relative overflow-hidden flex-1 md:hidden">
        <!-- Photo Display Area - 固定高度 -->
        <div v-if="currentMonthData?.details?.length"
            class="bg-white rounded-[16px] overflow-hidden relative shadow-lg mb-3 h-[300px] sm:h-[350px] flex items-center justify-center border-2 border-blue-100">
            <div class="w-full h-full relative">
                <!-- 主图片展示 -->
                <div class="w-full h-full flex items-center justify-center bg-gray-50 rounded-[14px] overflow-hidden">
                    <img :src="currentImage?.imagePath" :alt="currentImage?.desc"
                        class="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out"
                        @error="handleImageError" />
                </div>
            </div>
        </div>
        <div v-else
            class="bg-white rounded-[16px] overflow-hidden relative shadow-lg mb-3 h-[300px] sm:h-[350px] flex items-center justify-center border-2 border-blue-100">
            <div class="w-full h-full flex flex-col items-center justify-center text-gray-400 text-center p-4 slide-transition">
                <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <i class="ri-image-line text-2xl text-blue-400"></i>
                </div>
                <h3 class="text-lg mb-2 text-gray-600">照片加载中...</h3>
                <p class="text-xs max-w-[90%] text-center text-gray-500">这里将显示您的珍贵回忆</p>
            </div>
        </div>

        <!-- Photo Information - 移动端样式 -->
        <div class="p-3 bg-blue-50 rounded-2xl mb-3 shadow-sm slide-transition border border-blue-100">
            <div class="flex justify-between items-start mb-2">
                <div class="flex-1">
                    <h3 class="text-base text-blue-600 mb-1 font-bold">{{ currentMonthData?.month || '时间线' }}</h3>
                    <p class="text-sm text-gray-600 pr-2 leading-relaxed">
                        <template v-if="currentMonthData">
                            {{ getDescription(currentImage) }}
                        </template>
                        <template v-else>
                            欢迎来到我的照片时间线
                        </template>
                    </p>
                </div>
                <div v-if="currentMonthData?.details?.length" class="flex items-center bg-blue-100 px-3 py-1.5 rounded-full shadow-sm ml-2">
                    <span class="text-blue-600 text-sm font-medium">
                        {{ currentImageIndex + 1 }} / {{ currentMonthData.details.length }}
                    </span>
                </div>
            </div>
            <div class="flex items-center text-xs text-gray-500">
                <i class="ri-time-line mr-1 text-blue-400"></i>
                <span>{{ formatDate(currentImage?.date || '') }}</span>
                <span v-if="isPlaying" class="ml-3 flex items-center text-green-600">
                    <i class="ri-play-circle-line mr-1"></i>
                    播放中
                </span>
            </div>
        </div>

        <!-- Thumbnail Strip - 移动端样式 -->
        <div v-if="currentMonthData?.details?.length" class="mb-3">
            <div class="flex space-x-2 justify-start overflow-x-auto pb-2 scrollbar-hide px-1">
                <div v-for="(image, index) in currentMonthData.details" :key="image.imagePath"
                    @click="selectImage(index)" :class="[
                        'flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2',
                        currentImageIndex === index
                            ? 'border-blue-400 shadow-lg scale-110 shadow-blue-200'
                            : 'border-gray-200 hover:border-blue-300'
                    ]">
                    <img :src="image.imagePath" :alt="image.desc" class="w-full h-full object-cover"
                        @error="handleImageError" />
                </div>
            </div>
        </div>

        <!-- Controls - 移动端样式 -->
        <div class="flex justify-center items-center">
            <div class="flex items-center bg-white rounded-full shadow-lg p-2 border border-blue-100">
                <div @click="previousImage" :class="[
                    'w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out active:scale-95',
                    !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
                ]">
                    <i class="ri-skip-back-fill text-lg text-blue-600"></i>
                </div>
                <div @click="togglePlayback" :class="[
                    'w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center mx-2 cursor-pointer shadow-lg transition-all duration-300 ease-in-out active:scale-95',
                    !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
                ]">
                    <i :class="isPlaying ? 'ri-pause-fill' : 'ri-play-fill'" class="text-xl text-white"></i>
                </div>
                <div @click="nextImage" :class="[
                    'w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out active:scale-95',
                    !currentMonthData?.details?.length && 'opacity-50 cursor-not-allowed'
                ]">
                    <i class="ri-skip-forward-fill text-lg text-blue-600"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSelectedDate } from '@/composables/useSelectedDate';
import { descriptions } from '@/constants/descriptions';
import { imageData, type ImageDetail } from '@/data';
import { formatDate } from '@/utils/date';
import { computed, onUnmounted, ref, watch } from 'vue';

const { selectedDate } = useSelectedDate();

const currentImageIndex = ref(0);
const isPlaying = ref(false);
let autoPlayTimer: number | null = null;

const currentMonthData = computed(() => {
    return imageData.find(month => month.month === selectedDate.value)
});

const currentImage = computed((): ImageDetail | null => {
    const monthData = currentMonthData.value;
    if (!monthData?.details?.length) return null;
    return monthData.details[currentImageIndex.value] || null;
});

const getDescription = (currentImage: ImageDetail | null) => {
    if (!currentImage) return '';
    const description = descriptions.find(desc => desc.id === currentImage.imagePath);
    return description?.desc || '';
}

watch(selectedDate, () => {
    currentImageIndex.value = 0;
    stopAutoPlay();
});

const selectImage = (index: number) => {
    if (!currentMonthData.value?.details?.length) return;
    currentImageIndex.value = index;
    stopAutoPlay();
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
    }, 1000);
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

onUnmounted(() => {
    stopAutoPlay();
});
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.slide-transition {
    transition: all 0.3s ease-in-out;
}
</style>
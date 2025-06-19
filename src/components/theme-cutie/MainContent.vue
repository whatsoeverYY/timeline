<template>
    <!-- Desktop Layout -->
    <div class="hidden lg:block h-full">
        <div class="bg-white rounded-3xl shadow-2xl p-6 h-full flex flex-col border-4 border-blue-200 overflow-auto">
            <!-- Main Photo Card -->
            <div class="flex-1 mb-4 relative">
                <div v-if="currentMonthData?.details?.length" 
                    class="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-6 h-full flex flex-col border-4 border-blue-300 shadow-xl relative overflow-hidden">
                    
                    <!-- Decorative elements -->
                    <div class="absolute top-4 left-4 text-2xl animate-bounce">❤️</div>
                    <div class="absolute top-4 right-4 text-xl animate-pulse">⭐</div>
                    
                    <!-- Photo display area -->
                    <div class="flex-1 bg-white rounded-2xl overflow-hidden shadow-lg border-3 border-gray-200 flex items-center justify-center mb-4">
                        <img :src="currentImage?.imagePath" :alt="currentImage?.desc"
                            class="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out"
                            @error="handleImageError" />
                    </div>

                    <!-- Photo info -->
                    <div class="bg-white rounded-2xl p-4 border-3 border-purple-200 shadow-md">
                        <div class="flex items-center mb-2">
                            <span class="text-lg mr-2">💝</span>
                            <h3 class="text-lg font-bold text-purple-600">Memories</h3>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">
                            {{ getDescription(currentImage) || 'Beautiful memories captured in time!' }}
                        </p>
                        <div class="flex items-center justify-between text-xs text-gray-500">
                            <div class="flex items-center">
                                <span class="mr-1">⏰</span>
                                <span>{{ formatDate(currentImage?.date || '') }}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="mr-1">📷</span>
                                <span>{{ currentImageIndex + 1 }} / {{ currentMonthData.details.length }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty state -->
                <div v-else 
                    class="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 h-full flex flex-col items-center justify-center border-4 border-purple-300 shadow-xl">
                    <div class="text-6xl mb-4 animate-bounce">🌈</div>
                    <h3 class="text-2xl font-bold text-purple-600 mb-2">Your Photo Journey</h3>
                    <p class="text-gray-600 text-center max-w-md">
                        This is where your magical memories will be displayed. Start your slideshow adventure! ✨
                    </p>
                </div>
            </div>

            <!-- Controls and thumbnails -->
            <div v-if="currentMonthData?.details?.length" class="space-y-4">
                <!-- Thumbnail strip -->
                <div class="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-3 border-3 border-pink-200">
                    <div class="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
                        <div v-for="(image, index) in currentMonthData.details" :key="image.imagePath"
                            @click="selectImage(index)" 
                            :class="[
                                'flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-3',
                                currentImageIndex === index
                                    ? 'border-pink-400 shadow-lg scale-110 ring-2 ring-pink-300'
                                    : 'border-gray-200 hover:border-pink-300 hover:scale-105'
                            ]">
                            <img :src="image.imagePath" :alt="image.desc" 
                                class="w-full h-full object-cover"
                                @error="handleImageError" />
                        </div>
                    </div>
                </div>

                <!-- Playback controls -->
                <div class="flex justify-center items-center gap-4">
                    <button @click="previousImage" 
                        class="w-12 h-12 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full shadow-lg border-3 border-blue-400 flex items-center justify-center text-white text-xl hover:scale-110 transition-all duration-300 active:scale-95">
                        ⏮️
                    </button>
                    
                    <button @click="togglePlayback" 
                        class="w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full shadow-xl border-3 border-pink-400 flex items-center justify-center text-white text-2xl hover:scale-110 transition-all duration-300 active:scale-95 relative">
                        <span v-if="isPlaying">⏸️</span>
                        <span v-else>▶️</span>
                        <div v-if="isPlaying" class="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </button>
                    
                    <button @click="nextImage" 
                        class="w-12 h-12 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full shadow-lg border-3 border-blue-400 flex items-center justify-center text-white text-xl hover:scale-110 transition-all duration-300 active:scale-95">
                        ⏭️
                    </button>
                </div>

                <!-- Playing indicator -->
                <div v-if="isPlaying" class="text-center">
                    <div class="inline-flex items-center bg-green-100 px-4 py-2 rounded-full border-2 border-green-300">
                        <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        <span class="text-sm font-medium text-green-700">Playing slideshow ✨</span>
                    </div>
                </div>

                <!-- Resume button (matching the design) -->
                <div class="text-center">
                    <button @click="startAutoPlay" 
                        class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full font-bold shadow-lg border-3 border-pink-500 hover:scale-105 transition-all duration-300 active:scale-95">
                        🎬 Resume Slideshow
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile Layout -->
    <div class="lg:hidden flex-1">
        <div class="bg-white rounded-3xl shadow-xl p-4 h-full flex flex-col border-4 border-blue-200 overflow-hidden">
            <!-- Header -->
            <div class="text-center mb-3">
                <div class="inline-flex items-center bg-gradient-to-r from-orange-200 to-pink-200 px-4 py-2 rounded-full shadow-md border-2 border-orange-300">
                    <span class="text-lg mr-1">📅</span>
                    <h1 class="text-sm font-bold text-gray-700">
                        {{ currentMonthData?.month || 'GALLERY' }}
                    </h1>
                </div>
            </div>

            <!-- Photo Card -->
            <div class="flex-1 mb-3">
                <div v-if="currentMonthData?.details?.length" 
                    class="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-4 h-full flex flex-col border-3 border-blue-300 shadow-lg relative">
                    
                    <div class="absolute top-2 left-2 text-lg">❤️</div>
                    <div class="absolute top-2 right-2 text-sm">⭐</div>
                    
                    <!-- Photo -->
                    <div class="flex-1 bg-white rounded-xl overflow-hidden shadow-md border-2 border-gray-200 flex items-center justify-center mb-3 min-h-[200px]">
                        <img :src="currentImage?.imagePath" :alt="currentImage?.desc"
                            class="max-w-full max-h-full object-contain"
                            @error="handleImageError" />
                    </div>

                    <!-- Info -->
                    <div class="bg-white rounded-xl p-3 border-2 border-purple-200">
                        <div class="flex items-center mb-1">
                            <span class="text-sm mr-1">💝</span>
                            <h3 class="text-sm font-bold text-purple-600">Memories</h3>
                        </div>
                        <p class="text-xs text-gray-600 mb-2 line-clamp-2">
                            {{ getDescription(currentImage) || 'Beautiful memories!' }}
                        </p>
                        <div class="flex items-center justify-between text-xs text-gray-500">
                            <span>{{ formatDate(currentImage?.date || '') }}</span>
                            <span>{{ currentImageIndex + 1 }} / {{ currentMonthData.details.length }}</span>
                        </div>
                    </div>
                </div>

                <div v-else 
                    class="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 h-full flex flex-col items-center justify-center border-3 border-purple-300">
                    <div class="text-4xl mb-2">🌈</div>
                    <h3 class="text-lg font-bold text-purple-600 mb-1">Photo Journey</h3>
                    <p class="text-xs text-gray-600 text-center">Your magical memories await! ✨</p>
                </div>
            </div>

            <!-- Controls -->
            <div v-if="currentMonthData?.details?.length" class="space-y-3">
                <!-- Thumbnails -->
                <div class="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-2 border-2 border-pink-200">
                    <div class="flex space-x-1 overflow-x-auto scrollbar-hide">
                        <div v-for="(image, index) in currentMonthData.details" :key="image.imagePath"
                            @click="selectImage(index)"
                            :class="[
                                'flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2',
                                currentImageIndex === index
                                    ? 'border-pink-400 scale-110'
                                    : 'border-gray-200'
                            ]">
                            <img :src="image.imagePath" :alt="image.desc" 
                                class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                <!-- Play controls -->
                <div class="flex justify-center items-center gap-3">
                    <button @click="previousImage" 
                        class="w-10 h-10 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full shadow-md border-2 border-blue-400 flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                        ⏮️
                    </button>
                    <button @click="togglePlayback" 
                        class="w-12 h-12 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full shadow-lg border-2 border-pink-400 flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                        <span v-if="isPlaying">⏸️</span>
                        <span v-else>▶️</span>
                    </button>
                    <button @click="nextImage" 
                        class="w-10 h-10 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full shadow-md border-2 border-blue-400 flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                        ⏭️
                    </button>
                </div>

                <!-- Resume button -->
                <div class="text-center">
                    <button @click="startAutoPlay" 
                        class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md border-2 border-pink-500 hover:scale-105 transition-all duration-300">
                        🎬 Resume Slideshow
                    </button>
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
    }, 3000);
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

.border-3 {
    border-width: 3px;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
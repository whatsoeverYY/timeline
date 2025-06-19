<template>
    <!-- Desktop Sidebar -->
    <div class="hidden lg:block h-full">
        <div class="bg-white rounded-3xl shadow-2xl p-6 h-full overflow-y-auto border-4 border-pink-200">
            <!-- Header -->
            <div class="text-center mb-6">
                <div class="text-4xl mb-2">🌸</div>
                <h2 class="text-2xl font-bold text-purple-600 mb-1">Photo Gallery</h2>
                <p class="text-sm text-gray-500">Your magical memories ✨</p>
            </div>

            <!-- Month Timeline -->
            <div class="space-y-3">
                <div v-for="data in imageData" :key="data.month" 
                    @click="setSelectedDate(data.month)"
                    class="cursor-pointer transition-all duration-300 hover:scale-105"
                >
                    <div class="relative">
                        <!-- Month Card -->
                        <div :class="[
                            'p-4 rounded-2xl border-3 transition-all duration-300',
                            data.month === selectedDate 
                                ? 'bg-gradient-to-br from-pink-100 to-purple-100 border-pink-300 shadow-lg scale-105' 
                                : 'bg-white border-gray-200 hover:border-pink-200 hover:shadow-md'
                        ]">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <div :class="[
                                        'w-8 h-8 rounded-full border-3 flex items-center justify-center text-sm mr-3',
                                        data.month === selectedDate 
                                            ? 'bg-pink-300 border-pink-400 text-white' 
                                            : 'bg-gray-100 border-gray-300 text-gray-500'
                                    ]">
                                        📅
                                    </div>
                                    <div>
                                        <h3 :class="[
                                            'font-bold text-sm',
                                            data.month === selectedDate ? 'text-purple-600' : 'text-gray-600'
                                        ]">
                                            {{ data.month }}
                                        </h3>
                                        <div class="flex items-center text-xs text-gray-500 mt-1">
                                            <span class="mr-1">📷</span>
                                            <span>{{ data.count }} photos</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Cute icon indicator -->
                                <div v-if="data.month === selectedDate" class="text-lg animate-bounce">
                                    💖
                                </div>
                            </div>
                        </div>
                        
                        <!-- Connecting line -->
                        <div v-if="imageData.indexOf(data) < imageData.length - 1" 
                            class="absolute left-6 top-full h-3 w-0.5 bg-pink-200">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile Header -->
    <div class="lg:hidden">
        <div class="bg-white rounded-3xl shadow-xl p-4 border-4 border-pink-200">
            <!-- Header -->
            <div class="text-center mb-4">
                <div class="flex items-center justify-center gap-2 mb-2">
                    <span class="text-2xl">🌸</span>
                    <h2 class="text-xl font-bold text-purple-600">Photo Gallery</h2>
                    <span class="text-2xl">⭐</span>
                </div>
                <p class="text-xs text-gray-500">Your magical memories since August 2024</p>
            </div>

            <!-- Horizontal Month Scroll -->
            <div class="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
                <div v-for="data in imageData" :key="data.month" 
                    @click="setSelectedDate(data.month)"
                    class="flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105"
                >
                    <div :class="[
                        'p-3 rounded-2xl border-3 min-w-[120px] transition-all duration-300',
                        data.month === selectedDate 
                            ? 'bg-gradient-to-br from-pink-100 to-purple-100 border-pink-300 shadow-lg scale-105' 
                            : 'bg-white border-gray-200'
                    ]">
                        <div class="text-center">
                            <div class="text-lg mb-1">
                                {{ data.month === selectedDate ? '💖' : '📅' }}
                            </div>
                            <h3 :class="[
                                'font-bold text-xs mb-1',
                                data.month === selectedDate ? 'text-purple-600' : 'text-gray-600'
                            ]">
                                {{ data.month }}
                            </h3>
                            <div class="flex items-center justify-center text-xs text-gray-500">
                                <span class="mr-1">📷</span>
                                <span>{{ data.count }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSelectedDate } from '@/composables/useSelectedDate';
import imageData from '@/data';

const { selectedDate, setSelectedDate } = useSelectedDate();
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
</style>
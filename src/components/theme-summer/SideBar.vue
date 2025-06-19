<template>
    <!-- 桌面端侧边栏：垂直布局 -->
    <div class="sidebar w-[30%] bg-white rounded-l-2xl p-6 overflow-y-auto shadow-lg relative hidden md:block">
        <div class="text-center mb-8">
            <h2 class="text-blue-600 text-2xl font-bold">时间线</h2>
            <p class="text-gray-600 text-sm mt-2">我的照片时间线口25年6月</p>
        </div>

        <div class="relative before:content-[''] before:absolute before:left-5 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-yellow-400 before:via-blue-400 before:to-green-400 before:rounded-full">
            <MonthItem v-for="data in imageData" :key="data.month" :month="data.month" :count="data.count"
                :isActive="data.month === selectedDate" @click="setSelectedDate(data.month)" />
        </div>

        <!-- 底部版权信息 -->
        <div class="absolute bottom-4 left-4 right-4">
            <p class="text-xs text-gray-500 text-center">© 2025 我的照片时间线 版权所有</p>
        </div>
    </div>

    <!-- 移动端时间线：水平滚动布局 -->
    <div class="sidebar-mobile w-full bg-white p-4 shadow-lg block md:hidden">
        <div class="text-center mb-4">
            <h2 class="text-blue-600 text-lg font-bold">时间线</h2>
            <p class="text-gray-600 text-xs">我的照片时间线口25年6月</p>
        </div>

        <div class="flex overflow-x-auto pb-2 scrollbar-hide gap-3">
            <div v-for="data in imageData" :key="data.month" @click="setSelectedDate(data.month)"
                class="flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
                <div class="rounded-xl p-3 shadow-md transition-all duration-300 min-w-[120px]"
                    :class="data.month === selectedDate ? 'bg-blue-100 shadow-lg border-2 border-blue-400' : 'bg-gray-50'">
                    <div class="flex flex-col items-center">
                        <div class="w-4 h-4 rounded-full mb-2 flex items-center justify-center"
                            :class="data.month === selectedDate ? 'bg-blue-500 text-white' : 'bg-gray-300'">
                            <div class="w-2 h-2 rounded-full bg-current"></div>
                        </div>
                        <h3 class="text-sm font-bold text-center leading-tight"
                            :class="data.month === selectedDate ? 'text-blue-600' : 'text-gray-600'">
                            {{ data.month }}
                        </h3>
                        <div class="flex items-center mt-1">
                            <i class="ri-image-line mr-1 text-xs" :class="data.month === selectedDate ? 'text-blue-500' : 'text-gray-400'"></i>
                            <span class="text-xs text-gray-500">{{ data.count }}</span>
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
import MonthItem from './MonthItem.vue';

const { selectedDate, setSelectedDate } = useSelectedDate()
</script>

<style>
.sidebar::-webkit-scrollbar {
    @apply w-[6px];
}

.sidebar::-webkit-scrollbar-thumb {
    @apply bg-blue-300 rounded-lg;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
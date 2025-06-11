<template>
    <!-- 桌面端侧边栏：垂直布局 -->
    <div
        class="sidebar w-[30%] bg-gradient-to-br from-tm-pink-20 to-tm-blue-20 rounded-l-2xl p-4 overflow-y-auto shadow-lg relative hidden md:block">
        <div class="text-center mb-8">
            <h2 class="text-tm-purple-500 text-2xl">Photo Timeline</h2>
            <p class="text-tm-gray-80 text-sm">Your memories since August 2024</p>
        </div>

        <div
            class="relative before:content-[''] before:absolute before:left-5 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-tm-pink-40 before:via-cyan-200 before:to-tm-blue-40 before:rounded-full">
            <!-- August 2024 -->
            <MonthItem v-for="data in imageData" :key="data.month" :month="data.month" :count="data.count"
                :isActive="data.month === selectedDate" @click="setSelectedDate(data.month)" />
        </div>
    </div>

    <!-- 移动端时间线：水平滚动布局 -->
    <div class="sidebar-mobile w-full bg-gradient-to-r from-tm-pink-20 to-tm-blue-20 p-4 shadow-lg block md:hidden">
        <div class="text-center mb-4">
            <h2 class="text-tm-purple-500 text-lg">Photo Timeline</h2>
            <p class="text-tm-gray-80 text-xs">Your memories since August 2024</p>
        </div>

        <div class="flex overflow-x-auto pb-2 scrollbar-hide gap-3">
            <div v-for="data in imageData" :key="data.month" @click="setSelectedDate(data.month)"
                class="flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
                <div class="rounded-xl p-3 shadow-md transition-all duration-300 min-w-[120px]"
                    :class="data.month === selectedDate ? 'bg-gradient-to-r from-tm-pink-40 to-tm-blue-40 shadow-lg' : 'bg-white'">
                    <div class="flex flex-col items-center">
                        <div class="w-3 h-3 rounded-full border-2 border-tm-pink-50 mb-2"
                            :class="data.month === selectedDate ? 'bg-pink-300 shadow-lg' : 'bg-white'"></div>
                        <h3 class="text-sm font-bold text-center leading-tight"
                            :class="data.month === selectedDate ? 'text-tm-purple-500' : 'text-tm-gray-40'">
                            {{ data.month }}
                        </h3>
                        <div class="flex items-center text-gray-600 mt-1">
                            <i class="ri-image-line mr-1 text-xs text-tm-pink-50"></i>
                            <span class="text-xs">{{ data.count }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSelectedDate } from '@/composable/useSelectedDate';
import imageData from '@/data';
import MonthItem from './MonthItem.vue';

const { selectedDate, setSelectedDate } = useSelectedDate()
</script>

<style>
/* Tailwind doesn't handle webkit scrollbar styles, keeping these custom styles */
.sidebar::-webkit-scrollbar {
    @apply w-[6px];
}

.sidebar::-webkit-scrollbar-thumb {
    @apply bg-tm-pink-50 rounded-lg;
}

/* 移动端滚动条隐藏 */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
<template>
    <div
        class="sidebar w-[30%] bg-gradient-to-br from-tm-pink-20 to-tm-blue-20 rounded-l-2xl p-4 overflow-y-auto shadow-lg relative">
        <div class="text-center mb-8">
            <h2 class="text-tm-purple-500 text-2xl">Photo Timeline</h2>
            <p class="text-tm-gray-80 text-sm">Your memories since August 2024</p>
        </div>

        <div
            class="relative before:content-[''] before:absolute before:left-5 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-tm-pink-40 before:via-cyan-200 before:to-tm-blue-40 before:rounded-full">
            <!-- August 2024 -->
            <MonthItem v-for="data in imageData" :key="data.month" :month="data.month" :count="data.count"
                :isActive="data.month === currentActive" />

        </div>
    </div>
</template>

<script setup lang="ts">
import imageData from '@/data';
import { ref } from 'vue';
import MonthItem from './MonthItem.vue';


const currentActive = ref(imageData[0].month)
</script>

<style>
/* Tailwind doesn't handle webkit scrollbar styles, keeping these custom styles */
.sidebar::-webkit-scrollbar {
    @apply w-[6px];
}

.sidebar::-webkit-scrollbar-thumb {
    @apply bg-tm-pink-50 rounded-lg;
}
</style>
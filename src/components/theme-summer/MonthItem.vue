<template>
    <div class="relative pl-12 mb-6 cursor-pointer transition-all duration-300 ease-in-out hover:translate-x-1">
        <div class="absolute left-3.5 top-4 w-4 h-4 rounded-full border-2 border-blue-400 z-10 transition-all duration-300"
            :class="isActive ? 'bg-blue-500 scale-110 shadow-lg shadow-blue-400/50' : 'bg-white'"></div>
        <div class="rounded-2xl p-4 shadow-[0px_5px_15px_rgba(0,0,0,0.05)] transition-all duration-300"
            :class="isActive ? 'bg-blue-100 -translate-y-1 shadow-[0px_8px_20px_rgba(0,0,0,0.1)] border-2 border-blue-400' : 'bg-white'">
            <div class="flex items-center mb-1">
                <i :class="[getMonthIcon(month), 'mr-2 text-lg leading-5', isActive ? 'text-blue-600' : 'text-gray-500']"></i>
                <h3 class="text-base font-bold" :class="isActive ? 'text-blue-600' : 'text-gray-700'">{{ month }}</h3>
            </div>
            <div class="flex items-center text-gray-600">
                <i class="ri-image-line mr-2 text-xs" :class="isActive ? 'text-blue-500' : 'text-gray-400'"></i>
                <span class="text-xs text-gray-600">{{ count }} photos</span>
            </div>
        </div>
        <div class="absolute left-[26px] -bottom-[15px] text-blue-300">
            <i class="ri-sun-line text-xs"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    month: string
    count: number
    isActive?: boolean
}

withDefaults(defineProps<Props>(), {
    isActive: false
})

function getMonthIcon(month: string): string {
    if (month.includes('6月')) return 'ri-sun-line'
    if (month.includes('5月')) return 'ri-plant-line'
    if (month.includes('4月')) return 'ri-seedling-line'
    return 'ri-calendar-2-line'
}
</script>
<template>
    <div class="relative pl-12 mb-6 cursor-pointer transition-all duration-300 ease-in-out hover:translate-x-1">
        <div class="absolute left-3.5 top-4 w-4 h-4 rounded-full border-2 border-tm-pink-50 z-10 transition-all duration-300"
            :class="isActive ? 'bg-pink-300 scale-110 shadow-lg shadow-tm-pink-50/50' : 'bg-white'"></div>
        <div class="rounded-2xl p-4 shadow-[0px_5px_15px_rgba(0,0,0,0.05)] transition-all duration-300"
            :class="isActive ? 'bg-gradient-to-r from-tm-pink-40 to-tm-blue-40 -translate-y-1 shadow-[0px_8px_20px_rgba(0,0,0,0.1)]' : 'bg-white'">
            <div class="flex items-center mb-1">
                <i class="ri-calendar-2-line mr-2 text-lg leading-5 text-tm-purple-500"></i>
                <h3 class="text-base font-bold" :class="isActive ? 'text-tm-purple-500' : 'text-tm-gray-40'">{{ month }}
                </h3>
            </div>
            <div class="flex items-center text-gray-600">
                <i class="ri-image-line mr-2 text-xs text-tm-pink-50"></i>
                <span class="text-xs">{{ count }} photos</span>
            </div>
        </div>
        <div class="absolute left-[26px] -bottom-[15px] text-tm-purple-100">
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
</script>
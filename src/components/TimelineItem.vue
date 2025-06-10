<template>
    <div @click="$emit('click')" class="cursor-pointer transition-all duration-300 transform hover:scale-105" :class="[
        'p-4 rounded-xl border-2 flex items-center justify-between',
        isActive
            ? 'bg-gradient-to-r from-s-blue-50 to-s-purple-50 border-s-blue-60 shadow-lg'
            : 'bg-white border-s-gray-20 hover:border-s-blue-40 hover:bg-s-blue-10'
    ]">
        <div class="flex items-center space-x-3">
            <div class="w-3 h-3 rounded-full" :class="isActive ? 'bg-s-blue-60' : 'bg-s-gray-40'"></div>
            <div>
                <h4 class="font-semibold" :class="isActive ? 'text-s-blue-90' : 'text-s-gray-80'">
                    {{ formatMonth(month) }}
                </h4>
                <p class="text-sm" :class="isActive ? 'text-s-blue-70' : 'text-s-gray-60'">
                    {{ formatYear(month) }}
                </p>
            </div>
        </div>

        <div class="flex items-center space-x-2">
            <span class="text-sm font-medium px-2 py-1 rounded-full" :class="isActive
                ? 'bg-s-blue-60 text-white'
                : 'bg-s-gray-20 text-s-gray-70'">
                {{ count }}
            </span>
            <i class="ri-image-line text-lg" :class="isActive ? 'text-s-blue-60' : 'text-s-gray-50'"></i>
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

defineEmits<{
    click: []
}>()

const formatMonth = (monthStr: string) => {
    const [, month] = monthStr.split('-')
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return monthNames[parseInt(month) - 1]
}

const formatYear = (monthStr: string) => {
    const [year] = monthStr.split('-')
    return year
}
</script>
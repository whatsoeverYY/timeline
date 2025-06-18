<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="photo in photos" :key="photo.imagePath" @click="$emit('photoClick', photo)"
            class="group cursor-pointer transform transition-all duration-300 hover:scale-105">
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl">
                <!-- 图片容器 -->
                <div class="relative aspect-square overflow-hidden">
                    <img :src="photo.imagePath" :alt="photo.desc"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        @error="handleImageError" />
                    <!-- 悬停遮罩 -->
                    <div
                        class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <i class="ri-zoom-in-line text-white text-3xl"></i>
                        </div>
                    </div>
                </div>

                <!-- 照片信息 -->
                <div class="p-4">
                    <h4 class="font-semibold text-s-gray-90 mb-2 truncate">
                        {{ photo.desc }}
                    </h4>
                    <div class="flex items-center text-s-gray-60 text-sm">
                        <i class="ri-calendar-line mr-1"></i>
                        <span>{{ formatDate(photo.date) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ImageDetail } from '@/data';

interface Props {
    photos: ImageDetail[]
}

defineProps<Props>()

defineEmits<{
    photoClick: [photo: ImageDetail]
}>()

const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)
    return `${month}/${day}/${year}`
}

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement
    // 可以设置一个默认图片或者隐藏图片
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTQwQzExNi41NjkgMTQwIDEzMCAxMjYuNTY5IDEzMCAxMTBDMTMwIDkzLjQzMTUgMTE2LjU2OSA4MCAxMDAgODBDODMuNDMxNSA4MCA3MCA5My40MzE1IDcwIDExMEM3MCAxMjYuNTY5IDgzLjQzMTUgMTQwIDEwMCAxNDBaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWMTQwSDYwVjYwWiIgc3Ryb2tlPSIjOUI5QkEzIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPC9zdmc+Cg=='
}
</script>
<template>
    <!-- 模态框背景 -->
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        @click="handleBackdropClick">
        <div class="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-2xl shadow-2xl overflow-hidden" @click.stop>
            <!-- 关闭按钮 -->
            <button @click="$emit('close')"
                class="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200">
                <i class="ri-close-line text-xl"></i>
            </button>

            <!-- 照片容器 -->
            <div class="relative">
                <img :src="photo.imagePath" :alt="photo.desc" class="w-full max-h-[60vh] object-contain bg-s-gray-10"
                    @error="handleImageError" />
            </div>

            <!-- 照片信息 -->
            <div class="p-6 bg-white">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <h3 class="text-2xl font-bold text-s-gray-90 mb-2">
                            {{ photo.desc }}
                        </h3>
                        <div class="flex items-center text-s-gray-60 space-x-4">
                            <div class="flex items-center">
                                <i class="ri-calendar-line mr-2"></i>
                                <span>{{ formatDate(photo.date) }}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="ri-image-line mr-2"></i>
                                <span>{{ extractFileName(photo.imagePath) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 操作按钮 -->
                    <div class="flex items-center space-x-2 ml-4">
                        <button @click="downloadPhoto"
                            class="bg-s-blue-60 hover:bg-s-blue-70 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
                            <i class="ri-download-line mr-2"></i>
                            Download
                        </button>
                        <button @click="sharePhoto"
                            class="bg-s-gray-60 hover:bg-s-gray-70 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
                            <i class="ri-share-line mr-2"></i>
                            Share
                        </button>
                    </div>
                </div>

                <!-- 照片元数据 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-s-gray-20">
                    <div class="text-center">
                        <div class="text-s-gray-50 text-sm mb-1">Original Path</div>
                        <div class="text-s-gray-80 text-sm font-medium truncate">
                            {{ photo.imagePath }}
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="text-s-gray-50 text-sm mb-1">Date Taken</div>
                        <div class="text-s-gray-80 text-sm font-medium">
                            {{ formatFullDate(photo.date) }}
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="text-s-gray-50 text-sm mb-1">Description</div>
                        <div class="text-s-gray-80 text-sm font-medium">
                            {{ photo.desc || 'No description' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ImageDetail } from '../data';

interface Props {
    photo: ImageDetail
}

const props = defineProps<Props>()

const emit = defineEmits<{
    close: []
}>()

const handleBackdropClick = (event: Event) => {
    // 只在点击背景时关闭模态框
    if (event.target === event.currentTarget) {
        emit('close')
    }
}

const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)
    return `${month}/${day}/${year}`
}

const formatFullDate = (dateStr: string) => {
    if (!dateStr) return ''
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return `${monthNames[parseInt(month) - 1]} ${day}, ${year}`
}

const extractFileName = (path: string) => {
    return path.split('/').pop() || 'Unknown'
}

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTQwQzExNi41NjkgMTQwIDEzMCAxMjYuNTY5IDEzMCAxMTBDMTMwIDkzLjQzMTUgMTE2LjU2OSA4MCAxMDAgODBDODMuNDMxNSA4MCA3MCA5My40MzE1IDcwIDExMEM3MCAxMjYuNTY5IDgzLjQzMTUgMTQwIDEwMCAxNDBaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWMTQwSDYwVjYwWiIgc3Ryb2tlPSIjOUI5QkEzIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPC9zdmc+Cg=='
}

const downloadPhoto = () => {
    const link = document.createElement('a')
    link.href = props.photo.imagePath
    link.download = extractFileName(props.photo.imagePath)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const sharePhoto = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: props.photo.desc,
                url: props.photo.imagePath
            })
        } catch (error) {
            console.log('Sharing failed:', error)
            fallbackShare()
        }
    } else {
        fallbackShare()
    }
}

const fallbackShare = () => {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(props.photo.imagePath).then(() => {
        alert('Photo link copied to clipboard!')
    }).catch(() => {
        alert('Failed to copy link')
    })
}

// 添加键盘事件监听
import { onMounted, onUnmounted } from 'vue';

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        emit('close')
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
    // 防止背景滚动
    document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
    // 恢复背景滚动
    document.body.style.overflow = 'auto'
})
</script>
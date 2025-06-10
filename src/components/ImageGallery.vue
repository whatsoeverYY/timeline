<template>
    <div class="image-gallery">
        <h1 class="text-3xl font-bold mb-6">图片画廊</h1>

        <div class="mb-4">
            <p class="text-lg text-gray-600">
                总共 {{ totalImages }} 张图片，分布在 {{ imageData.length }} 个月份
            </p>
        </div>

        <div class="space-y-8">
            <div v-for="monthData in imageData" :key="monthData.month" class="month-section">
                <h2 class="text-2xl font-semibold mb-4 text-blue-600">
                    {{ formatMonth(monthData.month) }} ({{ monthData.count }} 张)
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="image in monthData.details" :key="image.imagePath"
                        class="image-card bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="aspect-square bg-gray-100 flex items-center justify-center">
                            <img :src="image.imagePath" :alt="image.desc" class="max-w-full max-h-full object-cover"
                                @error="handleImageError" />
                        </div>
                        <div class="p-4">
                            <p class="font-medium text-gray-800">{{ image.desc || '无描述' }}</p>
                            <p class="text-sm text-gray-500 mt-1">{{ formatDate(image.date) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { imageData, type MonthData } from '@/data';
import { computed } from 'vue';

// 计算总图片数量
const totalImages = computed(() => {
    return imageData.reduce((sum: number, month: MonthData) => sum + month.count, 0);
});

// 格式化月份显示
const formatMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    const monthNames = [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
    ];
    return `${year}年${monthNames[parseInt(monthNum) - 1]}`;
};

// 格式化日期显示
const formatDate = (date: string) => {
    if (!date || date.length !== 8) return date;
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return `${year}-${month}-${day}`;
};

// 处理图片加载错误
const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWbvueJh+aaguaXoOazleWKoOi9vTwvdGV4dD48L3N2Zz4=';
};
</script>

<style scoped>
.image-gallery {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.month-section {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 2rem;
}

.month-section:last-child {
    border-bottom: none;
}

.image-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.image-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.aspect-square {
    aspect-ratio: 1 / 1;
}
</style>
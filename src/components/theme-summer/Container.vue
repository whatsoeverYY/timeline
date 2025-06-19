<template>
    <div class="theme-summer w-[100vw] mx-auto flex justify-center bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 min-h-screen">
        <!-- 桌面端布局：水平布局，固定宽度 -->
        <div class="container w-[1024px] h-[100vh] hidden md:flex">
            <SideBar />
            <MainContent />
        </div>

        <!-- 移动端布局：垂直布局，全宽度 -->
        <div class="container w-full h-[100vh] flex flex-col md:hidden">
            <SideBar />
            <MainContent />
        </div>

        <!-- 太阳装饰 -->
        <div class="absolute top-8 right-8 w-20 h-20 bg-yellow-300 rounded-full shadow-lg opacity-80 hidden md:block"></div>
    </div>
</template>

<script setup lang="ts">
import MainContent from './MainContent.vue';
import SideBar from './SideBar.vue';
</script>

<style>
.theme-summer {
    font-family: 'MiSans', sans-serif;
}

.theme-summer h2 {
    font-family: 'Sweet', sans-serif;
}

.theme-summer h2,
.theme-summer h3 {
    @apply font-bold;
}
</style>
<template>
    <div class="theme-merry w-[100vw] mx-auto flex justify-center">
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
    </div>
</template>

<script setup lang="ts">
import MainContent from './MainContent.vue';
import SideBar from './SideBar.vue';
</script>
<style>
.theme-merry {
    font-family: 'MiSans',
        sans-serif;

    h2 {
        font-family: 'Sweet', sans-serif;
    }

    h3 {
        /* font-family: 'Sugar', sans-serif; */
    }

    h2,
    h3 {
        @apply font-bold;
    }
}
</style>
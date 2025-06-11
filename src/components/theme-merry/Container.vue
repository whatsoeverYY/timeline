<template>
    <div class="theme-merry w-[100vw] mx-auto flex justify-center">
        <div class="container w-[1024px] h-[100vh] flex">
            <SideBar />
            <ImageGallery class="w-[70%]" />
        </div>
    </div>
</template>

<script setup lang="ts">
import ImageGallery from '../ImageGallery.vue';
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
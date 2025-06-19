<template>
    <div class="theme-cutie min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-purple-100 overflow-hidden relative">
        <!-- Floating decorative elements -->
        <div class="absolute top-10 left-10 w-8 h-8 bg-pink-300 rounded-full animate-float"></div>
        <div class="absolute top-20 right-20 w-6 h-6 bg-blue-300 rounded-full animate-float-delayed"></div>
        <div class="absolute bottom-20 left-20 w-4 h-4 bg-yellow-300 rounded-full animate-float"></div>
        <div class="absolute bottom-10 right-10 w-10 h-10 bg-green-300 rounded-full animate-float-delayed"></div>
        
        <!-- Stars scattered around -->
        <div class="absolute top-32 left-1/4 text-2xl text-yellow-400 animate-twinkle">⭐</div>
        <div class="absolute top-40 right-1/3 text-xl text-pink-400 animate-twinkle-delayed">🌸</div>
        <div class="absolute bottom-32 left-1/3 text-lg text-blue-400 animate-twinkle">💎</div>
        <div class="absolute bottom-40 right-1/4 text-2xl text-purple-400 animate-twinkle-delayed">🦄</div>
        
        <!-- Rainbow decoration -->
        <div class="absolute bottom-4 right-4">
            <div class="w-16 h-16 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full opacity-70 animate-pulse"></div>
            <div class="absolute top-2 left-2 text-white text-xs font-bold">🌈</div>
        </div>

        <div class="max-w-7xl mx-auto">
            <!-- Desktop Layout -->
            <div class="hidden lg:flex gap-6 h-screen py-4">
                <!-- Left Card - Timeline -->
                <div class="w-80 flex-shrink-0">
                    <SideBar />
                </div>
                
                <!-- Right Card - Main Content -->
                <div class="flex-1">
                    <MainContent />
                </div>
            </div>

            <!-- Mobile Layout -->
            <div class="lg:hidden flex flex-col gap-4 min-h-screen py-2">
                <SideBar />
                <MainContent />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import SideBar from './SideBar.vue';
import MainContent from './MainContent.vue';
</script>

<style scoped>
.theme-cutie {
    font-family: 'Comic Sans MS', 'MiSans', cursive, sans-serif;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-180deg); }
}

@keyframes twinkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(1.2); }
}

@keyframes twinkle-delayed {
    0%, 100% { opacity: 0.3; transform: scale(1.2); }
    50% { opacity: 1; transform: scale(1); }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float-delayed 8s ease-in-out infinite;
}

.animate-twinkle {
    animation: twinkle 3s ease-in-out infinite;
}

.animate-twinkle-delayed {
    animation: twinkle-delayed 4s ease-in-out infinite;
}
</style>
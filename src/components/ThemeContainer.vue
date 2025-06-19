<template>
    <div class="theme-container">
        <!-- Merry Theme -->
        <ThemeMerryContainer 
            v-if="currentUITheme === 'merry'"
        />
        
        <!-- Cutie Theme -->
        <ThemeCutieContainer 
            v-else-if="currentUITheme === 'cutie'"
            @toggle-theme="toggleUITheme"
        />
        
        <!-- Summer Theme -->
        <ThemeSummerContainer 
            v-else-if="currentUITheme === 'summer'"
        />

        <!-- Theme Toggle Button (Fixed Position) -->
        <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
            <!-- UI Theme Toggle -->
            <button 
                @click="toggleUITheme"
                :class="[
                    'w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110',
                    currentUITheme === 'merry' 
                        ? 'bg-gradient-to-br from-tm-pink-40 to-tm-blue-40 border-2 border-tm-pink-50' 
                        : currentUITheme === 'summer'
                            ? 'bg-gradient-to-br from-sky-300 to-blue-400 border-2 border-blue-300'
                            : 'bg-gradient-to-br from-pink-300 to-purple-300 border-3 border-pink-400'
                ]"
                :title="`Switch Theme (${currentUITheme})`"
            >
                <span v-if="currentUITheme === 'merry'" class="text-lg">🎨</span>
                <span v-else-if="currentUITheme === 'cutie'" class="text-lg">🌸</span>
                <span v-else-if="currentUITheme === 'summer'" class="text-lg">☀️</span>
            </button>
            
            <!-- Dark/Light Mode Toggle (only show in merry theme) -->
            <LampCordToggle 
                v-if="currentUITheme === 'blank'"
                :is-dark="isDarkMode" 
                @toggle="toggleTheme"
                class="relative"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import ThemeMerryContainer from './theme-merry/Container.vue';
import ThemeCutieContainer from './theme-cutie/Container.vue';
import ThemeSummerContainer from './theme-summer/Container.vue';
import LampCordToggle from './ui/LampCordToggle.vue';

const { isDarkMode, currentUITheme, toggleTheme, toggleUITheme } = useTheme();
</script>

<style scoped>
.theme-container {
    min-height: 100vh;
    width: 100%;
}

.border-3 {
    border-width: 3px;
}
</style>
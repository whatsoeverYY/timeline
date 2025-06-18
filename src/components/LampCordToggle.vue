<template>
  <div class="lamp-toggle" @click="toggleTheme">
    
    <!-- Cord -->
    <div class="cord">
      <div class="cord-line"></div>
    </div>
    
    <!-- Pull switch -->
    <div 
      class="pull-switch" 
      :class="{ 'switch-pulled': isAnimating }"
      @mouseenter="onHover"
      @mouseleave="onLeave"
    >
      <div class="switch-body"></div>
      <div class="switch-chain"></div>
    </div>
    
    <!-- Mode indicator -->
    <div class="mode-indicator">
      <i v-if="isDark" class="ri-moon-line"></i>
      <i v-else class="ri-sun-line"></i>
      <span class="mode-text">{{ isDark ? '夜晚模式' : '白天模式' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  isDark?: boolean
}

interface Emits {
  (e: 'toggle'): void
}

withDefaults(defineProps<Props>(), {
  isDark: false
})

const emit = defineEmits<Emits>()

const isAnimating = ref(false)

const toggleTheme = () => {
  isAnimating.value = true
  emit('toggle')
  
  // Reset animation after a short delay
  setTimeout(() => {
    isAnimating.value = false
  }, 300)
}

const onHover = () => {
  // Add subtle hover effect
}

const onLeave = () => {
  // Remove hover effect
}
</script>

<style scoped>
.lamp-toggle {
  position: fixed;
  right: 20px;
  z-index: 1000;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}

.lamp-toggle:hover {
  transform: scale(1.05);
}

/* Lamp fixture */
.lamp-fixture {
  position: relative;
  margin-bottom: 10px;
}

.lamp-base {
  width: 40px;
  height: 8px;
  background: linear-gradient(to bottom, #8b7355, #5d4e37);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.lamp-bulb {
  width: 30px;
  height: 35px;
  background: linear-gradient(to bottom, #f5f5f5, #e0e0e0);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: absolute;
  top: -30px;
  left: 5px;
  transition: all 0.3s ease;
  box-shadow: inset 0 -5px 10px rgba(0, 0, 0, 0.1);
}

.bulb-on {
  background: linear-gradient(to bottom, #fff9e6, #ffeaa7);
  box-shadow: 
    inset 0 -5px 10px rgba(0, 0, 0, 0.1),
    0 0 20px rgba(255, 234, 167, 0.6),
    0 0 40px rgba(255, 234, 167, 0.3);
  animation: glow-pulse 2s ease-in-out infinite alternate;
}

.bulb-off {
  background: linear-gradient(to bottom, #d1d1d1, #a0a0a0);
  box-shadow: inset 0 -5px 10px rgba(0, 0, 0, 0.2);
}

.bulb-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle, rgba(255, 234, 167, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: glow-flicker 3s ease-in-out infinite alternate;
}

/* Cord */
.cord {
  width: 2px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cord-line {
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #4a4a4a, #2a2a2a);
  border-radius: 1px;
  position: relative;
}

.cord-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(255, 255, 255, 0.1) 3px,
    rgba(255, 255, 255, 0.1) 4px
  );
  border-radius: 1px;
}

/* Pull switch */
.pull-switch {
  position: relative;
  transition: transform 0.3s ease;
}

.switch-pulled {
  transform: translateY(8px);
}

.switch-body {
  width: 12px;
  height: 20px;
  background: linear-gradient(to bottom, #e0e0e0, #b0b0b0);
  border-radius: 2px;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.3);
  position: relative;
}

.switch-body::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  height: 1px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 1px;
}

.switch-chain {
  width: 1px;
  height: 8px;
  background: #666;
  margin: 0 auto;
  border-radius: 0.5px;
}

/* Mode indicator */
.mode-indicator {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  pointer-events: none;
}

.lamp-toggle:hover .mode-indicator {
  opacity: 1;
  transform: translateY(0);
}

.mode-indicator i {
  font-size: 16px;
  color: var(--tm-purple-500, #6a5acd);
}

.mode-text {
  font-size: 10px;
  color: var(--tm-gray-80, #4a4a4a);
  white-space: nowrap;
  font-weight: 500;
}

/* Animations */
@keyframes glow-pulse {
  0% {
    box-shadow: 
      inset 0 -5px 10px rgba(0, 0, 0, 0.1),
      0 0 20px rgba(255, 234, 167, 0.6),
      0 0 40px rgba(255, 234, 167, 0.3);
  }
  100% {
    box-shadow: 
      inset 0 -5px 10px rgba(0, 0, 0, 0.1),
      0 0 30px rgba(255, 234, 167, 0.8),
      0 0 60px rgba(255, 234, 167, 0.5);
  }
}

@keyframes glow-flicker {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .lamp-toggle {
    top: 15px;
    right: 15px;
    transform: scale(0.8);
  }
  
  .lamp-toggle:hover {
    transform: scale(0.85);
  }
}

/* Dark mode adjustments */
.dark .mode-indicator i {
  color: var(--tm-blue-40, #87ceeb);
}

.dark .mode-text {
  color: var(--tm-gray-20, #e0e0e0);
}

.dark .lamp-base {
  background: linear-gradient(to bottom, #4a4a4a, #2a2a2a);
}

.dark .switch-body {
  background: linear-gradient(to bottom, #606060, #404040);
}
</style>
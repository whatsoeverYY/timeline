import { ref, watch } from 'vue'

const isDarkMode = ref(false)

// Initialize theme from localStorage or default to light mode
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  } else {
    // Check system preference
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
}

// Apply theme to document
const applyTheme = () => {
  const html = document.documentElement
  if (isDarkMode.value) {
    html.classList.add('dark')
    html.setAttribute('data-theme', 'dark')
  } else {
    html.classList.remove('dark')
    html.setAttribute('data-theme', 'light')
  }
}

// Toggle theme
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  applyTheme()
}

// Watch for theme changes
watch(isDarkMode, () => {
  applyTheme()
})

// Auto-initialize when composable is first used
let initialized = false
export const useTheme = () => {
  if (!initialized) {
    initializeTheme()
    initialized = true
  }
  
  return {
    isDarkMode,
    toggleTheme,
    initializeTheme
  }
}
import { ref, watch } from 'vue'

export type UITheme = 'blank' | 'merry' | 'cutie' | 'summer'
export type ColorMode = 'light' | 'dark'

const isDarkMode = ref(false)
const currentUITheme = ref<UITheme>('merry')

// Initialize theme from localStorage or default to light mode and merry theme
const initializeTheme = () => {
  const savedColorMode = localStorage.getItem('color-mode')
  const savedUITheme = localStorage.getItem('ui-theme')
  
  if (savedColorMode) {
    isDarkMode.value = savedColorMode === 'dark'
  } else {
    // Check system preference
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  if (savedUITheme && (savedUITheme === 'merry' || savedUITheme === 'cutie' || savedUITheme === 'summer')) {
    currentUITheme.value = savedUITheme as UITheme
  }
  
  applyTheme()
}

// Apply theme to document
const applyTheme = () => {
  const html = document.documentElement
  if (isDarkMode.value) {
    html.classList.add('dark')
    html.setAttribute('data-color-mode', 'dark')
  } else {
    html.classList.remove('dark')
    html.setAttribute('data-color-mode', 'light')
  }
  
  html.setAttribute('data-ui-theme', currentUITheme.value)
}

// Toggle dark/light mode
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('color-mode', isDarkMode.value ? 'dark' : 'light')
  applyTheme()
}

// Toggle UI theme between merry, cutie, and summer
const toggleUITheme = () => {
  const themes: UITheme[] = ['merry', 'cutie', 'summer']
  const currentIndex = themes.indexOf(currentUITheme.value)
  const nextIndex = (currentIndex + 1) % themes.length
  currentUITheme.value = themes[nextIndex]
  localStorage.setItem('ui-theme', currentUITheme.value)
  applyTheme()
}

// Set specific UI theme
const setUITheme = (theme: UITheme) => {
  currentUITheme.value = theme
  localStorage.setItem('ui-theme', theme)
  applyTheme()
}

// Watch for theme changes
watch([isDarkMode, currentUITheme], () => {
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
    currentUITheme,
    toggleTheme,
    toggleUITheme,
    setUITheme,
    initializeTheme
  }
}
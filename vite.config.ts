import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  build: {
    assetsInlineLimit: 0, // 禁用内联，或设置更大的阈值
  },
})

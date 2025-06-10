import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 确保生成的文件有正确的扩展名
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // 确保sourcemap正确生成
    sourcemap: false,
    // 明确指定目标和格式
    target: 'esnext',
    minify: 'esbuild',
  },
  server: {
    // 开发服务器MIME类型配置
    fs: {
      strict: true,
    },
  },
})

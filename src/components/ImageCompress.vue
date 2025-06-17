<template>
  <div class="theme-merry min-h-screen bg-gradient-to-br from-tm-pink-20 to-tm-blue-20 p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header with back button -->
      <div class="flex items-center justify-between mb-8">
        <router-link 
          to="/" 
          class="flex items-center text-tm-purple-500 hover:text-tm-purple-100 transition-colors"
        >
          <i class="ri-arrow-left-line mr-2"></i>
          返回相册
        </router-link>
        <h1 class="text-3xl font-bold text-tm-purple-500">图片压缩工具</h1>
        <div class="w-20"></div> <!-- Spacer for center alignment -->
      </div>
      
      <!-- Compression Settings -->
      <div class="bg-white rounded-lg p-6 shadow-sm border mb-6">
        <div class="flex items-center mb-4">
          <i class="ri-settings-3-line text-xl text-tm-purple-500 mr-2"></i>
          <h2 class="text-xl font-semibold text-tm-purple-500">压缩配置</h2>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Quality Control -->
          <div>
            <label class="block text-sm font-medium text-tm-gray-80 mb-2">压缩质量</label>
            <div class="flex items-center space-x-3">
              <input
                v-model="compressionSettings.quality"
                type="range"
                min="10"
                max="100"
                step="5"
                class="flex-1 h-2 bg-tm-pink-20 rounded-lg appearance-none cursor-pointer slider"
              >
              <span class="text-lg font-semibold text-tm-purple-500 min-w-[60px]">{{ compressionSettings.quality }}%</span>
            </div>
          </div>
          
          <!-- Output Format -->
          <div>
            <label class="block text-sm font-medium text-tm-gray-80 mb-2">输出格式</label>
            <div class="flex space-x-3">
              <label v-for="format in outputFormats" :key="format.value" class="flex items-center cursor-pointer">
                <input
                  v-model="compressionSettings.format"
                  :value="format.value"
                  type="radio"
                  class="sr-only"
                >
                <div 
                  class="w-4 h-4 rounded-full border-2 mr-2 transition-colors"
                  :class="compressionSettings.format === format.value ? 'border-tm-purple-500 bg-tm-purple-500' : 'border-gray-300'"
                >
                  <div 
                    v-if="compressionSettings.format === format.value"
                    class="w-2 h-2 bg-white rounded-full m-0.5"
                  ></div>
                </div>
                <span class="text-sm text-tm-gray-80">{{ format.label }}</span>
              </label>
            </div>
          </div>
          
          <!-- Maximum Width -->
          <div>
            <label class="block text-sm font-medium text-tm-gray-80 mb-2">最大宽度 (像素)</label>
            <div class="flex items-center space-x-3">
              <input
                v-model="compressionSettings.maxWidth"
                type="range"
                min="480"
                max="3840"
                step="240"
                class="flex-1 h-2 bg-tm-pink-20 rounded-lg appearance-none cursor-pointer slider"
              >
              <span class="text-lg font-semibold text-tm-purple-500 min-w-[80px]">{{ compressionSettings.maxWidth }}px</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Upload Area -->
      <div 
        class="border-2 border-dashed border-tm-purple-500 rounded-lg p-8 text-center mb-6 transition-colors duration-200"
        :class="{ 'border-tm-purple-100 bg-tm-pink-10': isDragOver }"
        @drop.prevent="handleDrop"
        @dragover.prevent="isDragOver = true"
        @dragleave.prevent="isDragOver = false"
      >
        <div class="flex flex-col items-center space-y-4">
          <i class="ri-upload-cloud-2-line text-4xl text-tm-purple-500"></i>
          <p class="text-lg text-tm-gray-80">拖拽图片到此处或点击选择文件</p>
          <input
            ref="fileInput"
            type="file"
            multiple
            accept="image/*"
            class="hidden"
            @change="handleFileSelect"
          >
          <button
            @click="fileInput?.click()"
            class="px-6 py-3 bg-tm-purple-500 text-white rounded-lg hover:bg-tm-purple-100 transition-colors"
          >
            选择图片文件
          </button>
        </div>
      </div>

      <!-- File List -->
      <div v-if="files.length > 0" class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-tm-purple-500">待压缩文件 ({{ files.length }})</h2>
          <div class="space-x-2">
            <button
              @click="compressAll"
              :disabled="isCompressing"
              class="px-4 py-2 bg-tm-blue-40 text-tm-purple-500 rounded-lg hover:bg-s-blue-40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ isCompressing ? '压缩中...' : '开始压缩' }}
            </button>
            <button
              @click="clearFiles"
              class="px-4 py-2 bg-s-rose-40 text-white rounded-lg hover:bg-s-rose-50 transition-colors"
            >
              清空列表
            </button>
          </div>
        </div>

        <div class="grid gap-4">
          <div
            v-for="(file, index) in files"
            :key="index"
            class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border"
          >
            <div class="flex items-center space-x-4">
              <img
                :src="file.preview"
                :alt="file.name"
                class="w-16 h-16 object-cover rounded-lg"
              >
              <div>
                <p class="font-medium text-tm-purple-500">{{ file.name }}</p>
                <p class="text-sm text-tm-gray-80">{{ formatFileSize(file.size) }}</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <div v-if="file.compressedSize" class="text-right">
                <p class="text-sm text-s-blue-70">压缩后: {{ formatFileSize(file.compressedSize) }}</p>
                <p class="text-xs text-tm-gray-80">
                  减少 {{ Math.round((1 - file.compressedSize / file.size) * 100) }}%
                </p>
              </div>
              
              <div class="flex items-center space-x-2">
                <div v-if="file.status === 'compressing'" class="text-s-blue-60">
                  <i class="ri-loader-4-line animate-spin"></i>
                </div>
                <div v-else-if="file.status === 'completed'" class="text-s-blue-70">
                  <i class="ri-check-circle-line"></i>
                </div>
                <div v-else-if="file.status === 'error'" class="text-s-rose-60">
                  <i class="ri-error-warning-line"></i>
                </div>
                
                <button
                  @click="removeFile(index)"
                  class="text-s-rose-50 hover:text-s-rose-70"
                >
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Download Section -->
      <div v-if="compressedFiles.length > 0" class="text-center">
        <button
          @click="downloadAll"
          class="px-8 py-4 bg-tm-purple-500 text-white rounded-lg hover:bg-tm-purple-100 transition-colors text-lg font-semibold"
        >
          <i class="ri-download-line mr-2"></i>
          下载所有压缩文件 ({{ compressedFiles.length }})
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface FileItem {
  file: File
  name: string
  size: number
  preview: string
  status: 'pending' | 'compressing' | 'completed' | 'error'
  compressedBlob?: Blob
  compressedSize?: number
}

const files = ref<FileItem[]>([])
const isDragOver = ref(false)
const isCompressing = ref(false)
const fileInput = ref<HTMLInputElement>()

// Compression settings
const compressionSettings = ref({
  quality: 80,
  format: 'webp',
  maxWidth: 1920
})

const outputFormats = [
  { value: 'jpeg', label: 'JPEG' },
  { value: 'webp', label: 'WebP' },
  { value: 'png', label: 'PNG' }
]

const compressedFiles = computed(() => 
  files.value.filter(f => f.status === 'completed' && f.compressedBlob)
)

const handleDrop = (e: DragEvent) => {
  isDragOver.value = false
  const droppedFiles = Array.from(e.dataTransfer?.files || [])
  addFiles(droppedFiles)
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const selectedFiles = Array.from(target.files || [])
  addFiles(selectedFiles)
}

const addFiles = (newFiles: File[]) => {
  const imageFiles = newFiles.filter(file => file.type.startsWith('image/'))
  
  imageFiles.forEach(file => {
    const reader = new FileReader()
    reader.onload = () => {
      files.value.push({
        file,
        name: file.name,
        size: file.size,
        preview: reader.result as string,
        status: 'pending'
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

const clearFiles = () => {
  files.value = []
}

const compressImage = async (fileItem: FileItem): Promise<void> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions with max width constraint
      let { width: newWidth, height: newHeight } = img
      
      if (newWidth > compressionSettings.value.maxWidth) {
        const aspectRatio = newHeight / newWidth
        newWidth = compressionSettings.value.maxWidth
        newHeight = Math.round(newWidth * aspectRatio)
      }
      
      canvas.width = newWidth
      canvas.height = newHeight
      
      // Draw resized image
      ctx?.drawImage(img, 0, 0, newWidth, newHeight)
      
      try {
        // Get format and quality settings
        const format = compressionSettings.value.format
        const quality = compressionSettings.value.quality / 100
        const mimeType = `image/${format}`
        
        // Use toDataURL to get compressed image as base64 string
        const compressedDataURL = canvas.toDataURL(mimeType, quality)
        
        // Convert data URL to blob for size calculation and download
        const byteCharacters = atob(compressedDataURL.split(',')[1])
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: mimeType })
        
        fileItem.compressedBlob = blob
        fileItem.compressedSize = blob.size
        fileItem.status = 'completed'
        resolve()
      } catch {
        fileItem.status = 'error'
        reject(new Error('压缩失败'))
      }
    }
    
    img.onerror = () => {
      fileItem.status = 'error'
      reject(new Error('图片加载失败'))
    }
    
    img.src = fileItem.preview
  })
}

const compressAll = async () => {
  isCompressing.value = true
  
  const pendingFiles = files.value.filter(f => f.status === 'pending')
  
  for (const file of pendingFiles) {
    file.status = 'compressing'
    try {
      await compressImage(file)
    } catch (error) {
      console.error('压缩失败:', error)
    }
  }
  
  isCompressing.value = false
}

const downloadAll = () => {
  compressedFiles.value.forEach(file => {
    if (file.compressedBlob) {
      const url = URL.createObjectURL(file.compressedBlob)
      const a = document.createElement('a')
      a.href = url
      
      // Get file extension based on compression format
      const format = compressionSettings.value.format
      const extension = format === 'jpeg' ? '.jpg' : `.${format}`
      a.download = file.name.replace(/\.[^/.]+$/, extension)
      
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  })
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
.theme-merry {
  font-family: 'MiSans', sans-serif;
}

.theme-merry h1,
.theme-merry h2 {
  font-family: 'Sweet', sans-serif;
  @apply font-bold;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Custom slider styles */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #6a5acd;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #6a5acd;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-webkit-slider-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #ffeaf1, #e4f5ff);
}

.slider::-moz-range-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #ffeaf1, #e4f5ff);
  border: none;
}
</style>
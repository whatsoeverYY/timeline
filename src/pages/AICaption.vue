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
        <h1 class="text-3xl font-bold text-tm-purple-500">AI照片描述</h1>
        <div class="flex items-center space-x-4">
          <router-link 
            to="/compress" 
            class="text-tm-purple-500 hover:text-tm-purple-100 transition-colors text-sm"
          >
            图片压缩
          </router-link>
          <router-link 
            to="/vaccine" 
            class="text-tm-purple-500 hover:text-tm-purple-100 transition-colors text-sm"
          >
            疫苗记录
          </router-link>
          <router-link 
            to="/all" 
            class="text-tm-purple-500 hover:text-tm-purple-100 transition-colors text-sm"
          >
            照片墙
          </router-link>
        </div>
      </div>
      
      <!-- Upload Area -->
      <div 
        v-if="!uploadedImage"
        class="border-2 border-dashed border-tm-purple-500 rounded-lg p-8 text-center mb-6 transition-colors duration-200"
        :class="{ 'border-tm-purple-100 bg-tm-pink-10': isDragOver }"
        @drop.prevent="handleDrop"
        @dragover.prevent="isDragOver = true"
        @dragleave.prevent="isDragOver = false"
      >
        <div class="flex flex-col items-center space-y-4">
          <i class="ri-upload-cloud-2-line text-4xl text-tm-purple-500"></i>
          <p class="text-lg text-tm-gray-80">拖拽照片到此处或点击选择文件</p>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileSelect"
          >
          <button
            @click="fileInput?.click()"
            class="px-6 py-3 bg-tm-purple-500 text-white rounded-lg hover:bg-tm-purple-100 transition-colors"
          >
            选择照片文件
          </button>
        </div>
      </div>

      <!-- Image Display and Caption Section -->
      <div v-if="uploadedImage" class="space-y-6">
        <!-- Image Display -->
        <div class="bg-white rounded-lg p-6 shadow-sm border">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-tm-purple-500">上传的照片</h2>
            <button
              @click="resetUpload"
              class="px-4 py-2 bg-s-rose-40 text-white rounded-lg hover:bg-s-rose-50 transition-colors"
            >
              重新上传
            </button>
          </div>
          <div class="flex justify-center">
            <img
              :src="uploadedImage.preview"
              :alt="uploadedImage.name"
              class="max-w-full max-h-96 object-contain rounded-lg shadow-sm"
            >
          </div>
          <p class="text-center text-sm text-tm-gray-80 mt-2">{{ uploadedImage.name }}</p>
        </div>

        <!-- AI Caption Generation -->
        <div class="bg-white rounded-lg p-6 shadow-sm border">
          <div class="flex items-center mb-4">
            <i class="ri-magic-line text-xl text-tm-purple-500 mr-2"></i>
            <h2 class="text-xl font-semibold text-tm-purple-500">AI生成描述</h2>
          </div>
          
          <div v-if="!aiCaption && !isGenerating" class="text-center">
            <button
              @click="generateCaption"
              class="px-6 py-3 bg-tm-blue-40 text-tm-purple-500 rounded-lg hover:bg-s-blue-40 transition-colors"
            >
              <i class="ri-magic-line mr-2"></i>
              生成AI描述
            </button>
          </div>

          <div v-if="isGenerating" class="text-center py-8">
            <div class="flex items-center justify-center space-x-2 text-tm-purple-500">
              <i class="ri-loader-4-line animate-spin text-xl"></i>
              <span>AI正在分析照片...</span>
            </div>
          </div>

          <div v-if="aiCaption" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-tm-gray-80 mb-2">AI生成的描述</label>
              <div class="bg-tm-pink-10 rounded-lg p-4 border">
                <p class="text-tm-gray-80">{{ aiCaption }}</p>
              </div>
            </div>
            
            <div class="flex justify-center">
              <button
                @click="generateCaption"
                :disabled="isGenerating"
                class="px-4 py-2 bg-tm-purple-500 text-white rounded-lg hover:bg-tm-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <i class="ri-refresh-line mr-2"></i>
                重新生成
              </button>
            </div>
          </div>
        </div>

        <!-- Editable Description -->
        <div v-if="aiCaption" class="bg-white rounded-lg p-6 shadow-sm border">
          <div class="flex items-center mb-4">
            <i class="ri-edit-line text-xl text-tm-purple-500 mr-2"></i>
            <h2 class="text-xl font-semibold text-tm-purple-500">编辑描述</h2>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-tm-gray-80 mb-2">自定义描述</label>
              <textarea
                v-model="editableCaption"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tm-purple-500 focus:border-transparent"
                rows="4"
                placeholder="编辑或重写照片描述..."
              ></textarea>
            </div>
            
            <div class="flex justify-center space-x-3">
              <button
                @click="resetToAI"
                class="px-4 py-2 bg-tm-blue-40 text-tm-purple-500 rounded-lg hover:bg-s-blue-40 transition-colors"
              >
                恢复AI描述
              </button>
              <button
                @click="saveDescription"
                class="px-6 py-2 bg-tm-purple-500 text-white rounded-lg hover:bg-tm-purple-100 transition-colors"
              >
                保存描述
              </button>
            </div>
          </div>
        </div>

        <!-- Saved Description Display -->
        <div v-if="savedDescription" class="bg-white rounded-lg p-6 shadow-sm border border-s-blue-40">
          <div class="flex items-center mb-4">
            <i class="ri-check-circle-line text-xl text-s-blue-70 mr-2"></i>
            <h2 class="text-xl font-semibold text-s-blue-70">保存的描述</h2>
          </div>
          <div class="bg-s-blue-10 rounded-lg p-4 border border-s-blue-30">
            <p class="text-tm-gray-80">{{ savedDescription }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface UploadedImageData {
  file: File
  name: string
  preview: string
}

const uploadedImage = ref<UploadedImageData | null>(null)
const isDragOver = ref(false)
const fileInput = ref<HTMLInputElement>()
const aiCaption = ref('')
const editableCaption = ref('')
const savedDescription = ref('')
const isGenerating = ref(false)

const handleDrop = (e: DragEvent) => {
  isDragOver.value = false
  const droppedFiles = Array.from(e.dataTransfer?.files || [])
  const imageFile = droppedFiles.find(file => file.type.startsWith('image/'))
  if (imageFile) {
    processImageFile(imageFile)
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file && file.type.startsWith('image/')) {
    processImageFile(file)
  }
}

const processImageFile = (file: File) => {
  const reader = new FileReader()
  reader.onload = () => {
    uploadedImage.value = {
      file,
      name: file.name,
      preview: reader.result as string
    }
    // Reset states
    aiCaption.value = ''
    editableCaption.value = ''
    savedDescription.value = ''
  }
  reader.readAsDataURL(file)
}

const resetUpload = () => {
  uploadedImage.value = null
  aiCaption.value = ''
  editableCaption.value = ''
  savedDescription.value = ''
  isGenerating.value = false
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const generateCaption = async () => {
  if (!uploadedImage.value) return
  
  isGenerating.value = true
  
  try {
    // Convert image to base64 for API call
    const base64Image = uploadedImage.value.preview.split(',')[1]
    
    // Call AI API with photographer prompt
    const response = await fetch('/api/ai/caption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
        prompt: "You are a professional photographer. Generate a descriptive caption in Chinese (no English) based on the photo's content."
      })
    })
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`)
    }
    
    const data = await response.json()
    aiCaption.value = data.caption || '无法生成描述，请重试。'
    editableCaption.value = aiCaption.value
  } catch (error) {
    console.error('生成描述失败:', error)
    
    // Fallback to mock captions if API fails
    const mockCaptions = [
      '这是一张温馨的家庭照片，展现了美好的时光。光线柔和，构图自然，充满了生活的气息。',
      '照片捕捉了一个美丽的瞬间，色彩鲜艳，充满活力。摄影师巧妙地运用了光影效果。',
      '这张照片展现了自然的美景，细节丰富，层次分明。画面构图平衡，给人以宁静的感觉。',
      '一张充满情感的照片，记录了珍贵的回忆。摄影技法娴熟，很好地突出了主题。'
    ]
    
    aiCaption.value = mockCaptions[Math.floor(Math.random() * mockCaptions.length)]
    editableCaption.value = aiCaption.value
  } finally {
    isGenerating.value = false
  }
}

const resetToAI = () => {
  editableCaption.value = aiCaption.value
}

const saveDescription = () => {
  savedDescription.value = editableCaption.value
  // Here you could also save to localStorage, send to server, etc.
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
</style>
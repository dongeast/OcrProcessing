<template>
  <div class="space-y-6 py-0">
    <!-- 页面标题 -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">{{ t('center.ocrAnalysis.title') }}</h1>
        <p class="text-muted-foreground mt-1">{{ t('center.ocrAnalysis.subtitle') }}</p>
      </div>
    </div>

    <!-- 步骤进度条 -->
    <div class="rounded-lg bg-card border p-6 shadow-sm">
      <!-- Steps component -->
      <div class="flex flex-col md:flex-row justify-between relative pt-6 pb-6">
        <!-- Connector lines -->
        <div class="absolute top-11 left-7 right-7 h-0.5 hidden md:block bg-gray-200"></div>
        
        <!-- 已完成部分的实线 -->
        <div 
          v-if="currentStep > 1"
          class="absolute top-11 left-7 h-0.5 hidden md:block bg-primary transition-all duration-500 ease-in-out"
          :style="{ width: progressBarWidth }"
        ></div>
        
        <!-- 未完成部分的虚线 -->
        <div 
          v-if="currentStep < 4"
          class="absolute top-11 right-7 h-0.5 hidden md:block border-dashed border-t border-gray-300 transition-all duration-500 ease-in-out"
          :style="{ width: incompleteWidth }"
        ></div>
        
        <!-- 流动虚线动画层 -->
        <div 
          v-if="currentStep >= 1 && currentStep < 4"
          class="absolute top-11 h-0.5 hidden md:block"
          :style="flowingLineStyle"
        >
          <div class="flowing-dashed-line"></div>
        </div>
        
        <!-- Step 1: Upload File -->
        <div class="flex flex-col items-center w-full md:w-auto z-10 mb-4 md:mb-0">
          <div 
            class="flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-300 transform cursor-pointer"
            :class="{
              'bg-primary text-primary-foreground shadow-lg scale-110': currentStep >= 1 && selectedStep !== 1,
              'bg-muted text-muted-foreground': currentStep < 1,
              'border-2 border-black bg-white text-black': selectedStep === 1
            }"
            @click="selectStep(1)"
          >
            <span v-if="currentStep > 1 && selectedStep !== 1">✓</span>
            <span v-else>1</span>
          </div>
          <span class="text-sm font-medium text-center">{{ t('center.ocrAnalysis.steps.upload') }}</span>
        </div>
        
        <!-- Step 2: OCR Analysis -->
        <div class="flex flex-col items-center w-full md:w-auto z-10 mb-4 md:mb-0">
          <div 
            class="flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-300 transform cursor-pointer"
            :class="{
              'bg-primary text-primary-foreground shadow-lg scale-110': currentStep >= 2 && selectedStep !== 2,
              'bg-muted text-muted-foreground': currentStep < 2,
              'border-2 border-black bg-white text-black': selectedStep === 2
            }"
            @click="selectStep(2)"
          >
            <span v-if="currentStep > 2 && selectedStep !== 2">✓</span>
            <span v-else>2</span>
          </div>
          <span class="text-sm font-medium text-center">{{ t('center.ocrAnalysis.steps.analysis') }}</span>
        </div>
        
        <!-- Step 3: MD Editing -->
        <div class="flex flex-col items-center w-full md:w-auto z-10 mb-4 md:mb-0">
          <div 
            class="flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-300 transform cursor-pointer"
            :class="{
              'bg-primary text-primary-foreground shadow-lg scale-110': currentStep >= 3 && selectedStep !== 3,
              'bg-muted text-muted-foreground': currentStep < 3,
              'border-2 border-black bg-white text-black': selectedStep === 3
            }"
            @click="selectStep(3)"
          >
            <span v-if="currentStep > 3 && selectedStep !== 3">✓</span>
            <span v-else>3</span>
          </div>
          <span class="text-sm font-medium text-center">{{ t('center.ocrAnalysis.steps.edit') }}</span>
        </div>
        
        <!-- Step 4: Preview & Export -->
        <div class="flex flex-col items-center w-full md:w-auto z-10">
          <div 
            class="flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-300 transform cursor-pointer"
            :class="{
              'bg-primary text-primary-foreground shadow-lg scale-110': currentStep >= 4 && selectedStep !== 4,
              'bg-muted text-muted-foreground': currentStep < 4,
              'border-2 border-black bg-white text-black': selectedStep === 4
            }"
            @click="selectStep(4)"
          >
            <span v-if="currentStep > 4 && selectedStep !== 4">✓</span>
            <span v-else>4</span>
          </div>
          <span class="text-sm font-medium text-center">{{ t('center.ocrAnalysis.steps.export') }}</span>
        </div>
      </div>
    </div>

    <!-- 上传区域 -->
    <div class="rounded-lg bg-card border p-6 shadow-sm">
      <h2 class="text-xl font-semibold mb-4">{{ getStepTitle() }}</h2>
      
      <!-- 节点4：文档预览与导出 -->
      <div v-if="selectedStep === 4" class="mb-4">
        <div class="border rounded-lg overflow-hidden">
          <!-- 功能栏 -->
          <div class="flex justify-end items-center border-b bg-muted p-4">
            <div class="flex space-x-2">
              <button 
                @click="exportDocument('pdf')"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.ocrAnalysis.preview.exportPDF') }}
              </button>
              <button 
                @click="exportDocument('txt')"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.ocrAnalysis.preview.exportTXT') }}
              </button>
              <button 
                @click="exportDocument('md')"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.ocrAnalysis.preview.exportMD') }}
              </button>
              <button 
                @click="exportDocument('docx')"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.ocrAnalysis.preview.exportDOCX') }}
              </button>
            </div>
          </div>
          
          <!-- 文档预览区域 -->
          <div class="p-4 prose max-w-none" v-html="renderedMarkdown"></div>
        </div>
      </div>
      
      <!-- 节点3：MD文档编辑与预览 -->
      <div v-else-if="selectedStep === 3" class="mb-4">
        <div class="border rounded-lg overflow-hidden">
          <!-- 功能栏 -->
          <div class="flex justify-end items-center border-b bg-muted p-4">
            <div class="flex space-x-2">
              <button 
                @click="resetUpload"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.ocrAnalysis.editor.reset') }}
              </button>
              <button 
                @click="saveDocument"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.ocrAnalysis.editor.save') }}
              </button>
            </div>
          </div>
          
          <div class="flex border-b bg-muted">
            <button 
              @click="mdEditMode = 'edit'"
              class="px-4 py-2 font-medium text-sm"
              :class="mdEditMode === 'edit' ? 'bg-background border-b-2 border-primary' : 'text-muted-foreground'"
            >
              {{ t('center.ocrAnalysis.editor.edit') }}
            </button>
            <button 
              @click="mdEditMode = 'preview'"
              class="px-4 py-2 font-medium text-sm"
              :class="mdEditMode === 'preview' ? 'bg-background border-b-2 border-primary' : 'text-muted-foreground'"
            >
              {{ t('center.ocrAnalysis.editor.preview') }}
            </button>
            <button 
              @click="mdEditMode = 'split'"
              class="px-4 py-2 font-medium text-sm"
              :class="mdEditMode === 'split' ? 'bg-background border-b-2 border-primary' : 'text-muted-foreground'"
            >
              {{ t('center.ocrAnalysis.editor.split') }}
            </button>
          </div>
          
          <div class="flex flex-col md:flex-row">
            <!-- 编辑器模式 -->
            <div 
              v-if="mdEditMode === 'edit'" 
              class="w-full p-4"
            >
              <textarea
                v-model="mdContent"
                class="w-full h-96 p-2 border rounded font-mono text-sm"
                :placeholder="t('center.ocrAnalysis.editor.placeholder')"
              ></textarea>
            </div>
            
            <!-- 预览模式 -->
            <div 
              v-else-if="mdEditMode === 'preview'" 
              class="w-full p-4 prose max-w-none"
              v-html="renderedMarkdown"
            ></div>
            
            <!-- 分屏模式 -->
            <template v-else-if="mdEditMode === 'split'">
              <div class="w-full md:w-1/2 p-4 border-r">
                <textarea
                  v-model="mdContent"
                  class="w-full h-96 p-2 border rounded font-mono text-sm"
                  :placeholder="t('center.ocrAnalysis.editor.placeholder')"
                ></textarea>
              </div>
              <div 
                class="w-full md:w-1/2 p-4 prose max-w-none"
                v-html="renderedMarkdown"
              ></div>
            </template>
          </div>
        </div>
      </div>
      
      <!-- 节点2：OCR分析 - 图片预览走马灯 -->
      <div v-else-if="selectedStep === 2 && ocrProgress >= 100" class="mb-4" @click.stop>
        <div class="border rounded-lg overflow-hidden">
          <!-- 功能栏 -->
          <div class="flex justify-end items-center border-b bg-muted p-4">
            <div class="flex space-x-2">
              <!-- 保留重新处理按钮，移除重置按钮 -->
              <button 
                @click="startProcessing"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.ocrAnalysis.analysis.reprocess') }}
              </button>
            </div>
          </div>
          
          <!-- 图片预览走马灯 -->
          <div class="carousel-container p-4">
            <div class="flex items-center">
              <button 
                @click.stop="prevImage" 
                class="rounded-full bg-gray-200 p-2 hover:bg-gray-300 mr-4"
                :disabled="currentImageIndex === 0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <div class="carousel-slide flex-1">
                <img 
                  :src="previewImage" 
                  :alt="uploadedFile?.name || 'Preview'" 
                  class="mx-auto w-full h-auto object-contain"
                  @error="handleImageError"
                />
              </div>
              
              <button 
                @click.stop="nextImage" 
                class="rounded-full bg-gray-200 p-2 hover:bg-gray-300 ml-4"
                :disabled="currentImageIndex === previewImages.length - 1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div class="carousel-indicators mt-4 flex justify-center space-x-1">
              <button 
                v-for="(image, index) in previewImages" 
                :key="index"
                @click.stop="goToImage(index)"
                class="h-2 w-2 rounded-full"
                :class="index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'"
              ></button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- OCR处理状态 (仅在OCR处理中显示) -->
      <div v-else-if="selectedStep === 2 && ocrProgress < 100" class="mb-4">
        <div class="border rounded-lg overflow-hidden">
          <!-- 功能栏 -->
          <div class="flex justify-end items-center border-b bg-muted p-4">
            <div class="flex space-x-2">
              <!-- 保留重置按钮 -->
              <button 
                @click="resetUpload"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.ocrAnalysis.analysis.reset') }}
              </button>
            </div>
          </div>
          
          <div class="p-8">
            <div class="flex justify-between text-sm text-muted-foreground mb-1">
              <span>{{ t('center.ocrAnalysis.upload.analyzing') }}...</span>
              <span>{{ ocrProgress }}%</span>
            </div>
            <div class="w-full bg-muted rounded-full h-2">
              <div 
                class="bg-primary h-2 rounded-full transition-all duration-300 ease-out" 
                :style="{ width: ocrProgress + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 上传进度条 (仅在有文件上传时显示) -->
      <div v-else-if="uploadProgress > 0 && uploadProgress < 100 && selectedStep === 1" class="mb-4">
        <div class="border rounded-lg overflow-hidden">
          <!-- 功能栏 -->
          <div class="flex justify-end items-center border-b bg-muted p-4">
            <div class="flex space-x-2">
              <button 
                @click="resetUpload"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.ocrAnalysis.upload.reupload') }}
              </button>
            </div>
          </div>
          
          <div class="p-8">
            <div class="flex justify-between text-sm text-muted-foreground mb-1">
              <span>{{ t('center.ocrAnalysis.upload.uploading') }}...</span>
              <span>{{ uploadProgress }}%</span>
            </div>
            <div class="w-full bg-muted rounded-full h-2">
              <div 
                class="bg-primary h-2 rounded-full transition-all duration-300 ease-out" 
                :style="{ width: uploadProgress + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 上传完成提示和文件信息 (仅在上传完成时显示) -->
      <div v-else-if="uploadProgress === 100 && uploadedFile && selectedStep === 1" class="mb-4">
        <div class="border rounded-lg overflow-hidden">
          <!-- 功能栏 -->
          <div class="flex justify-end items-center border-b bg-muted p-4">
            <div class="flex space-x-2">
              <button 
                @click="resetUpload"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.ocrAnalysis.upload.reupload') }}
              </button>
              <button 
                @click="startProcessing"
                class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.ocrAnalysis.upload.startProcessing') }}
              </button>
            </div>
          </div>
          
          <div class="p-3 bg-green-50 border border-green-200">
            <div class="flex items-center text-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>{{ t('center.ocrAnalysis.upload.uploadComplete') }}</span>
            </div>
          </div>
          
          <!-- 已上传文件信息 -->
          <div class="p-4">
            <div class="flex items-start">
              <div class="rounded bg-muted p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="font-medium">{{ uploadedFile.name }}</p>
                <p class="text-sm text-muted-foreground">{{ formatFileSize(uploadedFile.size) }}</p>
                <div v-if="pdfPageCount > 0" class="mt-2 flex items-center text-sm">
                  <span class="text-muted-foreground mr-2">{{ t('center.ocrAnalysis.upload.pageCount') }}:</span>
                  <span class="font-medium">{{ pdfPageCount }} {{ t('center.ocrAnalysis.upload.pages') }}</span>
                </div>
                <div class="mt-2 flex items-center text-sm">
                  <span class="text-muted-foreground mr-2">{{ t('center.ocrAnalysis.upload.requiredPoints') }}:</span>
                  <span class="font-medium">{{ pdfPageCount }} {{ t('center.ocrAnalysis.upload.points') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        v-else-if="uploadProgress === 0 && !uploadedFile && selectedStep === 1"
        @dragover.prevent
        @drop.prevent="handleDrop"
        class="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
        @click="fileInputRef?.click()"
      >
        <div class="flex flex-col items-center justify-center">
          <div class="rounded-full bg-primary/10 p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <p class="font-medium mb-1">{{ t('center.ocrAnalysis.upload.dragDrop') }}</p>
          <p class="text-sm text-muted-foreground mb-4">{{ t('center.ocrAnalysis.upload.supportedFormats') }}</p>
          <button class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            {{ t('center.ocrAnalysis.upload.browseFiles') }}
          </button>
        </div>
        <input 
          ref="fileInputRef"
          type="file" 
          class="hidden" 
          @change="handleFileSelect"
          accept=".jpg,.jpeg,.png,.pdf,.tiff,.bmp"
        >
      </div>
    </div>

    
    <!-- OCR功能介绍 -->
    <div class="rounded-lg bg-card border p-6 shadow-sm">
      <h2 class="text-xl font-semibold mb-4">{{ t('center.ocrAnalysis.features.title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="border rounded-lg p-4">
          <div class="flex items-center mb-2">
            <div class="rounded-full bg-primary/10 p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="font-medium">{{ t('center.ocrAnalysis.features.document.title') }}</h3>
          </div>
          <p class="text-sm text-muted-foreground">{{ t('center.ocrAnalysis.features.document.description') }}</p>
        </div>
        
        <div class="border rounded-lg p-4">
          <div class="flex items-center mb-2">
            <div class="rounded-full bg-primary/10 p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 class="font-medium">{{ t('center.ocrAnalysis.features.accuracy.title') }}</h3>
          </div>
          <p class="text-sm text-muted-foreground">{{ t('center.ocrAnalysis.features.accuracy.description') }}</p>
        </div>
        
        <div class="border rounded-lg p-4">
          <div class="flex items-center mb-2">
            <div class="rounded-full bg-primary/10 p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 class="font-medium">{{ t('center.ocrAnalysis.features.export.title') }}</h3>
          </div>
          <p class="text-sm text-muted-foreground">{{ t('center.ocrAnalysis.features.export.description') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { marked } from 'marked'
import { isPdfFile, getPdfPageCount } from '../../utils/pdfUtils'

// Props定义
interface Props {
  user: any
  currentLocale: string
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
  currentLocale: 'en-US'
})

// Emits定义
const emit = defineEmits<{
  'switch-language': [locale: string]
}>()

// 获取i18n实例
const { t, locale } = useI18n()

// 当前步骤状态 (1-4)
const currentStep = ref(1) // 默认设置为第1步（上传文件）

// 选中步骤状态 (1-4)
const selectedStep = ref(1) // 默认选中当前步骤

// 上传进度状态
const uploadProgress = ref(0)

// OCR处理进度
const ocrProgress = ref(0)

// 已上传文件
const uploadedFile = ref<File | null>(null)

// PDF页数
const pdfPageCount = ref<number>(0)

// 上传到R2后的文件信息
const uploadedFileInfo = ref<{
  fileId: string
  filename: string
  contentType: string
  size: number
} | null>(null)

// 图片预览相关
const previewImages = ref<string[]>([
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1547061548-4893b5d9d5d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
])
const currentImageIndex = ref(0)

// MD编辑器相关
const mdContent = ref(`# ${t('center.ocrAnalysis.editor.defaultTitle')}\n\n${t('center.ocrAnalysis.editor.defaultContent')}`)
const mdEditMode = ref<'edit' | 'preview' | 'split'>('split')

// 选中步骤的方法
const selectStep = (step: number) => {
  // 只允许选中已完成或当前步骤
  if (step <= currentStep.value) {
    selectedStep.value = step
  }
}

// 根据选中步骤获取标题
const getStepTitle = () => {
  switch (selectedStep.value) {
    case 1:
      return t('center.ocrAnalysis.steps.upload')
    case 2:
      return t('center.ocrAnalysis.steps.analysis')
    case 3:
      return t('center.ocrAnalysis.steps.edit')
    case 4:
      return t('center.ocrAnalysis.steps.export')
    default:
      return t('center.ocrAnalysis.steps.upload')
  }
}

// 渲染Markdown内容
const renderedMarkdown = computed(() => {
  // 配置marked选项
  marked.setOptions({
    breaks: true,
    gfm: true
  })
  
  return marked.parse(mdContent.value)
})

// 监听当前步骤变化，自动更新选中节点
watch(currentStep, (newStep) => {
  selectedStep.value = newStep
  
  // 当进入步骤2时，开始模拟OCR处理进度
  if (newStep === 2) {
    simulateOCRProcessing()
  }
  
  // 当进入步骤3时，初始化MD内容
  if (newStep === 3) {
    mdContent.value = `# ${t('center.ocrAnalysis.editor.defaultTitle')}

${t('center.ocrAnalysis.editor.defaultContent')}

## 示例

这是一个**粗体**文本和一个*斜体*文本。

1. 有序列表项1
2. 有序列表项2

- 无序列表项1
- 无序列表项2

> 这是一个引用块

\`\`\`javascript
console.log('Hello World');
\`\`\``
  }
})

// 计算进度条宽度
const progressBarWidth = computed(() => {
  switch (currentStep.value) {
    case 1:
      return '0%'
    case 2:
      return 'calc(33.333333% - 20px)'
    case 3:
      return 'calc(66.666667% - 20px)'
    case 4:
      return 'calc(100% - 40px)'
    default:
      return '0%'
  }
})

// 计算未完成部分的宽度
const incompleteWidth = computed(() => {
  switch (currentStep.value) {
    case 1:
      return 'calc(100% - 40px)'
    case 2:
      return 'calc(66.666667% - 20px)'
    case 3:
      return 'calc(33.333333% - 20px)'
    case 4:
      return '0%'
    default:
      return 'calc(100% - 40px)'
  }
})

// 计算流动虚线的样式
const flowingLineStyle = computed(() => {
  switch (currentStep.value) {
    case 1:
      return {
        left: 'calc(7px + 0%)',
        width: 'calc(33.333333% + 20px)'
      }
    case 2:
      return {
        left: 'calc(7px + 33.333333% - 20px)',
        width: 'calc(33.333333% + 20px)'
      }
    case 3:
      return {
        left: 'calc(7px + 66.666667% - 20px)',
        width: 'calc(33.333333% + 20px)'
      }
    default:
      return {
        display: 'none'
      }
  }
})

// 当前预览图片
const previewImage = computed(() => {
  return previewImages.value[currentImageIndex.value]
})

// 监听语言变化
watch(() => props.currentLocale, (newLocale) => {
  // @ts-ignore 忽略类型检查，因为 locale.value 需要特定类型但我们在运行时处理
  locale.value = newLocale
})

// 监听语言变化并更新状态文本
watch(() => props.currentLocale, () => {
  recentItems.value = recentItems.value.map(item => {
    if (item.status === t('center.ocrAnalysis.status.completed')) {
      return { ...item, status: t('center.ocrAnalysis.status.completed') }
    } else if (item.status === t('center.ocrAnalysis.status.processing')) {
      return { ...item, status: t('center.ocrAnalysis.status.processing') }
    } else {
      return { ...item, status: t('center.ocrAnalysis.status.completed') }
    }
  })
  
  // 更新MD内容以反映语言变化
  if (currentStep.value === 3) {
    mdContent.value = `# ${t('center.ocrAnalysis.editor.defaultTitle')}

${t('center.ocrAnalysis.editor.defaultContent')}

## 示例

这是一个**粗体**文本和一个*斜体*文本。

1. 有序列表项1
2. 有序列表项2

- 无序列表项1
- 无序列表项2

> 这是一个引用块

\`\`\`javascript
console.log('Hello World');
\`\`\``
  }
})

// 类型定义
interface RecentItem {
  id: string
  name: string
  date: string
  status: string
}

// 引用
const fileInputRef = ref<HTMLInputElement | null>(null)

// 模拟数据
const recentItems = ref<RecentItem[]>([
  { id: '1', name: 'document1.pdf', date: '2023-12-15', status: t('center.ocrAnalysis.status.completed') },
  { id: '2', name: 'scan1.png', date: '2023-12-14', status: t('center.ocrAnalysis.status.processing') },
  { id: '3', name: 'invoice.jpg', date: '2023-12-14', status: t('center.ocrAnalysis.status.completed') },
])

// 方法
const handleUpload = () => {
  console.log('Upload button clicked')
}

const handleDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    // 仅处理第一个文件（单文件上传）
    simulateUpload(files[0])
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    // 仅处理第一个文件（单文件上传）
    simulateUpload(files[0])
  }
}


// 模拟上传过程（保留作为备选方案）
const simulateUpload = async (file: File) => {
  // 保存文件到已上传文件
  uploadedFile.value = file
  
  console.log('File selected:', file)
  uploadProgress.value = 0
  
  // 如果是PDF文件，获取页数
  if (isPdfFile(file)) {
    try {
      pdfPageCount.value = await getPdfPageCount(file)
      console.log('PDF page count:', pdfPageCount.value)
    } catch (error) {
      console.error('Error getting PDF page count:', error)
      pdfPageCount.value = 0
    }
  } else {
    pdfPageCount.value = 0
  }
  
  const interval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      // 上传完成后不自动进入下一步
    }
  }, 200)
}

// 模拟OCR处理过程
const simulateOCRProcessing = () => {
  ocrProgress.value = 0
  const interval = setInterval(() => {
    ocrProgress.value += 5
    if (ocrProgress.value >= 100) {
      clearInterval(interval)
      // OCR处理完成后进入下一步
      currentStep.value = 3
    }
  }, 100)
}

// 重置上传状态
const resetUpload = () => {
  uploadedFile.value = null
  uploadedFileInfo.value = null
  uploadProgress.value = 0
  // 重置步骤为第1步
  currentStep.value = 1
  // 重置图片索引
  currentImageIndex.value = 0
}

// 获取状态类名
const getStatusClass = (status: string) => {
  switch (status) {
    case t('center.ocrAnalysis.status.completed'):
      return 'bg-green-100 text-green-800'
    case t('center.ocrAnalysis.status.processing'):
      return 'bg-yellow-100 text-yellow-800'
    case t('center.ocrAnalysis.status.failed'):
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 开始处理
const startProcessing = async () => {
  console.log('Start processing file:', uploadedFile.value)
  // 将步骤更新为第2步（OCR分析）
  currentStep.value = 2
  // 重置图片索引
  currentImageIndex.value = 0
  
  // 如果有上传的文件，则生成预览图像
  if (uploadedFile.value) {
    try {
      // 提高scale值以获得更清晰的图片
      previewImages.value = await getPdfPageImages(uploadedFile.value, 5)
    } catch (error) {
      console.error('Error generating preview images:', error)
      // 使用默认预览图像
      previewImages.value = [
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      ]
    }
  }
  
  // 这里可以添加实际的处理逻辑
}

const viewItem = (id: string) => {
  console.log('View item:', id)
}

const downloadItem = (id: string) => {
  console.log('Download item:', id)
}

// 图片预览相关方法
const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const nextImage = () => {
  if (currentImageIndex.value < previewImages.value.length - 1) {
    currentImageIndex.value++
  }
}

const goToImage = (index: number) => {
  currentImageIndex.value = index
}

// 处理图片加载错误
const handleImageError = (event: Event) => {
  console.warn('Image failed to load:', event.target)
  // 可以在这里设置一个默认的错误图片或者显示错误信息
  const imgElement = event.target as HTMLImageElement
  imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRTRFNkU3Ii8+CjxwYXRoIGQ9Ik0yNi41IDQ0LjVDMjYuNSA0Ni40MzkgMjguMDYxIDQ4IDMwIDQ4QzMyLjQ4NTMgNDggMzQuNSA0Ni40MzkgMzQuNSA0NC41QzM0LjUgNDIuNTYxIDMyLjQ4NTMgNDEgMzAgNDFDMjguMDYxIDQxIDI2LjUgNDIuNTYxIDI2LjUgNDQuNVoiIHN0cm9rZT0iI0IwQjRCNCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0yMiAyMkwyNiAyNk0yNiAyMkwyMiAyNk0yNCAyNEwzMiAyNE0yOCAxNkwyOCAzMCIgc3Ryb2tlPSIjQjBCNEI0IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K'
}

// 保存文档
const saveDocument = () => {
  console.log('Saving document:', mdContent.value)
  // 进入第4步（预览和导出）
  currentStep.value = 4
  selectedStep.value = 4
  // 不再显示提示
}

// 导出文档
const exportDocument = (format: string) => {
  console.log(`Exporting document as ${format}:`, mdContent.value)
  // 这里可以添加实际的导出逻辑
  alert(t('center.ocrAnalysis.preview.exporting', { format: format.toUpperCase() }))
}
</script>

<style scoped>
.flowing-dashed-line {
  width: 100%;
  height: 100%;
  border-top: 2px dashed #000;
  background: linear-gradient(90deg, transparent 50%, #000 50%);
  background-size: 20px 100%;
  animation: flow 1s linear infinite;
}

@keyframes flow {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 20px 0;
  }
}

/* Markdown预览样式 */
:deep(.prose) {
  max-width: none;
}

:deep(.prose h1) {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

:deep(.prose h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

:deep(.prose h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

:deep(.prose p) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.75;
}

:deep(.prose ul),
:deep(.prose ol) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
}

:deep(.prose li) {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

:deep(.prose pre) {
  background-color: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

:deep(.prose code) {
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 6px;
  padding: 0.2em 0.4em;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 85%;
}

:deep(.prose pre code) {
  background-color: transparent;
  padding: 0;
  font-size: 100%;
}

:deep(.prose blockquote) {
  border-left: 0.25em solid #dfe2e5;
  padding: 0 1em;
  margin: 0;
  color: #6a737d;
}

:deep(.prose a) {
  color: #0366d6;
  text-decoration: none;
}

:deep(.prose a:hover) {
  text-decoration: underline;
}

:deep(.prose img) {
  max-width: 100%;
  height: auto;
}

:deep(.prose hr) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid #e1e4e8;
}

:deep(.prose table) {
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border-collapse: collapse;
}

:deep(.prose th),
:deep(.prose td) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

:deep(.prose th) {
  background-color: #f6f8fa;
  font-weight: 600;
}
</style>

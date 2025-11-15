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
          v-if="currentStep > 1 && currentStep < 4"
          class="absolute top-11 h-0.5 hidden md:block"
          :style="flowingLineStyle"
        >
          <div class="flowing-dashed-line"></div>
        </div>
        
        <!-- Step 1: Upload File -->
        <div class="flex flex-col items-center w-full md:w-auto z-10 mb-4 md:mb-0">
          <div 
            class="flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-300 transform"
            :class="{
              'bg-primary text-primary-foreground shadow-lg scale-110': currentStep >= 1,
              'bg-muted text-muted-foreground': currentStep < 1
            }"
          >
            <span v-if="currentStep > 1">✓</span>
            <span v-else>1</span>
          </div>
          <span class="text-sm font-medium text-center">{{ t('center.ocrAnalysis.steps.upload') }}</span>
        </div>
        
        <!-- Step 2: OCR Analysis -->
        <div class="flex flex-col items-center w-full md:w-auto z-10 mb-4 md:mb-0">
          <div 
            class="flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-300 transform"
            :class="{
              'bg-primary text-primary-foreground shadow-lg scale-110': currentStep >= 2,
              'bg-muted text-muted-foreground': currentStep < 2
            }"
          >
            <span v-if="currentStep > 2">✓</span>
            <span v-else>2</span>
          </div>
          <span class="text-sm font-medium text-center">{{ t('center.ocrAnalysis.steps.analysis') }}</span>
        </div>
        
        <!-- Step 3: MD Editing -->
        <div class="flex flex-col items-center w-full md:w-auto z-10 mb-4 md:mb-0">
          <div 
            class="flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-300 transform"
            :class="{
              'bg-primary text-primary-foreground shadow-lg scale-110': currentStep >= 3,
              'bg-muted text-muted-foreground': currentStep < 3
            }"
          >
            <span v-if="currentStep > 3">✓</span>
            <span v-else>3</span>
          </div>
          <span class="text-sm font-medium text-center">{{ t('center.ocrAnalysis.steps.edit') }}</span>
        </div>
        
        <!-- Step 4: Preview & Export -->
        <div class="flex flex-col items-center w-full md:w-auto z-10">
          <div 
            class="flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-300 transform"
            :class="{
              'bg-primary text-primary-foreground shadow-lg scale-110': currentStep >= 4,
              'bg-muted text-muted-foreground': currentStep < 4
            }"
          >
            <span v-if="currentStep > 4">✓</span>
            <span v-else>4</span>
          </div>
          <span class="text-sm font-medium text-center">{{ t('center.ocrAnalysis.steps.export') }}</span>
        </div>
      </div>
    </div>

    <!-- 上传区域 -->
    <div class="rounded-lg bg-card border p-6 shadow-sm">
      <h2 class="text-xl font-semibold mb-4">{{ t('center.ocrAnalysis.upload.title') }}</h2>
      <div 
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
          multiple
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

    <!-- 最近OCR处理记录 -->
    <div class="rounded-lg bg-card border shadow-sm overflow-hidden">
      <div class="p-5 border-b">
        <h3 class="font-semibold">{{ t('center.ocrAnalysis.recent.title') }}</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b hover:bg-muted/50 transition-colors">
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.ocrAnalysis.recent.table.name') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.ocrAnalysis.recent.table.date') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.ocrAnalysis.recent.table.status') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-right font-medium text-muted-foreground">
                {{ t('center.ocrAnalysis.recent.table.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in recentItems" 
              :key="item.id"
              class="border-b hover:bg-muted/50 transition-colors"
            >
              <td class="whitespace-nowrap py-4 px-4">
                <div class="flex items-center">
                  <div class="rounded bg-muted p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">{{ item.name }}</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap py-4 px-4 text-muted-foreground">
                {{ item.date }}
              </td>
              <td class="whitespace-nowrap py-4 px-4">
                <span :class="['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', getStatusClass(item.status)]">
                  {{ item.status }}
                </span>
              </td>
              <td class="whitespace-nowrap py-4 px-4 text-right">
                <div class="flex justify-end items-center space-x-2">
                  <button 
                    @click="viewItem(item.id)"
                    class="p-1 text-muted-foreground hover:text-primary rounded-full hover:bg-primary/10 transition-colors"
                    :aria-label="t('center.ocrAnalysis.recent.actions.view')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button 
                    @click="downloadItem(item.id)"
                    class="p-1 text-muted-foreground hover:text-primary rounded-full hover:bg-primary/10 transition-colors"
                    :aria-label="t('center.ocrAnalysis.recent.actions.download')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="recentItems.length === 0">
              <td colspan="4" class="py-8 px-4 text-center text-muted-foreground">
                {{ t('center.ocrAnalysis.recent.empty') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'

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
const currentStep = ref(2) // 默认设置为第2步以便查看效果

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
    console.log('Files dropped:', files)
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    console.log('Files selected:', files)
  }
}

const viewItem = (id: string) => {
  console.log('View item:', id)
}

const downloadItem = (id: string) => {
  console.log('Download item:', id)
}

const getStatusClass = (status: string) => {
  if (status === t('center.ocrAnalysis.status.completed')) {
    return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
  } else if (status === t('center.ocrAnalysis.status.processing')) {
    return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
  } else {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400'
  }
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
</style>

<template>
  <div class="space-y-6 py-6">
    <!-- 页面标题 -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">{{ t('center.tools.title') }}</h1>
        <p class="text-muted-foreground mt-1">{{ t('center.tools.subtitle') }}</p>
      </div>
    </div>

    <!-- 工具功能介绍 -->
    <div class="rounded-lg bg-card border p-6 shadow-sm">
      <h2 class="text-xl font-semibold mb-4">{{ t('center.tools.features.title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="tool in tools" 
          :key="tool.key"
          @click="selectTool(tool.key)"
          :class="[
            'border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md',
            selectedTool === tool.key ? 'border-primary ring-2 ring-primary/20' : ''
          ]"
        >
          <div class="flex items-center mb-2">
            <div class="rounded-full bg-primary/10 p-2 mr-3">
              <component :is="tool.icon" class="h-5 w-5 text-primary" />
            </div>
            <h3 class="font-medium">{{ t(tool.title) }}</h3>
          </div>
          <p class="text-sm text-muted-foreground">{{ t(tool.description) }}</p>
        </div>
      </div>
    </div>

    <!-- 工具详情区域 -->
    <div class="rounded-lg bg-card border p-6 shadow-sm">
      <div v-if="selectedTool === 'pdfConverter'">
        <h2 class="text-xl font-semibold mb-4">{{ t('center.tools.pdfConverter.title') }}</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 class="font-medium mb-2">{{ t('center.tools.pdfConverter.input') }}</h3>
            <div 
              @dragover.prevent
              @drop.prevent="handleDrop"
              class="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              @click="fileInputRef?.click()"
            >
              <div class="flex flex-col items-center justify-center">
                <div class="rounded-full bg-primary/10 p-3 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12m-9-9h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2z" />
                  </svg>
                </div>
                <p class="font-medium mb-1">{{ t('center.tools.pdfConverter.dragDrop') }}</p>
                <p class="text-sm text-muted-foreground mb-4">{{ t('center.tools.pdfConverter.supportedFormats') }}</p>
                <button class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  {{ t('center.tools.pdfConverter.browseFiles') }}
                </button>
              </div>
              <input 
                ref="fileInputRef"
                type="file" 
                class="hidden" 
                @change="handleFileSelect"
                accept=".jpg,.jpeg,.png,.tiff,.bmp"
                multiple
              >
            </div>
          </div>
          
          <div>
            <h3 class="font-medium mb-2">{{ t('center.tools.pdfConverter.output') }}</h3>
            <div class="border rounded-lg p-4">
              <div class="flex justify-between items-center mb-3">
                <span>{{ t('center.tools.pdfConverter.fileName') }}</span>
                <input 
                  v-model="pdfFileName" 
                  type="text" 
                  class="rounded-md border border-input bg-background px-2 py-1 text-sm w-40"
                  :placeholder="t('center.tools.pdfConverter.fileNamePlaceholder')"
                >
              </div>
              <div class="flex justify-between items-center mb-3">
                <span>{{ t('center.tools.pdfConverter.quality') }}</span>
                <select 
                  v-model="pdfQuality" 
                  class="rounded-md border border-input bg-background px-2 py-1 text-sm"
                >
                  <option value="high">{{ t('center.tools.pdfConverter.qualityHigh') }}</option>
                  <option value="medium">{{ t('center.tools.pdfConverter.qualityMedium') }}</option>
                  <option value="low">{{ t('center.tools.pdfConverter.qualityLow') }}</option>
                </select>
              </div>
              <button 
                @click="convertToPdf"
                class="w-full mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.tools.pdfConverter.convertButton') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="selectedTool === 'imageCompressor'">
        <h2 class="text-xl font-semibold mb-4">{{ t('center.tools.imageCompressor.title') }}</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 class="font-medium mb-2">{{ t('center.tools.imageCompressor.input') }}</h3>
            <div 
              @dragover.prevent
              @drop.prevent="handleDrop"
              class="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              @click="fileInputRef?.click()"
            >
              <div class="flex flex-col items-center justify-center">
                <div class="rounded-full bg-primary/10 p-3 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p class="font-medium mb-1">{{ t('center.tools.imageCompressor.dragDrop') }}</p>
                <p class="text-sm text-muted-foreground mb-4">{{ t('center.tools.imageCompressor.supportedFormats') }}</p>
                <button class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  {{ t('center.tools.imageCompressor.browseFiles') }}
                </button>
              </div>
              <input 
                ref="fileInputRef"
                type="file" 
                class="hidden" 
                @change="handleFileSelect"
                accept=".jpg,.jpeg,.png,.tiff,.bmp"
                multiple
              >
            </div>
          </div>
          
          <div>
            <h3 class="font-medium mb-2">{{ t('center.tools.imageCompressor.output') }}</h3>
            <div class="border rounded-lg p-4">
              <div class="flex justify-between items-center mb-3">
                <span>{{ t('center.tools.imageCompressor.compression') }}</span>
                <div class="flex items-center">
                  <span class="text-sm mr-2">{{ compressionLevel }}%</span>
                  <input 
                    v-model="compressionLevel" 
                    type="range" 
                    min="10" 
                    max="90" 
                    step="5"
                    class="w-32"
                  >
                </div>
              </div>
              <div class="flex justify-between items-center mb-3">
                <span>{{ t('center.tools.imageCompressor.format') }}</span>
                <select 
                  v-model="outputFormat" 
                  class="rounded-md border border-input bg-background px-2 py-1 text-sm"
                >
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
              <button 
                @click="compressImage"
                class="w-full mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {{ t('center.tools.imageCompressor.compressButton') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <div class="rounded-full bg-primary/10 p-4 inline-block mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h3 class="text-xl font-medium mb-2">{{ t('center.tools.selectTool') }}</h3>
        <p class="text-muted-foreground">{{ t('center.tools.selectToolDescription') }}</p>
      </div>
    </div>

    <!-- 最近工具使用记录 -->
    <div class="rounded-lg bg-card border shadow-sm overflow-hidden">
      <div class="p-5 border-b">
        <h3 class="font-semibold">{{ t('center.tools.recent.title') }}</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b hover:bg-muted/50 transition-colors">
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.tools.recent.table.tool') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.tools.recent.table.date') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.tools.recent.table.status') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-right font-medium text-muted-foreground">
                {{ t('center.tools.recent.table.actions') }}
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
                <div class="font-medium">{{ t(item.tool) }}</div>
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
                    :aria-label="t('center.tools.recent.actions.view')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button 
                    @click="downloadItem(item.id)"
                    class="p-1 text-muted-foreground hover:text-primary rounded-full hover:bg-primary/10 transition-colors"
                    :aria-label="t('center.tools.recent.actions.download')"
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
                {{ t('center.tools.recent.empty') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  FileText, 
  Image as ImageIcon, 
  Download, 
  Upload, 
  Scissors, 
  RotateCw 
} from 'lucide-vue-next'

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

// 监听语言变化
watch(() => props.currentLocale, (newLocale) => {
  // @ts-ignore 忽略类型检查，因为 locale.value 需要特定类型但我们在运行时处理
  locale.value = newLocale
})

// 监听语言变化并更新状态文本
watch(() => props.currentLocale, () => {
  recentItems.value = recentItems.value.map(item => {
    return {
      ...item,
      tool: t(item.tool), // 更新工具名称
      status: getStatusText(item.status) // 更新状态文本
    }
  })
})

// 状态文本映射函数
const getStatusText = (status: string) => {
  if (status === 'Completed' || status.includes(t('center.tools.status.completed'))) {
    return t('center.tools.status.completed')
  } else if (status === 'Processing' || status.includes(t('center.tools.status.processing'))) {
    return t('center.tools.status.processing')
  } else {
    return status
  }
}

// 类型定义
interface Tool {
  key: string
  title: string
  description: string
  icon: any
}

interface RecentItem {
  id: string
  tool: string
  date: string
  status: string
}

// 状态
const selectedTool = ref('')
const pdfFileName = ref('')
const pdfQuality = ref('high')
const compressionLevel = ref(50)
const outputFormat = ref('jpg')

// 引用
const fileInputRef = ref<HTMLInputElement | null>(null)

// 工具列表
const tools: Tool[] = [
  { 
    key: 'pdfConverter', 
    title: 'center.tools.pdfConverter.title', 
    description: 'center.tools.pdfConverter.description', 
    icon: FileText 
  },
  { 
    key: 'imageCompressor', 
    title: 'center.tools.imageCompressor.title', 
    description: 'center.tools.imageCompressor.description', 
    icon: ImageIcon 
  },
  { 
    key: 'imageCropper', 
    title: 'center.tools.imageCropper.title', 
    description: 'center.tools.imageCropper.description', 
    icon: Scissors 
  },
  { 
    key: 'imageRotator', 
    title: 'center.tools.imageRotator.title', 
    description: 'center.tools.imageRotator.description', 
    icon: RotateCw 
  },
  { 
    key: 'batchProcessor', 
    title: 'center.tools.batchProcessor.title', 
    description: 'center.tools.batchProcessor.description', 
    icon: Upload 
  },
  { 
    key: 'fileDownloader', 
    title: 'center.tools.fileDownloader.title', 
    description: 'center.tools.fileDownloader.description', 
    icon: Download 
  }
]

// 模拟数据
const recentItems = ref<RecentItem[]>([
  { id: '1', tool: 'center.tools.pdfConverter.title', date: '2023-12-15', status: t('center.tools.status.completed') },
  { id: '2', tool: 'center.tools.imageCompressor.title', date: '2023-12-14', status: t('center.tools.status.processing') },
  { id: '3', tool: 'center.tools.imageCropper.title', date: '2023-12-14', status: t('center.tools.status.completed') },
])

// 方法
const selectTool = (toolKey: string) => {
  selectedTool.value = toolKey
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

const convertToPdf = () => {
  console.log('Converting to PDF with settings:', { 
    fileName: pdfFileName.value, 
    quality: pdfQuality.value 
  })
}

const compressImage = () => {
  console.log('Compressing image with settings:', { 
    compression: compressionLevel.value, 
    format: outputFormat.value 
  })
}

const viewItem = (id: string) => {
  console.log('View item:', id)
}

const downloadItem = (id: string) => {
  console.log('Download item:', id)
}

const getStatusClass = (status: string) => {
  if (status === t('center.tools.status.completed')) {
    return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
  } else if (status === t('center.tools.status.processing')) {
    return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
  } else {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400'
  }
}
</script>
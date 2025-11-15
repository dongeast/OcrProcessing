<template>
  <div class="space-y-6 py-6">
    <!-- 欢迎横幅 -->
    <Card class="mb-8 overflow-hidden">
      <div class="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-100 p-6 md:p-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">
              {{ t('center.dashboard.welcome') }}, {{ user && user.name ? user.name : t('center.menu.profile') }}!
            </h1>
            <p class="text-gray-200">
              {{ t('center.dashboard.subtitle') }}
            </p>
          </div>
          <div class="mt-4 md:mt-0 flex gap-4">
            <Button variant="outline">{{ t('center.dashboard.quickActions.addNew') }}</Button>
            <Button>{{ t('center.dashboard.quickActions.uploadDocument') }}</Button>
          </div>
        </div>
      </div>
    </Card>

    <!-- 页面标题 -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">{{ t('center.dashboard.title') }}</h1>
        <p class="text-muted-foreground mt-1">{{ t('center.dashboard.subtitle') }}</p>
      </div>
    </div>

    <!-- 数据概览卡片区域 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="(card, index) in overviewCards" 
        :key="card.key"
        class="group relative rounded-lg bg-card border p-5 shadow-sm overflow-hidden"
      >
        <!-- 背景装饰 -->
        <div 
          :class="['absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2', card.bgColor]"
        ></div>
        <div class="relative">
          <p class="text-sm font-medium text-muted-foreground">{{ card.label }}</p>
          <div class="mt-2 flex items-baseline justify-between">
            <h3 class="text-2xl font-bold tracking-tight">{{ card.value }}</h3>
            <p :class="['text-xs font-medium', card.changeColor]">
              {{ card.changeText }}
            </p>
          </div>
          <p v-if="card.subText" class="mt-1 text-xs text-muted-foreground">
            {{ card.subText }}
          </p>
        </div>
      </div>
    </div>

    <!-- 第二行布局：资源使用 + 功能卡片 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 资源使用卡片 -->
      <div class="rounded-lg bg-card border p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">{{ t('center.dashboard.resources.usage') }}</h3>
          <button class="text-xs text-primary hover:text-primary/80">
            {{ t('center.dashboard.viewDetails') }}
          </button>
        </div>
        
        <div class="space-y-4">
          <!-- 文件数量 -->
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span>{{ t('center.dashboard.resources.files') }}</span>
              <span>{{ resources.files.used }}/{{ resources.files.total }}</span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary rounded-full transition-all duration-1000 ease-in-out"
                :style="{ width: resources.files.percentage + '%' }"
              ></div>
            </div>
          </div>

          <!-- 存储空间 -->
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span>{{ t('center.dashboard.resources.storage') }}</span>
              <span>{{ resources.storage.used }}/{{ resources.storage.total }}</span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary rounded-full transition-all duration-1000 ease-in-out"
                :style="{ width: resources.storage.percentage + '%' }"
              ></div>
            </div>
          </div>

          <!-- API 调用 -->
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span>{{ t('center.dashboard.resources.apiCalls') }}</span>
              <span>{{ resources.apiCalls.used }}/{{ resources.apiCalls.total }}</span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary rounded-full transition-all duration-1000 ease-in-out"
                :style="{ width: resources.apiCalls.percentage + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧功能卡片区域 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:col-span-2">
        <!-- 上传新文件卡片 -->
        <div 
          @click="emit('upload-file')"
          class="group cursor-pointer rounded-lg bg-card border border-dashed p-5 shadow-sm transition-all duration-200 hover:border-primary hover:shadow"
        >
          <div class="flex items-center justify-center h-full space-x-4 text-center">
            <div class="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-medium">{{ t('center.dashboard.uploadCard.title') }}</h3>
              <p class="text-sm text-muted-foreground">{{ t('center.dashboard.uploadCard.description') }}</p>
            </div>
          </div>
        </div>

        <!-- 最近活动卡片 -->
        <div class="rounded-lg bg-card border p-5 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold">{{ t('center.dashboard.recentActivity') }}</h3>
            <button class="text-xs text-primary hover:text-primary/80">
              {{ t('center.dashboard.viewAll') }}
            </button>
          </div>
          <div class="space-y-3">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-3">
              <div class="mt-0.5 rounded-full bg-primary/10 p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{{ activity.description }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近文档表格 -->
    <div class="rounded-lg bg-card border shadow-sm overflow-hidden">
      <div class="p-5 border-b">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 class="font-semibold">{{ t('center.dashboard.recentDocuments') }}</h3>
          <div class="mt-3 sm:mt-0 flex items-center space-x-2">
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="search" 
                v-model="searchQuery" 
                :placeholder="t('center.dashboard.table.searchPlaceholder')" 
                class="pl-9 h-9 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full sm:w-auto"
              />
            </div>
            <select 
              v-model="sortBy" 
              class="h-9 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="date-desc">{{ t('center.dashboard.sortNewest') }}</option>
              <option value="date-asc">{{ t('center.dashboard.sortOldest') }}</option>
              <option value="name-asc">{{ t('center.dashboard.sortNameAsc') }}</option>
              <option value="name-desc">{{ t('center.dashboard.sortNameDesc') }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b hover:bg-muted/50 transition-colors">
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.dashboard.table.columns.name') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.dashboard.table.columns.type') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.dashboard.table.columns.size') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.dashboard.table.columns.status') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.dashboard.table.columns.date') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-right font-medium text-muted-foreground">
                {{ t('center.dashboard.table.columns.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="document in filteredDocuments" 
              :key="document.id"
              class="border-b hover:bg-muted/50 transition-colors"
            >
              <td class="whitespace-nowrap py-4 px-4">
                <div class="flex items-center space-x-3">
                  <div class="rounded bg-muted p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium truncate max-w-[180px]">{{ document.name }}</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap py-4 px-4 text-muted-foreground">
                {{ document.type }}
              </td>
              <td class="whitespace-nowrap py-4 px-4 text-muted-foreground">
                {{ document.size }}
              </td>
              <td class="whitespace-nowrap py-4 px-4">
                <span :class="['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', getStatusClass(document.status)]">
                  {{ document.status }}
                </span>
              </td>
              <td class="whitespace-nowrap py-4 px-4 text-muted-foreground">
                {{ document.date }}
              </td>
              <td class="whitespace-nowrap py-4 px-4 text-right">
                <div class="flex justify-end items-center space-x-2">
                  <button 
                    @click="emit('view-document', document.id)"
                    class="p-1 text-muted-foreground hover:text-primary rounded-full hover:bg-primary/10 transition-colors"
                    :aria-label="t('center.dashboard.table.actions.view')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button 
                    @click="emit('download-document', document.id)"
                    class="p-1 text-muted-foreground hover:text-primary rounded-full hover:bg-primary/10 transition-colors"
                    :aria-label="t('center.dashboard.table.actions.download')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button 
                    @click="emit('delete-document', document.id)"
                    class="p-1 text-muted-foreground hover:text-destructive rounded-full hover:bg-destructive/10 transition-colors"
                    :aria-label="t('center.dashboard.table.actions.delete')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredDocuments.length === 0">
              <td colspan="6" class="py-8 px-4 text-center text-muted-foreground">
                {{ t('center.dashboard.table.empty') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 border-t flex items-center justify-between">
        <div class="text-sm text-muted-foreground">
          {{ t('center.dashboard.table.showing', { count: filteredDocuments.length, total: documents.length }) }}
        </div>
        <div class="flex items-center space-x-2">
          <button 
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="inline-flex items-center justify-center rounded-md border border-input bg-background px-2 py-1 text-sm font-medium ring-offset-background hover:bg-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span class="px-2 text-sm font-medium">{{ currentPage }} / {{ totalPages }}</span>
          <button 
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="inline-flex items-center justify-center rounded-md border border-input bg-background px-2 py-1 text-sm font-medium ring-offset-background hover:bg-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// 获取i18n实例
const { t, locale } = useI18n()

// Props定义
interface Props {
  documents: Array<{
    id: string
    name: string
    type: string
    size: string
    status: string
    date: string
  }>
  overviewData?: {
    documents: number
    processed: number
    accuracy: string
    processingTime: string
  }
  resourcesData?: {
    files: {
      used: number
      total: number
      percentage: number
    }
    storage: {
      used: string
      total: string
      percentage: number
    }
    apiCalls: {
      used: number
      total: number
      percentage: number
    }
  }
  activities?: Array<{
    id: string
    description: string
    time: string
  }>
  user?: {
    name?: string
    email?: string
    image?: string
    bio?: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  documents: () => [],
  overviewData: () => ({
    documents: 42,
    processed: 38,
    accuracy: '98.5%',
    processingTime: '2.4s'
  }),
  resourcesData: () => ({
    files: { used: 24, total: 100, percentage: 24 },
    storage: { used: '456MB', total: '2GB', percentage: 23 },
    apiCalls: { used: 342, total: 1000, percentage: 34 }
  }),
  activities: () => [],
  user: undefined
})

// 活动列表作为computed属性
const mockActivities = computed(() => [
  { id: '1', description: t('center.dashboard.activities.uploaded', { name: 'Invoice.pdf' }), time: '2 hours ago' },
  { id: '2', description: t('center.dashboard.activities.processed', { name: 'Report.docx' }), time: '5 hours ago' },
  { id: '3', description: t('center.dashboard.activities.deleted', { name: 'OldFile.png' }), time: 'Yesterday' }
])

// Emits定义
const emit = defineEmits<{
  'upload-file': []
  'view-document': [id: string]
  'download-document': [id: string]
  'delete-document': [id: string]
}>()

// 类型定义
interface OverviewCard {
  key: string
  label: string
  value: string | number
  changeText: string
  changeColor: string
  subText?: string
  bgColor: string
}

// 响应式状态
const searchQuery = ref('')
const sortBy = ref('date-desc')
const currentPage = ref(1)
const itemsPerPage = 5

// 计算属性
const overviewCards = computed<OverviewCard[]>(() => [
  {
    key: 'documents',
    label: t('center.dashboard.cards.documents.label'),
    value: props.overviewData?.documents || 0,
    changeText: '+12%',
    changeColor: 'text-emerald-600',
    subText: t('center.dashboard.cards.documents.subText'),
    bgColor: 'bg-blue-500'
  },
  {
    key: 'processed',
    label: t('center.dashboard.cards.processed.label'),
    value: props.overviewData?.processed || 0,
    changeText: '+8%',
    changeColor: 'text-emerald-600',
    subText: t('center.dashboard.cards.processed.subText'),
    bgColor: 'bg-emerald-500'
  },
  {
    key: 'accuracy',
    label: t('center.dashboard.cards.accuracy.label'),
    value: props.overviewData?.accuracy || '0%',
    changeText: '+1.2%',
    changeColor: 'text-emerald-600',
    subText: t('center.dashboard.cards.accuracy.subText'),
    bgColor: 'bg-purple-500'
  },
  {
    key: 'processingTime',
    label: t('center.dashboard.cards.processingTime.label'),
    value: props.overviewData?.processingTime || '0s',
    changeText: '-15%',
    changeColor: 'text-emerald-600',
    subText: t('center.dashboard.cards.processingTime.subText'),
    bgColor: 'bg-amber-500'
  }
])

const resources = computed(() => props.resourcesData || {
  files: { used: 0, total: 0, percentage: 0 },
  storage: { used: '0MB', total: '0GB', percentage: 0 },
  apiCalls: { used: 0, total: 0, percentage: 0 }
})

const recentActivities = computed(() => props.activities.length > 0 ? props.activities : mockActivities.value)

// 过滤和排序文档
const filteredDocuments = computed(() => {
  let result = [...props.documents]
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(doc => 
      doc.name.toLowerCase().includes(query) ||
      doc.type.toLowerCase().includes(query) ||
      doc.status.toLowerCase().includes(query)
    )
  }
  
  // 排序
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })
  
  // 分页
  const startIndex = (currentPage.value - 1) * itemsPerPage
  return result.slice(startIndex, startIndex + itemsPerPage)
})

const totalPages = computed(() => {
  let filtered = [...props.documents]
  
  // 应用搜索过滤以计算总页数
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(doc => 
      doc.name.toLowerCase().includes(query) ||
      doc.type.toLowerCase().includes(query) ||
      doc.status.toLowerCase().includes(query)
    )
  }
  
  return Math.max(1, Math.ceil(filtered.length / itemsPerPage))
})

// 方法
const getStatusClass = (status: string) => {
  const lowerStatus = status.toLowerCase()
  if (lowerStatus.includes('completed') || lowerStatus.includes('success')) {
    return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
  } else if (lowerStatus.includes('processing') || lowerStatus.includes('pending')) {
    return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
  } else if (lowerStatus.includes('failed') || lowerStatus.includes('error')) {
    return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400'
  } else {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400'
  }
}
</script>

<style scoped>
/* 仪表盘区域样式 */
.overview-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

/* 卡片悬停效果 */
.group.relative:hover .absolute {
  transform: translate-x-1/2 -translate-y-1/2 scale(1.1);
  transition: transform 0.3s ease;
}

/* 资源使用进度条动画 */
@keyframes progress {
  0% { width: 0; }
}

/* 表格行悬停效果 */
tr.hover\:bg-muted\/50:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .table-responsive {
    display: block;
    overflow-x: auto;
  }
  
  .overview-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
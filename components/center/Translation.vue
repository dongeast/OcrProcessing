<template>
  <div class="space-y-6 py-6">
    <!-- 页面标题 -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">{{ t('center.translation.title') }}</h1>
        <p class="text-muted-foreground mt-1">{{ t('center.translation.subtitle') }}</p>
      </div>
      <button 
        @click="handleTranslate"
        class="mt-4 md:mt-0 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        {{ t('center.translation.translateButton') }}
      </button>
    </div>

    <!-- 翻译功能介绍 -->
    <div class="rounded-lg bg-card border p-6 shadow-sm">
      <h2 class="text-xl font-semibold mb-4">{{ t('center.translation.features.title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="border rounded-lg p-4">
          <div class="flex items-center mb-2">
            <div class="rounded-full bg-primary/10 p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h3 class="font-medium">{{ t('center.translation.features.multiLanguage.title') }}</h3>
          </div>
          <p class="text-sm text-muted-foreground">{{ t('center.translation.features.multiLanguage.description') }}</p>
        </div>
        
        <div class="border rounded-lg p-4">
          <div class="flex items-center mb-2">
            <div class="rounded-full bg-primary/10 p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="font-medium">{{ t('center.translation.features.document.title') }}</h3>
          </div>
          <p class="text-sm text-muted-foreground">{{ t('center.translation.features.document.description') }}</p>
        </div>
        
        <div class="border rounded-lg p-4">
          <div class="flex items-center mb-2">
            <div class="rounded-full bg-primary/10 p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 class="font-medium">{{ t('center.translation.features.accuracy.title') }}</h3>
          </div>
          <p class="text-sm text-muted-foreground">{{ t('center.translation.features.accuracy.description') }}</p>
        </div>
      </div>
    </div>

    <!-- 翻译区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 源文本 -->
      <div class="rounded-lg bg-card border p-6 shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">{{ t('center.translation.source.title') }}</h2>
          <select 
            v-model="sourceLanguage" 
            class="rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="en">{{ t('center.translation.languages.en') }}</option>
            <option value="zh">{{ t('center.translation.languages.zh') }}</option>
            <option value="ja">{{ t('center.translation.languages.ja') }}</option>
            <option value="ko">{{ t('center.translation.languages.ko') }}</option>
          </select>
        </div>
        <textarea
          v-model="sourceText"
          :placeholder="t('center.translation.source.placeholder')"
          class="w-full h-64 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        ></textarea>
      </div>

      <!-- 翻译结果 -->
      <div class="rounded-lg bg-card border p-6 shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">{{ t('center.translation.result.title') }}</h2>
          <select 
            v-model="targetLanguage" 
            class="rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="en">{{ t('center.translation.languages.en') }}</option>
            <option value="zh">{{ t('center.translation.languages.zh') }}</option>
            <option value="ja">{{ t('center.translation.languages.ja') }}</option>
            <option value="ko">{{ t('center.translation.languages.ko') }}</option>
          </select>
        </div>
        <div class="w-full h-64 rounded-md border border-input bg-background p-3 text-sm overflow-y-auto">
          {{ translatedText }}
        </div>
      </div>
    </div>

    <!-- 最近翻译记录 -->
    <div class="rounded-lg bg-card border shadow-sm overflow-hidden">
      <div class="p-5 border-b">
        <h3 class="font-semibold">{{ t('center.translation.recent.title') }}</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b hover:bg-muted/50 transition-colors">
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.translation.recent.table.source') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.translation.recent.table.target') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-left font-medium text-muted-foreground">
                {{ t('center.translation.recent.table.date') }}
              </th>
              <th class="whitespace-nowrap py-4 px-4 text-right font-medium text-muted-foreground">
                {{ t('center.translation.recent.table.actions') }}
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
                <div class="font-medium">{{ item.source }}</div>
                <div class="text-sm text-muted-foreground truncate max-w-[200px]">{{ item.sourceText }}</div>
              </td>
              <td class="whitespace-nowrap py-4 px-4">
                <div class="font-medium">{{ item.target }}</div>
                <div class="text-sm text-muted-foreground truncate max-w-[200px]">{{ item.translatedText }}</div>
              </td>
              <td class="whitespace-nowrap py-4 px-4 text-muted-foreground">
                {{ item.date }}
              </td>
              <td class="whitespace-nowrap py-4 px-4 text-right">
                <div class="flex justify-end items-center space-x-2">
                  <button 
                    @click="viewItem(item.id)"
                    class="p-1 text-muted-foreground hover:text-primary rounded-full hover:bg-primary/10 transition-colors"
                    :aria-label="t('center.translation.recent.actions.view')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button 
                    @click="downloadItem(item.id)"
                    class="p-1 text-muted-foreground hover:text-primary rounded-full hover:bg-primary/10 transition-colors"
                    :aria-label="t('center.translation.recent.actions.download')"
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
                {{ t('center.translation.recent.empty') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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
      source: getSourceLanguageText(item.source),
      target: getTargetLanguageText(item.target)
    }
  })
})

// 语言文本映射函数
const getSourceLanguageText = (langCode: string) => {
  switch (langCode) {
    case 'English': return t('center.translation.languages.en')
    case 'Chinese': return t('center.translation.languages.zh')
    case 'Japanese': return t('center.translation.languages.ja')
    case 'Korean': return t('center.translation.languages.ko')
    default: return langCode
  }
}

const getTargetLanguageText = (langCode: string) => {
  switch (langCode) {
    case 'English': return t('center.translation.languages.en')
    case 'Chinese': return t('center.translation.languages.zh')
    case 'Japanese': return t('center.translation.languages.ja')
    case 'Korean': return t('center.translation.languages.ko')
    default: return langCode
  }
}

// 类型定义
interface RecentItem {
  id: string
  source: string
  target: string
  sourceText: string
  translatedText: string
  date: string
}

// 状态
const sourceLanguage = ref('en')
const targetLanguage = ref('zh')
const sourceText = ref('')
const translatedText = ref('')

// 模拟数据
const recentItems = ref<RecentItem[]>([
  { 
    id: '1', 
    source: t('center.translation.languages.en'), 
    target: t('center.translation.languages.zh'), 
    sourceText: 'Hello, how are you today?', 
    translatedText: '你好，今天怎么样？', 
    date: '2023-12-15' 
  },
  { 
    id: '2', 
    source: t('center.translation.languages.zh'), 
    target: t('center.translation.languages.en'), 
    sourceText: '这是一个测试文本', 
    translatedText: 'This is a test text', 
    date: '2023-12-14' 
  },
])

// 方法
const handleTranslate = () => {
  // 模拟翻译过程
  if (sourceText.value.trim()) {
    translatedText.value = t('center.translation.result.translating')
    setTimeout(() => {
      translatedText.value = `${sourceText.value} (${t('center.translation.result.translated')})`
    }, 1000)
  }
}

const viewItem = (id: string) => {
  console.log('View item:', id)
}

const downloadItem = (id: string) => {
  console.log('Download item:', id)
}

// 监听语言变化
watch([sourceLanguage, targetLanguage], () => {
  if (sourceText.value) {
    handleTranslate()
  }
})
</script>
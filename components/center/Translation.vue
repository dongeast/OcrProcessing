<template>
  <div class="space-y-6 py-0">
    <!-- 页面标题 -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">{{ t('center.translation.title') }}</h1>
        <p class="text-muted-foreground mt-1">{{ t('center.translation.subtitle') }}</p>
      </div>
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
            <option value="en-US">{{ t('center.translation.languages.en') }}</option>
            <option value="zh-CN">{{ t('center.translation.languages.zh') }}</option>
            <option value="JP">{{ t('center.translation.languages.ja') }}</option>
            <option value="KO">{{ t('center.translation.languages.ko') }}</option>
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
            <option value="en-US">{{ t('center.translation.languages.en') }}</option>
            <option value="zh-CN">{{ t('center.translation.languages.zh') }}</option>
            <option value="JP">{{ t('center.translation.languages.ja') }}</option>
            <option value="KO">{{ t('center.translation.languages.ko') }}</option>
          </select>
        </div>
        <div class="w-full h-64 rounded-md border border-input bg-background p-3 text-sm overflow-y-auto">
          {{ translatedText }}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

// Props定义
interface Props {
  user: any
  currentLocale?: string
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
  currentLocale: 'en-US'
})

// Emits定义
const emit = defineEmits<{
  'switch-language': [locale: string]
}>()

// 获取i18n实例、路由
const { t, locale: i18nLocale, setLocale } = useI18n()
const route = useRoute()

// 语言选项定义
const languageOptions = [
  { value: 'en-US', label: 'en' },
  { value: 'zh-CN', label: 'zh' },
  { value: 'zh-TW', label: 'zh' },
  { value: 'JP', label: 'ja' },
  { value: 'KO', label: 'ko' }
]

// 状态
const sourceLanguage = ref('en-US')
const targetLanguage = ref('zh-CN')
const sourceText = ref('')
const translatedText = ref('')

// 初始化组件，确保语言同步
onMounted(async () => {
  // 优先从路由获取语言参数
  const routeLocale = route.params.locale as string || route.query.locale as string
  const effectiveLocale = routeLocale || props.currentLocale
  
  // 确保使用有效的语言代码
  if (effectiveLocale && ['en-US', 'zh-CN', 'zh-TW', 'JP', 'KO'].includes(effectiveLocale)) {
    try {
      await setLocale(effectiveLocale)
      // 确保组件内部语言状态同步
      updateLanguageDisplay(effectiveLocale)
    } catch (error) {
      console.error('Failed to set locale:', error)
    }
  }
})

// 监听全局语言变化
watch(() => props.currentLocale, async (newLocale) => {
  if (newLocale && ['en-US', 'zh-CN', 'zh-TW', 'JP', 'KO'].includes(newLocale)) {
    try {
      await setLocale(newLocale)
      updateLanguageDisplay(newLocale)
    } catch (error) {
      console.error('Failed to update locale:', error)
    }
  }
}, { immediate: true })

// 更新语言显示
const updateLanguageDisplay = (currentLang: string) => {
  // 验证语言代码
  if (!languageOptions.some(option => option.value === currentLang)) {
    console.warn(`不支持的语言: ${currentLang}`);
    return;
  }
  
  // 确保至少有一个语言选项与当前语言匹配
  if (![sourceLanguage.value, targetLanguage.value].includes(currentLang)) {
    // 如果源语言不是默认语言，设置源语言为默认；否则设置目标语言为当前语言
    if (sourceLanguage.value !== 'en-US') {
      targetLanguage.value = currentLang
    } else {
      sourceLanguage.value = currentLang
    }
  }
  
  // 如果有源文本，重新翻译
  if (sourceText.value.trim()) {
    handleTranslate()
  }
  
  console.log(`语言已更新为: ${currentLang}`);
}

// 语言文本映射函数
const getLanguageText = (langCode: string) => {
  // 获取语言显示名称
  if (langCode === 'en-US') return t('center.translation.languages.en') || 'English'
  if (langCode === 'zh-CN' || langCode === 'zh-TW') return t('center.translation.languages.zh') || '中文'
  if (langCode === 'JP') return t('center.translation.languages.ja') || '日本語'
  if (langCode === 'KO') return t('center.translation.languages.ko') || '한국어'
  return langCode
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

// 模拟数据
const recentItems = ref<RecentItem[]>([
  { 
    id: '1', 
    source: getLanguageText('en-US'), 
    target: getLanguageText('zh-CN'), 
    sourceText: 'Hello, how are you today?', 
    translatedText: '你好，今天怎么样？', 
    date: '2023-12-15' 
  },
  { 
    id: '2', 
    source: getLanguageText('zh-CN'), 
    target: getLanguageText('en-US'), 
    sourceText: '这是一个测试文本', 
    translatedText: 'This is a test text', 
    date: '2023-12-14' 
  },
])

// 更新最近项目的语言显示
const updateRecentItemsLanguage = () => {
  recentItems.value = recentItems.value.map(item => {
    return {
      ...item,
      source: getLanguageText(item.source.includes('English') ? 'en-US' : 
                           item.source.includes('中文') ? 'zh-CN' : 
                           item.source.includes('日本語') ? 'JP' : 
                           item.source.includes('한국어') ? 'KO' : 'en-US'),
      target: getLanguageText(item.target.includes('English') ? 'en-US' : 
                           item.target.includes('中文') ? 'zh-CN' : 
                           item.target.includes('日本語') ? 'JP' : 
                           item.target.includes('한국어') ? 'KO' : 'zh-CN')
    }
  })
}

// 方法：处理翻译
const handleTranslate = () => {
  // 模拟翻译过程，但考虑不同语言对
  if (sourceText.value.trim()) {
    translatedText.value = t('center.translation.result.translating') || '翻译中...'
    
    setTimeout(() => {
      // 确保t函数正常工作，添加默认值
      const defaultTranslation = t('center.translation.result.translated') || '已翻译'
      
      // 根据语言对模拟不同的翻译结果
      if (sourceLanguage.value === 'en-US') {
        // 英文到其他语言
        if (targetLanguage.value === 'zh-CN' || targetLanguage.value === 'zh-TW') {
          // 英文到中文
          if (sourceText.value.toLowerCase().includes('hello')) {
            translatedText.value = '你好！' + sourceText.value.replace(/hello/i, '').trim()
          } else if (sourceText.value.toLowerCase().includes('thank')) {
            translatedText.value = '谢谢！' + sourceText.value.replace(/thank you/i, '').trim()
          } else {
            translatedText.value = '这是从英文翻译过来的: ' + sourceText.value
          }
        } else if (targetLanguage.value === 'JP') {
          translatedText.value = '日本語翻訳: ' + sourceText.value
        } else if (targetLanguage.value === 'KO') {
          translatedText.value = '한국어 번역: ' + sourceText.value
        } else {
          translatedText.value = sourceText.value
        }
      } else if (sourceLanguage.value === 'zh-CN' || sourceLanguage.value === 'zh-TW') {
        // 中文到其他语言
        if (targetLanguage.value === 'en-US') {
          if (sourceText.value.includes('你好')) {
            translatedText.value = 'Hello! ' + sourceText.value.replace('你好', '').trim()
          } else if (sourceText.value.includes('谢谢')) {
            translatedText.value = 'Thank you! ' + sourceText.value.replace('谢谢', '').trim()
          } else {
            translatedText.value = 'Translated from Chinese: ' + sourceText.value
          }
        } else if (targetLanguage.value === 'JP') {
          translatedText.value = '日本語翻訳（中国語から）: ' + sourceText.value
        } else if (targetLanguage.value === 'KO') {
          translatedText.value = '중국어에서 한국어로 번역: ' + sourceText.value
        } else {
          translatedText.value = sourceText.value
        }
      } else {
        // 其他语言对
        translatedText.value = `${sourceText.value} (${defaultTranslation})`
      }
    }, 800)
  }
}

// 方法：查看翻译记录
const viewItem = (id: string) => {
  console.log('View item:', id)
  // 在实际应用中，这里应该加载并显示完整的翻译记录
}

// 方法：下载翻译记录
const downloadItem = (id: string) => {
  console.log('Download item:', id)
  // 在实际应用中，这里应该提供下载功能
}

// 监听语言选择变化
watch([sourceLanguage, targetLanguage], () => {
  if (sourceText.value.trim()) {
    handleTranslate()
  }
})

// 监听全局语言变化，更新最近项目显示
watch(() => props.currentLocale, () => {
  updateRecentItemsLanguage()
}, { immediate: true })
</script>
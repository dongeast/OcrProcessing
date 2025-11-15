<template>
    <!-- 移动端汉堡菜单按钮 -->
    <button 
      @click="$emit('open-sidebar')" 
      class="md:hidden fixed left-4 top-4 z-40 p-2 rounded-md bg-white shadow-md"
      aria-label="Open menu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- 侧边栏遮罩层 -->
    <div 
      v-if="sidebarOpen && isMobile"
      @click="$emit('close-sidebar')"
      class="fixed inset-0 bg-black/50 z-20 md:hidden"
    ></div>

    <!-- 左侧固定菜单栏 -->
    <aside 
      :class="[
        'h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-30 shadow-sm overflow-y-auto',
        isMobile ? (sidebarOpen ? (isCollapsed ? 'w-20' : 'w-60') : '-translate-x-full') : (isCollapsed ? 'w-20' : 'w-60'),
        'transition-all duration-300 ease-in-out md:translate-x-0'
      ]"
    >
      <div class="flex flex-col h-full relative">
        <!-- 关闭按钮（仅移动端显示） -->
        <button 
          v-if="isMobile"
          @click="$emit('close-sidebar')"
          class="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 md:hidden"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- 收缩按钮（仅在桌面端显示） -->
        <button 
          v-if="!isMobile"
          @click="toggleCollapse"
          class="absolute top-2/3 -translate-y-1/2 -right-2 p-2 rounded-md bg-white border border-gray-200 shadow-lg hidden md:block z-50"
          :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-4 w-4 text-gray-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              v-if="isCollapsed" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M9 5l7 7-7 7" 
            />
            <path 
              v-else 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>

        <!-- 顶部Logo区域 -->
        <div class="aside-logo-area p-5 border-b flex items-center" :class="isCollapsed ? 'justify-center' : 'justify-between'">
          <div class="flex items-center" :class="isCollapsed ? 'space-x-0' : 'space-x-3'">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 flex-shrink-0">
              <rect width="32" height="32" rx="4" fill="#4F46E5"/>
              <path d="M8 10L16 16L8 22V10Z" fill="white" stroke="white" stroke-width="1"/>
              <path d="M16 10L24 16L16 22V10Z" fill="white" stroke="white" stroke-width="1"/>
              <path d="M10 8H22" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <path d="M10 24H22" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <h1 v-if="!isCollapsed" class="text-xl font-bold text-primary whitespace-nowrap overflow-hidden">OCR Processing</h1>
          </div>
        </div>

        <!-- 中间菜单区域 -->
        <nav class="aside-menu-area flex-1 py-5 overflow-y-auto">
          <ul class="space-y-2 px-3">
            <li v-for="item in menuItems" :key="item.key">
              <button
                @click="$emit('switch-tab', item.key)"
                :class="[
                  'flex items-center rounded-lg text-left w-full transition-all duration-200 ease-in-out',
                  'text-base font-medium',
                  isCollapsed ? 'justify-center p-3' : 'px-4 py-3',
                  activeTab === item.key
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
                :title="isCollapsed ? $t(item.label) : ''"
              >
                <component :is="item.icon" class="w-5 h-5 flex-shrink-0" :class="[isCollapsed ? '' : 'mr-3', activeTab === item.key ? 'text-primary' : 'text-gray-500']" />
                <span v-if="!isCollapsed" class="truncate">{{ $t(item.label) }}</span>
              </button>
            </li>
          </ul>
        </nav>

        <!-- 底部用户信息区域 -->
        <div class="aside-user-area p-4 border-t mt-auto bg-gray-50">
          <div class="flex items-center" :class="isCollapsed ? 'justify-center' : 'space-x-3'">
            <div class="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 flex-shrink-0">
              <User v-if="!user || !user.image" class="w-5 h-5 text-primary" />
              <img v-else 
                :src="user.image"
                :alt="user && user.name ? user.name : 'User'"
                class="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div v-if="!isCollapsed" class="min-w-0 flex-1">
              <h2 class="font-semibold text-base truncate">{{ user && user.name ? user.name : $t('center.menu.profile') }}</h2>
              <p class="text-xs text-muted-foreground truncate">{{ user && user.email ? user.email : '' }}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  User, 
  CreditCard, 
  Settings, 
  Lock, 
  Home,
  FileText,
  Languages,
  Wrench
} from 'lucide-vue-next'

// Props定义
interface Props {
  activeTab: string
  sidebarOpen: boolean
  user: any
}

const props = withDefaults(defineProps<Props>(), {
  activeTab: 'dashboard',
  sidebarOpen: false,
  user: null
})

// Emits定义
const emit = defineEmits<{
  'switch-tab': [tabKey: string]
  'open-sidebar': []
  'close-sidebar': []
  'toggle-collapse': [collapsed: boolean]
}>()

// 初始化i18n
const { t } = useI18n()

// 类型定义
interface MenuItem {
  key: string
  label: string
  icon: any
}

// 状态
const isMobile = ref(false) // 初始为false，在客户端挂载时设置
const isCollapsed = ref(false) // 侧边栏收缩状态

// 菜单项 - 添加仪表盘作为第一个选项
const menuItems: MenuItem[] = [
  { key: 'dashboard', label: 'center.menu.dashboard', icon: Home },
  { key: 'ocrAnalysis', label: 'center.menu.ocrAnalysis', icon: FileText },
  { key: 'translation', label: 'center.menu.translation', icon: Languages },
  { key: 'tools', label: 'center.menu.tools', icon: Wrench }
]

// 处理窗口大小变化的函数
const handleResize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
    // 在大屏幕上自动关闭侧边栏
    if (!isMobile.value) {
      emit('close-sidebar')
    }
  }
}

// 切换侧边栏收缩状态
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  // 保存状态到localStorage
  localStorage.setItem('sidebarCollapsed', isCollapsed.value.toString())
  // 发送事件通知父组件侧边栏状态已更改
  emit('toggle-collapse', isCollapsed.value)
}

// 监听窗口大小变化
onMounted(() => {
  // 客户端挂载后再设置窗口大小
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
    
    // 从localStorage恢复收缩状态
    const savedCollapseState = localStorage.getItem('sidebarCollapsed')
    if (savedCollapseState !== null) {
      isCollapsed.value = savedCollapseState === 'true'
    }
    
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
/* 侧边栏整体样式优化 */
aside {
  display: flex;
  flex-direction: column;
}

/* 顶部Logo区域样式 */
.aside-logo-area {
  transition: all 0.3s ease;
}

/* 中间菜单区域样式 */
.aside-menu-area {
  transition: all 0.3s ease;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
}

.aside-menu-area::-webkit-scrollbar {
  width: 4px;
}

.aside-menu-area::-webkit-scrollbar-track {
  background: transparent;
}

.aside-menu-area::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

/* 底部用户区域样式 */
.aside-user-area {
  transition: all 0.3s ease;
}

/* 响应式调整 */
@media (max-width: 767px) {
  .aside-logo-area {
    padding: 1rem;
  }
  
  .aside-logo-area h1 {
    font-size: 1.1rem;
  }
  
  .aside-logo-area img {
    width: 1.5rem;
    height: 1.5rem;
  }
}

/* 菜单按钮悬停效果优化 */
button[class*="bg-primary"] {
  transition: all 0.2s ease-in-out;
}

button[class*="hover:bg-gray-100"]:hover {
  transform: translateX(2px);
}

/* 收缩按钮旋转动画 */
.aside-logo-area button svg {
  transition: transform 0.3s ease;
}

.aside-logo-area button:hover svg {
  transform: scale(1.1);
}
</style>
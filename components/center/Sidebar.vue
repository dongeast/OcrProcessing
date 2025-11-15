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
        isMobile ? (sidebarOpen ? 'w-64' : '-translate-x-full') : 'w-64',
        'transition-all duration-300 ease-in-out md:translate-x-0 md:translate-none'
      ]"
    >
      <div class="flex flex-col h-full">
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

        <!-- 顶部Logo区域 -->
        <div class="aside-logo-area p-4 border-b flex items-center justify-center">
          <div class="flex items-center space-x-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8">
              <rect width="32" height="32" rx="4" fill="#4F46E5"/>
              <path d="M8 10L16 16L8 22V10Z" fill="white" stroke="white" stroke-width="1"/>
              <path d="M16 10L24 16L16 22V10Z" fill="white" stroke="white" stroke-width="1"/>
              <path d="M10 8H22" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <path d="M10 24H22" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <h1 class="text-xl font-bold text-primary">OCR Processing</h1>
          </div>
        </div>

        <!-- 中间菜单区域 -->
        <nav class="aside-menu-area flex-1 py-4 overflow-y-auto">
          <ul class="space-y-1 px-2">
            <li v-for="item in menuItems" :key="item.key">
              <button
                @click="$emit('switch-tab', item.key)"
                :class="[
                  'flex items-center px-3 py-2 rounded-md text-left w-full transition-colors',
                  activeTab === item.key
                    ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary pl-2'
                    : 'hover:bg-muted'
                ]"
              >
                <component :is="item.icon" class="w-5 h-5 mr-3" />
                {{ $t(item.label) }}
              </button>
            </li>
          </ul>
        </nav>

        <!-- 底部用户信息区域 -->
        <div class="aside-user-area p-4 border-t mt-auto bg-gray-50">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
              <User v-if="!user || !user.image" class="w-5 h-5 text-primary" />
              <img v-else 
                :src="user.image"
                :alt="user && user.name ? user.name : 'User'"
                class="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              <h2 class="font-medium">{{ user && user.name ? user.name : $t('center.menu.profile') }}</h2>
              <p class="text-xs text-muted-foreground">{{ user && user.email ? user.email : '' }}</p>
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
  Home
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

// 菜单项 - 添加仪表盘作为第一个选项
const menuItems: MenuItem[] = [
  { key: 'dashboard', label: 'center.menu.dashboard', icon: Home },
  { key: 'profile', label: 'center.menu.profile', icon: User },
  { key: 'account', label: 'center.menu.account', icon: Lock },
  { key: 'billing', label: 'center.menu.billing', icon: CreditCard },
  { key: 'settings', label: 'center.menu.settings', icon: Settings }
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

// 监听窗口大小变化
onMounted(() => {
  // 客户端挂载后再设置窗口大小
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
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

/* 高亮菜单悬停效果优化 */
button[class*="border-l-4"] {
  transition: all 0.2s ease-in-out;
}

button[class*="hover:bg-muted"]:hover {
  transform: translateX(2px);
}
</style>
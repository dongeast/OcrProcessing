<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- 侧边栏组件 -->
    <Sidebar 
      :user="user"
      :menu-items="menuItems"
      :active-tab="activeTab"
      :is-mobile="isMobile"
      :sidebar-open="sidebarOpen"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @switch-tab="switchTab"
    />

    <!-- 移动端汉堡菜单按钮 -->
    <button 
      @click="sidebarOpen = true" 
      class="md:hidden fixed left-4 top-4 z-40 p-2 rounded-md bg-white shadow-md"
      aria-label="Open menu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- 主内容区 -->
    <main :class="['flex-1 p-6 overflow-y-auto min-h-screen transition-all duration-300', isMobile ? '' : 'ml-64']">
      <!-- 欢迎横幅 -->
      <Card class="mb-8 overflow-hidden">
        <div class="bg-gradient-to-r from-primary/10 to-primary/5 p-6 md:p-8">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                {{ $t('center.dashboard.welcome') }}, {{ user && user.name ? user.name : $t('center.menu.profile') }}!
              </h1>
              <p class="text-muted-foreground">
                {{ $t('center.dashboard.subtitle') }}
              </p>
            </div>
            <div class="mt-4 md:mt-0 flex gap-4">
              <Button variant="outline">{{ $t('center.dashboard.quickActions.addNew') }}</Button>
              <Button>{{ $t('center.dashboard.quickActions.uploadDocument') }}</Button>
            </div>
          </div>
        </div>
      </Card>

      <div class="max-w-7xl mx-auto">
        <!-- 动态加载相应标签页组件 -->
        <Dashboard 
          v-if="activeTab === 'dashboard'"
          :documents="[]"
          :overview-stats="overviewStats"
          :recent-documents="recentDocuments"
          :recent-activities="recentActivities"
          @upload-document="handleUploadDocument"
          @view-all-documents="handleViewAllDocuments"
        />
        
        <Profile 
          v-else-if="activeTab === 'profile'" 
          :user="user"
          :profile-data="profileData"
          @update-profile="updateProfile"
          @cancel="handleProfileCancel"
        />
        
        <Account 
          v-else-if="activeTab === 'account'"
          @change-password="handleChangePassword"
          @delete-account="handleDeleteAccount"
        />
        
        <Billing 
          v-else-if="activeTab === 'billing'"
          :billing-history="billingHistory"
          @upgrade-plan="handleUpgradePlan"
          @add-payment-method="handleAddPaymentMethod"
          @edit-payment-method="handleEditPaymentMethod"
        />
        
        <Settings 
          v-else-if="activeTab === 'settings'"
          :user="user"
          :current-locale="currentLocale"
          @update:settings="handleUpdateSettings"
          @cancel="handleSettingsCancel"
          @switch-language="switchLanguage"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSession } from '~/lib/auth/auth-client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/center/Sidebar.vue'
import Dashboard from '@/components/center/Dashboard.vue'
import Profile from '@/components/center/Profile.vue'
import Account from '@/components/center/Account.vue'
import Billing from '@/components/center/Billing.vue'
import Settings from '@/components/center/Settings.vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User, CreditCard, Settings as SettingsIcon, Lock, Home } from 'lucide-vue-next'
import { useSwitchLocalePath } from '#imports'

// 组件已在上方导入

// 类型定义
interface MenuItem {
  key: string
  label: string
  icon: any
}

interface BillingHistoryItem {
  id: string
  description: string
  date: string
  amount: string
  status: string
}

interface EmailNotification {
  key: string
  label: string
  enabled: boolean
}

interface RecentDocument {
  id: string
  name: string
  type: string
  status: 'completed' | 'processing' | 'failed'
  date: string
}

interface RecentActivity {
  id: string
  description: string
  time: string
}

// 初始化
const { t, locale } = useI18n()
const router = useRouter()
const switchLocalePath = useSwitchLocalePath()
const { data: session } = useSession()

// 安全地访问用户数据，添加模拟数据作为备用
  const user = computed(() => {
    if (session && session.value && session.value.user) {
      return session.value.user
    }
    // 返回模拟用户数据作为临时解决方案
    return {
      name: 'Demo User',
      email: 'demo@example.com',
      image: null,
      bio: 'This is a demo user account'
    }
  })

  // 状态
  const activeTab = ref('dashboard') // 默认显示仪表盘
  const currentLocale = ref(locale.value)
  const sidebarOpen = ref(false) // 移动端侧边栏开关
  const isMobile = ref(false) // 初始为false，在客户端挂载时设置
  
  // 处理窗口大小变化的函数
  const handleResize = () => {
    if (typeof window !== 'undefined') {
      isMobile.value = window.innerWidth < 768
      // 在大屏幕上自动关闭侧边栏
      if (!isMobile.value) {
        sidebarOpen.value = false
      }
    }
  }
  
  // 监听窗口大小变化和其他初始化操作
  onMounted(() => {
    // 客户端挂载后再设置窗口大小和初始化
    if (typeof window !== 'undefined') {
      isMobile.value = window.innerWidth < 768
      
      // 添加resize事件监听器
      window.addEventListener('resize', handleResize)
      
      // 初始化标签页
      initializeTab()
    }
  })
  
  // 初始化时从URL参数读取activeTab
  const initializeTab = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const tabParam = urlParams.get('tab')
      if (tabParam && menuItems.some(item => item.key === tabParam)) {
        activeTab.value = tabParam
      }
    }
  }

// 菜单数据
const menuItems = [
  { key: 'dashboard', label: 'center.menu.dashboard', icon: Home },
  { key: 'profile', label: 'center.menu.profile', icon: User },
  { key: 'account', label: 'center.menu.account', icon: Lock },
  { key: 'billing', label: 'center.menu.billing', icon: CreditCard },
  { key: 'settings', label: 'center.menu.settings', icon: SettingsIcon }
]

// 语言选项
const localeOptions = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'JP', label: '日本語' },
  { value: 'KO', label: '한국어' }
]

// 仪表盘统计数据
const overviewStats = {
  totalDocuments: 128,
  avgProcessingTime: 3.2,
  accuracyRate: 98.5,
  storageUsed: '1.2 GB',
  storagePercent: 45
}

// 资源使用统计
const usageStats = {
  documents: 128,
  documentsPercent: 64,
  storage: '1.2 GB of 5 GB',
  storagePercent: 24
}

// 最近文档数据
const recentDocuments: RecentDocument[] = [
  { id: '1', name: 'Invoice-Q4-2023.pdf', type: 'PDF', status: 'completed', date: '2023-12-15' },
  { id: '2', name: 'Contract-Draft.docx', type: 'DOCX', status: 'completed', date: '2023-12-14' },
  { id: '3', name: 'Receipts-Jan-2023.zip', type: 'ZIP', status: 'processing', date: '2023-12-14' },
  { id: '4', name: 'Business-Presentation.pptx', type: 'PPTX', status: 'completed', date: '2023-12-13' },
  { id: '5', name: 'Handwritten-Notes.jpg', type: 'JPG', status: 'failed', date: '2023-12-12' }
]

// 最近活动数据
const recentActivities: RecentActivity[] = [
  { id: '1', description: 'Successfully processed Invoice-Q4-2023.pdf', time: '2 hours ago' },
  { id: '2', description: 'Updated account password', time: '1 day ago' },
  { id: '3', description: 'Added new payment method', time: '3 days ago' },
  { id: '4', description: 'Uploaded 5 new documents', time: '1 week ago' }
]

// 配置数据
const profileData = ref({
  name: '',
  email: '',
  bio: ''
})

const billingHistory: BillingHistoryItem[] = [
  { id: '1', description: 'Starter Plan', date: '2023-01-01', amount: '$9.00', status: 'Paid' },
  { id: '2', description: 'Starter Plan', date: '2022-12-01', amount: '$9.00', status: 'Paid' },
  { id: '3', description: 'Starter Plan', date: '2022-11-01', amount: '$9.00', status: 'Paid' }
]

const emailNotifications: EmailNotification[] = [
  { key: 'newsletter', label: 'center.settings.newsletter', enabled: true },
  { key: 'updates', label: 'center.settings.productUpdates', enabled: true },
  { key: 'security', label: 'center.settings.securityAlerts', enabled: true }
]

// 方法
const updateProfile = () => {
  // 这里应该调用 API 更新用户资料
  console.log('Updating profile:', profileData.value)
}

const switchLanguage = async (newLocale: string) => {
  currentLocale.value = newLocale
  locale.value = newLocale
  localStorage.setItem('userLocale', newLocale)
  
  const path = switchLocalePath(newLocale)
  if (path) {
    await router.push({
      path,
      query: router.currentRoute.value.query
    })
  }
}

// 组件事件处理函数
const handleUploadDocument = () => {
  console.log('Upload document clicked')
  // 处理文档上传逻辑
}

const handleViewAllDocuments = () => {
  console.log('View all documents clicked')
  // 处理查看所有文档逻辑
}

const handleProfileCancel = () => {
  console.log('Profile edit cancelled')
  // 重置表单或执行其他取消逻辑
}

const handleChangePassword = (passwordData: any) => {
  console.log('Change password:', passwordData)
  // 处理密码更改逻辑
}

const handleDeleteAccount = () => {
  console.log('Delete account requested')
  // 处理账户删除逻辑
}

const handleUpgradePlan = () => {
  console.log('Upgrade plan clicked')
  // 处理升级计划逻辑
}

const handleAddPaymentMethod = () => {
  console.log('Add payment method clicked')
  // 处理添加支付方式逻辑
}

const handleEditPaymentMethod = (paymentId: string) => {
  console.log('Edit payment method:', paymentId)
  // 处理编辑支付方式逻辑
}

const handleUpdateSettings = (settings: any) => {
  console.log('Update settings:', settings)
  // 处理设置更新逻辑
}

const handleSettingsCancel = () => {
  console.log('Settings edit cancelled')
  // 重置设置表单或执行其他取消逻辑
}

// 标签页切换函数，同时更新URL
const switchTab = (tabKey: string) => {
  activeTab.value = tabKey
  // 移动端点击后关闭侧边栏
  if (isMobile.value) {
    sidebarOpen.value = false
  }
  // 更新URL参数，不刷新页面
  const urlParams = new URLSearchParams(window.location.search)
  urlParams.set('tab', tabKey)
  
  // 构建新的URL
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`
  
  // 使用history.pushState更新URL而不刷新页面
  window.history.pushState({}, '', newUrl)
}

// 处理浏览器前进/后退按钮事件
const handlePopState = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const tabParam = urlParams.get('tab')
  if (tabParam && menuItems.some(item => item.key === tabParam)) {
    activeTab.value = tabParam
  } else {
    activeTab.value = 'dashboard'
  }
}

// 挂载时初始化
onMounted(() => {
  // 为开发/演示目的，暂时注释掉登录检查
  // 这样即使未登录也能访问页面，使用模拟数据
  // if (!session.value || !session.value.user) {
  //   router.push('/login')
  //   return
  // }
  
  // 安全地初始化用户数据，确保user.value始终存在
  if (user.value) {
    profileData.value.name = user.value.name || ''
    profileData.value.email = user.value.email || ''
    profileData.value.bio = user.value.bio || ''
  }
  
  // 添加popstate事件监听器，处理浏览器前进/后退按钮
  window.addEventListener('popstate', handlePopState)
  
  // 从 localStorage 恢复语言设置
  const savedLocale = localStorage.getItem('userLocale') || locale.value
  if (savedLocale) {
    currentLocale.value = savedLocale
    locale.value = savedLocale
  }
})

// 组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)
})
</script>

<style scoped>
/* 主页面布局样式 */
main {
  transition: all 0.3s ease-in-out;
}

/* 移动端适配 */
@media (max-width: 767px) {
  main {
    padding: 1rem;
  }
}
</style>
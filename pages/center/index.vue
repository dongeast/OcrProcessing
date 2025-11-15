<template>
  <div class="min-h-screen bg-gray-50 flex">
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

    <!-- 侧边栏遮罩层 -->
    <div 
      v-if="sidebarOpen && isMobile"
      @click="sidebarOpen = false"
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
          @click="sidebarOpen = false"
          class="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 md:hidden"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- 用户信息区域 -->
        <div class="p-4 border-b">
          <div class="flex items-center space-x-3">
            <img
              :src="user && user.image ? user.image : '/default-avatar.png'"
              :alt="user && user.name ? user.name : 'User'"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 class="text-lg font-bold">{{ user && user.name ? user.name : $t('center.menu.profile') }}</h2>
              <p class="text-sm text-muted-foreground">{{ user && user.email ? user.email : '' }}</p>
            </div>
          </div>
        </div>

        <!-- 导航菜单 -->
        <nav class="flex-1 py-4">
          <ul class="space-y-1 px-2">
            <li v-for="item in menuItems" :key="item.key">
              <button
                @click="switchTab(item.key)"
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

        <!-- 快速统计信息 -->
        <div class="p-4 border-t mt-auto">
          <h3 class="text-sm font-medium mb-3">{{ $t('center.dashboard.usageStats') }}</h3>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-sm mb-1">
                  <span>{{ $t('center.dashboard.stats.documents') }}</span>
                  <span class="font-medium">{{ usageStats?.documents || 0 }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full" :style="{ width: `${usageStats?.documentsPercent || 0}%` }"></div>
                </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                  <span>{{ $t('center.dashboard.stats.storage') }}</span>
                  <span class="font-medium">{{ usageStats?.storage || '0 GB' }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full" :style="{ width: `${usageStats?.storagePercent || 0}%` }"></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

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
          <!-- 仪表盘标签页 -->
          <div v-if="activeTab === 'dashboard'">
            <!-- 数据概览卡片 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card class="p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm font-medium text-muted-foreground">{{ $t('center.dashboard.stats.totalDocuments') }}</p>
                    <h3 class="text-2xl font-bold mt-1">{{ overviewStats.totalDocuments }}</h3>
                  </div>
                  <div class="p-2 rounded-full bg-blue-100 text-blue-600">
                    <File class="w-5 h-5" />
                  </div>
                </div>
                <div class="mt-2 flex items-center text-sm">
                  <span class="text-green-600 flex items-center">
                    <ChevronUp class="w-3 h-3 mr-1" />
                    12%
                  </span>
                  <span class="text-muted-foreground ml-2">{{ $t('center.dashboard.stats.comparedToLastMonth') }}</span>
                </div>
              </Card>
              <Card class="p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm font-medium text-muted-foreground">{{ $t('center.dashboard.stats.processingTime') }}</p>
                    <h3 class="text-2xl font-bold mt-1">{{ overviewStats.avgProcessingTime }}s</h3>
                  </div>
                  <div class="p-2 rounded-full bg-green-100 text-green-600">
                    <Clock class="w-5 h-5" />
                  </div>
                </div>
                <div class="mt-2 flex items-center text-sm">
                  <span class="text-green-600 flex items-center">
                    <ChevronUp class="w-3 h-3 mr-1" />
                    5%
                  </span>
                  <span class="text-muted-foreground ml-2">{{ $t('center.dashboard.stats.fasterThanAverage') }}</span>
                </div>
              </Card>
              <Card class="p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm font-medium text-muted-foreground">{{ $t('center.dashboard.stats.accuracyRate') }}</p>
                    <h3 class="text-2xl font-bold mt-1">{{ overviewStats.accuracyRate }}%</h3>
                  </div>
                  <div class="p-2 rounded-full bg-purple-100 text-purple-600">
                    <CheckCircle class="w-5 h-5" />
                  </div>
                </div>
                <div class="mt-2 flex items-center text-sm">
                  <span class="text-green-600 flex items-center">
                    <ChevronUp class="w-3 h-3 mr-1" />
                    2%
                  </span>
                  <span class="text-muted-foreground ml-2">{{ $t('center.dashboard.stats.improvedThisMonth') }}</span>
                </div>
              </Card>
              <Card class="p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm font-medium text-muted-foreground">{{ $t('center.dashboard.stats.storageUsed') }}</p>
                    <h3 class="text-2xl font-bold mt-1">{{ overviewStats.storageUsed }}</h3>
                  </div>
                  <div class="p-2 rounded-full bg-amber-100 text-amber-600">
                    <Database class="w-5 h-5" />
                  </div>
                </div>
                <div class="mt-2 flex items-center text-sm">
                  <span class="text-gray-600">{{ overviewStats.storagePercent }}% {{ $t('center.dashboard.stats.ofLimit') }}</span>
                </div>
              </Card>
            </div>

            <!-- 最近文档 -->
            <Card class="mb-6">
              <CardHeader>
                <div class="flex justify-between items-center">
                  <CardTitle>{{ $t('center.dashboard.recentDocuments') }}</CardTitle>
                  <Button variant="ghost" class="text-sm">{{ $t('center.dashboard.viewAll') }}</Button>
                </div>
                <CardDescription>{{ $t('center.dashboard.recentDocumentsDesc') }}</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr class="border-b">
                        <th class="text-left py-3 px-4 font-medium text-sm">{{ $t('center.dashboard.table.name') }}</th>
                        <th class="text-left py-3 px-4 font-medium text-sm">{{ $t('center.dashboard.table.type') }}</th>
                        <th class="text-left py-3 px-4 font-medium text-sm">{{ $t('center.dashboard.table.status') }}</th>
                        <th class="text-left py-3 px-4 font-medium text-sm">{{ $t('center.dashboard.table.date') }}</th>
                        <th class="text-right py-3 px-4 font-medium text-sm">{{ $t('center.dashboard.table.actions') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="document in recentDocuments" :key="document.id" class="border-b hover:bg-muted/50">
                        <td class="py-3 px-4">
                          <div class="flex items-center space-x-2">
                            <div class="p-1.5 rounded bg-primary/10 text-primary">
                              <FileText class="w-4 h-4" />
                            </div>
                            <span class="font-medium">{{ document.name }}</span>
                          </div>
                        </td>
                        <td class="py-3 px-4 text-muted-foreground">{{ document.type }}</td>
                        <td class="py-3 px-4">
                          <span 
                            class="px-2 py-1 text-xs rounded-full"
                            :class="{
                              'bg-green-100 text-green-800': document.status === 'completed',
                              'bg-blue-100 text-blue-800': document.status === 'processing',
                              'bg-red-100 text-red-800': document.status === 'failed'
                            }"
                          >
                            {{ $t(`center.dashboard.status.${document.status}`) }}
                          </span>
                        </td>
                        <td class="py-3 px-4 text-muted-foreground">{{ document.date }}</td>
                        <td class="py-3 px-4 text-right">
                          <div class="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                              <Eye class="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                              <Download class="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <!-- 功能卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle class="flex items-center">
                    <Upload class="w-5 h-5 mr-2 text-primary" />
                    {{ $t('center.dashboard.features.uploadNew') }}
                  </CardTitle>
                  <CardDescription>{{ $t('center.dashboard.features.uploadNewDesc') }}</CardDescription>
                </CardHeader>
                <CardContent class="flex flex-col items-center justify-center py-8 text-center">
                  <div class="p-4 rounded-full bg-primary/10 mb-4">
                    <Upload class="w-10 h-10 text-primary" />
                  </div>
                  <p class="mb-4 text-muted-foreground">{{ $t('center.dashboard.features.uploadDragDrop') }}</p>
                  <div class="w-full">
                    <Button class="w-full">
                      {{ $t('center.dashboard.features.uploadSelectFiles') }}
                    </Button>
                    <p class="mt-2 text-xs text-muted-foreground">{{ $t('center.dashboard.features.uploadSupportedFormats') }}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle class="flex items-center">
                    <History class="w-5 h-5 mr-2 text-primary" />
                    {{ $t('center.dashboard.features.recentActivity') }}
                  </CardTitle>
                  <CardDescription>{{ $t('center.dashboard.features.recentActivityDesc') }}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="space-y-4">
                    <div v-for="activity in recentActivities" :key="activity.id" class="flex">
                      <div class="mr-3">
                        <div class="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div class="w-0.5 h-full bg-gray-200 ml-0.75"></div>
                      </div>
                      <div>
                        <p class="font-medium">{{ activity.description }}</p>
                        <p class="text-sm text-muted-foreground">{{ activity.time }}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <!-- 个人资料标签页 -->
          <Card v-else-if="activeTab === 'profile'" class="shadow-sm">
            <CardHeader>
              <CardTitle class="text-2xl">{{ $t('center.tabs.profile.title') }}</CardTitle>
              <CardDescription>{{ $t('center.tabs.profile.description') }}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('center.profile.name') }}</label>
                    <input id="name" v-model="profileData.name" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('center.profile.email') }}</label>
                    <input id="email" v-model="profileData.email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" disabled />
                  </div>
                  <div class="md:col-span-2">
                    <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('center.profile.bio') }}</label>
                    <textarea id="bio" v-model="profileData.bio" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" rows="4" />
                  </div>
                </div>
                <div class="flex justify-end">
                  <Button @click="updateProfile">{{ $t('center.profile.updateProfile') }}</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- 账户标签页 -->
          <Card v-else-if="activeTab === 'account'" class="shadow-sm">
            <CardHeader>
              <CardTitle class="text-2xl">{{ $t('center.tabs.account.title') }}</CardTitle>
              <CardDescription>{{ $t('center.tabs.account.description') }}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-6">
                <div class="border rounded-lg p-4">
                  <h3 class="font-medium text-lg mb-4">{{ $t('center.account.changePassword') }}</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="current-password" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('center.account.currentPassword') }}</label>
                      <input id="current-password" type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                      <label for="new-password" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('center.account.newPassword') }}</label>
                      <input id="new-password" type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                      <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('center.account.confirmPassword') }}</label>
                      <input id="confirm-password" type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                  </div>
                  <div class="mt-4 flex justify-end">
                    <Button>{{ $t('center.account.updatePassword') }}</Button>
                  </div>
                </div>

                <div class="border rounded-lg p-4">
                  <h3 class="font-medium text-lg mb-4">{{ $t('center.account.deleteAccount') }}</h3>
                  <p class="text-muted-foreground mb-4">{{ $t('center.account.deleteAccountDescription') }}</p>
                  <Button variant="destructive">{{ $t('center.account.deleteAccount') }}</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- 账单标签页 -->
          <Card v-else-if="activeTab === 'billing'" class="shadow-sm">
            <CardHeader>
              <CardTitle class="text-2xl">{{ $t('center.tabs.billing.title') }}</CardTitle>
              <CardDescription>{{ $t('center.tabs.billing.description') }}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{{ $t('center.billing.currentPlan') }}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="font-medium text-lg">Starter Plan</h3>
                        <p class="text-muted-foreground">$9/month</p>
                      </div>
                      <Button>{{ $t('center.billing.upgradePlan') }}</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{{ $t('center.billing.paymentMethods') }}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div class="space-y-4">
                      <div class="flex items-center justify-between p-3 border rounded-lg">
                        <div class="flex items-center">
                          <div class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                          <div class="ml-4">
                            <p class="font-medium">Visa ending in 1234</p>
                            <p class="text-sm text-muted-foreground">Expires 12/2026</p>
                          </div>
                        </div>
                        <Button variant="outline">{{ $t('center.billing.edit') }}</Button>
                      </div>
                      <Button variant="outline" class="w-full">
                        {{ $t('center.billing.addPaymentMethod') }}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{{ $t('center.billing.billingHistory') }}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div class="space-y-4">
                      <div v-for="invoice in billingHistory" :key="invoice.id" class="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <p class="font-medium">{{ invoice.description }}</p>
                          <p class="text-sm text-muted-foreground">{{ invoice.date }}</p>
                        </div>
                        <div class="text-right">
                          <p class="font-medium">{{ invoice.amount }}</p>
                          <p class="text-sm text-muted-foreground">{{ invoice.status }}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <!-- 设置标签页 -->
          <Card v-else-if="activeTab === 'settings'" class="shadow-sm">
            <CardHeader>
              <CardTitle class="text-2xl">{{ $t('center.tabs.settings.title') }}</CardTitle>
              <CardDescription>{{ $t('center.tabs.settings.description') }}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-6">
                <div class="border rounded-lg p-4">
                  <h3 class="font-medium text-lg mb-4">{{ $t('center.settings.language') }}</h3>
                  <div class="flex items-center space-x-4">
                    <label for="language" class="block text-sm font-medium text-gray-700">{{ $t('center.settings.selectLanguage') }}</label>
                    <Select v-model="currentLocale" @update:model-value="switchLanguage">
                      <SelectTrigger id="language" class="w-[180px]">
                        <SelectValue :placeholder="$t('common.selectLanguage')" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem v-for="locale in localeOptions" :key="locale.value" :value="locale.value">
                          {{ locale.label }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div class="border rounded-lg p-4">
                  <h3 class="font-medium text-lg mb-4">{{ $t('center.settings.emailNotifications') }}</h3>
                  <div class="space-y-4">
                    <div v-for="notification in emailNotifications" :key="notification.key" class="flex items-center justify-between">
                      <label :for="notification.key">{{ $t(notification.label) }}</label>
                      <!-- 使用简单的开关替代 -->
                      <div class="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          :id="notification.key" 
                          class="sr-only" 
                          v-model="notification.enabled"
                        />
                        <div 
                          class="block w-10 h-6 rounded-full" 
                          :class="notification.enabled ? 'bg-primary' : 'bg-gray-300'"
                        ></div>
                        <div 
                          class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"
                          :class="notification.enabled ? 'transform translate-x-4' : ''"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </main>
      </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSession } from '~/lib/auth/auth-client'
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  User, 
  CreditCard, 
  Settings, 
  Lock, 
  Home, 
  File,
  Clock, 
  CheckCircle, 
  Database,
  ChevronUp,
  FileText,
  Eye,
  Download,
  Upload,
  History
} from 'lucide-vue-next'
import { useSwitchLocalePath } from '#imports'

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

// 安全地访问用户数据
  const user = computed(() => {
    if (session && session.value && session.value.user) {
      return session.value.user
    }
    return null
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

// 菜单项 - 添加仪表盘作为第一个选项
const menuItems: MenuItem[] = [
  { key: 'dashboard', label: 'center.menu.dashboard', icon: Home },
  { key: 'profile', label: 'center.menu.profile', icon: User },
  { key: 'account', label: 'center.menu.account', icon: Lock },
  { key: 'billing', label: 'center.menu.billing', icon: CreditCard },
  { key: 'settings', label: 'center.menu.settings', icon: Settings }
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
  // 检查用户是否已登录
  if (!session.value || !session.value.user) {
    router.push('/login')
    return
  }
  
  // 初始化用户数据
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
/* 添加任何特定的样式 */
</style>
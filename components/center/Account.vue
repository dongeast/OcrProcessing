<template>
  <div class="space-y-6 py-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-2xl font-bold tracking-tight">{{ $t('center.account.title') }}</h1>
      <p class="text-muted-foreground mt-1">{{ $t('center.account.subtitle') }}</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 修改密码部分 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 修改密码表单 -->
        <div class="rounded-lg bg-card border p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4">{{ $t('center.account.changePassword.title') }}</h2>
          <form @submit.prevent="handlePasswordChange" class="space-y-4">
            <!-- 当前密码 -->
            <div class="space-y-2">
              <label 
                for="currentPassword" 
                class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {{ $t('center.account.changePassword.currentPassword') }}
              </label>
              <div class="relative">
                <input
                  :type="showCurrentPassword ? 'text' : 'password'"
                  id="currentPassword"
                  v-model="passwordForm.currentPassword"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': errors.currentPassword }"
                />
                <button
                  type="button"
                  @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  <svg v-if="!showCurrentPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.currentPassword" class="text-destructive text-xs">
                {{ errors.currentPassword }}
              </p>
            </div>

            <!-- 新密码 -->
            <div class="space-y-2">
              <label 
                for="newPassword" 
                class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {{ $t('center.account.changePassword.newPassword') }}
              </label>
              <div class="relative">
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  id="newPassword"
                  v-model="passwordForm.newPassword"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': errors.newPassword }"
                />
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  <svg v-if="!showNewPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.newPassword" class="text-destructive text-xs">
                {{ errors.newPassword }}
              </p>
              
              <!-- 密码强度指示器 -->
              <div v-if="passwordForm.newPassword" class="mt-2">
                <div class="flex justify-between mb-1">
                  <span class="text-xs font-medium" :class="getPasswordStrengthClass()">
                    {{ getPasswordStrengthText() }}
                  </span>
                </div>
                <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-300 ease-in-out"
                    :style="{ width: getPasswordStrengthWidth() + '%', backgroundColor: getPasswordStrengthColor() }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- 确认新密码 -->
            <div class="space-y-2">
              <label 
                for="confirmPassword" 
                class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {{ $t('center.account.changePassword.confirmPassword') }}
              </label>
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="passwordForm.confirmPassword"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': errors.confirmPassword }"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="text-destructive text-xs">
                {{ errors.confirmPassword }}
              </p>
            </div>

            <!-- 密码要求提示 -->
            <div class="bg-muted/50 rounded-md p-3 text-xs text-muted-foreground space-y-1">
              <p>{{ $t('center.account.changePassword.passwordRequirements.title') }}</p>
              <ul class="list-disc list-inside space-y-0.5">
                <li>{{ $t('center.account.changePassword.passwordRequirements.length') }}</li>
                <li>{{ $t('center.account.changePassword.passwordRequirements.uppercase') }}</li>
                <li>{{ $t('center.account.changePassword.passwordRequirements.lowercase') }}</li>
                <li>{{ $t('center.account.changePassword.passwordRequirements.number') }}</li>
                <li>{{ $t('center.account.changePassword.passwordRequirements.special') }}</li>
              </ul>
            </div>

            <!-- 提交按钮 -->
            <div class="pt-2">
              <button
                type="submit"
                :disabled="isChangingPassword || !isPasswordValid"
                class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors"
              >
                <svg v-if="isChangingPassword" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isChangingPassword ? $t('center.account.changePassword.updating') : $t('center.account.changePassword.update') }}
              </button>
            </div>
          </form>
        </div>

        <!-- 安全设置 -->
        <div class="rounded-lg bg-card border p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4">{{ $t('center.account.security.title') }}</h2>
          
          <!-- 双因素认证 -->
          <div class="border-b pb-4 mb-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium">{{ $t('center.account.security.twoFactorAuth') }}</h3>
                <p class="text-sm text-muted-foreground mt-0.5">{{ $t('center.account.security.twoFactorAuthDesc') }}</p>
              </div>
              <button
                :disabled="isUpdatingSecurity"
                @click="toggleTwoFactorAuth"
                class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors"
              >
                {{ twoFactorEnabled ? $t('center.account.security.disable') : $t('center.account.security.enable') }}
              </button>
            </div>
          </div>

          <!-- 登录历史 -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-medium">{{ $t('center.account.security.loginHistory') }}</h3>
              <button class="text-xs text-primary hover:text-primary/80">
                {{ $t('center.account.security.viewAll') }}
              </button>
            </div>
            <div class="space-y-3">
              <div v-for="login in recentLogins" :key="login.id" class="flex items-center justify-between text-sm p-2 hover:bg-muted/50 rounded-md transition-colors">
                <div>
                  <p class="font-medium">{{ login.device }} - {{ login.location }}</p>
                  <p class="text-xs text-muted-foreground">{{ login.time }}</p>
                </div>
                <span :class="['text-xs font-medium', login.current ? 'text-emerald-600' : 'text-muted-foreground']">
                  {{ login.current ? $t('center.account.security.current') : '' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 删除账户部分 -->
      <div>
        <div class="rounded-lg bg-card border border-destructive/20 p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-2 text-destructive">{{ $t('center.account.deleteAccount.title') }}</h2>
          <p class="text-muted-foreground mb-4">
            {{ $t('center.account.deleteAccount.warning') }}
          </p>
          
          <!-- 删除确认 -->
          <div class="space-y-4">
            <div class="space-y-2">
              <label 
                for="deleteConfirm" 
                class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {{ $t('center.account.deleteAccount.confirmText') }}
              </label>
              <input
                type="text"
                id="deleteConfirm"
                v-model="deleteForm.confirmText"
                :placeholder="$t('center.account.deleteAccount.confirmPlaceholder')"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{ 'border-destructive focus-visible:ring-destructive': errors.deleteConfirm }"
              />
              <p v-if="errors.deleteConfirm" class="text-destructive text-xs">
                {{ errors.deleteConfirm }}
              </p>
            </div>

            <div class="space-y-2">
              <label 
                for="deletePassword" 
                class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {{ $t('center.account.deleteAccount.password') }}
              </label>
              <div class="relative">
                <input
                  :type="showDeletePassword ? 'text' : 'password'"
                  id="deletePassword"
                  v-model="deleteForm.password"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive focus-visible:ring-destructive': errors.deletePassword }"
                />
                <button
                  type="button"
                  @click="showDeletePassword = !showDeletePassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  <svg v-if="!showDeletePassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.deletePassword" class="text-destructive text-xs">
                {{ errors.deletePassword }}
              </p>
            </div>

            <!-- 重要提示 -->
            <div class="bg-destructive/10 text-destructive text-xs rounded-md p-3">
              <p>{{ $t('center.account.deleteAccount.important') }}</p>
              <ul class="list-disc list-inside mt-2 space-y-1">
                <li>{{ $t('center.account.deleteAccount.consequences.data') }}</li>
                <li>{{ $t('center.account.deleteAccount.consequences.access') }}</li>
                <li>{{ $t('center.account.deleteAccount.consequences.recovery') }}</li>
              </ul>
            </div>

            <!-- 删除按钮 -->
            <button
              @click="handleDeleteAccount"
              :disabled="isDeleting || !isDeleteFormValid"
              class="w-full inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors"
            >
              <svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isDeleting ? $t('center.account.deleteAccount.deleting') : $t('center.account.deleteAccount.delete') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Emits定义
const emit = defineEmits<{
  'change-password': [passwordData: { currentPassword: string; newPassword: string }]
  'delete-account': [deleteData: { confirmText: string; password: string }]
  'toggle-two-factor': [enabled: boolean]
}>()

// 初始化i18n
const { t } = useI18n()

// 表单数据
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const deleteForm = reactive({
  confirmText: '',
  password: ''
})

// 错误信息
const errors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  deleteConfirm: '',
  deletePassword: ''
})

// 状态
const isChangingPassword = ref(false)
const isDeleting = ref(false)
const isUpdatingSecurity = ref(false)
const twoFactorEnabled = ref(false)

// 密码可见性状态
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const showDeletePassword = ref(false)

// 登录历史数据（模拟）
const recentLogins = ref([
  {
    id: '1',
    device: 'Chrome on Windows',
    location: 'Beijing, China',
    time: t('center.account.security.currentSession'),
    current: true
  },
  {
    id: '2',
    device: 'Safari on iOS',
    location: 'Shanghai, China',
    time: 'Yesterday, 14:30',
    current: false
  },
  {
    id: '3',
    device: 'Firefox on MacOS',
    location: 'Guangzhou, China',
    time: '2 days ago',
    current: false
  }
])

// 计算属性
// 检查密码表单是否有效（用于启用/禁用提交按钮）
const isPasswordValid = computed(() => {
  return (
    passwordForm.currentPassword &&
    passwordForm.newPassword &&
    passwordForm.confirmPassword &&
    passwordForm.newPassword === passwordForm.confirmPassword &&
    checkPasswordStrength(passwordForm.newPassword) >= 2 // 至少中等强度
  )
})

// 检查删除表单是否有效
const isDeleteFormValid = computed(() => {
  return (
    deleteForm.confirmText === 'DELETE MY ACCOUNT' &&
    deleteForm.password
  )
})

// 方法
// 检查密码强度
const checkPasswordStrength = (password: string): number => {
  if (!password) return 0
  
  let strength = 0
  
  // 长度检查
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  
  // 包含数字
  if (/\d/.test(password)) strength++
  
  // 包含小写字母
  if (/[a-z]/.test(password)) strength++
  
  // 包含大写字母
  if (/[A-Z]/.test(password)) strength++
  
  // 包含特殊字符
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  // 归一化到0-4范围
  return Math.min(4, Math.floor(strength / 1.5))
}

// 获取密码强度文本
const getPasswordStrengthText = (): string => {
  const strength = checkPasswordStrength(passwordForm.newPassword)
  switch (strength) {
    case 0:
      return t('center.account.changePassword.strength.none')
    case 1:
      return t('center.account.changePassword.strength.weak')
    case 2:
      return t('center.account.changePassword.strength.medium')
    case 3:
      return t('center.account.changePassword.strength.good')
    case 4:
      return t('center.account.changePassword.strength.strong')
    default:
      return ''
  }
}

// 获取密码强度颜色
const getPasswordStrengthColor = (): string => {
  const strength = checkPasswordStrength(passwordForm.newPassword)
  switch (strength) {
    case 0:
      return '#e5e7eb'
    case 1:
      return '#ef4444'
    case 2:
      return '#f59e0b'
    case 3:
      return '#10b981'
    case 4:
      return '#059669'
    default:
      return '#e5e7eb'
  }
}

// 获取密码强度宽度百分比
const getPasswordStrengthWidth = (): number => {
  const strength = checkPasswordStrength(passwordForm.newPassword)
  return (strength / 4) * 100
}

// 获取密码强度文本类名
const getPasswordStrengthClass = (): string => {
  const strength = checkPasswordStrength(passwordForm.newPassword)
  switch (strength) {
    case 0:
      return 'text-muted-foreground'
    case 1:
      return 'text-destructive'
    case 2:
      return 'text-amber-600'
    case 3:
      return 'text-emerald-600'
    case 4:
      return 'text-emerald-700'
    default:
      return 'text-muted-foreground'
  }
}

// 验证密码表单
const validatePasswordForm = (): boolean => {
  // 重置错误
  errors.currentPassword = ''
  errors.newPassword = ''
  errors.confirmPassword = ''
  
  let isValid = true
  
  // 验证当前密码
  if (!passwordForm.currentPassword) {
    errors.currentPassword = t('center.account.errors.required', { field: t('center.account.changePassword.currentPassword') })
    isValid = false
  }
  
  // 验证新密码
  if (!passwordForm.newPassword) {
    errors.newPassword = t('center.account.errors.required', { field: t('center.account.changePassword.newPassword') })
    isValid = false
  } else {
    // 检查密码强度
    const strength = checkPasswordStrength(passwordForm.newPassword)
    if (strength < 2) {
      errors.newPassword = t('center.account.changePassword.errors.weakPassword')
      isValid = false
    }
    
    // 确保新密码与当前密码不同
    if (passwordForm.newPassword === passwordForm.currentPassword) {
      errors.newPassword = t('center.account.changePassword.errors.sameAsCurrent')
      isValid = false
    }
  }
  
  // 验证确认密码
  if (!passwordForm.confirmPassword) {
    errors.confirmPassword = t('center.account.errors.required', { field: t('center.account.changePassword.confirmPassword') })
    isValid = false
  } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    errors.confirmPassword = t('center.account.changePassword.errors.doNotMatch')
    isValid = false
  }
  
  return isValid
}

// 验证删除表单
const validateDeleteForm = (): boolean => {
  // 重置错误
  errors.deleteConfirm = ''
  errors.deletePassword = ''
  
  let isValid = true
  
  // 验证确认文本
  if (deleteForm.confirmText !== 'DELETE MY ACCOUNT') {
    errors.deleteConfirm = t('center.account.deleteAccount.errors.incorrectConfirm')
    isValid = false
  }
  
  // 验证密码
  if (!deleteForm.password) {
    errors.deletePassword = t('center.account.errors.required', { field: t('center.account.deleteAccount.password') })
    isValid = false
  }
  
  return isValid
}

// 处理密码修改
const handlePasswordChange = async () => {
  // 验证表单
  if (!validatePasswordForm()) {
    return
  }
  
  isChangingPassword.value = true
  
  try {
    // 发送密码修改请求
    emit('change-password', {
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    })
    
    // 重置表单
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    
    // 在实际应用中，这里可能会显示一个成功通知
    console.log('Password changed successfully!')
  } catch (error) {
    console.error('Failed to change password:', error)
    // 在实际应用中，这里可能会显示一个错误通知
  } finally {
    isChangingPassword.value = false
  }
}

// 处理账户删除
const handleDeleteAccount = async () => {
  // 再次确认
  if (!confirm(t('center.account.deleteAccount.finalConfirm'))) {
    return
  }
  
  // 验证表单
  if (!validateDeleteForm()) {
    return
  }
  
  isDeleting.value = true
  
  try {
    // 发送删除账户请求
    emit('delete-account', {
      confirmText: deleteForm.confirmText,
      password: deleteForm.password
    })
    
    // 重置表单
    deleteForm.confirmText = ''
    deleteForm.password = ''
    
    // 在实际应用中，这里可能会重定向到登录页面
    console.log('Account deletion request sent!')
  } catch (error) {
    console.error('Failed to delete account:', error)
    // 在实际应用中，这里可能会显示一个错误通知
  } finally {
    isDeleting.value = false
  }
}

// 切换双因素认证
const toggleTwoFactorAuth = async () => {
  isUpdatingSecurity.value = true
  
  try {
    const newState = !twoFactorEnabled.value
    emit('toggle-two-factor', newState)
    twoFactorEnabled.value = newState
    
    // 在实际应用中，这里可能会显示一个成功通知
    console.log(`Two-factor authentication ${newState ? 'enabled' : 'disabled'}!`)
  } catch (error) {
    console.error('Failed to update two-factor authentication:', error)
    // 在实际应用中，这里可能会显示一个错误通知
  } finally {
    isUpdatingSecurity.value = false
  }
}
</script>

<style scoped>
/* 账户组件样式 */
.account-section {
  background-color: var(--bg-background);
  border-radius: var(--radius-md);
  padding: var(--spacing-6);
}

/* 密码强度指示器样式 */
.password-strength-indicator {
  transition: width 0.3s ease, background-color 0.3s ease;
}

/* 破坏性操作区域样式增强 */
.danger-zone {
  border-color: var(--color-destructive);
  background-color: rgba(239, 68, 68, 0.05);
}

/* 安全设置项样式 */
.security-item {
  transition: background-color 0.2s ease;
}

.security-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

/* 按钮动画效果 */
button:active {
  transform: scale(0.98);
}

/* 加载动画 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
  
  .lg\:col-span-2 {
    order: 1;
  }
  
  .danger-zone {
    order: 0;
    margin-bottom: var(--spacing-6);
  }
}
</style>
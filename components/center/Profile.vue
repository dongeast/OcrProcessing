<template>
  <div class="space-y-6 py-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-2xl font-bold tracking-tight">{{ $t('center.profile.title') }}</h1>
      <p class="text-muted-foreground mt-1">{{ $t('center.profile.subtitle') }}</p>
    </div>

    <!-- 个人资料表单 -->
    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- 头像上传部分 -->
      <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
        <!-- 头像预览 -->
        <div class="relative">
          <div class="w-24 h-24 rounded-full bg-muted overflow-hidden border-2 border-white shadow-md flex items-center justify-center">
            <template v-if="formData.image">
              <img 
                :src="formData.image" 
                :alt="$t('center.profile.avatarAlt')" 
                class="w-full h-full object-cover"
              />
            </template>
            <template v-else>
              <User class="w-12 h-12 text-muted-foreground" />
            </template>
          </div>
          <!-- 上传按钮覆盖层 -->
          <button 
            type="button" 
            @click="avatarInputRef?.click()"
            class="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-md hover:bg-primary/90 transition-colors"
            aria-label="Change avatar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <!-- 隐藏的文件输入 -->
          <input 
            ref="avatarInputRef" 
            type="file" 
            accept="image/*" 
            class="hidden"
            @change="handleAvatarChange"
          />
        </div>

        <!-- 头像上传提示 -->
        <div class="text-sm text-muted-foreground max-w-md">
          <p>{{ $t('center.profile.avatarHelp') }}</p>
          <p class="mt-1">{{ $t('center.profile.avatarRequirements') }}</p>
        </div>
      </div>

      <!-- 基本信息表单 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 姓名字段 -->
        <div class="space-y-2">
          <label 
            for="name" 
            class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {{ $t('center.profile.name') }}
          </label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            :placeholder="$t('center.profile.placeholder.name')"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.name }"
          />
          <p v-if="errors.name" class="text-destructive text-xs">
            {{ errors.name }}
          </p>
        </div>

        <!-- 邮箱字段 -->
        <div class="space-y-2">
          <label 
            for="email" 
            class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {{ $t('center.profile.email') }}
          </label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            :placeholder="$t('center.profile.placeholder.email')"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.email }"
          />
          <p v-if="errors.email" class="text-destructive text-xs">
            {{ errors.email }}
          </p>
        </div>

        <!-- 手机号码字段 -->
        <div class="space-y-2">
          <label 
            for="phone" 
            class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {{ $t('center.profile.phone') }}
          </label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            :placeholder="$t('center.profile.placeholder.phone')"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.phone }"
          />
          <p v-if="errors.phone" class="text-destructive text-xs">
            {{ errors.phone }}
          </p>
        </div>

        <!-- 公司字段 -->
        <div class="space-y-2">
          <label 
            for="company" 
            class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {{ $t('center.profile.company') }}
          </label>
          <input
            type="text"
            id="company"
            v-model="formData.company"
            :placeholder="$t('center.profile.placeholder.company')"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{ 'border-destructive focus-visible:ring-destructive': errors.company }"
          />
          <p v-if="errors.company" class="text-destructive text-xs">
            {{ errors.company }}
          </p>
        </div>

        <!-- 职位字段 -->
        <div class="space-y-2">
          <label 
            for="jobTitle" 
            class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {{ $t('center.profile.jobTitle') }}
          </label>
          <input
            type="text"
            id="jobTitle"
            v-model="formData.jobTitle"
            :placeholder="$t('center.profile.placeholder.jobTitle')"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <!-- 时区字段 -->
        <div class="space-y-2">
          <label 
            for="timezone" 
            class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {{ $t('center.profile.timezone') }}
          </label>
          <select
            id="timezone"
            v-model="formData.timezone"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Asia/Shanghai">Asia/Shanghai</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
            <option value="America/New_York">America/New_York</option>
            <option value="America/Los_Angeles">America/Los_Angeles</option>
            <option value="Europe/London">Europe/London</option>
            <option value="Europe/Paris">Europe/Paris</option>
          </select>
        </div>
      </div>

      <!-- 个人简介 -->
      <div class="space-y-2">
        <label 
          for="bio" 
          class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {{ $t('center.profile.bio') }}
        </label>
        <textarea
          id="bio"
          v-model="formData.bio"
          :placeholder="$t('center.profile.placeholder.bio')"
          rows="4"
          class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          maxlength="500"
        ></textarea>
        <p class="text-xs text-muted-foreground">
          {{ formData.bio.length }}/500
        </p>
      </div>

      <!-- 社交媒体链接 -->
      <div>
        <h3 class="text-lg font-semibold mb-4">{{ $t('center.profile.socialLinks') }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- LinkedIn -->
          <div class="space-y-2">
            <label 
              for="linkedin" 
              class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              LinkedIn
            </label>
            <input
              type="url"
              id="linkedin"
              v-model="formData.social.linkedin"
              placeholder="https://linkedin.com/in/yourprofile"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.social?.linkedin }"
            />
            <p v-if="errors.social?.linkedin" class="text-destructive text-xs">
              {{ errors.social?.linkedin }}
            </p>
          </div>

          <!-- Twitter -->
          <div class="space-y-2">
            <label 
              for="twitter" 
              class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Twitter
            </label>
            <input
              type="url"
              id="twitter"
              v-model="formData.social.twitter"
              placeholder="https://twitter.com/yourhandle"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.social?.twitter }"
            />
            <p v-if="errors.social?.twitter" class="text-destructive text-xs">
              {{ errors.social?.twitter }}
            </p>
          </div>

          <!-- GitHub -->
          <div class="space-y-2">
            <label 
              for="github" 
              class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              GitHub
            </label>
            <input
              type="url"
              id="github"
              v-model="formData.social.github"
              placeholder="https://github.com/username"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.social?.github }"
            />
            <p v-if="errors.social?.github" class="text-destructive text-xs">
              {{ errors.social?.github }}
            </p>
          </div>

          <!-- 个人网站 -->
          <div class="space-y-2">
            <label 
              for="website" 
              class="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {{ $t('center.profile.website') }}
            </label>
            <input
              type="url"
              id="website"
              v-model="formData.social.website"
              placeholder="https://yourwebsite.com"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-destructive focus-visible:ring-destructive': errors.social?.website }"
            />
            <p v-if="errors.social?.website" class="text-destructive text-xs">
              {{ errors.social?.website }}
            </p>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors"
        >
          <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isSubmitting ? $t('center.profile.saving') : $t('center.profile.save') }}
        </button>
        <button
          type="button"
          @click="handleCancel"
          class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background hover:bg-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors"
        >
          {{ $t('center.profile.cancel') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { User } from 'lucide-vue-next'

// Props定义
interface Props {
  user: {
    name?: string
    email?: string
    phone?: string
    company?: string
    jobTitle?: string
    bio?: string
    image?: string
    timezone?: string
    social?: {
      linkedin?: string
      twitter?: string
      github?: string
      website?: string
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  user: () => ({})
})

// Emits定义
const emit = defineEmits<{
  'update-profile': [userData: any]
  'cancel': []
}>()

// 初始化i18n
const { t } = useI18n()

// 表单数据
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  bio: '',
  image: '',
  timezone: 'Asia/Shanghai',
  social: {
    linkedin: '',
    twitter: '',
    github: '',
    website: ''
  }
})

// 错误信息
const errors = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  social: {
    linkedin: '',
    twitter: '',
    github: '',
    website: ''
  }
})

// 状态
const isSubmitting = ref(false)
const avatarInputRef = ref<HTMLInputElement>()
const avatarFile = ref<File | null>(null)

// 监听props变化，更新表单数据
watch(() => props.user, (newUser) => {
  if (newUser) {
    formData.name = newUser.name || ''
    formData.email = newUser.email || ''
    formData.phone = newUser.phone || ''
    formData.company = newUser.company || ''
    formData.jobTitle = newUser.jobTitle || ''
    formData.bio = newUser.bio || ''
    formData.image = newUser.image || ''
    formData.timezone = newUser.timezone || 'Asia/Shanghai'
    formData.social = {
      linkedin: newUser.social?.linkedin || '',
      twitter: newUser.social?.twitter || '',
      github: newUser.social?.github || '',
      website: newUser.social?.website || ''
    }
  }
}, { immediate: true, deep: true })

// 表单验证
const validateForm = () => {
  // 重置错误信息
  errors.name = ''
  errors.email = ''
  errors.phone = ''
  errors.company = ''
  errors.social.linkedin = ''
  errors.social.twitter = ''
  errors.social.github = ''
  errors.social.website = ''
  
  let isValid = true
  
  // 验证必填字段
  if (!formData.name.trim()) {
    errors.name = t('center.profile.errors.required', { field: t('center.profile.name') })
    isValid = false
  }
  
  // 验证邮箱
  if (!formData.email.trim()) {
    errors.email = t('center.profile.errors.required', { field: t('center.profile.email') })
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = t('center.profile.errors.invalidEmail')
    isValid = false
  }
  
  // 验证手机号（可选，但如果填写了需要验证格式）
  if (formData.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(formData.phone)) {
    errors.phone = t('center.profile.errors.invalidPhone')
    isValid = false
  }
  
  // 验证URL格式（可选字段）
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i
  
  if (formData.social.linkedin && !urlPattern.test(formData.social.linkedin)) {
    errors.social.linkedin = t('center.profile.errors.invalidUrl')
    isValid = false
  }
  
  if (formData.social.twitter && !urlPattern.test(formData.social.twitter)) {
    errors.social.twitter = t('center.profile.errors.invalidUrl')
    isValid = false
  }
  
  if (formData.social.github && !urlPattern.test(formData.social.github)) {
    errors.social.github = t('center.profile.errors.invalidUrl')
    isValid = false
  }
  
  if (formData.social.website && !urlPattern.test(formData.social.website)) {
    errors.social.website = t('center.profile.errors.invalidUrl')
    isValid = false
  }
  
  return isValid
}

// 处理头像上传
const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  if (files && files.length > 0) {
    const file = files[0]
    
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      alert(t('center.profile.errors.invalidImageType'))
      return
    }
    
    // 验证文件大小（限制为5MB）
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert(t('center.profile.errors.imageTooLarge'))
      return
    }
    
    // 保存文件引用
    avatarFile.value = file
    
    // 预览图像
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// 处理表单提交
const handleSubmit = async () => {
  // 验证表单
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // 准备提交数据
    const submitData = {
      ...formData,
      avatarFile: avatarFile.value // 仅在有新头像时包含
    }
    
    // 触发更新事件
    emit('update-profile', submitData)
    
    // 重置头像文件引用
    avatarFile.value = null
    
    // 模拟保存成功后的提示
    // 在实际应用中，这里可能会显示一个toast通知
    console.log('Profile updated successfully!')
  } catch (error) {
    console.error('Failed to update profile:', error)
    // 在实际应用中，这里可能会显示一个错误通知
  } finally {
    isSubmitting.value = false
  }
}

// 处理取消操作
const handleCancel = () => {
  // 重置表单和错误
  if (props.user) {
    formData.name = props.user.name || ''
    formData.email = props.user.email || ''
    formData.phone = props.user.phone || ''
    formData.company = props.user.company || ''
    formData.jobTitle = props.user.jobTitle || ''
    formData.bio = props.user.bio || ''
    formData.image = props.user.image || ''
    formData.timezone = props.user.timezone || 'Asia/Shanghai'
    formData.social = {
      linkedin: props.user.social?.linkedin || '',
      twitter: props.user.social?.twitter || '',
      github: props.user.social?.github || '',
      website: props.user.social?.website || ''
    }
  }
  
  // 清除错误
  Object.keys(errors).forEach(key => {
    if (key === 'social') {
      Object.keys(errors.social).forEach(socialKey => {
        errors.social[socialKey as keyof typeof errors.social] = ''
      })
    } else {
      errors[key as keyof Omit<typeof errors, 'social'>] = ''
    }
  })
  
  // 清除头像文件
  avatarFile.value = null
  
  // 触发取消事件
  emit('cancel')
}
</script>

<style scoped>
/* 个人资料组件样式 */
.form-container {
  background-color: var(--bg-background);
  border-radius: var(--radius-md);
  padding: var(--spacing-6);
}

/* 头像上传区域样式 */
.avatar-upload {
  position: relative;
  display: inline-block;
}

.avatar-upload:hover .avatar-overlay {
  opacity: 1;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* 表单输入样式增强 */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  box-shadow: 0 0 0 2px var(--color-primary);
}

/* 错误状态样式增强 */
input.border-destructive:focus-visible,
textarea.border-destructive:focus-visible,
select.border-destructive:focus-visible {
  box-shadow: 0 0 0 2px var(--color-destructive);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .avatar-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .avatar-upload {
    margin-bottom: 1rem;
  }
}

/* 按钮动画效果 */
button[type="submit"]:not(:disabled):active,
button[type="button"]:active {
  transform: scale(0.98);
}

/* 进度条动画 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
<template>
  <div class="settings-container">
    <h2 class="text-2xl font-bold mb-6">Settings</h2>
    
    <!-- Settings Tabs -->
    <div class="flex border-b mb-6">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="px-4 py-2 font-medium transition-colors"
        :class="{ 
          'border-b-2 border-blue-500 text-blue-600': activeTab === tab.id,
          'text-gray-600 hover:text-blue-500': activeTab !== tab.id
        }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <!-- Notification Settings -->
    <div v-if="activeTab === 'notifications'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-xl font-semibold mb-4">Notification Preferences</h3>
        
        <div class="space-y-4">
          <!-- Email Notifications -->
          <div class="notification-group">
            <h4 class="font-medium text-gray-900 mb-2">Email Notifications</h4>
            <div class="space-y-3 pl-4">
              <div class="flex items-center justify-between">
                <label class="text-gray-700 cursor-pointer">New Document Uploads</label>
                <Switch 
                  :checked="emailSettings.newDocuments" 
                  @update:checked="emailSettings.newDocuments = $event" 
                />
              </div>
              <div class="flex items-center justify-between">
                <label class="text-gray-700 cursor-pointer">Processing Completion</label>
                <Switch 
                  :checked="emailSettings.processingComplete" 
                  @update:checked="emailSettings.processingComplete = $event" 
                />
              </div>
              <div class="flex items-center justify-between">
                <label class="text-gray-700 cursor-pointer">Billing Updates</label>
                <Switch 
                  :checked="emailSettings.billingUpdates" 
                  @update:checked="emailSettings.billingUpdates = $event" 
                />
              </div>
              <div class="flex items-center justify-between">
                <label class="text-gray-700 cursor-pointer">News and Updates</label>
                <Switch 
                  :checked="emailSettings.newsAndUpdates" 
                  @update:checked="emailSettings.newsAndUpdates = $event" 
                />
              </div>
            </div>
          </div>
          
          <!-- Push Notifications -->
          <div class="notification-group">
            <h4 class="font-medium text-gray-900 mb-2">Push Notifications</h4>
            <div class="space-y-3 pl-4">
              <div class="flex items-center justify-between">
                <label class="text-gray-700 cursor-pointer">Document Ready</label>
                <Switch 
                  :checked="pushSettings.documentReady" 
                  @update:checked="pushSettings.documentReady = $event" 
                />
              </div>
              <div class="flex items-center justify-between">
                <label class="text-gray-700 cursor-pointer">Storage Alerts</label>
                <Switch 
                  :checked="pushSettings.storageAlerts" 
                  @update:checked="pushSettings.storageAlerts = $event" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Language and Region Settings -->
    <div v-if="activeTab === 'language'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-xl font-semibold mb-4">Language and Region</h3>
        
        <div class="space-y-6">
          <!-- Language Preference -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              v-model="languagePreference"
            >
              <option value="en_us">English (United States)</option>
              <option value="zh_cn">中文 (简体)</option>
              <option value="zh_tw">中文 (繁體)</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
            </select>
          </div>
          
          <!-- Date Format -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
            <select 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              v-model="dateFormat"
            >
              <option value="mm/dd/yyyy">MM/DD/YYYY (e.g., 04/15/2023)</option>
              <option value="dd/mm/yyyy">DD/MM/YYYY (e.g., 15/04/2023)</option>
              <option value="yyyy-mm-dd">YYYY-MM-DD (e.g., 2023-04-15)</option>
            </select>
          </div>
          
          <!-- Time Zone -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
            <select 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              v-model="timeZone"
            >
              <option value="UTC-12:00">UTC-12:00 (Baker Island)</option>
              <option value="UTC-08:00">UTC-08:00 (Pacific Time)</option>
              <option value="UTC-07:00">UTC-07:00 (Mountain Time)</option>
              <option value="UTC-06:00">UTC-06:00 (Central Time)</option>
              <option value="UTC-05:00">UTC-05:00 (Eastern Time)</option>
              <option value="UTC+00:00">UTC+00:00 (Greenwich Mean Time)</option>
              <option value="UTC+08:00">UTC+08:00 (Beijing Time)</option>
              <option value="UTC+09:00">UTC+09:00 (Tokyo Time)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Security Settings -->
    <div v-if="activeTab === 'security'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-xl font-semibold mb-4">Security Settings</h3>
        
        <div class="space-y-6">
          <!-- Two-Factor Authentication -->
          <div class="border-b pb-4">
            <div class="flex items-start justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p class="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
              </div>
              <Switch 
                :checked="twoFactorEnabled" 
                @update:checked="handleTwoFactorToggle($event)" 
              />
            </div>
            
            <div v-if="twoFactorEnabled && !showTwoFactorSetup" class="mt-4">
              <p class="text-sm text-green-600">Two-factor authentication is enabled</p>
              <button 
                class="text-sm text-blue-600 hover:text-blue-800 mt-1"
                @click="showTwoFactorSetup = true"
              >
                Manage settings
              </button>
            </div>
            
            <div v-if="showTwoFactorSetup" class="mt-4 space-y-4">
              <p class="text-sm text-gray-600">
                Scan this QR code with your authenticator app or enter the secret key manually:
              </p>
              <div class="flex items-center justify-center p-4 bg-gray-50 rounded-md">
                <div class="text-center">
                  <div class="w-48 h-48 bg-white p-2 rounded-md shadow-sm mb-3">
                    <!-- QR Code Placeholder -->
                    <div class="w-full h-full flex items-center justify-center text-gray-400">
                      QR Code
                    </div>
                  </div>
                  <p class="font-mono text-sm text-gray-700">
                    ABCD EFGH IJKL MNOP
                  </p>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Enter the verification code from your app
                </label>
                <input 
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="6-digit code"
                />
              </div>
              <div class="flex space-x-3">
                <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Verify and Enable
                </button>
                <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
          
          <!-- Session Management -->
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Active Sessions</h4>
            <p class="text-sm text-gray-500 mb-4">Manage your active account sessions across devices</p>
            
            <div class="space-y-3">
              <!-- Current Session -->
              <div class="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium">This Device</p>
                    <p class="text-xs text-gray-600">Windows 10 • Chrome 98</p>
                  </div>
                </div>
                <span class="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">Current</span>
              </div>
              
              <!-- Other Sessions -->
              <div v-for="(session, index) in otherSessions" :key="index" class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium">{{ session.device }}</p>
                    <p class="text-xs text-gray-600">{{ session.details }}</p>
                  </div>
                </div>
                <button class="text-xs text-red-600 hover:text-red-800">Sign out</button>
              </div>
            </div>
            
            <button class="mt-4 text-sm text-blue-600 hover:text-blue-800">Sign out of all sessions</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="flex justify-end space-x-4 mt-8">
      <button 
        class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        @click="handleCancel"
      >
        Cancel
      </button>
      <button 
        class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        @click="handleSave"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// Props
interface Props {
  // You can add props here if needed
  user?: any;
}

const props = withDefaults(defineProps<Props>(), {
  user: () => null
});

// Emits
interface Emits {
  (e: 'update:settings', settings: any): void;
  (e: 'cancel'): void;
}

const emit = defineEmits<Emits>();

// State
const activeTab = ref('notifications');
const tabs = [
  { id: 'notifications', label: 'Notifications' },
  { id: 'language', label: 'Language & Region' },
  { id: 'security', label: 'Security' }
];

// Email Notification Settings
const emailSettings = reactive({
  newDocuments: true,
  processingComplete: true,
  billingUpdates: true,
  newsAndUpdates: false
});

// Push Notification Settings
const pushSettings = reactive({
  documentReady: true,
  storageAlerts: true
});

// Language and Region Settings
const languagePreference = ref('en_us');
const dateFormat = ref('mm/dd/yyyy');
const timeZone = ref('UTC-08:00');

// Security Settings
const twoFactorEnabled = ref(false);
const showTwoFactorSetup = ref(false);
const otherSessions = ref([
  {
    device: 'iPhone 12',
    details: 'iOS 15.4 • Safari'
  },
  {
    device: 'MacBook Pro',
    details: 'macOS Monterey • Safari'
  }
]);

// Methods
const handleTwoFactorToggle = (enabled: boolean) => {
  twoFactorEnabled.value = enabled;
  if (enabled) {
    showTwoFactorSetup.value = true;
  }
};

const handleSave = () => {
  // Collect all settings
  const settings = {
    notifications: {
      email: { ...emailSettings },
      push: { ...pushSettings }
    },
    language: {
      preference: languagePreference.value,
      dateFormat: dateFormat.value,
      timeZone: timeZone.value
    },
    security: {
      twoFactorEnabled: twoFactorEnabled.value
    }
  };
  
  // Emit the update event
  emit('update:settings', settings);
};

const handleCancel = () => {
  emit('cancel');
};

// Mock Switch Component (in a real app, you'd import a UI component)
const Switch = {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:checked'],
  template: `
    <label class="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        class="sr-only peer" 
        :checked="checked"
        @change="$emit('update:checked', $event.target.checked)"
      />
      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  `
};
</script>

<style scoped>
.settings-container {
  max-width: 800px;
}

.notification-group {
  margin-bottom: 1rem;
}
</style>
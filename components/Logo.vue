<template>
  <div class="flex items-center">
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 flex-shrink-0">
      <rect width="32" height="32" rx="4" fill="#4F46E5"/>
      <path d="M8 10L16 16L8 22V10Z" fill="white" stroke="white" stroke-width="1"/>
      <path d="M16 10L24 16L16 22V10Z" fill="white" stroke="white" stroke-width="1"/>
      <path d="M10 8H22" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <path d="M10 24H22" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <span v-if="!collapsed" class="ml-2 text-xl font-bold whitespace-nowrap overflow-hidden">Ocr Processing</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  collapsed?: boolean;
}

withDefaults(defineProps<Props>(), {
  collapsed: false
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const {name} = useAppConfig() 

//赋予全局标题和favicon
useHead({
  title: name,
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/ocr-logo.svg' }
  ]
});
</script>
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useViewerStore } from '@entities/viewer'

const { isDark } = storeToRefs(useViewerStore())

useHead({
  htmlAttrs: { 'data-theme': computed(() => isDark.value ? 'dark' : 'light') },
})
</script>

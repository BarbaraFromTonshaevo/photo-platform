<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage :transition="pageTransition" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useViewerStore } from '@entities/viewer'
import { usePageFadeTransition } from '@shared/lib/usePageFadeTransition'

const { isDark } = storeToRefs(useViewerStore())

useHead({
  htmlAttrs: { 'data-theme': computed(() => isDark.value ? 'dark' : 'light') },
})

const { onEnter, onLeave } = usePageFadeTransition()

const pageTransition = {
  name: 'page-fade',
  mode: 'out-in' as const,
  css: false,
  onEnter,
  onLeave,
}
</script>

<template>
  <button
    class="theme-toggle"
    :aria-label="isDark ? t('themeToLight') : t('themeToDark')"
    @click="toggleTheme"
  >
    <Icon :name="isDark ? 'ph:moon-stars' : 'ph:sun'" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { useViewerStore } from '@entities/viewer'

const { t } = useI18n()
const viewerStore = useViewerStore()
const { isDark } = storeToRefs(viewerStore)
const { toggleTheme } = viewerStore
</script>

<style lang="scss" scoped>
.theme-toggle{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    background: none;
    border-radius: var(--radius-pill);
    border: 1px solid color-mix(in oklch, currentColor 25%, transparent);
    cursor: pointer;
    color: inherit;
    transition: background-color var(--dur-fast) var(--ease);
    font-size: 16px;

    &:hover {
      background: color-mix(in oklch, currentColor 10%, transparent);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 3px;
      border-radius: var(--radius-sm);
    }
}
</style>

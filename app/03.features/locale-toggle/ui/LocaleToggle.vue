<template>
  <div class="locale-toggle" role="group" :aria-label="t('langLabel')">
    <button
      :class="['locale-toggle__btn', { 'is-active': locale === 'ru' }]"
      @click="switchLocale('ru')"
    >
      RU
    </button>
    <span class="locale-toggle__div" aria-hidden="true">/</span>
    <button
      :class="['locale-toggle__btn', { 'is-active': locale === 'en' }]"
      @click="switchLocale('en')"
    >
      EN
    </button>
  </div>
</template>

<script setup lang="ts">
import { useViewerStore } from '@entities/viewer'

const { t, setLocale: i18nSetLocale } = useI18n()
const viewerStore = useViewerStore()
const { locale } = storeToRefs(viewerStore)

onMounted(() => {
  i18nSetLocale(viewerStore.locale)
})

// ── Language ──────────────────────────────────────────────────
function switchLocale(code: 'ru' | 'en') {
  viewerStore.setLocale(code)
  i18nSetLocale(code)
}
</script>

<style lang="scss" scoped>
.locale-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-label);

  &__btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font: inherit;
    letter-spacing: inherit;
    color: inherit;
    opacity: 0.45;
    transition: opacity var(--dur-fast) var(--ease);

    &.is-active {
      opacity: 1;
      font-weight: 600;
    }

    &:hover:not(.is-active) {
      opacity: 0.75;
    }
  }

  &__div {
    opacity: 0.3;
    user-select: none;
  }
}
</style>

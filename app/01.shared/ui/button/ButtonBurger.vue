<template>
  <button
    type="button"
    class="btn-burger"
    :class="{ 'is-open': isOpen }"
    :aria-expanded="isOpen"
    :aria-label="isOpen ? t('menuClose') : t('menuOpen')"
    @click="isOpen = !isOpen"
  >
    <span class="btn-burger__icon">
      <span class="btn-burger__line" />
      <span class="btn-burger__line" />
    </span>
  </button>
</template>

<script setup lang="ts">
const { t } = useI18n()

const isOpen = defineModel<boolean>({ default: false })
</script>

<style lang="scss" scoped>
.btn-burger {
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
  backdrop-filter: blur(10px);

  &:hover {
    background: color-mix(in oklch, currentColor 10%, transparent);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
    border-radius: var(--radius-sm);
  }

  &__icon {
    position: relative;
    width: 16px;
    height: 16px;
  }

  &__line {
    position: absolute;
    inset-inline: 0;
    top: 50%;
    width: 16px;
    height: 1px;
    background: currentColor;
    border-radius: 1px;
    transition: transform var(--dur-fast) var(--ease);

    &:first-child {
      transform: translateY(-3px);
    }
    &:last-child {
      transform: translateY(3px);
    }
  }

  &.is-open .btn-burger__line {
    &:first-child {
      transform: translateY(0) rotate(45deg);
    }
    &:last-child {
      transform: translateY(0) rotate(-45deg);
    }
  }
}
</style>

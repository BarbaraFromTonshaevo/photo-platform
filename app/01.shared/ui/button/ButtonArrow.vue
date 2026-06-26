<template>
  <button
    class="btn-arrow"
    :class="[`btn-arrow--${direction}`, { 'is-disabled': disabled }]"
    :disabled="disabled"
    :aria-label="ariaLabel"
    type="button"
  >
    <Icon class="btn-arrow__icon" name="ph:caret-left-bold" aria-hidden="true" width="1.5em" height="1.5em" />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  direction?: 'left' | 'right'
  ariaLabel?: string
  disabled?: boolean
}>(), {
  direction: 'left',
  ariaLabel: 'Navigate',
})
</script>

<style lang="scss" scoped>
.btn-arrow {
  --size: 3.75rem; /* 60px */

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--size);
  height: var(--size);
  border-radius: var(--radius-pill);
  border: 1px solid var(--line-strong);
  cursor: pointer;

  background: var(--surface);
  color: var(--text);

  transition:
    background var(--dur-fast) var(--ease),
    border-color var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease);

  @include hover {
    &:hover {
      background: var(--text);
      border-color: var(--text);
      color: var(--on-accent);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  &--right &__icon {
    transform: scaleX(-1);
  }

  &.is-disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>

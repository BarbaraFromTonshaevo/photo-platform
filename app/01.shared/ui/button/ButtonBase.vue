<template>
  <NuxtLink v-if="to" :to="to" :class="buttonClasses" v-bind="componentProps">
    <Icon v-if="loading" class="ui-button__spinner" name="ph:arrow-clockwise" aria-hidden="true" />
    <slot />
    <Icon v-if="arrow" class="ui-button__arrow" name="ph:arrow-right" aria-hidden="true" />
  </NuxtLink>

  <a v-else-if="href" :href="href" :class="buttonClasses" v-bind="componentProps">
    <Icon v-if="loading" class="ui-button__spinner" name="ph:arrow-clockwise" aria-hidden="true" />
    <slot />
    <Icon v-if="arrow" class="ui-button__arrow" name="ph:arrow-right" aria-hidden="true" />
  </a>

  <button v-else :type="type ?? 'button'" :class="buttonClasses" v-bind="componentProps">
    <Icon v-if="loading" class="ui-button__spinner" name="ph:arrow-clockwise" aria-hidden="true" />
    <slot />
    <Icon v-if="arrow" class="ui-button__arrow" name="ph:arrow-right" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 's' | 'm' | 'l'

const props = defineProps<{
  to?: RouteLocationRaw
  href?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  arrow?: boolean
  ariaLabel?: string
}>()

/**
 * Пропсы, которые передаются в конечный элемент
 */

const componentProps = computed(() => {
  if (props.to) {
    return {
      'aria-label': props.ariaLabel,
      'aria-disabled': props.disabled || undefined,
      tabindex: props.disabled ? -1 : undefined,
      onClick: props.disabled ? (e: Event) => e.preventDefault() : undefined
    }
  }

  if (props.href) {
    return {
      href: props.disabled ? undefined : props.href,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': props.ariaLabel,
      'aria-disabled': props.disabled || undefined,
      tabindex: props.disabled ? -1 : undefined
    }
  }

  return {
    type: props.type ?? 'button',
    disabled: props.disabled,
    'aria-label': props.ariaLabel,
    'aria-busy': props.loading || undefined
  }
})

/**
 * Классы
 */
const buttonClasses = computed(() => [
  'ui-button',
  `ui-button--${props.variant ?? 'primary'}`,
  `ui-button--${props.size ?? 'm'}`,
  {
    'is-disabled': props.disabled,
    'is-loading': props.loading,
    'has-arrow': props.arrow
  }
])
</script>

<style lang="scss" scoped>
.ui-button {
  font-family: var(--font-ui);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  border-radius: var(--radius-pill);
  transition: var(--dur-fast) var(--ease);
  padding: 0.95em 1.9em;
  font-weight: 600;
  line-height: 1;

  &__spinner {
    animation: spin 1s linear infinite;
  }

  &--l {
    font-size: var(--text-md);
  }

  &--m {
    font-size: var(--text-base);
  }

  &--s {
    font-size: var(--text-sm);
  }

  &--primary {
    color: var(--on-accent);
    background: var(--accent);
    border: 1px solid transparent;

    &:hover {
      background: var(--accent-soft);
    }

    &:active {
      background: var(--accent-contrast);
      color: color-mix(in srgb, var(--on-accent) 70%, transparent);
    }

    &.is-disabled {
      background: var(--line);
      color: var(--text-faint);
      border-color: transparent;
    }
  }

  &--secondary {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--line-strong);

    &:hover {
      background: var(--accent-tint);
      border-color: var(--accent);
    }

    &:active {
      background: var(--accent-tint);
      color: color-mix(in srgb, var(--text) 60%, transparent);
    }

    &.is-disabled {
      color: var(--text-faint);
      border-color: var(--line);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  &.is-disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  &.is-loading {
    cursor: wait;
    pointer-events: none;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

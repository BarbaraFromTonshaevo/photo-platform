<template>
  <NuxtLink v-if="to" :to="to" :class="buttonClasses" v-bind="componentProps">
    <span v-if="loading" class="ui-button__spinner" aria-hidden="true" />
    <slot />
    <span v-if="arrow" class="ui-button__arrow" aria-hidden="true" />
  </NuxtLink>

  <a v-else-if="href" :href="href" :class="buttonClasses" v-bind="componentProps">
    <span v-if="loading" class="ui-button__spinner" aria-hidden="true" />
    <slot />
    <span v-if="arrow" class="ui-button__arrow" aria-hidden="true" />
  </a>

  <button v-else :type="type ?? 'button'" :class="buttonClasses" v-bind="componentProps">
    <span v-if="loading" class="ui-button__spinner" aria-hidden="true" />
    <slot />
    <span v-if="arrow" class="ui-button__arrow" aria-hidden="true" />
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  border-radius: var(--radius-pill);
  transition: var(--dur-fast) var(--ease);

  &__arrow {
    display: flex;
    width: fit-content;
    padding: 12px;
    aspect-ratio: 1;
    border-radius: var(--radius-pill);
    background-color: transparent;
    transition: var(--dur-fast) var(--ease);
    &::before {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      @include mask('/icons/arrow-right.svg', var(--on-accent));
      transition: var(--dur-fast) var(--ease);
    }
  }

  &__spinner {
    flex-shrink: 0;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: currentColor;
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-image: url('/icons/spinner.svg');
    animation: spin 0.8s linear infinite;
  }

  &--l {
    font-weight: 600;
    font-size: 20px;
    line-height: 1;
    padding: 20px 48px;
  }

  &--m {
    font-weight: 600;
    font-size: 18px;
    line-height: 1;
    padding: 18px 40px;
  }

  &--s {
    font-weight: 600;
    font-size: 16px;
    line-height: 1;
    padding: 13px 28px;
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

    &.has-arrow {
      .ui-button__arrow {
        background-color: transparent;
        &::before {
          background-color: var(--text);
        }
      }
      &.ui-button--l {
        padding: 8px 8px 8px 20px;
      }
      &.ui-button--m {
        padding: 6px 6px 6px 18px;
      }
      &.ui-button--s {
        padding: 4px 4px 4px 13px;
      }
    }

    &.has-arrow:hover {
      background: transparent;
      border-color: var(--line-strong);
      .ui-button__arrow {
        background-color: var(--accent);
        &::before {
          background-color: var(--on-accent);
        }
      }
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

  &.has-arrow {
    justify-content: space-between;
    gap: 10px;
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

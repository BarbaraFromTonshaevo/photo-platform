<template>
  <a
    class="btn-social"
    :href="href"
    :aria-label="ariaLabel ?? network"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon class="btn-social__icon" :name="ICONS[network]" aria-hidden="true" />
  </a>
</template>

<script setup lang="ts">
type SocialNetwork = 'instagram' | 'telegram' | 'pinterest'

const ICONS: Record<SocialNetwork, string> = {
  instagram: 'ph:instagram-logo',
  telegram: 'ph:telegram-logo',
  pinterest: 'ph:pinterest-logo'
}

withDefaults(
  defineProps<{
    network: SocialNetwork
    href: string
    ariaLabel?: string
  }>(),
  {
    ariaLabel: undefined
  }
)
</script>

<style lang="scss" scoped>
.btn-social {
  --size: 2.75rem; /* 44px */
  --icon-size: 1.25rem; /* 20px */

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-pill);
  background: transparent;
  color: inherit;

  transition:
    background var(--dur-fast) var(--ease),
    border-color var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease);

  &__icon {
    font-size: 18px;
  }

  @include hover {
    &:hover {
      background: color-mix(in oklch, currentColor 10%, transparent);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
}
</style>

<template>
  <header
    :class="['header', { [`header--forced-theme-${forcedHeaderTheme}`]: forcedHeaderTheme }]"
    role="banner"
  >
    <div class="header__inner">
      <!-- Logo -->
      <NuxtLink to="/" class="header__logo" :aria-label="t('logoAriaLabel')">
        <NuxtImg
          src="/images/logo-icon.png"
          alt="Logo"
          width="60"
          height="60"
          class="header__logo-avatar"
          priority
          format="webp"
          quality="80"
        />
        <div class="header__logo-info">
          <span class="header__logo-name">{{ t('logoName') }}</span>
          <span class="header__logo-role">{{ t('logoRole') }}</span>
        </div>
      </NuxtLink>

      <!-- Navigation -->
      <nav v-if="!isLaptop" class="header__nav" :aria-label="t('navAriaLabel')">
        <NuxtLink
          v-for="link in siteStore.navLinks"
          :key="link.to"
          :to="link.to"
          class="header__nav-link"
          active-class="is-active"
          @click="onNavClick(link.to, $event)"
        >
          {{ t(link.labelKey) }}
        </NuxtLink>
      </nav>

      <!-- Right: socials / lang / theme -->
      <div class="header__actions">
        <div class="header__socials" aria-label="Socials">
          <ButtonSocial
            v-for="social in siteStore.socials"
            :key="social.network"
            :href="social.href"
            :network="social.network"
            :aria-label="social.label"
          />
        </div>
        <span class="header__sep" aria-hidden="true" />
        <LocaleToggle class="header__locale" />
        <span class="header__sep" aria-hidden="true" />
        <ThemeToggle class="header__theme" />
        <ButtonBurger
          v-if="isLaptop"
          class="header__burger"
          :is-open="isMenuActive"
          @click="openMenu"
        />
      </div>
    </div>
    <HeaderMenu v-if="isLaptop" :is-active="isMenuActive" @close-menu="closeMenu" />
  </header>
</template>

<script setup lang="ts">
import { useViewerStore } from '@entities/viewer'
import { useSiteStore } from '@entities/site'
import { useMatchMedia } from '@shared/lib/useMatchMedia'
import { useScrollToSection } from '@shared/lib/useScrollToSection'
import { usePendingScroll } from '@shared/lib/usePendingScroll'

const route = useRoute()
const { t } = useI18n()
const viewerStore = useViewerStore()
const siteStore = useSiteStore()
const { forcedHeaderTheme } = storeToRefs(viewerStore)
const pendingScroll = usePendingScroll()

const isLaptop = useMatchMedia('(max-width: 1365px)')

const isMenuActive = ref(false)
function openMenu() {
  isMenuActive.value = true
}
function closeMenu() {
  isMenuActive.value = false
}
async function onNavClick(link: string, event: MouseEvent) {
  // Не мешаем открытию в новой вкладке/новом окне — обычные клики модификаторами
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()

  const id = link.split('#')[1] ?? ''

  if (route.path !== '/') {
    // Скролл произойдёт позже, внутри onEnter page-transition —
    // пока страница невидима, сразу после того как её вёрстка стабилизируется
    pendingScroll.value = { type: 'section', id }
    await navigateTo('/')
    return
  }

  useScrollToSection(id)
}
</script>

<style lang="scss" scoped>
.header {
  // ── CSS-state tokens: forced-theme ──────────────────────
  --_color: var(--text);
  --_bg: var(--bg);
  --_border: var(--line);
  --_shadow: none;

  &--forced-theme-dark {
    --_color: oklch(0.925 0.01 84);
    --_bg: oklch(0.185 0.008 72);
    --_border: oklch(0.34 0.012 76);
    --_shadow: var(--shadow-sm);
  }
  &--forced-theme-light {
    --_color: oklch(0.255 0.012 70);
    --_bg: oklch(0.965 0.012 84);
    --_border: oklch(0.86 0.014 80);
    --_shadow: var(--shadow-sm);
  }

  // ── Base ────────────────────────────────────────────────────
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: 100;
  padding-inline-end: var(--lock-scrollbar-w, 0px);
  height: var(--header-h);
  color: var(--_color);
  // background: var(--_bg);
  border-bottom: 1px solid var(--_border);
  box-shadow: var(--_shadow);
  backdrop-filter: blur(14px);
  transition:
    color var(--dur) var(--ease),
    background var(--dur) var(--ease),
    border-color var(--dur) var(--ease),
    box-shadow var(--dur) var(--ease);

  // ── Inner layout ────────────────────────────────────────────
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding-inline: var(--gutter);
    max-width: calc(var(--maxw) + var(--gutter) * 2);
    margin-inline: auto;
  }

  // ── Logo ────────────────────────────────────────────────────
  &__logo {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    text-decoration: none;
    color: inherit;
    flex-shrink: 0;
  }

  &__logo-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-family: var(--font-display);
    font-size: var(--text-md);
    font-weight: 500;
    transition: border-color var(--dur) var(--ease);
  }

  &__logo-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__logo-name {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 500;
    line-height: 1;
    letter-spacing: var(--tracking-wide);
    text-transform: capitalize;
  }

  &__logo-role {
    font-family: var(--font-ui);
    font-size: 0.5rem;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    opacity: 0.55;
    line-height: 1;
  }

  // ── Nav ─────────────────────────────────────────────────────
  &__nav {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    margin-inline: auto;
  }

  &__nav-link {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    font-weight: 500;
    letter-spacing: var(--tracking-wide);
    text-decoration: none;
    color: inherit;
    position: relative;
    padding-bottom: 3px;
    opacity: 0.85;

    &::after {
      content: '';
      position: absolute;
      inset-inline: 0;
      bottom: 0;
      height: 0.5px;
      background: currentColor;
      transform: scaleX(0);
      transition: transform var(--dur-fast) var(--ease);
    }
    &:hover {
      opacity: 1;
    }
    &:hover::after {
      transform: scaleX(1);
    }
  }

  // ── Actions ─────────────────────────────────────────────────
  &__actions {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-shrink: 0;
  }

  &__socials {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    @include tablet-s {
      display: none;
    }
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    opacity: 0.7;
    transition: opacity var(--dur-fast) var(--ease);
    font-size: 20px;

    &:hover {
      opacity: 1;
    }
  }

  &__sep {
    display: block;
    width: 1px;
    height: 18px;
    background: currentColor;
    opacity: 0.2;
    @include tablet-s {
      display: none;
    }
  }

  &__locale {
    @include tablet-s {
      display: none;
    }
  }
  &__theme {
    @include tablet-s {
      display: none;
    }
  }

  &__burger {
    z-index: 5;
  }
}
</style>

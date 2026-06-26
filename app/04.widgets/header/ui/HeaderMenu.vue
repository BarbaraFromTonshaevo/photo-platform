<template>
  <div class="header-menu">
    <div class="header-menu__body">
      <nav class="header-menu__nav">
        <NuxtLink
          v-for="link in siteStore.navLinks"
          :key="link.to"
          :to="link.to"
          class="header-menu__nav-link"
          active-class="is-active"
        >
          {{ t(link.labelKey) }}
        </NuxtLink>
      </nav>
      <div class="header-menu__col">
        <span class="header-menu__col-title">{{ t('contacts') }}</span>
        <div class="header-menu__col-links">
          <a :href="`mailto:${siteStore.contacts.email}`" class="header-menu__link">
            {{ siteStore.contacts.email }}
          </a>
          <a :href="`tel:${siteStore.contacts.phone.replace(/\D/g, '')}`" class="header-menu__link">
            {{ siteStore.contacts.phone }}
          </a>
          <div class="header-menu__locations">
            <div
              v-for="(location, index) of siteStore.contacts.location"
              :key="index"
              class="header-menu__location"
            >
              {{ location }}
            </div>
          </div>
        </div>
      </div>
      <div class="header-menu__actions">
        <ThemeToggle />
        <span class="header-menu__sep" aria-hidden="true" />
        <LocaleToggle />
        <span class="header-menu__sep" aria-hidden="true" />
        <div class="header-menu__socials" aria-label="Socials">
          <ButtonSocial
            v-for="social in siteStore.socials"
            :key="social.network"
            :href="social.href"
            :network="social.network"
            :aria-label="social.label"
          />
        </div>
      </div>
    </div>
    <div class="header-menu__bg">
      <img src="/images/home/menu.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteStore } from '@entities/site'

const { t } = useI18n()
const siteStore = useSiteStore()
</script>

<style lang="scss" scoped>
.header-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--bg-tint);
  color: var(--text);
  display: flex;

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-block: var(--space-9) var(--space-7);
    padding-left: var(--gutter);
    padding-right: var(--space-5);
    overflow: clip;
    z-index: 1;

    &::before {
      content: '';
      display: block;
      width: 130%;
      aspect-ratio: 1;
      position: absolute;
      top: 30%;
      right: -40%;
      background-image: url(/images/logo.png);
      background-repeat: no-repeat;
      background-size: contain;
      z-index: -1;
      opacity: 0.1;
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  &__nav-link {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    text-transform: uppercase;
  }

  &__bg {
    display: flex;
    height: 100%;
    width: 50%;
    img {
      display: flex;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__socials {
    display: flex;
  }

  &__actions {
    margin-top: auto;
    display: flex;
    gap: var(--space-2) var(--space-4);
    align-items: center;
  }
}
</style>

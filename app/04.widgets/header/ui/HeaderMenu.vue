<template>
  <dialog ref="menuRef" class="header-menu" data-lenis-prevent>
    <div ref="leftRef" class="header-menu__body">
      <nav class="header-menu__nav">
        <NuxtLink
          v-for="(link, index) in siteStore.navLinks"
          :key="link.to"
          :to="link.to"
          class="header-menu__nav-link"
          active-class="is-active"
          @click="closeMenu"
        >
          <span class="header-menu__nav-num">{{ index + 1 }}</span> {{ t(link.labelKey) }}
        </NuxtLink>
      </nav>
      <div class="header-menu__col">
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
    <div ref="rightRef" class="header-menu__bg">
      <!-- <img src="/images/home/menu.png" alt="" /> -->
      <ButtonBurger :is-open="isActive" class="header-menu__close" @click="closeMenu" />
      <NuxtImg src="/images/home/menu.png" alt="Фотография с камерой" class="header-menu__image" />
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { useSiteStore } from '@entities/site'
import { gsap } from 'gsap'
import { useLenis } from '@shared/lib/useLenis'

const lenis = useLenis()
const props = defineProps<{
  isActive: boolean
}>()

const { t } = useI18n()
const siteStore = useSiteStore()
const menuRef = ref<HTMLDialogElement | null>(null)
const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)
let isAnimating = false
const isDesktop = () => window.matchMedia('(min-width: 768px)').matches

function openMenu() {
  if (isAnimating) return
  isAnimating = true
  menuRef.value?.showModal()
  lenis.stop()

  const img = rightRef.value?.querySelector('.header-menu__image')
  const navLinks = leftRef.value?.querySelectorAll('.header-menu__nav-link')
  const links = leftRef.value?.querySelectorAll('.header-menu__link')
  const location = leftRef.value?.querySelector('.header-menu__locations')
  const actions = leftRef.value?.querySelector('.header-menu__actions')

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false
    }
  })

  // Начальное состояние панелей через clip-path
  tl.set(leftRef.value, { clipPath: 'inset(0 0 0 100%)', x: isDesktop() ? '100%' : 0 })
  tl.set(rightRef.value, { clipPath: 'inset(0 0 0 100%)' })
  tl.set(img!, { scale: 1.4 })
  tl.set([navLinks, links, location], { clipPath: 'inset(0 0 100% 0)' })
  tl.set(actions!, { opacity: 0 })
  // ── Фаза 1: блоки раскрываются через clip-path ──
  tl.to(leftRef.value, {
    clipPath: 'inset(0 0 0 0%)',
    x: 0,
    duration: 1,
    ease: 'power3.inOut'
  })
    .to(
      rightRef.value,
      {
        clipPath: 'inset(0 0 0 0%)',
        duration: 1,
        ease: 'power3.inOut'
      },
      '<'
    )
    .to(
      img!,
      {
        scale: 1,
        duration: 1,
        ease: 'power3.inOut'
      },
      '<'
    )

  // ── Фаза 2: шторка открывается на всех элементах одновременно ──
  tl.to(
    [navLinks, links, location],
    {
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.8,
      ease: 'power2.out'
    },
    '-=0.3'
  ).to(
    actions!,
    {
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    },
    '<'
  )
}

const emit = defineEmits(['closeMenu'])
function closeMenu() {
  if (isAnimating) return
  isAnimating = true

  const img = rightRef.value?.querySelector('.header-menu__image')
  const navLinks = leftRef.value?.querySelectorAll('.header-menu__nav-link')
  const links = leftRef.value?.querySelectorAll('.header-menu__link')
  const location = leftRef.value?.querySelector('.header-menu__locations')
  const actions = leftRef.value?.querySelector('.header-menu__actions')

  const tl = gsap.timeline({
    onComplete: () => {
      // Закрываем dialog только после завершения анимации
      menuRef.value?.close()
      emit('closeMenu')
      isAnimating = false
      lenis.start()
    }
  })
  tl.to(
    actions!,
    {
      opacity: 0,
      duration: 1,
      ease: 'power2.in'
    },
    '<'
  ).to(
    [navLinks, links, location],
    {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power2.in'
    },
    '<'
  )

  // ── Фаза 2: панели уходят через clip-path
  tl.to(leftRef.value, {
    clipPath: 'inset(0 0 0 100%)',
    x: isDesktop() ? '100%' : 0,
    duration: 1,
    ease: 'power3.in'
  })
  tl.to(
    rightRef.value,
    {
      clipPath: 'inset(0 0 0 100%)',
      duration: 1,
      ease: 'power3.in'
    },
    '<'
  )
  tl.to(
    img!,
    {
      scale: 1.4,
      duration: 1,
      ease: 'power3.in'
    },
    '<'
  )
}

watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      openMenu()
    } else {
      // Закрытие через кнопку уже вызывает closeMenu() напрямую,
      // но на случай если store меняется извне — тоже обрабатываем
      if (menuRef.value?.open) closeMenu()
    }
  }
)
</script>

<style lang="scss" scoped>
.header-menu {
  position: fixed;
  inset: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  color: var(--text);
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  background-color: transparent;
  transition:
    opacity var(--dur-fast) var(--ease),
    visibility var(--dur-fast) var(--ease);
  z-index: 1;
  max-width: unset;
  max-height: unset;

  &::backdrop {
    display: none;
  }

  &:not([open]) {
    display: none;
  }

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 50%;
    flex-shrink: 0;
    padding-block: var(--space-9) var(--space-7);
    padding-left: var(--gutter);
    padding-right: var(--space-5);
    z-index: 2;
    background-color: var(--bg-tint);
    overflow: hidden;

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

    @include tablet {
      padding-block: var(--space-7) var(--space-5);
    }

    @include tablet-s{
        width: 100%;
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    margin-bottom: var(--space-5);
  }

  &__nav-link {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    text-transform: uppercase;
  }

  &__nav-num {
    color: var(--text-faint);
    font-size: var(--text-lg);
  }

  &__socials {
    display: flex;
  }

  &__actions {
    margin-top: var(--space-5);
    display: flex;
    gap: var(--space-2) var(--space-4);
    align-items: center;
  }

  &__col {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 120px;
  }

  &__col-title {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--text-muted);
  }

  &__col-links {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  &__link {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    color: var(--text-muted);
    text-decoration: none;
    transition: color var(--dur-fast) var(--ease);

    &:hover {
      color: var(--text);
    }
  }

  &__locations {
    display: flex;
    gap: var(--space-1) var(--space-4);
    @include tablet {
      flex-wrap: wrap;
      flex-direction: column;
    }
  }

  &__location {
    display: flex;
    gap: var(--space-4);
    font-family: var(--font-ui);
    font-size: var(--text-base);
    color: var(--text-muted);
    &:not(:last-child)::after {
      content: '·';
    }
    @include tablet {
      flex-wrap: wrap;
      &::after {
        display: none;
      }
    }
  }
  &__bg {
    display: flex;
    width: 50%;
    height: 100%;
    flex-shrink: 0;
    z-index: 1;
    position: relative;
    overflow: clip;
    @include tablet-s {
      width: fit-content;
      height: fit-content;
      position: absolute;
      right: var(--gutter);
      top: 20px;
      z-index: 2;
    }
  }

  &__image {
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
    @include tablet-s {
      display: none;
    }
  }

  &__close {
    position: absolute;
    right: var(--gutter);
    top: 20px;
    z-index: 1;
    @include tablet-s {
      position: static;
    }
  }
}
</style>

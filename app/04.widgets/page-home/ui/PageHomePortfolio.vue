<template>
  <div ref="portfolioRef" class="portfolio">
    <div ref="slidesRef" class="portfolio__slides">
      <PageHomePortfolioGenre
        v-for="(genre, i) in genres"
        :key="genre.index"
        v-bind="genre"
        :is-active="activeIndex === i"
      />
    </div>

    <!-- Navigation dots -->
    <nav class="portfolio__dots" aria-label="Навигация по жанрам">
      <button
        v-for="(genre, i) in genres"
        :key="genre.index"
        type="button"
        :class="['portfolio__dot', { 'is-active': activeIndex === i }]"
        :aria-label="genre.title"
        :aria-current="activeIndex === i ? 'true' : undefined"
        @click="goTo(i)"
      />
    </nav>

    <!-- Scroll hint (hides after first genre) -->
    <div class="portfolio__hint" :class="{ 'is-hidden': activeIndex > 0 }" aria-hidden="true">
      <span class="portfolio__hint-arrow">↓</span>
      <span>Прокрутите, чтобы увидеть другие жанры</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { portfolioGenres as genres } from '../config/portfolioGenres'
import { useViewerStore } from '@entities/viewer'
import { useHeaderZoneObserver } from '~/01.shared/lib/useHeaderZoneObserver'
import { useLenis } from '@shared/lib/useLenis'
import { useGsapScrollSync } from '~/01.shared/lib/useGsapScrollSync'

useGsapScrollSync()
const viewerStore = useViewerStore()
const { setForcedHeaderTheme } = viewerStore

const portfolioRef = ref<HTMLElement | null>(null)
const slidesRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

useHeaderZoneObserver(
    portfolioRef,
    () => {
      setForcedHeaderTheme('dark')
    },
    () => {
      setForcedHeaderTheme(null)
    }
)

const lenis = useLenis()
let tween: gsap.core.Tween | null = null

function goTo(index: number) {
  if (!portfolioRef.value) return
  const top = portfolioRef.value.offsetTop + index * window.innerHeight
  lenis.scrollTo(top)
}

onMounted(() => {
  if (!portfolioRef.value || !slidesRef.value) return

  const count = genres.length

  tween = gsap.to(slidesRef.value, {
    y: () => -(count - 1) * window.innerHeight,
    ease: 'none',
    scrollTrigger: {
      trigger: portfolioRef.value,
      start: 'top top',
      end: () => `+=${(count - 1) * window.innerHeight}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
      snap: {
        snapTo: 1 / (count - 1),
        duration: { min: 0.2, max: 0.4 },
        ease: 'power2.inOut'
      },
      onUpdate: (self) => {
        activeIndex.value = Math.round(self.progress * (count - 1))
      }
    }
  })
})

onUnmounted(() => {
  tween?.scrollTrigger?.kill()
  tween?.kill()
})
</script>

<style lang="scss" scoped>
.portfolio {
  position: relative;
  height: 100dvh;
  overflow: hidden;

  &__slides {
    will-change: transform;
  }

  // ── Navigation dots ───────────────────────────────────────────
  &__dots {
    position: absolute;
    right: var(--space-5);
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  &__dot {
    width: 8px;
    height: 8px;
    padding: 0;
    border-radius: var(--radius-pill);
    border: 1px solid rgba(255, 255, 255, 0.35);
    background: transparent;
    cursor: pointer;
    transition:
      background var(--dur-fast) var(--ease),
      border-color var(--dur-fast) var(--ease),
      transform var(--dur-fast) var(--ease);

    &.is-active {
      background: #fff;
      border-color: #fff;
      transform: scale(1.3);
    }

    &:hover:not(.is-active) {
      border-color: rgba(255, 255, 255, 0.65);
      background: rgba(255, 255, 255, 0.15);
    }

    &:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.6);
      outline-offset: 4px;
    }
  }

  // ── Scroll hint ───────────────────────────────────────────────
  &__hint {
    position: absolute;
    bottom: var(--space-6);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.38);
    z-index: 10;
    white-space: nowrap;
    pointer-events: none;
    transition: opacity var(--dur) var(--ease);

    &.is-hidden {
      opacity: 0;
    }
  }

  &__hint-arrow {
    animation: hint-bounce 2s ease-in-out infinite;
  }
}

@keyframes hint-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}
</style>

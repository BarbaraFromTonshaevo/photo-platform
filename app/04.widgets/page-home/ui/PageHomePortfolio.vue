<template>
  <!--
    РЕКОМЕНДАЦИИ ПО ИНТЕГРАЦИИ С ШАПКОЙ (HeaderBase):

    На скриншоте в шапке видна жанровая навигация (Репортаж / Студийная / ...).
    Варианты совмещения с уже существующим HeaderBase:

    1. Pinia-стор (рекомендуется):
       Добавить usePortfolioStore с { isActive: boolean; activeIndex: number; genres: Genre[] }.
       PageHomePortfolio пишет туда текущее состояние.
       HeaderBase читает стор и когда isActive=true — заменяет siteStore.navLinks
       на список жанров (через v-if + transition). Это явный, тестируемый подход.

    2. Provide / Inject:
       PageHomePortfolio передаёт { activeIndex, genres } через provide('portfolioNav').
       HeaderBase получает их через inject и отображает доп. навигацию.
       Проще Pinia, но менее наблюдаемо.

    3. CSS-класс на body/layout:
       Когда секция активна — добавить класс на document.body.
       HeaderBase реагирует на CSS-переменную через :global(.portfolio-active) .header__nav.
       Наименее явный, но не требует изменений в стейт-менеджменте.
  -->
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
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolioGenres as genres } from '../config/portfolioGenres'

gsap.registerPlugin(ScrollTrigger)

const portfolioRef = ref<HTMLElement | null>(null)
const slidesRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

let tween: gsap.core.Tween | null = null

// NOTE: если в проекте добавится Lenis, заменить на lenis.scrollTo(top)
function goTo(index: number) {
  if (!portfolioRef.value) return
  const top = portfolioRef.value.offsetTop + index * window.innerHeight
  window.scrollTo({ top, behavior: 'smooth' })
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
        duration: { min: 0.2, max: 0.5 },
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

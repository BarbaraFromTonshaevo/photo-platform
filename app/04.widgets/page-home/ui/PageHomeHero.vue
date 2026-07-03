<template>
  <section ref="heroRef" class="hero">
    <div class="hero__bg" aria-hidden="true">
      <img src="/images/home/hero.jpg" alt="" class="hero__bg-img" />
      <div class="hero__overlay" />
    </div>

    <div class="hero__inner">
      <div ref="genresRef" class="hero__genres">
        <span class="hero__genres-line" />
        <span>Репортаж · Студия · Свадьбы</span>
      </div>

      <div class="hero__heading-wrap">
        <h1 class="hero__heading">
          <span ref="headingFirstRef">Варвара</span>
          <span ref="headingLastRef" class="hero__heading-last">Елькина</span>
        </h1>
      </div>

      <p ref="contentRef" class="hero__desc">
        Живые эмоции,<br />
        естественный свет и<br />
        внимание к деталям.
      </p>
      <div ref="actionsRef" class="hero__actions">
        <ButtonBase variant="primary" size="m" to="#"> Записаться на съёмку </ButtonBase>
        <ButtonBase variant="secondary" size="m" to="#"> Смотреть портфолио </ButtonBase>
      </div>

      <div ref="statsRef" class="hero__stats">
        <div class="hero__stat">
          <span class="hero__stat-value">8 лет</span>
          <span class="hero__stat-label">В фотографии</span>
        </div>
        <div class="hero__stat">
          <span class="hero__stat-value">300+</span>
          <span class="hero__stat-label">Съёмок</span>
        </div>
        <div class="hero__stat">
          <span class="hero__stat-value">5</span>
          <span class="hero__stat-label">Жанров</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { useViewerStore } from '@entities/viewer'
import { useHeaderZoneObserver } from '~/01.shared/lib/useHeaderZoneObserver'

const viewerStore = useViewerStore()
const { setForcedHeaderTheme } = viewerStore

const genresRef = ref<HTMLElement | null>(null)
const headingFirstRef = ref<HTMLElement | null>(null)
const headingLastRef = ref<HTMLElement | null>(null)
const badgeRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const actionsRef = ref<HTMLElement | null>(null)

const statsRef = ref<HTMLElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)

useHeaderZoneObserver(
  heroRef,
  () => {
    setForcedHeaderTheme('dark')
  },
  () => {
    setForcedHeaderTheme(null)
  }
)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.85 } })

  tl.from(genresRef.value, { opacity: 0, x: -50, duration: 0.6 })
    .from(headingFirstRef.value, { opacity: 0, x: -70 }, '-=0.3')
    .from(headingLastRef.value, { opacity: 0, x: -70 }, '-=0.75')
    .from(badgeRef.value, { opacity: 0, x: 50, duration: 0.7 }, '-=0.85')
    .from(contentRef.value, { opacity: 0, x: -50 }, '-=0.5')
    .from(actionsRef.value, { opacity: 0, x: -50 }, '-=0.5')
    .from(
      statsRef.value!.querySelectorAll('.hero__stat'),
      { opacity: 0, x: -30, stagger: 0.12 },
      '-=0.45'
    )
})
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  color: #fff;

  &__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: #1a1612;
  }

  &__bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(18, 15, 12, 0.7) 0%, rgba(18, 15, 12, 0.4) 100%);
  }

  &__inner {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: calc(var(--header-h) + var(--space-8)) var(--gutter) var(--space-8);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: calc(var(--maxw) + var(--gutter) * 2);
    margin-inline: auto;
    @include tablet-s {
      padding-top: calc(var(--header-h) + var(--space-5));
      padding-bottom: var(--space-7);
      justify-content: initial;
      gap: 30px;
    }
    @include mobile{
      padding-bottom: var(--space-5);
    }
  }

  &__genres {
    display: flex;
    align-items: center;
    gap: var(--space-5);
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
  }

  &__genres-line {
    display: block;
    width: 52px;
    height: 1px;
    background: currentColor;
    flex-shrink: 0;
  }

  &__heading-wrap {
    position: relative;
  }

  &__heading {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: var(--text-hero);
    line-height: 1;
    letter-spacing: var(--tracking-tight);
    font-weight: 400;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  &__heading-last {
    font-style: italic;
  }

  &__badge {
    position: absolute;
    right: 0;
    bottom: var(--space-4);
    padding: var(--space-2) var(--space-5);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: var(--radius-pill);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.75);
    white-space: nowrap;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  &__desc {
    font-family: var(--font-display);
    font-style: italic;
    font-size: clamp(1.3rem, 2.6vw, 2rem);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.92);
    max-width: 26ch;
    // margin-top: var(--space-5);
    line-height: var(--leading-snug);
    @include tablet-s{
        margin-bottom: auto;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);

    :deep(.ui-button--primary) {
      background: #fff;
      color: #1c1810;
      border-color: #fff;

      &:hover {
        background: rgba(255, 255, 255, 0.88);
      }

      &:active {
        background: rgba(255, 255, 255, 0.74);
      }
    }

    :deep(.ui-button--secondary) {
      color: #fff;
      border-color: rgba(255, 255, 255, 0.35);

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.55);
      }
    }

    @include mobile {
      width: 100%;
      flex-direction: column;
      justify-content: stretch;
      order: 7;
      :deep(.ui-button) {
        width: 100%;
      }
    }
  }

  &__stats {
    display: flex;
    gap: var(--space-6);
  }

  &__stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  &__stat-value {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 500;
  }

  &__stat-label {
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
    color: rgba(255, 255, 255, 0.7);
  }
}
</style>

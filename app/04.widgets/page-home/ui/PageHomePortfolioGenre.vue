<template>
  <section ref="slideRef" class="genre-slide">
    <div ref="infoRef" class="genre-slide__info">
      <div class="genre-slide__meta">
        <span class="genre-slide__index">{{ formattedIndex }}</span>
        <span class="genre-slide__dash" aria-hidden="true" />
        <span class="genre-slide__genre-label">Жанр</span>
      </div>

      <h2 class="genre-slide__title">{{ title }}</h2>
      <p class="genre-slide__desc">{{ description }}</p>

      <ButtonBase :to="to" variant="secondary" class="genre-slide__btn" :arrow="true">
        Смотреть галерею
      </ButtonBase>
    </div>

    <div class="genre-slide__strip" aria-hidden="true">
      <div ref="trackRef" class="genre-slide__track">
        <figure
          v-for="(photo, i) in loopPhotos"
          :key="i"
          class="genre-slide__photo"
          :class="{ 'genre-slide__photo--placeholder': !photo.src }"
        >
          <NuxtImg
            v-if="photo.src"
            :src="photo.src"
            :alt="photo.alt ?? ''"
            loading="lazy"
            format="webp"
            quality="80"
            draggable="false"
          />
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useInViewport } from '~/01.shared/lib/useInViewport'

export interface GenrePhoto {
  src?: string
  alt?: string
}

const props = defineProps<{
  index: number
  title: string
  description: string
  to: string
  photos: GenrePhoto[]
  isActive?: boolean
}>()

const formattedIndex = computed(() => String(props.index).padStart(2, '0'))
const loopPhotos = computed(() => [...props.photos, ...props.photos])

const STRIP_SPEED = 100 // px/sec — постоянная скорость ленты независимо от ширины контента

const infoRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const slideRef = ref<HTMLElement | null>(null)
let stripTween: gsap.core.Tween | null = null

// Лента крутится бесконечно (repeat: -1), поэтому вне вьюпорта её нужно
// ставить на паузу — иначе все жанры анимируются одновременно даже вне экрана
const isInViewport = useInViewport(slideRef)

watch(isInViewport, (visible) => {
  if (visible) stripTween?.play()
  else stripTween?.pause()
})

function getInfoChildren() {
  return infoRef.value ? Array.from(infoRef.value.children) : []
}

function animateIn() {
  gsap.fromTo(
    getInfoChildren(),
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }
  )
}

function resetInfo() {
  gsap.set(getInfoChildren(), { opacity: 0, y: 24 })
}

watch(
  () => props.isActive,
  (active) => {
    if (active) animateIn()
    else resetInfo()
  }
)

// Реальная ширина фото известна только после загрузки <img> — ждём её,
// чтобы измерить ленту по фактическим (а не предполагаемым) пропорциям
function waitForImages(container: HTMLElement) {
  const imgs = Array.from(container.querySelectorAll('img'))
  return Promise.all(
    imgs.map(
      (img) =>
        img.complete ||
        new Promise<void>((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true })
          img.addEventListener('error', () => resolve(), { once: true })
        })
    )
  )
}

onMounted(() => {
  // Скрыть неактивные жанры сразу; первый (isActive=true) остаётся видимым
  if (!props.isActive) resetInfo()

  if (!trackRef.value) return
  waitForImages(trackRef.value).then(() => {
    if (!trackRef.value) return
    const halfWidth = trackRef.value.scrollWidth / 2
    stripTween = gsap.to(trackRef.value, {
      x: -halfWidth,
      duration: halfWidth / STRIP_SPEED,
      ease: 'none',
      repeat: -1,
      paused: !isInViewport.value
    })
  })
})

onUnmounted(() => {
  stripTween?.kill()
})
</script>

<style lang="scss" scoped>
.genre-slide {
  --info-w: clamp(360px, 40vw, 460px);

  position: relative;
  display: flex;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: oklch(0.185 0.008 72);
  color: #fff;
  padding-top: var(--header-h);

  // ── Info panel ────────────────────────────────────────────────
  &__info {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    width: var(--info-w);
    background-image: linear-gradient(to right, #0e0d0c, transparent);
    padding: calc(var(--header-h) + var(--space-7)) var(--space-6) var(--space-8) var(--gutter);
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: var(--space-4);
  }

  &__index {
    font-weight: 600;
  }

  &__dash {
    display: block;
    width: 32px;
    height: 1px;
    background: currentColor;
    flex-shrink: 0;
  }

  &__genre-label {
    letter-spacing: var(--tracking-label);
  }

  &__title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: 400;
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
    margin: 0 0 var(--space-5);
  }

  &__desc {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: rgba(255, 255, 255, 0.55);
    margin: 0 0 var(--space-7);
    max-width: 28ch;
  }

  &__btn.ui-button {
    color: oklch(0.925 0.010 84);
    background-color: transparent;
    border-color: oklch(85.988% 0.01387 78.171 / 0.5);
    &:hover{
        border-color: oklch(85.988% 0.01387 78.171);
        background-color: oklch(0.965 0.012 84 / 0.1);;
    }
  }

  // ── Infinite strip ────────────────────────────────────────────
  &__strip {
    position: absolute;
    // inset-inline-start: var(--info-w);
    // inset-inline-end: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    padding-top: var(--header-h);

  }

  &__track {
    display: flex;
    align-items: stretch;
    height: 100%;
    gap: var(--space-5);
    will-change: transform;
  }

  &__photo {
    // ширина подстраивается под собственные пропорции img (height: 100%, width: auto)
    width: fit-content;
    height: 100%;
    flex-shrink: 0;
    overflow: hidden;
    background: #1a1816;
    margin: 0;

    &--placeholder {
      width: calc(1.5 * 100dvh);
    }

    img {
      width: auto;
      height: 100%;
      object-fit: cover;
      display: block;
      pointer-events: none;
      user-select: none;
    }
  }
}
</style>

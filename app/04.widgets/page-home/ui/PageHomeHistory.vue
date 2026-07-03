<template>
  <section class="history">
    <div ref="spacerRef" class="history__spacer" :style="{ height: spacerHeight + 'px' }">
      <div class="history__sticky">
        <div class="history__inner">
          <div class="history__head">
            <div class="history__head-left">
              <span class="history__label">История</span>
              <h2 class="history__title">Как я пришла в фотографию</h2>
            </div>
            <span class="history__counter">
              <span class="history__counter--accent">{{ pad(activeIndex + 1) }}</span>&nbsp;/&nbsp;{{ pad(slides.length) }}
            </span>
          </div>

          <Swiper
            :modules="swiperModules"
            :slides-per-view="1"
            :speed="700"
            :space-between="50"
            :keyboard="{ enabled: true }"
            :allow-touch-move="false"
            class="history__swiper"
            @swiper="onSwiper"
            @slide-change="onSlideChange"
            @slide-change-transition-end="onSlideChangeTransitionEnd"
          >
            <SwiperSlide v-for="slide in slides" :key="slide.year">
              <div class="history__slide">
                <div class="history__content">
                  <p class="history__year">{{ slide.year }}</p>
                  <h3 class="history__subtitle">{{ slide.subtitle }}</h3>
                  <p class="history__desc">{{ slide.desc }}</p>
                </div>
                <div class="history__photos">
                  <div class="history__photo history__photo--big">
                    <span class="history__tag">Кадр</span>
                  </div>
                  <div class="history__photos-side">
                    <div class="history__photo history__photo--sm">
                      <span class="history__tag">Кадр</span>
                    </div>
                    <div class="history__photo history__photo--sm">
                      <span class="history__tag">Кадр</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <div class="history__nav">
            <ButtonArrow
              direction="left"
              :disabled="activeIndex === 0"
              aria-label="Предыдущий слайд"
              @click="goToSlide(activeIndex - 1)"
            />
            <div class="history__timeline">
              <div class="history__tl-track" :style="'--percent: ' + activeIndex / (slides.length - 1) * 100 + '%'" />
              <button
                v-for="(slide, i) in slides"
                :key="slide.year"
                class="history__tl-item"
                :class="[{ 'is-active': i === activeIndex }, { 'is-previous': i <= activeIndex }]"
                @click="goToSlide(i)"
              >
                <span class="history__tl-dot" />
                <span class="history__tl-year">{{ slide.year }}</span>
              </button>
            </div>
            <ButtonArrow
              direction="right"
              :disabled="activeIndex === slides.length - 1"
              aria-label="Следующий слайд"
              @click="goToSlide(activeIndex + 1)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper'
import { Keyboard } from 'swiper/modules'
import 'swiper/css'
import gsap from 'gsap'
import { useLenis } from '@shared/lib/useLenis'

const swiperModules = [Keyboard]

const slides = [
  {
    year: '2016',
    subtitle: 'Первая камера',
    desc: 'Плёночный «Зенит» в подарок и первые кадры двора, друзей, кошек. Снимаю всё подряд и учусь видеть свет.'
  },
  {
    year: '2018',
    subtitle: 'От хобби к заказам',
    desc: 'Первые платные репортажи на днях рождения и небольших мероприятиях. Покупаю первую цифровую зеркалку.'
  },
  {
    year: '2020',
    subtitle: 'Студия и портрет',
    desc: 'Осваиваю студийный свет, начинаю снимать портреты и семьи. Формируется узнаваемый спокойный стиль.'
  },
  {
    year: '2022',
    subtitle: 'Свадьбы',
    desc: 'Свадебная съёмка становится главным направлением. Десятки историй любви за сезон, поездки в другие города.'
  },
  {
    year: '2024',
    subtitle: 'Своя студия',
    desc: 'Открываю собственное пространство для съёмок и печати. Запускаю авторские фотоальбомы ручной сборки.'
  }
]

const lenis = useLenis()

const spacerRef = ref<HTMLElement | null>(null)
const swiperRef = ref<SwiperType | null>(null)
const activeIndex = ref(0)
const spacerHeight = ref(0)

const pad = (n: number) => String(n).padStart(2, '0')

function getSlideTargets(slideEl: Element | undefined) {
  if (!slideEl) return null
  const big = slideEl.querySelector('.history__photo--big')
  const side = slideEl.querySelectorAll('.history__photos-side .history__photo--sm')
  const year = slideEl.querySelector('.history__year')
  const subtitle = slideEl.querySelector('.history__subtitle')
  const desc = slideEl.querySelector('.history__desc')
  if (!big || !side.length) return null
  return { big, side, year, subtitle, desc }
}

function hideSlideContent(slideEl: Element | undefined) {
  const targets = getSlideTargets(slideEl)
  if (!targets) return
  gsap.set([targets.big, ...Array.from(targets.side), targets.year, targets.subtitle, targets.desc], { opacity: 0, y: 28 })
}

function revealSlideContent(slideEl: Element | undefined) {
  const targets = getSlideTargets(slideEl)
  if (!targets) return
  const { big, side, year, subtitle, desc } = targets
  if(!(side[0] && side[1])) return
  gsap
    .timeline({ delay: 0.08 })
    .to(year, { opacity: 1, y: 0, duration: 0.72, ease: 'power3.out' })
    .to(subtitle, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
    .to(desc, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
    .to(big, { opacity: 1, y: 0, duration: 0.72, ease: 'power3.out' }, '-=0.6')
    .to(side[0], { opacity: 1, y: 0, duration: 0.58, ease: 'power3.out' }, '-=0.42')
    .to(side[1], { opacity: 1, y: 0, duration: 0.58, ease: 'power3.out' }, '-=0.36')
}

let isScrollDriven = false
let hasEntered = false
let ticking = false

function updateSpacerHeight() {
  spacerHeight.value = window.innerHeight * slides.length
}

function scrollToIndex(idx: number) {
  const spacer = spacerRef.value
  if (!spacer) return
  const total = spacer.getBoundingClientRect().height - window.innerHeight
  if (total <= 0) return
  const wrapperTop = spacer.getBoundingClientRect().top + window.scrollY
  const targetY = wrapperTop + (idx / (slides.length - 1)) * total
  lenis.scrollTo(targetY)
}

function goToSlide(idx: number) {
  const swiper = swiperRef.value
  if (!swiper) return
  const clamped = Math.min(Math.max(idx, 0), slides.length - 1)
  swiper.slideTo(clamped)
}

function updateFromScroll() {
  const spacer = spacerRef.value
  const swiper = swiperRef.value
  if (!spacer || !swiper) return

  const rect = spacer.getBoundingClientRect()
  const total = rect.height - window.innerHeight
  if (total <= 0) return

  if (!hasEntered && rect.top <= 0 && rect.bottom > window.innerHeight) {
    hasEntered = true
    revealSlideContent(swiper.slides[swiper.activeIndex])
  }

  const progress = Math.min(Math.max(-rect.top / total, 0), 1)
  const idx = Math.round(progress * (slides.length - 1))

  if (idx !== swiper.activeIndex) {
    isScrollDriven = true
    swiper.slideTo(idx, 400)
  }
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    updateFromScroll()
    ticking = false
  })
}

function onResize() {
  updateSpacerHeight()
}

onMounted(() => {
  updateSpacerHeight()
  lenis.on('scroll', onScroll)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  lenis.off('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})

function onSwiper(swiper: SwiperType) {
  swiperRef.value = swiper
}

function onSlideChange(swiper: SwiperType) {
  activeIndex.value = swiper.activeIndex
  hideSlideContent(swiper.slides[swiper.activeIndex])
  if (!isScrollDriven) scrollToIndex(swiper.activeIndex)
  isScrollDriven = false
}

function onSlideChangeTransitionEnd(swiper: SwiperType) {
  revealSlideContent(swiper.slides[swiper.activeIndex])
}
</script>

<style lang="scss" scoped>
.history {
  background: var(--bg-tint);
  color: var(--text);

  &__spacer {
    position: relative;
  }

  &__sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    padding: var(--space-10) var(--gutter) var(--space-8);
    overflow-x: clip;
  }

  &__inner {
    width: 100%;
    max-width: calc(var(--maxw) + var(--gutter) * 2);
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  // ── Header ──────────────────────────────────────────────────────────
  &__head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__head-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  &__label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    font-weight: 600;
    color: var(--accent-contrast);
  }

  &__title {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 400;
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    margin: 0;
  }

  &__counter {
    justify-self: end;
    font-family: var(--font-display);
    font-size: var(--text-lg);
    color: var(--text-faint);
    font-variant-numeric: tabular-nums;
    font-style: italic;
    white-space: nowrap;
    padding-bottom: 6px;
    &--accent{
        color: var(--accent-contrast);
    }
  }

  // ── Swiper ──────────────────────────────────────────────────────────
  &__swiper {
    width: 100%;
  }

  &__slide {
    display: flex;
    gap: var(--space-9);
    align-items: stretch;
  }

  // ── Slide content (left) ─────────────────────────────────────────────
  &__content {
    flex: 0 0 clamp(220px, 30%, 360px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-5);
    padding-right: var(--space-6);
  }

  &__year {
    font-family: var(--font-display);
    font-style: italic;
    font-size: var(--text-3xl);
    line-height: 1;
    letter-spacing: var(--tracking-tight);
    color: var(--accent-contrast);
    opacity: 0.9;
    margin: 0;
  }

  &__subtitle {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 500;
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
  }

  &__desc {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: var(--text-soft);
    margin: 0;
  }

  // ── Photos (right) ───────────────────────────────────────────────────
  &__photos {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 0.48fr;
    gap: var(--space-4);
    height: clamp(380px, 46vh, 560px);
  }

  &__photos-side {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__photo {
    position: relative;
    overflow: hidden;
    background-color: var(--surface-2);
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(0, 0, 0, 0.045) 10px,
      rgba(0, 0, 0, 0.045) 11px
    );
    display: flex;
    align-items: center;
    justify-content: center;

    &--big {
      height: 100%;
    }

    &--sm {
      flex: 1;
    }
  }

  &__tag {
    padding: var(--space-2) var(--space-4);
    background: var(--surface);
    backdrop-filter: blur(6px);
    border: 1px solid var(--line);
    border-radius: var(--radius-pill);
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--text-soft);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
  }

  // ── Nav + timeline ───────────────────────────────────────────────────
  &__nav {
    display: flex;
    align-items: center;
    gap: var(--space-6);
  }

  &__timeline {
    position: relative;
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-top: 5px; // aligns track with dot center
  }

  &__tl-track {
    position: absolute;
    top: 9px; // vertically centered on dot (dot is 10px, 5px center + 4px padding-top = 9px)
    left: 5px;
    right: 5px;
    height: 1px;
    background: var(--line-strong);
        &::after{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: var(--percent);
        background-color: var(--accent);
        transition: width 0.2s;
    }
  }

  &__tl-item {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: opacity var(--dur-fast) var(--ease);

    @include hover {
      &:hover {
        opacity: 0.7;
      }
    }

    &:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 4px;
      border-radius: 2px;
    }
  }

  &__tl-dot {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1.5px solid var(--line-strong);
    background-color: var(--bg-tint);
    transition:
      background var(--dur-fast) var(--ease),
      transform var(--dur-fast) var(--ease),
      border-color var(--dur-fast) var(--ease);

    .is-previous & {
      background: var(--accent);
      border-color: var(--accent);
    }

    .is-active & {
      transform: scale(1.5);
    }
  }

  &__tl-year {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--text-faint);
    transition: color var(--dur-fast) var(--ease);

    .is-active & {
      color: var(--text);
      font-weight: 500;
    }
  }
}
</style>

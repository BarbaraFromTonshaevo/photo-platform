<template>
  <section ref="sectionRef" class="history">
    <div class="history__inner">
      <div class="history__head">
        <div class="history__head-left">
          <span class="history__label">История</span>
          <h2 class="history__title">Как я пришла в фотографию</h2>
        </div>
        <span class="history__counter">
          {{ pad(activeIndex + 1) }}&nbsp;/&nbsp;{{ pad(slides.length) }}
        </span>
      </div>

      <Swiper
        :modules="swiperModules"
        :slides-per-view="1"
        :speed="700"
        :mousewheel="{ releaseOnEdges: true }"
        :keyboard="{ enabled: true }"
        class="history__swiper"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
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
          @click="swiperRef?.slidePrev()"
        />
        <div class="history__timeline">
          <div class="history__tl-track" />
          <button
            v-for="(slide, i) in slides"
            :key="slide.year"
            class="history__tl-item"
            :class="{ 'is-active': i === activeIndex }"
            @click="swiperRef?.slideTo(i)"
          >
            <span class="history__tl-dot" />
            <span class="history__tl-year">{{ slide.year }}</span>
          </button>
        </div>
        <ButtonArrow
          direction="right"
          :disabled="activeIndex === slides.length - 1"
          aria-label="Следующий слайд"
          @click="swiperRef?.slideNext()"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper'
import { Mousewheel, Keyboard } from 'swiper/modules'
import 'swiper/css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const swiperModules = [Mousewheel, Keyboard]

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

const sectionRef = ref<HTMLElement | null>(null)
const swiperRef = ref<SwiperType | null>(null)
const activeIndex = ref(0)

const pad = (n: number) => String(n).padStart(2, '0')

function animatePhotos(slideEl: Element) {
  const big = slideEl.querySelector('.history__photo--big')
  const side = slideEl.querySelectorAll('.history__photos-side .history__photo--sm')

  if (!big || !side.length) return

  gsap.set([big, ...Array.from(side)], { opacity: 0, y: 28 })

  gsap
    .timeline({ delay: 0.08 })
    .to(big, { opacity: 1, y: 0, duration: 0.72, ease: 'power3.out' })
    .to(side[0], { opacity: 1, y: 0, duration: 0.58, ease: 'power3.out' }, '-=0.42')
    .to(side[1], { opacity: 1, y: 0, duration: 0.58, ease: 'power3.out' }, '-=0.36')
}

function onSwiper(swiper: SwiperType) {
  swiperRef.value = swiper

  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 80%',
    once: true,
    onEnter: () => animatePhotos(swiper.slides[swiper.activeIndex])
  })
}

function onSlideChange(swiper: SwiperType) {
  activeIndex.value = swiper.activeIndex
  animatePhotos(swiper.slides[swiper.activeIndex])
}
</script>

<style lang="scss" scoped>
.history {
  background: #f2ede4;
  color: #1c1810;
  padding: var(--space-10) var(--gutter) var(--space-8);
  overflow-x: clip;

  &__inner {
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
    color: #7a7268;
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
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: #b0a898;
    font-style: italic;
    white-space: nowrap;
    padding-bottom: 6px;
  }

  // ── Swiper ──────────────────────────────────────────────────────────
  &__swiper {
    width: 100%;
    overflow: visible !important;
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
    font-weight: 400;
    line-height: 1;
    letter-spacing: var(--tracking-tight);
    color: #3d4a35;
    margin: 0;
  }

  &__subtitle {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 400;
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    margin: 0;
  }

  &__desc {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: #3d3830;
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
    background-color: #e4ddd1;
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
    background: rgba(242, 237, 228, 0.72);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: var(--radius-pill);
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: #3d3830;
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
    background: #c8bfb4;
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
      outline: 2px solid #4a5e39;
      outline-offset: 4px;
      border-radius: 2px;
    }
  }

  &__tl-dot {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1.5px solid #7a7268;
    background: transparent;
    transition:
      background var(--dur-fast) var(--ease),
      border-color var(--dur-fast) var(--ease);

    .is-active & {
      background: #4a5e39;
      border-color: #4a5e39;
    }
  }

  &__tl-year {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: #7a7268;
    transition: color var(--dur-fast) var(--ease);

    .is-active & {
      color: #1c1810;
      font-weight: 500;
    }
  }
}
</style>

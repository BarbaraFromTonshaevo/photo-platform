<template>
  <section class="album">
    <div class="album__inner">
      <div ref="imageColRef" class="album__image-col">
        <div class="album__image-wrap">
          <div class="album__placeholder" aria-hidden="true" />
          <div class="album__stamp">РАЗВОРОТ АЛЬБОМА</div>
        </div>
        <div class="album__badge">до конца сезона</div>
      </div>

      <div ref="contentColRef" class="album__content-col">
        <div class="album__meta">
          <span class="album__label">Спецпредложение</span>
          <span class="album__index">04</span>
        </div>

        <h2 class="album__heading">
          Печатный фотоальбом<br />
          <em>ручной сборки</em>
        </h2>

        <p class="album__desc">
          Ваша съёмка живёт не только в телефоне. Я собираю
          плотный альбом на дизайнерской бумаге с разворотами на
          всю ширину&nbsp;&mdash; вещь, которую хочется держать в руках и
          передавать дальше.
        </p>

        <ul class="album__features">
          <li>Дизайнерская бумага, печать музейного качества</li>
          <li>Развороты без разрыва, тиснение имени на обложке</li>
          <li>Индивидуальная вёрстка под вашу историю</li>
        </ul>

        <hr class="album__divider" />

        <div class="album__price-block">
          <div class="album__price-col">
            <span class="album__price-label">Цена от</span>
            <div class="album__price-row">
              <span class="album__price-current">6&nbsp;900&nbsp;₽</span>
              <span class="album__price-old">9&nbsp;500&nbsp;₽</span>
            </div>
          </div>
          <ButtonBase variant="primary" size="m" to="#">Заказать альбом</ButtonBase>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const imageColRef = ref<HTMLElement | null>(null)
const contentColRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.from(imageColRef.value, {
    opacity: 0,
    x: -60,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: imageColRef.value,
      start: 'top 80%',
    },
  })

  const contentEls = contentColRef.value?.children
  if (contentEls) {
    gsap.from(Array.from(contentEls), {
      opacity: 0,
      y: 40,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: contentColRef.value,
        start: 'top 80%',
      },
    })
  }
})
</script>

<style lang="scss" scoped>
.album {
  background: #f2ede4;
  color: #1c1810;
  padding: var(--space-10) var(--gutter);

  &__inner {
    max-width: calc(var(--maxw) + var(--gutter) * 2);
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-9);
    align-items: start;
  }

  &__image-col {
    position: relative;
  }

  &__image-wrap {
    position: relative;
    aspect-ratio: 1 / 1;
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
  }

  &__placeholder {
    inset: 0;
    position: absolute;
  }

  &__stamp {
    position: relative;
    z-index: 1;
    padding: var(--space-2) var(--space-5);
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
  }

  &__badge {
    position: absolute;
    top: -32px;
    right: -20px;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: #4a5e39;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--space-4);
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: var(--leading-snug);
    color: #f2ede4;
    z-index: 2;
  }

  &__content-col {
    padding-top: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  &__meta {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  &__label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: #7a7268;
  }

  &__index {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: #b0a898;
    font-style: italic;
  }

  &__heading {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 400;
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    margin: 0;

    em {
      font-style: italic;
      color: #4a5e39;
    }
  }

  &__desc {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: #3d3830;
    margin: 0;
  }

  &__features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    li {
      font-family: var(--font-ui);
      font-size: var(--text-base);
      color: #3d3830;
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);

      &::before {
        content: '✓';
        flex-shrink: 0;
        color: #4a5e39;
        font-size: var(--text-sm);
        margin-top: 2px;
      }
    }
  }

  &__divider {
    border: none;
    border-top: 1px solid #d9d0c4;
    margin: 0;
  }

  &__price-block {
    display: flex;
    align-items: center;
    gap: var(--space-6);
  }

  &__price-col {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  &__price-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: #7a7268;
  }

  &__price-row {
    display: flex;
    align-items: baseline;
    gap: var(--space-4);
  }

  &__price-current {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 400;
    color: #1c1810;
    letter-spacing: var(--tracking-tight);
  }

  &__price-old {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    color: #b0a898;
    text-decoration: line-through;
  }
}
</style>

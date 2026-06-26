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
        <div class="album__label">Спецпредложение</div>

        <h2 class="album__heading">
          Печатный фотоальбом<br />
          <em>ручной сборки</em>
        </h2>

        <p class="album__desc">
          Ваша съёмка живёт не только в телефоне. Я собираю плотный альбом на дизайнерской бумаге с
          разворотами на всю ширину&nbsp;&mdash; вещь, которую хочется держать в руках и передавать
          дальше.
        </p>

        <ul class="album__features">
          <li>
            <Icon
              class="album__icon"
              name="ph:check"
              aria-hidden="true"
              width="1.3em"
            />Дизайнерская бумага, печать музейного качества
          </li>
          <li>
            <Icon class="album__icon" name="ph:check" aria-hidden="true" width="1.3em" />Развороты
            без разрыва, тиснение имени на обложке
          </li>
          <li>
            <Icon
              class="album__icon"
              name="ph:check"
              aria-hidden="true"
              width="1.3em"
            />Индивидуальная вёрстка под вашу историю
          </li>
        </ul>

        <div class="album__price-block">
          <div class="album__price-col">
            <span class="album__price-label">Цена от</span>
            <div class="album__price-row">
              <span class="album__price-current">6&nbsp;900&nbsp;₽</span>
              <del class="album__price-old">9&nbsp;500&nbsp;₽</del>
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
      start: 'top 80%'
    }
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
        start: 'top 80%'
      }
    })
  }
})
</script>

<style lang="scss" scoped>
.album {
  background: var(--bg);
  color: var(--text);
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
    background-color: var(--bg-tint);
    background-image: repeating-linear-gradient(
      135deg,
      transparent 0 13px,
      color-mix(in oklch, var(--text) 5%, transparent) 13px 14px
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

  &__badge {
    position: absolute;
    top: -32px;
    right: -20px;
    width: clamp(86px, 11vw, 118px);
    height: clamp(86px, 11vw, 118px);
    border-radius: 50%;
    background: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--space-4);
    font-family: var(--font-display);
    font-style: italic;
    font-size: var(--text-md);
    font-weight: 400;
    line-height: var(--leading-snug);
    color: var(--on-accent);
    transform-origin: center center;
    transform: rotate(-5deg);
    z-index: 2;
  }

  &__content-col {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  &__label {
    font-family: var(--font-ui);
    font-weight: 600;
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--accent-contrast);
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
      color: var(--accent-contrast);
    }
  }

  &__desc {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: var(--text-soft);
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
      font-size: var(--text-sm);
      color: var(--text-soft);
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
    }
  }

  &__icon{
    color: var(--accent);
  }

  &__price-block {
    border-top: 1px solid var(--line);
    padding-top: var(--space-5);
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
    color: var(--text-muted);
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
    letter-spacing: var(--tracking-tight);
  }

  &__price-old {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    text-decoration: line-through;
    color: var(--text-faint);
  }
}
</style>

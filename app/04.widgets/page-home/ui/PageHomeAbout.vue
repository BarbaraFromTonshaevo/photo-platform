<template>
  <section class="about">
    <div ref="innerRef" class="about__inner">
      <div ref="imageRef" class="about__image-col">
        <div class="about__image-wrap">
          <img src="/images/home/about.png" alt="Варвара Елькина — фотограф" class="about__image" />
        </div>
        <div class="about__quote">&laquo;Снимаю свет и тишину&raquo;</div>
      </div>

      <div class="about__content-col">
        <div class="about__label">О себе</div>

        <h2 class="about__heading">Хобби, которое <em>переросло</em> в&nbsp;профессию</h2>
      </div>

      <p class="about__content">
        Меня зовут Варвара. Я фотографирую больше восьми лет&nbsp;&mdash; началось всё с плёночной
        камеры и привычки замечать то, что обычно проходит мимо: луч на стене, поворот головы, паузу
        перед словом.
      </p>
      <p class="about__content">
        Со временем съёмка перестала быть хобби. Сегодня это профессия и способ сохранять подлинные
        моменты&nbsp;&mdash; без наигранных поз и тяжёлой ретуши. Я работаю с естественным светом и
        доверяю эмоции, а не постановке.
      </p>

      <p class="about__signature">&mdash;&nbsp;Варвара Елькина</p>
      <ul class="about__traits">
        <li>Естественный свет</li>
        <li>Живые эмоции</li>
        <li>Внимание к деталям</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const imageRef = ref<HTMLElement | null>(null)
const innerRef = ref<HTMLElement | null>(null)
const scrollTriggers: ScrollTrigger[] = []

onMounted(() => {
  const imageTween = gsap.from(imageRef.value, {
    opacity: 0,
    x: -60,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: imageRef.value,
      start: 'top 80%'
    }
  })
  if (imageTween.scrollTrigger) scrollTriggers.push(imageTween.scrollTrigger)

  const label = innerRef.value?.querySelector('.about__label')
  const heading = innerRef.value?.querySelector('.about__heading')
  const contents = innerRef.value?.querySelectorAll('.about__content')
  const signature = innerRef.value?.querySelector('.about__signature')
  const traits = innerRef.value?.querySelector('.about__traits')

  const contentTween = gsap.from([label, heading, contents, signature, traits], {
    opacity: 0,
    y: 40,
    duration: 0.85,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: innerRef.value,
      start: 'top 80%'
    }
  })
  if (contentTween.scrollTrigger) scrollTriggers.push(contentTween.scrollTrigger)
})

onUnmounted(() => {
  scrollTriggers.forEach(t => t.kill())
  scrollTriggers.length = 0
})
</script>

<style lang="scss" scoped>
.about {
  background: var(--bg);
  color: var(--text);
  padding: var(--space-10) var(--gutter);

  @include tablet-s{
    padding-block: var(--space-8);
  }

  &__inner {
    max-width: calc(var(--maxw) + var(--gutter) * 2);
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--space-5) var(--space-9);
    align-items: start;
    @include laptop {
      grid-gap: var(--space-5) var(--space-6);
    }
    @include tablet-s {
      display: initial;
    }
    @include mobile{
        display: flex;
        flex-direction: column;
    }
  }

  &__image-col {
    position: relative;
    grid-row: span 4;
    @include tablet {
      height: fit-content;
      margin: auto 0;
    }
    @include tablet-s {
      width: 50%;
      float: left;
      padding-right: var(--space-5);
      padding-bottom: var(--space-4);
    }
    @include mobile{
        padding: 0;
        width: 100%;
        float: initial;
    }
  }

  &__image-wrap {
    width: 100%;
    aspect-ratio: 4 / 5;
    height: calc(100vh - var(--header-h) - var(--gutter) * 2);
    overflow: hidden;

    @include laptop {
      height: initial;
      max-height: calc(100vh - var(--header-h) - var(--gutter) * 2);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__quote {
    position: absolute;
    bottom: var(--space-4);
    left: calc(-1 * var(--space-5));
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4);
    box-shadow: var(--shadow-md);
    font-family: var(--font-display);
    font-style: italic;
    font-size: var(--text-md);
    @include tablet-s {
      font-size: var(--text-sm);
      bottom: var(--space-5);
      left: calc(-1 * var(--space-3));
      padding: var(--space-2) var(--space-3);
    }
  }

  &__content-col {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    @include tablet-s {
      margin: 0 auto var(--space-5);
    }
    @include mobile{
        order: -1;
        margin-bottom: 0;
    }
  }

  &__label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    font-weight: 600;
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
      color: var(--accent);
    }
  }

  &__content {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: var(--text-soft);
    margin: 0;
  }

  &__signature {
    grid-column: 2/3;
    font-family: var(--font-display);
    font-style: italic;
    font-size: var(--text-xl);
    font-weight: 400;
    color: inherit;
    margin: 0;
    @include tablet-s {
      margin-top: var(--space-5);
      margin-bottom: var(--space-5);
    }
    @include mobile{
        margin: 0;
    }
  }

  &__traits {
    grid-column: 2/3;
    display: flex;
    gap: var(--space-3) var(--space-5);
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;

    li {
      font-family: var(--font-ui);
      font-size: var(--text-sm);
      color: var(--text-muted);
      display: flex;
      gap: var(--space-2);
      align-items: center;
      &::before {
        display: block;
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--accent);
      }
    }
  }
}
</style>

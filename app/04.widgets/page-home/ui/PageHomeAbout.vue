<template>
  <section class="about">
    <div class="about__inner">
      <div ref="imageColRef" class="about__image-col">
        <div class="about__image-wrap">
          <img src="/images/home/about.png" alt="Варвара Елькина — фотограф" class="about__image" />
        </div>
        <div class="about__quote">&laquo;Снимаю свет и тишину&raquo;</div>
      </div>

      <div ref="contentColRef" class="about__content-col">
        <div class="about__label">О себе</div>

        <h2 class="about__heading">
          Хобби, которое <em>переросло</em> в&nbsp;профессию
        </h2>

        <div class="about__body">
          <p>
            Меня зовут Варвара. Я фотографирую больше восьми лет&nbsp;&mdash;
            началось всё с плёночной камеры и привычки замечать то,
            что обычно проходит мимо: луч на стене, поворот головы,
            паузу перед словом.
          </p>
          <p>
            Со временем съёмка перестала быть хобби. Сегодня это
            профессия и способ сохранять подлинные моменты&nbsp;&mdash; без
            наигранных поз и тяжёлой ретуши. Я работаю с естественным
            светом и доверяю эмоции, а не постановке.
          </p>
        </div>

        <p class="about__signature">&mdash;&nbsp;Варвара Елькина</p>

        <ul class="about__traits">
          <li>Естественный свет</li>
          <li>Живые эмоции</li>
          <li>Внимание к деталям</li>
        </ul>
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
.about {
  background: var(--bg);
  color: var(--text);
  padding: var(--space-10) var(--gutter);

  &__inner {
    max-width: calc(var(--maxw) + var(--gutter) * 2);
    margin-inline: auto;
    display: flex;
    justify-content: space-between;
    gap: var(--space-9);
    align-items: start;
  }

  &__image-col {
    position: relative;
  }

  &__image-wrap {
    width: 100%;
    aspect-ratio: 4 / 5;
    height: calc(100vh - var(--header-h) - var(--gutter) * 2 );
    overflow: hidden;

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
  }

  &__content-col {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
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

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);

    p {
      font-family: var(--font-ui);
      font-size: var(--text-base);
      line-height: var(--leading-relaxed);
      color: var(--text-soft);
      margin: 0;
    }
  }

  &__signature {
    font-family: var(--font-display);
    font-style: italic;
    font-size: var(--text-xl);
    font-weight: 400;
    color: inherit;
    margin: 0;
  }

  &__traits {
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

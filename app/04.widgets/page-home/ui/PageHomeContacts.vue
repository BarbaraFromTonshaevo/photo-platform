<template>
  <section id="contacts" class="contacts">
    <div class="contacts__inner">
      <div class="contacts__label">Контакты</div>

      <h2 class="contacts__heading">Стоимость и&nbsp;запись</h2>

      <div class="contacts__body">
        <!-- Левая колонка: прайс + контакты -->
        <div ref="leftColRef" class="contacts__left">
          <div class="contacts__price">
            <div class="contacts__price-header">
              <span class="contacts__price-header-label">Прайс</span>
              <hr class="contacts__price-header-line" />
            </div>

            <ul class="contacts__price-list">
              <li v-for="item in PRICES" :key="item.title" class="contacts__price-item">
                <div class="contacts__price-info">
                  <span class="contacts__price-name">{{ item.title }}</span>
                  <span class="contacts__price-desc">{{ item.description }}</span>
                </div>
                <span class="contacts__price-value">{{ item.price }}</span>
              </li>
            </ul>
          </div>

          <div class="contacts__info">
            <div class="contacts__info-item">
              <span class="contacts__info-label">Почта</span>
              <a :href="`mailto:${contacts.email}`" class="contacts__info-value">
                {{ contacts.email }}
              </a>
            </div>
            <div class="contacts__info-item">
              <span class="contacts__info-label">Телефон</span>
              <a :href="contacts.phone.replace(/[\s()-]/g, '')" class="contacts__info-value">
                {{ contacts.phone }}
              </a>
            </div>
            <div class="contacts__info-item">
              <span class="contacts__info-label">Telegram</span>
              <a
                :href="telegramHref"
                target="_blank"
                rel="noopener noreferrer"
                class="contacts__info-value"
              >
                {{ telegramHandle }}
              </a>
            </div>
          </div>
        </div>

        <!-- Правая колонка: форма -->
        <div ref="formColRef" class="contacts__right">
          <RequestForm />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import type { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteStore } from '@entities/site'
import { useMatchMedia } from '@shared/lib/useMatchMedia'
import { useGsapScrollSync } from '~/01.shared/lib/useGsapScrollSync'

useGsapScrollSync()

interface PriceItem {
  title: string
  description: string
  price: string
}

const PRICES: PriceItem[] = [
  { title: 'Репортажная съёмка', description: '1 час, ~50 обработанных кадров', price: '8 000 ₽' },
  { title: 'Студийный портрет', description: 'студия + 1 час, 15 кадров', price: '10 000 ₽' },
  { title: 'Творческая съёмка', description: 'идея, локация, образ', price: 'от 12 000 ₽' },
  { title: 'Свадебный день', description: 'до 10 часов, 2-й фотограф', price: 'от 45 000 ₽' },
  { title: 'Детская / семейная', description: '1 час, дома или на улице', price: '9 000 ₽' }
]

const siteStore = useSiteStore()
const { contacts } = storeToRefs(siteStore)

const telegramHref = computed(() => {
  return siteStore.socials.find((s) => s.network === 'telegram')?.href ?? '#'
})

const telegramHandle = computed(() => {
  const href = telegramHref.value
  const match = href.match(/t\.me\/(.+)/)
  return match ? '@' + match[1] : '@varvara.photo'
})

const leftColRef = ref<HTMLElement | null>(null)
const formColRef = ref<HTMLElement | null>(null)
const isMobile = useMatchMedia('(max-width: 480px)')
const scrollTriggers: ScrollTrigger[] = []

onMounted(() => {
  if (isMobile.value) return

  const priceItems = leftColRef.value?.querySelectorAll('.contacts__price-item')
  if (priceItems?.length) {
    const priceTween = gsap.from(priceItems, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: {
        trigger: leftColRef.value,
        start: 'top 80%'
      }
    })
    if (priceTween.scrollTrigger) scrollTriggers.push(priceTween.scrollTrigger)
  }

  const infoItems = leftColRef.value?.querySelectorAll('.contacts__info-item')
  if (infoItems?.length) {
    const infoTween = gsap.from(infoItems, {
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: leftColRef.value,
        start: 'top 75%'
      }
    })
    if (infoTween.scrollTrigger) scrollTriggers.push(infoTween.scrollTrigger)
  }
  const formTween = gsap.from(formColRef.value, {
    opacity: 0,
    y: 48,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: formColRef.value,
      start: 'top 80%'
    }
  })
  if (formTween.scrollTrigger) scrollTriggers.push(formTween.scrollTrigger)
})

onUnmounted(() => {
  scrollTriggers.forEach((t) => t.kill())
  scrollTriggers.length = 0
})
</script>

<style lang="scss" scoped>
.contacts {
  background: var(--bg-tint);
  color: var(--text);
  padding: var(--space-10) var(--gutter);

  @include tablet-s {
    padding-block: var(--space-8);
  }

  &__inner {
    max-width: calc(var(--maxw) + var(--gutter) * 2);
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-7);
    @include mobile {
      gap: var(--space-5);
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
    color: var(--text);
    margin: 0;
  }

  // ─── Body ────────────────────────────────────────────────────────────────

  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-9);
    align-items: start;

    @include laptop {
      grid-template-columns: 1fr;
      gap: var(--space-7);
    }
  }

  &__left {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    @include tablet {
      gap: var(--space-6);
    }
  }

  &__right {
    position: sticky;
    top: calc(var(--header-h) + var(--space-5));

    @include laptop {
      position: static;
    }
  }

  // ─── Price ───────────────────────────────────────────────────────────────

  &__price-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-bottom: 0;
  }

  &__price-header-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    font-weight: 600;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--text-muted);
  }

  &__price-header-line {
    border: none;
    border-top: 1px solid var(--line);
    margin: 0;
  }

  &__price-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__price-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-5);
    padding: var(--space-5) 0;
    border-bottom: 1px solid var(--line);
  }

  &__price-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  &__price-name {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 400;
    color: var(--text);
    line-height: var(--leading-snug);
  }

  &__price-desc {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: 1;
  }

  &__price-value {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 500;
    color: var(--text-soft);
    white-space: nowrap;
    flex-shrink: 0;
  }

  // ─── Contact info ─────────────────────────────────────────────────────────

  &__info {
    display: flex;
    gap: var(--space-6) var(--space-8);
    flex-wrap: wrap;
  }

  &__info-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  &__info-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--text-muted);
    line-height: 1;
  }

  &__info-value {
    font-family: var(--font-display);
    font-size: var(--text-md);
    font-weight: 400;
    color: var(--text);
    text-decoration: none;
    transition: color var(--dur-fast) var(--ease);

    @include hover {
      &:hover {
        color: var(--accent);
      }
    }
  }
}
</style>

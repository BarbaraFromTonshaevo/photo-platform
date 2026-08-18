<template>
  <footer class="footer" role="contentinfo">
    <div class="footer__inner">
      <div class="footer__top">
        <p class="footer__tagline">Сохраним ваш<br />момент вместе</p>

        <div class="footer__cols">
          <div class="footer__col">
            <span class="footer__col-title">{{ t('sections') }}</span>
            <nav class="footer__col-links" :aria-label="t('sections')">
              <NuxtLink
                v-for="link in siteStore.navLinks"
                :key="link.to"
                :to="link.to"
                class="footer__link"
                @click="onNavClick(link.to, $event)"
              >
                {{ t(link.labelKey) }}
              </NuxtLink>
            </nav>
          </div>

          <div class="footer__col">
            <span class="footer__col-title">{{ t('socials') }}</span>
            <div class="footer__col-links">
              <a
                v-for="social in siteStore.socials"
                :key="social.network"
                :href="social.href"
                class="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ social.label }}
              </a>
            </div>
          </div>

          <div class="footer__col">
            <span class="footer__col-title">{{ t('contacts') }}</span>
            <div class="footer__col-links">
              <a :href="`mailto:${siteStore.contacts.email}`" class="footer__link">
                {{ siteStore.contacts.email }}
              </a>
              <a :href="`tel:${siteStore.contacts.phone.replace(/\D/g, '')}`" class="footer__link">
                {{ siteStore.contacts.phone }}
              </a>
              <div class="footer__locations">
                <div
                  v-for="(location, index) of siteStore.contacts.location"
                  :key="index"
                  class="footer__location"
                >
                  {{ location }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <span class="footer__copy"
          >© {{ currentYear }} {{ t('logoName') }}. {{ t('allRights') }}</span
        >
        <span class="footer__quote">{{ t('footerQuote') }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useSiteStore } from '@entities/site'
import { useScrollToSection } from '@shared/lib/useScrollToSection'
import { usePendingScroll } from '@shared/lib/usePendingScroll'

const route = useRoute()
const { t } = useI18n()
const siteStore = useSiteStore()
const currentYear = new Date().getFullYear()
const pendingScroll = usePendingScroll()

async function onNavClick(link: string, event: MouseEvent) {
  // Не мешаем открытию в новой вкладке/новом окне — обычные клики модификаторами
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  const id = link.split('#')[1] ?? ''

  if (route.path !== '/'){
    // Скролл произойдёт позже, внутри onEnter page-transition —
    // пока страница невидима, сразу после того как её вёрстка стабилизируется
    pendingScroll.value = { type: 'section', id }
    await navigateTo('/')
    return
  }
  useScrollToSection(id)
}
</script>

<style lang="scss" scoped>
.footer {
  background: var(--bg);
  color: var(--text);
  border-top: 1px solid var(--line);

  &__inner {
    max-width: calc(var(--maxw) + var(--gutter) * 2);
    margin-inline: auto;
    padding-inline: var(--gutter);
    padding-block: var(--space-9) var(--space-7);
    @include tablet {
      padding-block: var(--space-7) var(--space-5);
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-8);
    padding-bottom: var(--space-8);
    @include tablet {
      flex-direction: column;
      gap: var(--space-6);
    }
  }

  &__tagline {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 400;
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    color: var(--text);
    flex-shrink: 0;
    max-width: 420px;
  }

  &__cols {
    display: flex;
    gap: var(--space-9);
    flex-shrink: 0;
    @include tablet-s {
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--space-7) var(--space-5);
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 120px;
  }

  &__col-title {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--text-muted);
  }

  &__col-links {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  &__link {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--text-soft);
    text-decoration: none;
    transition: color var(--dur-fast) var(--ease);

    &:hover {
      color: var(--text);
    }
  }

  &__locations {
    display: flex;
    gap: var(--space-1) var(--space-4);
    @include desktop {
      flex-wrap: wrap;
      flex-direction: column;
    }
  }

  &__location {
    display: flex;
    gap: var(--space-4);
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--text-muted);
    &:not(:last-child)::after {
      content: '·';
    }
    @include desktop {
      flex-wrap: wrap;
      &::after {
        display: none;
      }
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-5);
    border-top: 1px solid var(--line);
    gap: var(--space-5);
    @include mobile {
      flex-direction: column;
      gap: var(--space-2);
    }
  }

  &__copy {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--text-muted);
    @include mobile {
      text-align: center;
    }
  }

  &__quote {
    font-family: var(--font-display);
    font-size: var(--text-sm);
    font-style: italic;
    color: var(--text-faint);
    text-align: end;
    @include mobile {
      text-align: center;
    }
  }
}
</style>

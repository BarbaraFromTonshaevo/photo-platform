import { useLenis } from './useLenis'
import { useScrollToSection } from './useScrollToSection'
import { usePendingScroll } from './usePendingScroll'

const FADE_DURATION = 350

// Через Web Animations API, а не GSAP — эта логика живёт в app.vue,
// который грузится на каждой странице, незачем тянуть туда GSAP ради fade
export function usePageFadeTransition() {
  const pendingScroll = usePendingScroll()

  async function onEnter(el: Element, done: () => void) {
    const target = el as HTMLElement
    // Ставим невидимым сразу же, синхронно — чтобы не было вспышки
    // контента, пока идёт ожидание стабилизации/скролл ниже
    target.style.opacity = '0'

    const pending = pendingScroll.value
    pendingScroll.value = null

    // immediate: true — сам скролл происходит, пока страница ещё невидима
    if (pending?.type === 'section') {
      await useScrollToSection(pending.id, true)
    } else {
      useLenis().scrollTo(pending?.value ?? 0, { immediate: true })
    }

    const animation = target.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: FADE_DURATION,
      easing: 'ease',
    })
    animation.onfinish = () => {
      target.style.opacity = ''
      done()
    }
  }

  function onLeave(el: Element, done: () => void) {
    const target = el as HTMLElement
    const animation = target.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: FADE_DURATION,
      easing: 'ease',
    })
    animation.onfinish = done
  }

  return { onEnter, onLeave }
}

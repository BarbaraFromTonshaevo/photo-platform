import type { RouterConfig } from '@nuxt/schema'
import { usePendingScroll } from '@shared/lib/usePendingScroll'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const pending = usePendingScroll()

    // Секция уже выставлена в onNavClick — не перезаписываем её
    if (!pending.value) {
      pending.value = { type: 'top', value: savedPosition?.top ?? 0 }
    }

    // Физический скролл всегда делает onEnter в usePageFadeTransition —
    // если сделать это здесь, скролл случится, пока старая страница
    // ещё видима и только начинает fade-out
    return false
  },
}

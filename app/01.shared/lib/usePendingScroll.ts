import { ref } from 'vue'

// Что физически нужно сделать со скроллом после того как новая страница
// смонтируется и станет невидимой (opacity: 0) внутри onEnter transition'а —
// либо доскроллить до секции, либо просто восстановить/сбросить позицию.
// Выставляется в onNavClick (секция) или в router.options.ts (обычная навигация),
// считывается и обнуляется в usePageFadeTransition — физический скролл
// не должен происходить раньше, пока старая страница ещё видима
export type PendingScroll = { type: 'section'; id: string } | { type: 'top'; value: number }

const pendingScroll = ref<PendingScroll | null>(null)

export function usePendingScroll() {
  return pendingScroll
}

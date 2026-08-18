import { useLenis } from './useLenis'

const MAX_STABILIZE_FRAMES = 30 // ~0.5s при 60fps — предохранитель от бесконечного ожидания

// Секции выше цели могут быть Lazy-чанками, ещё не дорендерившими контент —
// offsetTop не финален, пока их высота не перестанет меняться между кадрами
function waitForStablePosition(el: HTMLElement): Promise<number> {
  return new Promise((resolve) => {
    let lastTop = el.offsetTop
    let frame = 0

    function check() {
      const currentTop = el.offsetTop
      if (currentTop === lastTop || frame >= MAX_STABILIZE_FRAMES) {
        resolve(currentTop)
        return
      }
      lastTop = currentTop
      frame++
      requestAnimationFrame(check)
    }

    requestAnimationFrame(check)
  })
}

export async function useScrollToSection(sectionId: string, isImmediate: boolean = false) {
  if (sectionId === '') return
  const target = document.getElementById(sectionId)
  if (!target) return

  const lenis = useLenis()
  const top = await waitForStablePosition(target)
  lenis.scrollTo(top + 1, { immediate: isImmediate })
}

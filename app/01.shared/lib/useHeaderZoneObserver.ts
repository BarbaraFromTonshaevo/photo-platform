import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
export function useHeaderZoneObserver(
  targetRef: Ref<HTMLElement | null>,
  onEnter: () => void,
  onLeave: () => void
) {
  /* 
    * TODO: создание observer обернуть в функцию  
    * TODO: добавить слушатель событий для resize
    * TODO: добавить debounce/throttle
    * TODO: в unmounted добавить remove для resize
    * TODO: сравнить entry.boundingClientRect
  */
  let observer: IntersectionObserver | null = null
  onMounted(() => {
    if (!targetRef.value) return
    const headerHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h')
    )
    const options = {
      root: null,
      rootMargin: `0px 0px -${window.innerHeight - headerHeight}px 0px`,
      threshold: 0
    }
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onEnter()
        } else {
          onLeave()
        }
      })
    }
    observer = new IntersectionObserver(callback, options)
    observer.observe(targetRef.value)
  })
  onUnmounted(() => {
    observer?.disconnect()
  })
}

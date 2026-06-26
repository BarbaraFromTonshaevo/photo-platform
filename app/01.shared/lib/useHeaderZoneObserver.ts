import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
export function useHeaderZoneObserver(
  targetRef: Ref<HTMLElement | null>,
  onEnter: () => void,
  onLeave: () => void
) {
  let observer: IntersectionObserver | null = null
  let headerHeight = 0

  function initObserver() {
    if (!targetRef.value) return
    const options = {
      root: null,
      rootMargin: `0px 0px -${window.innerHeight - (headerHeight ?? 0)}px 0px`,
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
  }

  let debounce: null | number = null

  function changeObserver() {
    if (debounce) clearTimeout(debounce)

    debounce = setTimeout(() => {
      observer?.disconnect()
      initObserver()
    }, 1000)
  }

  onMounted(() => {
    headerHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h')
    )
    initObserver()
    window.addEventListener('resize', changeObserver)
  })

  onUnmounted(() => {
    observer?.disconnect()
    window.removeEventListener('resize', changeObserver)
  })
}

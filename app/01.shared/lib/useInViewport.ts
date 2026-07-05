import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useInViewport(targetRef: Ref<HTMLElement | null>, options: IntersectionObserverInit = {}) {
  const isInViewport = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!targetRef.value) return
    observer = new IntersectionObserver(([entry]) => {
      isInViewport.value = !!entry?.isIntersecting
    }, options)
    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return isInViewport
}

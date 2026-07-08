import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis, useLenisStopDefaultRaf } from './useLenis'

gsap.registerPlugin(ScrollTrigger)
let synced = false

export function useGsapScrollSync() {
  onMounted(() => {
    if (synced) return
    synced = true
    useLenisStopDefaultRaf()

    const lenis = useLenis()
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Отключаем сглаживание лагов — иначе Lenis будет получать
    // некорректное время при большом delta и дёргаться
    gsap.ticker.lagSmoothing(0)
  })
}

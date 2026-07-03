import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({
    // RAF управляется через gsap.ticker, чтобы ScrollTrigger
    // получал позицию скролла синхронно с анимациями
    autoRaf: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // Отключаем сглаживание лагов — иначе Lenis будет получать
  // некорректное время при большом delta и дёргаться
  gsap.ticker.lagSmoothing(0)

  return {
    provide: {
      lenis,
    },
  }
})

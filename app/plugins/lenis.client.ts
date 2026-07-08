import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  const lenis = new Lenis({
    autoRaf: false,
  })

  let rafId = requestAnimationFrame(function loop(time){
    lenis.raf(time)
    rafId = requestAnimationFrame(loop)
  })

  const stopDefaultRaf = () => cancelAnimationFrame(rafId)

  return {
    provide: {
      lenis,
      lenisStopDefaultRaf: stopDefaultRaf,
    },
  }
})

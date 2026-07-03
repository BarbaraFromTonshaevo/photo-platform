import type Lenis from 'lenis'

export function useLenis() {
  return useNuxtApp().$lenis as Lenis
}

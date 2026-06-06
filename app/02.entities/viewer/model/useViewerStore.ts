/// <reference types="pinia-plugin-persistedstate" />
import { ref } from 'vue'

type Locale = 'ru' | 'en'

export const useViewerStore = defineStore('viewer', () => {
  const isDark = ref(false)
  const locale = ref<Locale>('ru')

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  function setLocale(code: Locale) {
    locale.value = code
  }

  return { isDark, locale, toggleTheme, setLocale }
}, {
  persist: true,
})

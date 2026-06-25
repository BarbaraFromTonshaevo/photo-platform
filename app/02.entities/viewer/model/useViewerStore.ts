/// <reference types="pinia-plugin-persistedstate" />
import { ref } from 'vue'

type Locale = 'ru' | 'en'

export const useViewerStore = defineStore(
  'viewer',
  () => {
    const isDark = ref(false)
    const locale = ref<Locale>('ru')
    const forcedHeaderTheme = ref<'dark' | 'light' | null>(null)

    function toggleTheme() {
      isDark.value = !isDark.value
    }

    function setLocale(code: Locale) {
      locale.value = code
    }

    function setForcedHeaderTheme(theme: 'dark' | 'light' | null) {
      forcedHeaderTheme.value = theme
    }

    return { isDark, locale, forcedHeaderTheme, toggleTheme, setLocale, setForcedHeaderTheme }
  },
  {
    persist: {
      pick: ['isDark', 'locale'] // только это уйдёт в localStorage
    }
  }
)

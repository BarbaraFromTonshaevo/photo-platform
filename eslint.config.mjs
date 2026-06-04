// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// import storybook from "eslint-plugin-storybook";

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettierConfig from 'eslint-config-prettier'

export default withNuxt([
  {
    ignores: ['node_modules/**', 'dist/**', '.output/**', '.storybook-static/**']
  },
  {
    files: ['app/layouts/**/*.vue', 'app/pages/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  prettierConfig
])

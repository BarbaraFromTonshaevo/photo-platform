<template>
  <div class="ui-input" :class="rootClasses">
    <label v-if="label" :for="inputId" class="ui-input__label">{{ label }}</label>
    <input
      :id="inputId"
      ref="inputRef"
      type="tel"
      inputmode="tel"
      autocomplete="tel"
      class="ui-input__field"
      :value="modelValue"
      :placeholder="placeholder ?? '+7 (___) ___-__-__'"
      :disabled="disabled"
      :required="required"
      @input="handleInput"
      @keydown="handleKeydown"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span v-if="error" class="ui-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const inputId = useId()
const inputRef = ref<HTMLInputElement | null>(null)
const focused = ref(false)

const rootClasses = computed(() => ({
  'is-focused': focused.value,
  'has-error': !!props.error,
  'is-disabled': props.disabled,
}))

function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, '').slice(0, 11)
  if (!d) return ''
  if (d[0] === '8') d = '7' + d.slice(1)
  else if (d[0] !== '7') d = '7' + d
  d = d.slice(0, 11)

  const s1 = d.slice(1, 4)
  const s2 = d.slice(4, 7)
  const s3 = d.slice(7, 9)
  const s4 = d.slice(9, 11)

  let r = '+7'
  if (s1) r += ' (' + s1
  if (s1.length === 3) r += ') '
  if (s2) r += s2
  if (s2.length === 3) r += '-'
  if (s3) r += s3
  if (s3.length === 2) r += '-'
  if (s4) r += s4
  return r
}

function handleInput(e: Event) {
  const el = e.target as HTMLInputElement
  const cursorBefore = el.selectionStart ?? el.value.length
  const lengthBefore = el.value.length

  const formatted = formatPhone(el.value)
  el.value = formatted
  emit('update:modelValue', formatted)

  // Preserve cursor position proportionally
  const delta = formatted.length - lengthBefore
  const newCursor = Math.max(0, Math.min(cursorBefore + delta, formatted.length))
  el.setSelectionRange(newCursor, newCursor)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key !== 'Backspace') return
  const el = e.target as HTMLInputElement
  const pos = el.selectionStart ?? 0
  if (el.selectionStart !== el.selectionEnd || pos === 0) return

  const prev = el.value[pos - 1]
  if (/\d/.test(prev)) return

  // Cursor is after a formatting char — find and remove the last digit before cursor
  e.preventDefault()
  const before = el.value.slice(0, pos)
  const lastDigitIdx = before.search(/\d(?=\D*$)/)
  if (lastDigitIdx === -1) return

  const newRaw = el.value.slice(0, lastDigitIdx) + el.value.slice(lastDigitIdx + 1)
  const formatted = formatPhone(newRaw)
  el.value = formatted
  emit('update:modelValue', formatted)
  el.setSelectionRange(lastDigitIdx, lastDigitIdx)
}
</script>

<style lang="scss" scoped>
.ui-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  &__label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--text-muted);
    line-height: 1;
  }

  &__field {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    color: var(--text);
    background: var(--surface);
    border: 1.5px solid var(--line);
    border-radius: var(--radius-lg);
    padding: 14px 16px;
    width: 100%;
    outline: none;
    transition: border-color var(--dur-fast) var(--ease);

    &::placeholder {
      color: var(--text-faint);
    }

    &:focus {
      border-color: var(--accent);
    }
  }

  &__error {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: oklch(0.55 0.18 25);
    line-height: 1;
  }

  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &.has-error {
    .ui-input__field {
      border-color: oklch(0.55 0.18 25);
    }
  }
}
</style>

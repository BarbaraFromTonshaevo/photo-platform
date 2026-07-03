<template>
  <div class="ui-input" :class="rootClasses">
    <label v-if="label" :for="inputId" class="ui-input__label">{{ label }}</label>
    <input
      :id="inputId"
      v-bind="$attrs"
      class="ui-input__field"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
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

defineEmits<{ 'update:modelValue': [value: string] }>()

const inputId = useId()
const focused = ref(false)

const rootClasses = computed(() => ({
  'is-focused': focused.value,
  'has-error': !!props.error,
  'is-disabled': props.disabled,
}))
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
    border-radius: var(--radius-md);
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

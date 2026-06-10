<template>
  <label class="ui-checkbox" :class="{ 'is-checked': isChecked, 'is-disabled': disabled }">
    <input
      type="checkbox"
      class="ui-checkbox__native"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="ui-checkbox__chip">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[] | boolean
  value?: string
  label: string
  disabled?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string[] | boolean] }>()

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value ?? '')
  }
  return props.modelValue === true
})

function handleChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  if (Array.isArray(props.modelValue)) {
    const val = props.value ?? ''
    const next = checked
      ? [...props.modelValue, val]
      : props.modelValue.filter(v => v !== val)
    emit('update:modelValue', next)
  } else {
    emit('update:modelValue', checked)
  }
}
</script>

<style lang="scss" scoped>
.ui-checkbox {
  display: inline-flex;
  cursor: pointer;

  &__native {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  &__chip {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    font-weight: 500;
    line-height: 1;
    padding: 10px 20px;
    border-radius: var(--radius-pill);
    border: 1.5px solid var(--line-strong);
    color: var(--text-soft);
    background: transparent;
    transition:
      background var(--dur-fast) var(--ease),
      border-color var(--dur-fast) var(--ease),
      color var(--dur-fast) var(--ease);
    user-select: none;
    white-space: nowrap;
  }

  @include hover {
    &:hover .ui-checkbox__chip {
      border-color: var(--accent);
      background: var(--accent-tint);
      color: var(--text);
    }
  }

  &.is-checked .ui-checkbox__chip {
    background: var(--accent);
    border-color: transparent;
    color: var(--on-accent);
  }

  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>

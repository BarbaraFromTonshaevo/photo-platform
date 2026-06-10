<template>
  <div class="request-form">
    <Transition name="fade" mode="out-in">
      <div v-if="submitted" class="request-form__success">
        <p class="request-form__success-title">Спасибо!</p>
        <p class="request-form__success-text">
          Я получила ваше сообщение и&nbsp;отвечу в&nbsp;ближайшее время.
        </p>
        <button class="request-form__success-back" type="button" @click="reset">
          Отправить ещё раз
        </button>
      </div>

      <form v-else class="request-form__form" novalidate @submit.prevent="handleSubmit">
        <h2 class="request-form__title">Напишите мне</h2>

        <div class="request-form__row">
          <InputBase
            v-model="form.name"
            label="Имя"
            placeholder="Ваше имя"
            required
            :error="errors.name"
          />
          <InputBase
            v-model="form.contact"
            label="Связь"
            placeholder="Телефон или e-mail"
            required
            :error="errors.contact"
          />
        </div>

        <div class="request-form__group">
          <span class="request-form__group-label">Тип съёмки</span>
          <div class="request-form__chips">
            <InputCheckbox
              v-for="type in SHOOT_TYPES"
              :key="type.value"
              v-model="form.types"
              :value="type.value"
              :label="type.label"
            />
          </div>
        </div>

        <InputTextArea
          v-model="form.message"
          label="Сообщение"
          placeholder="Дата, идея, пожелания…"
          :rows="5"
        />

        <ButtonBase type="submit" class="request-form__submit" :loading="loading">
          Отправить
        </ButtonBase>
      </form>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const SHOOT_TYPES = [
  { value: 'reportage', label: 'Репортаж' },
  { value: 'studio',    label: 'Студийная' },
  { value: 'creative',  label: 'Творческая' },
  { value: 'wedding',   label: 'Свадебная' },
  { value: 'children',  label: 'Детская' },
] as const

interface FormData {
  name: string
  contact: string
  types: string[]
  message: string
}

interface FormErrors {
  name?: string
  contact?: string
}

const form = reactive<FormData>({
  name: '',
  contact: '',
  types: ['reportage'],
  message: '',
})

const errors = reactive<FormErrors>({})
const loading = ref(false)
const submitted = ref(false)

function validate(): boolean {
  errors.name = form.name.trim() ? undefined : 'Введите имя'
  errors.contact = form.contact.trim() ? undefined : 'Введите телефон или e-mail'
  return !errors.name && !errors.contact
}

async function handleSubmit() {
  if (!validate()) return
  loading.value = true
  // Stub: имитация отправки
  await new Promise(resolve => setTimeout(resolve, 800))
  loading.value = false
  submitted.value = true
}

function reset() {
  form.name = ''
  form.contact = ''
  form.types = ['reportage']
  form.message = ''
  errors.name = undefined
  errors.contact = undefined
  submitted.value = false
}
</script>

<style lang="scss" scoped>
.request-form {
  background: var(--surface);
  border-radius: 24px;
  padding: var(--space-8);
  box-shadow: var(--shadow-md);

  @include tablet-s {
    padding: var(--space-6);
    border-radius: var(--radius-lg);
  }

  &__title {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 400;
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    color: var(--text);
    margin: 0 0 var(--space-6);
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5);

    @include tablet-s {
      grid-template-columns: 1fr;
    }
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__group-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--text-muted);
    line-height: 1;
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  &__submit {
    width: 100%;
    justify-content: center;
  }

  // Success state
  &__success {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-6) 0;
    text-align: center;
  }

  &__success-title {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 400;
    color: var(--text);
    margin: 0;
  }

  &__success-text {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    color: var(--text-soft);
    line-height: var(--leading-normal);
    margin: 0;
    max-width: 32ch;
  }

  &__success-back {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--accent);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--dur-fast) var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

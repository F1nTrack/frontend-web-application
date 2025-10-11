<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { registerUseCase } from '../../../../domains/auth/application/usecases/register.usecase.js'

const router  = useRouter()
const { t }   = useI18n()

const name     = ref('')
const email    = ref('')
const password = ref('')
const confirm  = ref('')
const accept   = ref(false)
const loading  = ref(false)

const errors = reactive({
  name: '', email: '', password: '', confirm: '', accept: '', general: ''
})

function resetErrors () {
  errors.name = errors.email = errors.password = errors.confirm = errors.accept = errors.general = ''
}

function validate () {
  resetErrors()
  let ok = true

  const n = String(name.value || '').trim()
  const e = String(email.value || '').trim()
  const p = String(password.value || '')
  const c = String(confirm.value || '')

  if (!n) { errors.name = t('errors.name_required'); ok = false }
  else if (n.length < 2) { errors.name = t('errors.name_full'); ok = false }

  if (!e) { errors.email = t('errors.email_required'); ok = false }
  else if (!/^\S+@\S+\.\S+$/.test(e)) { errors.email = t('errors.email_invalid'); ok = false }

  if (!p) { errors.password = t('errors.password_required'); ok = false }
  else if (p.length < 6) { errors.password = t('errors.password_min'); ok = false }

  if (!c) { errors.confirm = t('errors.confirm_required'); ok = false }
  else if (p !== c) { errors.confirm = t('errors.password_mismatch'); ok = false }

  if (!accept.value) { errors.accept = t('errors.accept_terms'); ok = false }

  return ok
}

async function onSubmit () {
  if (!validate()) return
  loading.value = true
  try {
    const ok = await registerUseCase({
      nombre: name.value,
      email: email.value,
      password: password.value,
    })
    if (!ok) { errors.email = t('errors.email_taken'); return }
    router.push({ name: 'login' })
  } catch (e) {
    errors.general = t('errors.unexpected')
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form" @submit.prevent="onSubmit" novalidate>
    <div class="mb-3 field">
      <label class="label" for="name">{{ t('register.full_name') }}</label>
      <input
          id="name"
          v-model.trim="name"
          class="input"
          :class="{ 'is-invalid': errors.name }"
          :placeholder="t('register.name_ph')"
          autocomplete="name"
          aria-invalid="true"
          :aria-errormessage="errors.name ? 'err-name' : undefined"
      />
      <p v-if="errors.name" id="err-name" class="error">{{ errors.name }}</p>
    </div>

    <div class="mb-3 field">
      <label class="label" for="email">{{ t('register.email') }}</label>
      <input
          id="email"
          v-model.trim="email"
          class="input"
          :class="{ 'is-invalid': errors.email }"
          :placeholder="t('register.email_ph')"
          autocomplete="email"
          aria-invalid="true"
          :aria-errormessage="errors.email ? 'err-email' : undefined"
      />
      <p v-if="errors.email" id="err-email" class="error">{{ errors.email }}</p>
    </div>

    <div class="mb-3 field">
      <label class="label" for="pass">{{ t('register.password') }}</label>
      <input
          id="pass"
          v-model="password"
          type="password"
          class="input"
          :class="{ 'is-invalid': errors.password }"
          :placeholder="t('register.password_ph')"
          autocomplete="new-password"
          aria-invalid="true"
          :aria-errormessage="errors.password ? 'err-pass' : undefined"
      />
      <p v-if="errors.password" id="err-pass" class="error">{{ errors.password }}</p>
    </div>

    <div class="mb-3 field">
      <label class="label" for="confirm">{{ t('register.confirm_password') }}</label>
      <input
          id="confirm"
          v-model="confirm"
          type="password"
          class="input"
          :class="{ 'is-invalid': errors.confirm }"
          :placeholder="t('register.confirm_ph')"
          autocomplete="new-password"
          aria-invalid="true"
          :aria-errormessage="errors.confirm ? 'err-confirm' : undefined"
      />
      <p v-if="errors.confirm" id="err-confirm" class="error">{{ errors.confirm }}</p>
    </div>

    <div class="mb-2 flex items-center gap-2">
      <input id="terms" type="checkbox" v-model="accept" />
      <label for="terms">{{ t('register.accept_terms') }}</label>
    </div>
    <p v-if="errors.accept" class="error">{{ errors.accept }}</p>

    <button class="primary-btn" type="submit" :disabled="loading">
      {{ loading ? t('register.creating') : t('register.create_account') }}
    </button>

    <p v-if="errors.general" class="error mt-2">{{ errors.general }}</p>
  </form>
</template>

<style scoped>
.form{ 
  display: grid; 
  gap: 24px; 
}

.field{ 
  display: grid; 
  gap: 12px; 
  position: relative;
}

.label{ 
  font-size: 16px; 
  color: #374151; 
  font-weight: 700;
  margin-bottom: 4px;
  font-family: 'Roboto', sans-serif;
}

.input{
  background: rgba(255, 255, 255, 0.8); 
  border: 2px solid rgba(229, 231, 235, 0.5); 
  color: #1f2937;
  border-radius: 16px; 
  padding: 18px 20px; 
  outline: none; 
  width: 100%;
  font-size: 16px; 
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  position: relative;
}

.input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.input:focus{ 
  border-color: #2D9CDB; 
  box-shadow: 
    0 0 0 4px rgba(45, 156, 219, 0.1),
    0 8px 25px rgba(45, 156, 219, 0.15);
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
}

.is-invalid{ 
  border-color: #E85B46 !important; 
  box-shadow: 
    0 0 0 4px rgba(232, 91, 70, 0.1),
    0 8px 25px rgba(232, 91, 70, 0.15) !important; 
}

.primary-btn{
  margin-top: 8px; 
  width: 100%; 
  background: linear-gradient(135deg, #0A3557 0%, #2D9CDB 100%);
  color: #fff;
  border: none; 
  border-radius: 16px; 
  padding: 18px 24px; 
  font-weight: 700;
  cursor: pointer; 
  font-size: 16px; 
  box-shadow: 
    0 8px 25px rgba(10, 53, 87, 0.3),
    0 4px 12px rgba(45, 156, 219, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
}

.primary-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.primary-btn:hover::before {
  left: 100%;
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 
    0 12px 35px rgba(10, 53, 87, 0.4),
    0 6px 16px rgba(45, 156, 219, 0.3);
}

.primary-btn:active {
  transform: translateY(-1px);
}

.primary-btn[disabled]{ 
  opacity: 0.6; 
  cursor: not-allowed;
  transform: none !important;
  box-shadow: 
    0 4px 12px rgba(10, 53, 87, 0.2),
    0 2px 6px rgba(45, 156, 219, 0.1) !important;
}

.error{ 
  color: #E85B46; 
  font-weight: 600; 
  font-size: 14px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Roboto', sans-serif;
}

.error::before {
  content: '⚠';
  font-size: 12px;
}

.mt-2{ 
  margin-top: 12px; 
}

.mb-3{ 
  margin-bottom: 16px; 
}

.mb-2{ 
  margin-bottom: 12px; 
}

.flex{ 
  display: flex; 
  align-items: center; 
  gap: 12px;
}

.gap-2{ 
  gap: 12px; 
}

/* Estilo para el checkbox */
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #667eea;
  border-radius: 4px;
  cursor: pointer;
}

label[for="terms"] {
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  line-height: 1.5;
}
</style>

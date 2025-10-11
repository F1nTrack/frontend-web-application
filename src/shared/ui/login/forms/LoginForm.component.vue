<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { loginUseCase } from '../../../../domains/auth/application/usecases/login.usecase.js'

const router   = useRouter()
const { t }    = useI18n()

const email    = ref('')
const password = ref('')
const loading  = ref(false)

const errors = reactive({
  email: '',
  password: '',
  general: '',
})

function resetErrors() {
  errors.email = ''
  errors.password = ''
  errors.general = ''
}

function validate() {
  resetErrors()
  let ok = true

  const e = String(email.value || '').trim()
  const p = String(password.value || '')

  if (!e) { errors.email = t('errors.email_required'); ok = false }
  else if (!/^\S+@\S+\.\S+$/.test(e)) { errors.email = t('errors.email_invalid'); ok = false }

  if (!p) { errors.password = t('errors.password_required'); ok = false }

  return ok
}

async function onSubmit() {
  if (!validate()) return
  loading.value = true
  try {
    const ok = await loginUseCase({ email: email.value, password: password.value })
    if (ok) router.push({ name: 'home' })
  } catch (e) {
    // Mapear errores del usecase -> i18n
    const code = String(e?.message || '')
    if (code === 'EMAIL_NOT_FOUND') errors.email = t('errors.email_not_found')
    else if (code === 'INVALID_PASSWORD') errors.password = t('errors.invalid_password')
    else errors.general = t('errors.unexpected')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form" @submit.prevent="onSubmit" novalidate>
    <div class="mb-3 field">
      <label class="label" for="email">{{ t('login.email_label') }}</label>
      <input
          id="email"
          v-model.trim="email"
          class="input"
          :class="{ 'is-invalid': errors.email }"
          :placeholder="t('login.email_ph')"
          autocomplete="username"
          aria-invalid="true"
          :aria-errormessage="errors.email ? 'err-email' : undefined"
      />
      <p v-if="errors.email" id="err-email" class="error">{{ errors.email }}</p>
    </div>

    <div class="mb-3 field">
      <label class="label" for="pass">{{ t('login.password_label') }}</label>
      <input
          id="pass"
          v-model="password"
          type="password"
          class="input"
          :class="{ 'is-invalid': errors.password }"
          autocomplete="current-password"
          aria-invalid="true"
          :aria-errormessage="errors.password ? 'err-pass' : undefined"
      />
      <p v-if="errors.password" id="err-pass" class="error">{{ errors.password }}</p>
    </div>

    <button class="primary-btn" type="submit" :disabled="loading">
      {{ loading ? t('login.signing_in') : t('login.sign_in') }}
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
</style>

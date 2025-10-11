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
.form{ display:grid; gap:18px; }
.field{ display:grid; gap:8px; }
.label{ font-size:15px; color:#596080; font-weight:800; }
.input{
  background:#f5f7fd; border:1px solid #e3e8f5; color:#1b2559;
  border-radius:14px; padding:14px 16px; outline:none; width:100%;
  font-size:16px; transition: box-shadow .2s, border-color .2s;
}
.input:focus{ border-color:#4253ff; box-shadow:0 0 0 4px rgba(66,83,255,.12); }
.is-invalid{ border-color:#dc2626 !important; box-shadow:0 0 0 3px rgba(220,38,38,.12) !important; }
.primary-btn{
  margin-top:4px; width:100%; background:#0e1329; color:#fff;
  border:none; border-radius:14px; padding:16px 18px; font-weight:900;
  cursor:pointer; font-size:16px; box-shadow:0 18px 36px rgba(14,19,41,.18);
}
.primary-btn[disabled]{ opacity:.6; cursor:not-allowed; }
.error{ color:#dc2626; font-weight:700; font-size:13.5px; }
.mt-2{ margin-top:8px; }
.mb-3{ margin-bottom:12px; }
.mb-2{ margin-bottom:8px; }
.flex{ display:flex; align-items:center; }
.gap-2{ gap:8px; }
</style>
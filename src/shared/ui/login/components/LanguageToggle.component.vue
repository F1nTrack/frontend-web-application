<script setup>
import { useI18n } from 'vue-i18n'
import { setLocale } from '../../../../i18n'

const { locale, t } = useI18n()
const is = l => locale.value === l
const set = l => setLocale(l)
</script>

<template>
  <div class="toggle">
    <button :class="['btn', { active: is('en') }]" @click="set('en')">{{ t('layout.lang_en') }}</button>
    <button :class="['btn', { active: is('es') }]" @click="set('es')">{{ t('layout.lang_es') }}</button>
  </div>
</template>

<style scoped>
.toggle{ display:flex; gap:8px; }
.btn{
  border:1px solid #e3e8f5; background:#fff; padding:8px 12px; border-radius:10px;
  font-weight:800; cursor:pointer;
}
.btn.active{ background:#0e1329; color:#fff; border-color:#0e1329; }
</style>

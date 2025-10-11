<template>
  <header class="auth-header">
    <div class="inner">
      <div class="left">
        <div class="logo-circle">K</div>
        <div class="brand">
          <div class="brand-title">KapakID</div>
          <div class="brand-sub">Digital ID</div>
        </div>
      </div>

      <div class="right">
        <button
            class="lang-btn"
            @click="set('en')"
            :data-active="is('en')"
        >{{ t('layout.lang_en') }}</button>

        <button
            class="lang-btn"
            @click="set('es')"
            :data-active="is('es')"
        >{{ t('layout.lang_es') }}</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import {setLocale} from "../../../../i18n.js";

const { locale, t } = useI18n()

const is = (l) => locale.value === l
const set = (l) => setLocale(l)
</script>

<style scoped>
.auth-header{
  width:100%;
  background: linear-gradient(135deg,#eef3ff 0%, #eaf1ff 35%, #e9efff 100%);
  border-bottom: 1px solid #e6e9f5;
  box-shadow: 0 2px 10px rgba(21,42,120,0.05);
  position: sticky; top: 0; z-index: 10;
}


.inner{
  max-width: none;
  width: 100%;
  padding: 18px 40px;
  display:flex; align-items:center; justify-content:space-between;
}

.left{ display:flex; align-items:center; gap:14px; }
.logo-circle{
  width:42px; height:42px; border-radius:50%;
  display:grid; place-items:center; font-weight:800; color:#fff;
  background: linear-gradient(135deg,#6c7bff,#4253ff);
  box-shadow: 0 6px 16px rgba(66,83,255,.25);
}
.brand-title{ font-weight:800; color:#1b2559; line-height:1; font-size:20px; }
.brand-sub{ font-size:12px; color:#7b86a2; margin-top:2px; }

.right{ display:flex; gap:10px; }
.lang-btn{
  border:1px solid #d8def1; background:#fff; color:#1b2559;
  border-radius:10px; padding:8px 14px; font-weight:700;
  transition:.15s all ease; box-shadow: 0 2px 8px rgba(0,0,0,.03);
}
.lang-btn:hover{ transform: translateY(-1px); }
.lang-btn[data-active="true"]{ background:#1b2559; color:#fff; border-color:#1b2559; }

@media (max-width: 768px){
  .inner{ padding:12px 16px; }
  .brand-title{ font-size:18px; }
}
</style>

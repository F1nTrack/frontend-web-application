<script setup>
import HeaderLogin from './HeaderLogin.component.vue'
</script>

<template>
  <HeaderLogin />
</template>
<style scoped>
.auth-header{
  width:100%;
  background: linear-gradient(180deg,#f7f9ff 0%, rgba(247,249,255,0.55) 100%);
  border-bottom:1px solid #e5e9f6;
  position:sticky; top:0; z-index:20;
}
.inner{
  max-width:1160px; margin:0 auto; padding:12px 16px;
  display:flex; align-items:center; justify-content:space-between;
}
.brand{ display:flex; align-items:center; gap:10px; }
.logo{ width:28px; height:28px; border-radius:50%; }
.brand-txt strong{ font-weight:800; color:#111827; display:block; line-height:1; }
.brand-txt small{ color:#6b7280; font-size:12px; }
</style>

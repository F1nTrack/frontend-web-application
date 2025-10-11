<script setup>
import { useI18n } from 'vue-i18n'
import HeaderLogin from '../../../../shared/ui/login/components/HeaderLogin.component.vue'
import LoginForm    from '../../../../shared/ui/login/forms/LoginForm.component.vue'
const { t } = useI18n()
</script>

<template>
  <div class="auth-layout">
    <HeaderLogin />
    <main class="content">
      <section class="card">
        <div class="avatar">K</div>
        <h1 class="title">{{ t('login.title') }}</h1>
        <p class="subtitle">{{ t('login.subtitle') }}</p>

        <LoginForm />

        <div class="split">
          <a class="link subtle" href="javascript:void(0)">{{ t('layout.forgot') }}</a>
        </div>

        <hr class="divider" />
        <p class="foot">
          {{ t('layout.footer_cta') }}
          <router-link class="link" :to="{ name:'register' }">
            {{ t('layout.footer_link_register') }}
          </router-link>
        </p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.auth-layout{
  min-height:100vh; display:flex; flex-direction:column;
  background: radial-gradient(1600px 800px at 20% -10%, #eef3ff 30%, transparent),
  radial-gradient(1600px 900px at 100% -20%, #f3f6ff 10%, transparent),
  #f5f7fd;
}
.content{ flex:1; display:grid; place-items:center; padding: 64px 32px 88px; }
.card{
  width:100%; max-width: 960px; background:#fff; border-radius:22px; padding:44px 40px;
  box-shadow: 0 26px 80px rgba(21,42,120,0.12); border:1px solid #eef0f7;
}
.avatar{
  width:72px; height:72px; margin:0 auto 18px; border-radius:50%;
  display:grid; place-items:center; font-weight:800; color:#fff; font-size:22px;
  background: linear-gradient(135deg,#6c7bff,#4253ff);
  box-shadow: 0 12px 30px rgba(66,83,255,.25);
}
.title{ text-align:center; margin:2px 0 6px; font-weight:900; color:#0f1a44; font-size:56px; }
.subtitle{ text-align:center; margin:6px 0 30px; color:#6f7ba0; font-size:18px; }
.split{ display:flex; justify-content:flex-end; margin-top:14px; }
.divider{ border:none; border-top:1px solid #eff2f8; margin:24px 0; }
.foot{ text-align:center; color:#7b86a2; margin:0; font-size:16px; }
.link{ color:#4253ff; font-weight:700; }
.link.subtle{ color:#7b86a2; font-weight:500; }
.link:hover{ text-decoration: underline; }

@media (max-width: 1200px){ .card{ max-width: 860px; } }
@media (max-width: 992px){ .card{ max-width: 720px; padding:36px 28px; } .title{ font-size:42px; } }
@media (max-width: 600px){ .card{ max-width: 100%; } .title{ font-size:32px; } }
</style>

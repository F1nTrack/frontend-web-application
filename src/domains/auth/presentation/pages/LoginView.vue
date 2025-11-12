<script setup>
import { useI18n } from 'vue-i18n'
import HeaderLogin from '../../../../shared/ui/login/components/HeaderLogin.component.vue'
import LoginForm    from '../../../../shared/ui/login/forms/LoginForm.component.vue'
import FooterContent from "../../../../shared/presentation/components/footer-content.vue";
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
    <footer-content></footer-content>
  </div>
</template>

<style scoped>
.auth-layout{
  min-height:100vh;
  display:flex;
  flex-direction:column;
  background: linear-gradient(135deg, #0A3557 0%, #2D9CDB 100%);
  position: relative;
}
.auth-layout::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(45, 156, 219, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(10, 53, 87, 0.2) 0%, transparent 50%);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
}

.content{ 
  flex:1; 
  display:grid; 
  place-items:center; 
  padding: 64px 32px 88px; 
  position: relative;
  z-index: 1;
}

.card{
  width:100%; 
  max-width: 480px; 
  background: rgba(255, 255, 255, 0.95); 
  border-radius: 32px; 
  padding: 48px 40px;
  box-shadow: 
    0 32px 64px rgba(0, 0, 0, 0.2),
    0 16px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  position: relative;
  overflow-y: auto;
  animation: slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #0A3557, #2D9CDB, #0A3557);
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.avatar{
  width: 88px; 
  height: 88px; 
  margin: 0 auto 24px; 
  border-radius: 50%;
  display: grid; 
  place-items: center; 
  font-weight: 800; 
  color: #fff; 
  font-size: 28px;
  background: linear-gradient(135deg, #0A3557, #2D9CDB);
  box-shadow: 
    0 16px 40px rgba(10, 53, 87, 0.4),
    0 8px 20px rgba(45, 156, 219, 0.3);
  position: relative;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.title{ 
  text-align: center; 
  margin: 8px 0 12px; 
  font-weight: 800; 
  color: #0A3557; 
  font-size: 48px;
  font-family: 'Poppins', sans-serif;
}

.subtitle{ 
  text-align: center; 
  margin: 12px 0 40px; 
  color: #6B7280; 
  font-size: 18px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
}

.split{ 
  display: flex; 
  justify-content: flex-end; 
  margin-top: 20px; 
}

.divider{ 
  border: none; 
  border-top: 1px solid rgba(229, 231, 235, 0.5); 
  margin: 32px 0; 
  position: relative;
}

.divider::after {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #0A3557, #2D9CDB);
  border-radius: 1px;
}

.foot{ 
  text-align: center; 
  color: #6B7280; 
  margin: 0; 
  font-size: 16px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
}

.link{ 
  color: #2D9CDB; 
  font-weight: 700;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #0A3557, #2D9CDB);
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}

.link.subtle{ 
  color: #6B7280; 
  font-weight: 500; 
}

.link.subtle:hover {
  color: #2D9CDB;
}

@media (max-width: 768px){ 
  .card{ 
    max-width: 100%; 
    margin: 0 20px;
    padding: 40px 32px;
  } 
  .title{ font-size: 40px; } 
  .avatar {
    width: 72px;
    height: 72px;
    font-size: 24px;
  }
}

@media (max-width: 480px){ 
  .card{ 
    padding: 32px 24px;
  } 
  .title{ font-size: 36px; } 
}
</style>

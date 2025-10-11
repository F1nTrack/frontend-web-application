<script setup>
import { ref, onMounted } from 'vue';
import DocumentsCard from './components/DocumentsCard.vue';
import BalanceCard from './components/BalanceCard.vue';
import PendingPaymentsCard from './components/PendingPaymentsCard.vue';
import ProfileCard from './components/ProfileCard.vue';
import TransportCards from './components/TransportCards.vue';
import Notifications from './components/Notifications.vue';
import dashboardService from './services/dashboardService.js';
import { DashboardData } from "./model/datos.entity.js";
import NavBar from "../../shared/presentation/components/nav-bar.vue";

const dashboardData = ref(new DashboardData({}));

onMounted(async () => {
  try {
    const data = await dashboardService.getDashboardData();
    console.log('Fetched data:', data);
    dashboardData.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div class="home-view">
    <nav-bar></nav-bar>

    <section class="dashboard">
      <h1>{{ $t('dashboard.welcome') }} a KapakID</h1>
      <p>{{ $t('dashboard.manageIdentity') }}</p>

      <div class="stats-grid">
        <DocumentsCard
            :active="dashboardData.documents.active"
            :change-this-month="dashboardData.documents.changeThisMonth"
            :items="dashboardData.documents.items"
        />
        <BalanceCard
            :currency="dashboardData.balance.currency"
            :total="dashboardData.balance.total"
            :type="dashboardData.balance.type"
        />
        <PendingPaymentsCard
            :count="dashboardData.pendingPayments.count"
            :note="dashboardData.pendingPayments.note"
            :items="dashboardData.pendingPayments.items"
        />
        <ProfileCard :completion="dashboardData.profileCompletion" />
      </div>

      <TransportCards :cards="dashboardData.transportCards" />
      <Notifications :notifications="dashboardData.notifications" />
    </section>

  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #0A3557 0%, #2D9CDB 100%);
  font-family: "Poppins", "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #F9FAFB;
  position: relative;
  overflow-x: hidden;
}

.home-view::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(45, 156, 219, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(10, 53, 87, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.dashboard {
  padding: 3rem 2rem;
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F9FAFB;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

p {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #E5E7EB;
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 3rem;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

:deep(.p-card) {
  background: rgba(255, 255, 255, 0.8) !important;
  border-radius: 24px !important;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(20px) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
  position: relative !important;
  overflow: hidden !important;
}

:deep(.p-card::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0A3557, #2D9CDB, #0A3557);
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}

:deep(.p-card:hover) {
  transform: translateY(-8px) !important;
  box-shadow: 
    0 32px 64px rgba(0, 0, 0, 0.15),
    0 16px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Animaciones de entrada */
.stats-grid > * {
  animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.stats-grid > *:nth-child(1) { animation-delay: 0.1s; }
.stats-grid > *:nth-child(2) { animation-delay: 0.2s; }
.stats-grid > *:nth-child(3) { animation-delay: 0.3s; }
.stats-grid > *:nth-child(4) { animation-delay: 0.4s; }

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  p {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 2rem 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  h1 {
    font-size: 1.75rem;
  }
  
  p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 1.5rem 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>
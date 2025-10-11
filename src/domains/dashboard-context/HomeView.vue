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
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
  font-family: "Poppins", sans-serif;
  color: #3c4a63;
}

.dashboard {
  padding: 2rem;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-size: 1.6rem;
  font-weight: 600;
}
p {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-size: 1.1rem;
  gap: 30px;

}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2rem;
}

:deep(.p-card) {
  background: #ffffff !important; /* Force white background */
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
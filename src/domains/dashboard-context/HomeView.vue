<template>
  <nav-bar></nav-bar>
  <div class="dashboard-container">
    <!-- Fila 1: tarjeta grande -->
    <div class="row full">
      <BalanceCard />
    </div>

    <!-- Fila 2: dos tarjetas lado a lado -->
    <div class="row">
      <DocumentsCard />
      <PendingPaymentsCard />
    </div>

    <!-- Fila 3: dos tarjetas modernas -->
    <div class="row">
      <NotificationsCard />
      <div class="right-column">
        <TransportCards />
        <ProfileCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import BalanceCard from '../dashboard-context/components/BalanceCard.vue'
import DocumentsCard from '../dashboard-context/components/DocumentsCard.vue'
import NotificationsCard from '../dashboard-context/components/Notifications.vue'
import PendingPaymentsCard from '../dashboard-context/components/PendingPaymentsCard.vue'
import ProfileCard from '../dashboard-context/components/ProfileCard.vue'
import TransportCards from '../dashboard-context/components/TransportCards.vue'
import NavBar from "../../shared/presentation/components/nav-bar.vue";
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  background: #f5f7fa;
}

/* Fila completa */
.row.full {
  width: 100%;
}

/* Fila con dos columnas */
.row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

/* Cada tarjeta ocupa mitad del ancho de la fila */
.row > * {
  flex: 1 1 48%;
}

/* Columna derecha de fila 3 */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1 1 48%;
}

/* Tarjetas interiores ocupan toda la columna */
.right-column > * {
  width: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .row > *, .right-column > * {
    flex: 1 1 100%;
  }
}
</style>

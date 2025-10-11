<script setup>
import FastRecharge from "../../../../shared/ui/transport/components/fast-recharge.component.vue";
import RecentTransactions from "../../../../shared/ui/transport/components/recent-transactions.component.vue";
import TransportCard from "../../../../shared/ui/transport/components/transport-card.component.vue";
import NavBar from "../../../../shared/presentation/components/nav-bar.vue";
</script>

<template>
  <nav-bar></nav-bar>/
  <section class="transport-section">
    <div class="transport-card">
      <transport-card/>
    </div>

    <div class="recharge-and-transactions">
      <fast-recharge/>
      <recent-transactions/>
    </div>
  </section>
</template>

<style scoped>
.transport-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

/* Contenedor horizontal */
.recharge-and-transactions {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem; /* espacio entre los dos componentes */
}

/* Para que se adapten al ancho */
.recharge-and-transactions > * {
  flex: 1; /* ambos ocupan el mismo ancho */
  min-width: 300px;
}

/* Opcional: cuando la pantalla es pequeña */
@media (max-width: 900px) {
  .recharge-and-transactions {
    flex-direction: column;
  }
}
</style>
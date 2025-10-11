<script setup>
defineProps({
  cards: { type: Array, required: true }
});
</script>

<template>
  <pv-card>
    <template #header>
      <h3>{{$t('dashboard.TransportationBalances') }}</h3>
    </template>
    <div>
      <div v-for="card in cards" :key="card.name" class="transport-item">
        <p>{{ card.name }} - {{ card.status || '' }}: {{ card.balance }}</p>
        <pv-inputText v-model="card.balance" disabled style="width: 100px;" />
        <pv-button label="Recargar saldo" @click="() => {}" />
      </div>
    </div>
  </pv-card>
</template>

<style scoped>
:deep(.p-card) {
  background: #ffffff;
  border-radius: 18px;
  padding: 1.8rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #B2EBF2; /* Pastel cyan */
  transition: all 0.3s ease;
}

:deep(.p-card:hover) {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(129, 212, 250, 0.25);
}

h3 {
  color: #000000;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

p {
  color: #000000;
  font-size: 1rem;
}

:deep(.p-button) {
  margin-top: 1rem;
  background: #81D4FA;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.4rem;
}

:deep(.p-button:hover) {
  background: #4FC3F7;
}
</style>
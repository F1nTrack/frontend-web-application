<script setup>
defineProps({
  count: { type: Number, required: true },
  note: { type: String, required: true },
  items: { type: Array, required: true }
});
</script>

<template>
  <pv-card>
    <template #header>
      <h3>{{$t('dashboard.PendingPayments') }}</h3>
    </template>
    <div>
      <p>{{ count }} {{ note }}</p>
      <ul>
        <li v-for="item in items" :key="item">{{ item }}</li>
      </ul>
      <pv-button label="Ver todos los pagos" @click="() => {}" />
    </div>
  </pv-card>
</template>

<style scoped>
:deep(.p-card) {
  background: #ffffff;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
  border-top: 5px solid #81D4FA;
  text-align: center;
  transition: all 0.3s ease;
}

:deep(.p-card:hover) {
  box-shadow: 0 8px 20px rgba(129, 212, 250, 0.25); /* Pastel cyan shadow */
  transform: translateY(-4px);
}

h3 {
  color: #000000;
  font-weight: 700;
  margin-bottom: 1rem;
}

p {
  font-size: 2rem;
  color: #000000;
  font-weight: 600;
}

:deep(.p-button) {
  margin-top: 1rem;
  background: #81D4FA;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
}

:deep(.p-button:hover) {
  background: #4FC3F7;
}
</style>
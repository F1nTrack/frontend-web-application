<script setup>

defineProps({
  currency: { type: String, required: true },
  total: { type: Number, required: true },
  type: { type: String, required: true }
});
</script>

<template>
  <pv-card>
    <template #header>
      <h3>{{$t('dashboard.balance')}}</h3>
    </template>
    <div>
      <p>{{ currency }}{{ total }} {{ type }}</p>
    </div>
  </pv-card>
</template>

<style scoped>
:deep(.p-card) {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
}

h3 {
  color: #000000; /* Pastel cyan/blue */
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

p {
  font-size: 2rem;
  font-weight: bold;
  color: #000000; /* Darker pastel blue for emphasis */
}
</style>
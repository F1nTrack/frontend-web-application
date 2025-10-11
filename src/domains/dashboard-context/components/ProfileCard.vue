<script setup>
defineProps({
  completion: { type: Number, required: true }
});
</script>

<template>
  <pv-card>
    <template #header>
      <h3>{{$t('dashboard.profile') }}</h3>
    </template>
    <div>
      <p>{{ completion }}% Completado</p>
    </div>
  </pv-card>
</template>

<style scoped>
:deep(.p-card) {
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
}

h3 {
  color: #000000;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

p {
  color: #000000;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}
</style>
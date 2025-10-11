<script setup>
defineProps({
  active: { type: Number, required: true },
  changeThisMonth: { type: Number, required: true },
  items: { type: Array, required: true }
});
</script>

<template>
  <pv-card>
    <template #header>
      <h3>{{ $t('dashboard.ActiveDocuments') }}</h3>
    </template>
    <div>
      <p>{{ active }} (+{{ changeThisMonth }} este mes)</p>
      <ul>
        <li v-for="item in items" :key="item.name">
          {{ item.name }} - <span :class="item.status.toLowerCase()">{{ item.status }}</span>
        </li>
      </ul>
    </div>
  </pv-card>
</template>

<style scoped>
:deep(.p-card) {
  background: #ffffff !important; /* Override black */
  border-radius: 16px;
  padding: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

h3 {
  color: #000000;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #B2EBF2;
  margin-bottom: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  transition: 0.2s ease;
}

li:hover {
  background: #81D4FA;
  color: white;
}

.activo {
  color: #4CAF50;
}

.pendiente {
  color: #FF9800;
}
</style>
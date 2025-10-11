<script setup>
defineProps({
  notifications: { type: Array, required: true }
});
</script>

<template>
  <pv-card>
    <template #header>
      <h3>{{ $t('dashboard.notifica') }}</h3>
    </template>
    <div>
      <ul>
        <li v-for="notif in notifications" :key="notif.message" :class="notif.priority">
          {{ notif.message }}
        </li>
      </ul>
      <pv-button label="Ver todas las notificaciones" @click="() => {}" />
    </div>
  </pv-card>
</template>

<style scoped>
:deep(.p-card) {
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
}

h3 {
  color: #000000;
  margin-bottom: 0.4rem;
}

li {
  background: #B2EBF2;
  border-left: 5px solid #81D4FA;
  padding: 0.8rem;
  margin: 0.8rem 0;
  border-radius: 8px;
}

.high {
  border-left-color: #EF5350; /* Red for high priority, but softened */
}

.medium {
  border-left-color: #FFB74D;
}

.low {
  border-left-color: #81D4FA;
}

:deep(.p-button) {
  background: #81D4FA;
  border: none;
  color: white;
}

:deep(.p-button:hover) {
  background: #4FC3F7;
}
</style>
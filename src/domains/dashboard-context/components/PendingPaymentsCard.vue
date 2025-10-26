<template>
  <div class="card">
    <h3>Pagos Recientes</h3>

    <div v-if="isLoading" class="loading">Cargando... 🌀</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="content">
      <p class="count">
        <strong>{{ totalPagos }}</strong> pagos realizados
      </p>
      <p class="total-amount">
        Total: <strong>{{ formattedTotal }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import apiService from '../../../services/api.service.js';


const pagos = ref([]);
const isLoading = ref(true);
const error = ref(null);

const formatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
});

// 1. Contamos el total de pagos
const totalPagos = computed(() => pagos.value.length);

// 2. Sumamos el monto total
const totalAmount = computed(() => {
  return pagos.value.reduce((total, pago) => total + pago.monto, 0);
});

// 3. Formateamos el monto
const formattedTotal = computed(() => formatter.format(totalAmount.value));

onMounted(async () => {
  try {
    // Asumimos ID de usuario 1
    const response = await apiService.getPagosPorUsuario(1);
    pagos.value = response.data;
  } catch (err) {
    console.error('Error al cargar pagos:', err);
    error.value = 'No se pudieron cargar los pagos.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.08);
  min-height: 120px;
  text-align: center;
}
h3 { margin-bottom: 12px; color: #333; font-size: 1.2rem; }
.loading, .error { padding-top: 10px; color: #777; }
.error { color: #d32f2f; }

.content .count {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 8px;
}
.content .total-amount {
  font-size: 1.1rem;
  color: #1e88e5;
  font-weight: 500;
}
</style>
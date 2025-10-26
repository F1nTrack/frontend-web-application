<script setup>
import { ref, onMounted, computed } from 'vue';
import apiService from '../../../services/api.service.js';


const pagos = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Esta función nativa de JS da formato de moneda
const formatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN', // Soles
});

// 1. Calculamos el balance total sumando los 'monto' de los pagos
const balanceTotal = computed(() => {
  return pagos.value.reduce((total, pago) => total + pago.monto, 0);
});

// 2. Damos formato al número
const formattedBalance = computed(() => formatter.format(balanceTotal.value));

onMounted(async () => {
  try {
    // Asumimos un ID de usuario 1
    const response = await apiService.getPagosPorUsuario(1);
    pagos.value = response.data;
  } catch (err) {
    console.error('Error al cargar pagos:', err);
    error.value = 'No se pudo cargar el balance.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="card">
    <h3>Balance</h3>

    <div v-if="isLoading" class="loading">Cargando... 🌀</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>

    <div v-else>
      <p>{{ formattedBalance }}</p>
      <span>En pagos y recargas</span>
    </div>
  </div>
</template>

<style scoped>
/* Tu estilo original está muy bien, solo añado el loading/error */
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 130px;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.12);
}
h3 { margin-bottom: 12px; color: #333; font-size: 1.2rem; }
p { font-size: 1.8rem; font-weight: bold; color: #1e88e5; margin-bottom: 4px; }
span { font-size: 0.9rem; color: #777; }

.loading, .error { text-align: center; padding-top: 10px; color: #777; }
.error { color: #d32f2f; }
</style>
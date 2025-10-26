<template>
  <div class="card">
    <h3>Mis Documentos</h3>

    <div v-if="isLoading" class="loading">Cargando... 🌀</div>

    <div v-else-if="error" class="error">Error: {{ error }}</div>

    <div v-else class="content">
      <p class="total">Tienes <strong>{{ totalDocumentos }}</strong> documentos</p>
      <div class="summary">
        <span>✅ Activos: {{ documentosActivos }}</span>
        <span>⚠️ Vencidos: {{ documentosVencidos }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import apiService from '../../../services/api.service.js';

const documentos = ref([]);
const isLoading = ref(true);
const error = ref(null);


const totalDocumentos = computed(() => documentos.value.length);

const documentosActivos = computed(() =>
    documentos.value.filter(d => d.estado === 'Vigente' || d.estado === 'Verificado').length
);
const documentosVencidos = computed(() =>
    documentos.value.filter(d => d.estado === 'Vencido').length
);

onMounted(async () => {
  try {
    const response = await apiService.getDocumentosPorUsuario(1);
    documentos.value = response.data;
  } catch (err) {
    console.error('Error al cargar documentos:', err);
    error.value = 'No se pudieron cargar los datos.';
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 150px; /* Damos altura mínima para el loading */
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.12);
}
h3 { margin-bottom: 12px; color: #333; font-size: 1.2rem; }
.loading, .error { text-align: center; padding-top: 20px; color: #777; }
.error { color: #d32f2f; }

.content .total {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e88e5;
  margin-bottom: 10px;
  text-align: center;
}
.summary {
  display: flex;
  justify-content: space-around;
  font-size: 0.9rem;
  color: #555;
}
</style>
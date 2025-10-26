<template>
  <div class="card">
    <h3>Tarjetas de Transporte</h3>

    <div v-if="isLoading" class="loading">Cargando... 🌀</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <ul v-else class="card-list">
      <li v-for="card in transportCards" :key="card.id" :class="card.estado.toLowerCase()">
        <span class="card-name">{{ card.tipo }}</span>
        <span class="card-status">{{ card.estado }}</span>
      </li>
      <li v-if="transportCards.length === 0" class="no-cards">
        No se encontraron tarjetas de transporte.
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import apiService from '../../../services/api.service.js';


const allDocuments = ref([]);
const isLoading = ref(true);
const error = ref(null);

// 1. Definimos qué tipos de documentos son de transporte
const transportKeywords = ['Card', 'Metro'];

// 2. Filtramos la lista completa de documentos
const transportCards = computed(() => {
  return allDocuments.value.filter(doc =>
      transportKeywords.some(keyword => doc.tipo.includes(keyword))
  );
});

onMounted(async () => {
  try {
    // Asumimos ID de usuario 1
    const response = await apiService.getDocumentosPorUsuario(1);
    allDocuments.value = response.data;
  } catch (err) {
    console.error('Error al cargar documentos:', err);
    error.value = 'No se pudieron cargar las tarjetas.';
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
  min-height: 150px;
}
h3 { margin-bottom: 15px; color: #333; font-size: 1.2rem; }
.loading, .error, .no-cards { text-align: center; padding-top: 20px; color: #777; }
.error { color: #d32f2f; }

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.card-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.card-list li:last-child {
  border-bottom: none;
}
.card-name {
  font-weight: 500;
  color: #333;
}
.card-status {
  font-size: 0.9rem;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 10px;
}
/* Damos color según el estado */
.vigente .card-status {
  color: #2e7d32;
  background-color: #e8f5e9;
}
.vencido .card-status {
  color: #c62828;
  background-color: #ffebee;
}
</style>
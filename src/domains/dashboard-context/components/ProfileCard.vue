<template>
  <div class="card">
    <div v-if="isLoading" class="loading">Cargando... 🌀</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="profile-content">
      <img src="https://i.pravatar.cc/100" alt="Avatar" class="avatar">
      <h3>¡Hola, {{ user.nombre }}!</h3>
      <p>{{ user.email }}</p>
      <span v-if="user.premium" class="badge">Usuario Premium ⭐</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiService from '../../../services/api.service.js';

// Usamos un objeto vacío por defecto para 'user'
const user = ref({});
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Pedimos el usuario con ID 1
    const response = await apiService.getUsuario(1);
    user.value = response.data;
  } catch (err) {
    console.error('Error al cargar perfil:', err);
    error.value = 'No se pudo cargar el perfil.';
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
  min-height: 200px;
  text-align: center;
}
.loading, .error { padding-top: 60px; color: #777; }
.error { color: #d32f2f; }

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #1e88e5;
  margin-bottom: 15px;
}
h3 {
  margin: 0;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
}
p {
  margin: 4px 0 10px 0;
  font-size: 0.9rem;
  color: #777;
}
.badge {
  background: #ffc107;
  color: #333;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
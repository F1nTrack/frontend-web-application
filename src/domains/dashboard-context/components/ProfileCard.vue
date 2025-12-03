<template>
  <div class="card">
    <div v-if="isLoading" class="loading">Cargando... 🌀</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="profile-content">
      <img
          :src="`https://ui-avatars.com/api/?name=${user.nombre}&background=random`"
          alt="Avatar"
          class="avatar"
      >
      <h3>¡Hola, {{ user.nombre }}!</h3>
      <p>{{ user.email }}</p>

      <span v-if="user.premium" class="badge">Usuario Premium ⭐</span>
      <span v-else class="badge basic">Plan Básico</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiService from '../../../services/api.service.js';

// Datos reactivos
const user = ref({});
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // 1. 👇 RECUPERAR SESIÓN GUARDADA
    // Buscamos la llave exacta que usaste en tu Login
    const sessionStr = localStorage.getItem('kapakid:user');

    if (!sessionStr) {
      error.value = 'No has iniciado sesión.';
      isLoading.value = false;
      return;
    }

    // 2. 👇 OBTENER EL ID DEL USUARIO REAL
    const session = JSON.parse(sessionStr);
    const userId = session.id;

    // 3. 👇 LLAMADA DINÁMICA A LA API
    // Ya no usamos (1), usamos (userId)
    const response = await apiService.getUsuario(userId);
    user.value = response.data;

  } catch (err) {
    console.error('Error al cargar perfil:', err);
    error.value = 'No se pudo cargar la información del perfil.';
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
  /* Centrar contenido si hay error/loading */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Ajuste para que loading/error no se vean arriba del todo */
.loading, .error {
  color: #777;
  font-weight: 500;
}
.error { color: #d32f2f; }

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #1e88e5;
  margin-bottom: 15px;
  object-fit: cover;
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
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.badge.basic {
  background: #e0e0e0;
  color: #555;
}
</style>

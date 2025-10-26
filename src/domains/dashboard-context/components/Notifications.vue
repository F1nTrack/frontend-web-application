<script setup>
import { ref, onMounted, computed } from 'vue';
// La ruta del import la dejé tal cual la tenías
import apiService from '../../../services/api.service.js';

const notifications = ref([]);
const isLoading = ref(true);
const error = ref(null);

// 1. Contamos las no leídas (sigue siendo útil para el badge)
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.leido).length;
});

// 2. 'latestUnread' ya no lo necesitamos, porque vamos a mostrar todas.

onMounted(async () => {
  try {
    // Asumimos ID de usuario 1
    const response = await apiService.getNotificacionesPorUsuario(1);
    notifications.value = response.data;
  } catch (err) {
    console.error('Error al cargar notificaciones:', err);
    error.value = 'No se pudieron cargar las notificaciones.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="card">
    <h3>
      Notificaciones
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </h3>

    <div v-if="isLoading" class="loading">Cargando... 🌀</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="notifications-list-container">

      <ul v-if="notifications.length > 0" class="notifications-list">
        <li
            v-for="notification in notifications"
            :key="notification.id"
            :class="{ 'unread': !notification.leido }"
        >
          <span class="dot"></span>
          <p class="message">{{ notification.mensaje }}</p>
        </li>
      </ul>

      <div v-else class="all-read">
        👍 No tienes mensajes
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.08);

  /* FIJAMOS una altura y hacemos que el contenido crezca */
  height: 545px;
  display: flex;
  flex-direction: column;
}

h3 {
  margin-bottom: 12px;
  color: #333;
  font-size: 1.2rem;
  /* Añadido para alinear el badge */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0; /* Evita que el título se encoja */
}

.loading, .error {
  text-align: center;
  padding-top: 50px; /* Centramos verticalmente */
  color: #777;
  flex-grow: 1;
}
.error { color: #d32f2f; }

/* --- ESTILOS MODIFICADOS Y NUEVOS --- */

/* Badge para el contador en el título */
.badge {
  background-color: #c62828;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: bold;
}

/* Contenedor de la lista para permitir scroll */
.notifications-list-container {
  overflow-y: auto; /* ¡Magia! Añade scroll si el contenido es muy largo */
  flex-grow: 1;       /* Ocupa el espacio restante en la card */
}

/* Mensaje de "No hay mensajes" (reutilizado) */
.all-read {
  font-size: 1.1rem;
  color: #555;
  font-weight: 500;
  text-align: center;
  padding-top: 50px;
}

/* La lista <ul> */
.notifications-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* El item <li> */
.notifications-list li {
  display: flex;
  align-items: center;
  padding: 12px 5px;
  border-bottom: 1px solid #f0f0f0;
  color: #777; /* Color gris para mensajes leídos */
  transition: background-color 0.2s;
}
.notifications-list li:last-child {
  border-bottom: none;
}
.notifications-list li:hover {
  background-color: #f9f9f9;
}

/* Estilo para mensajes NO LEÍDOS */
.notifications-list li.unread {
  color: #333; /* Texto más oscuro */
  font-weight: 600; /* Texto en negrita */
}

/* El punto indicador */
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: transparent; /* Transparente si está leído */
  margin-right: 12px;
  flex-shrink: 0;
}

li.unread .dot {
  background-color: #1e88e5; /* Azul si no está leído */
}

.message {
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}
</style>
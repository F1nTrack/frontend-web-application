<script setup>
import { ref, onMounted, computed } from 'vue'
import apiService from '../../../services/api.service.js'

// Estado
const notifications = ref([])
const isLoading = ref(true)
const error = ref(null)
const showModal = ref(false)
const selectedNotification = ref(null)

// Contador de no leídas
const unreadCount = computed(() =>
    notifications.value.filter(n => !n.leido).length
)

onMounted(async () => {
  try {
    const response = await apiService.getNotificacionesPorUsuario(1)
    notifications.value = response.data
  } catch (err) {
    console.error('Error al cargar notificaciones:', err)
    error.value = 'No se pudieron cargar las notificaciones.'
  } finally {
    isLoading.value = false
  }
})

// Marcar como leída
function openNotification(notification) {
  selectedNotification.value = notification
  showModal.value = true

  if (!notification.leido) {
    notification.leido = true
  }
}

// Cerrar modal
function closeModal() {
  showModal.value = false
  selectedNotification.value = null
}

// Eliminar notificación
function deleteNotification(id) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}
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
            @click="openNotification(notification)"
        >
          <span class="dot"></span>
          <p class="message">{{ notification.mensaje }}</p>
          <button class="delete-btn" @click.stop="deleteNotification(notification.id)">🗑️</button>
        </li>
      </ul>

      <div v-else class="all-read">👍 No tienes mensajes</div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h4>📩 Notificación</h4>
        <p>{{ selectedNotification.mensaje }}</p>
        <button @click="closeModal" class="close-btn">Cerrar</button>
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
  height: 545px;
  display: flex;
  flex-direction: column;
  position: relative;
}
h3 {
  margin-bottom: 12px;
  color: #333;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
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
.notifications-list-container {
  overflow-y: auto;
  flex-grow: 1;
}
.notifications-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.notifications-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 5px;
  border-bottom: 1px solid #f0f0f0;
  color: #777;
  transition: background-color 0.2s;
  cursor: pointer;
}
.notifications-list li:hover {
  background-color: #f5f5f5;
}
.notifications-list li.unread {
  color: #333;
  font-weight: 600;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: transparent;
  margin-right: 12px;
  flex-shrink: 0;
}
li.unread .dot {
  background-color: #1e88e5;
}
.message {
  flex-grow: 1;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}
.delete-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #888;
  transition: color 0.2s;
}
.delete-btn:hover {
  color: #d32f2f;
}

/* --- Modal --- */
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  max-width: 300px;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0,0,0,0.3);
}
.modal h4 {
  margin-bottom: 10px;
}
.close-btn {
  background: #1e88e5;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  margin-top: 10px;
}
.close-btn:hover {
  background: #1565c0;
}
</style>

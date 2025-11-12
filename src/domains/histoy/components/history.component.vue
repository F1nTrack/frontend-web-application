<script>
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/services/api.client.js'

export default {
  name: 'HistoryComponent',
  setup() {
    const historial = ref([])
    const loading = ref(true)
    const error = ref(null)
    const filtro = ref('')
    const modalVisible = ref(false)
    const selectedItem = ref(null)

    const cargarHistorial = async () => {
      try {
        const [pagosRes, docsRes, notifRes] = await Promise.all([
          apiClient.get('/pagos'),
          apiClient.get('/documentos'),
          apiClient.get('/notificaciones')
        ])

        const pagos = pagosRes.data.map(p => ({
          id: `pago-${p.id}`,
          tipo: 'Pago',
          titulo: p.servicio,
          detalle: `Monto: S/ ${p.monto}`,
          fecha: p.fecha
        }))

        const documentos = docsRes.data.map(d => ({
          id: `doc-${d.id}`,
          tipo: 'Documento',
          titulo: d.tipo,
          detalle: `Estado: ${d.estado}`,
          fecha: '2025-10-01'
        }))

        const notificaciones = notifRes.data.map(n => ({
          id: `notif-${n.id}`,
          tipo: 'Notificación',
          titulo: n.mensaje,
          detalle: n.leido ? 'Leído' : 'No leído',
          fecha: '2025-11-01'
        }))

        historial.value = [...pagos, ...documentos, ...notificaciones].sort(
            (a, b) => new Date(b.fecha) - new Date(a.fecha)
        )
      } catch (err) {
        console.error('Error al cargar historial:', err)
        error.value = 'No se pudo cargar el historial.'
      } finally {
        loading.value = false
      }
    }

    const abrirModal = (item) => {
      selectedItem.value = item
      modalVisible.value = true
    }

    const cerrarModal = () => {
      modalVisible.value = false
      selectedItem.value = null
    }

    const historialFiltrado = computed(() => {
      if (!filtro.value.trim()) return historial.value
      return historial.value.filter(item =>
          item.titulo.toLowerCase().includes(filtro.value.toLowerCase())
      )
    })

    onMounted(() => {
      cargarHistorial()
    })

    return {
      historial,
      historialFiltrado,
      loading,
      error,
      filtro,
      modalVisible,
      selectedItem,
      abrirModal,
      cerrarModal
    }
  }
}
</script>

<template>
  <div>
    <br>
  </div>
  <div class="history-container">
    <div class="header">
      <h2 class="title">📜 Historial General</h2>
      <input
          v-model="filtro"
          type="text"
          placeholder="Buscar por nombre..."
          class="input-busqueda"
      />
    </div>

    <div v-if="loading" class="loading">Cargando historial...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="timeline">
      <div
          v-for="item in historialFiltrado"
          :key="item.id"
          class="timeline-item"
          :class="item.tipo.toLowerCase()"
          @click="abrirModal(item)"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <span class="tipo">{{ item.tipo }}</span>
            <span class="fecha">{{ item.fecha }}</span>
          </div>
          <h3 class="titulo">{{ item.titulo }}</h3>
          <p class="detalle">{{ item.detalle }}</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="modalVisible" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-content">
        <h3>Detalles del registro</h3>
        <p><strong>Tipo:</strong> {{ selectedItem.tipo }}</p>
        <p><strong>Título:</strong> {{ selectedItem.titulo }}</p>
        <p><strong>Detalle:</strong> {{ selectedItem.detalle }}</p>
        <p><strong>Fecha:</strong> {{ selectedItem.fecha }}</p>
        <button class="btn-cerrar" @click="cerrarModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-container {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  margin-top: 2rem;
  font-family: 'Inter', sans-serif;
}

/* === Header === */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2563eb;
}

.input-busqueda {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.5rem 0.8rem;
  font-size: 0.95rem;
  color: #1e293b;
  outline: none;
  transition: border 0.2s ease;
}

.input-busqueda:focus {
  border-color: #2563eb;
}

/* === Loading/Error === */
.loading,
.error {
  text-align: center;
  font-size: 1rem;
  color: #6b7280;
}

.error {
  color: #dc2626;
}

/* === Timeline === */
.timeline {
  position: relative;
  margin-left: 1rem;
  padding-left: 1.5rem;
  border-left: 3px solid #2563eb;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.timeline-item {
  position: relative;
  background: #f1f5ff;
  border-radius: 12px;
  padding: 1rem 1.4rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}

.timeline-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.2);
}

.timeline-dot {
  position: absolute;
  left: -1.6rem;
  top: 1rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #2563eb;
}

/* Colores por tipo */
.timeline-item.pago .timeline-dot { background: #22c55e; }
.timeline-item.documento .timeline-dot { background: #facc15; }
.timeline-item.notificación .timeline-dot { background: #3b82f6; }

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #64748b;
}

.titulo {
  font-weight: 600;
  color: #1e3a8a;
  font-size: 1.1rem;
}

.detalle {
  color: #334155;
  font-size: 0.95rem;
}

/* === Modal === */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 1rem;
}

.modal-content p {
  color: #334155;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.btn-cerrar {
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.25s ease;
}

.btn-cerrar:hover {
  background: #1d4ed8;
}
</style>

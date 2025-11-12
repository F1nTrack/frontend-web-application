<script>
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/services/api.client.js'

export default {
  name: 'NotificationsComponent',
  setup() {
    const actividades = ref([])
    const loading = ref(true)
    const error = ref(null)
    const modalVisible = ref(false)
    const actividadSeleccionada = ref(null)
    const searchQuery = ref('')

    const cargarHistorial = async () => {
      loading.value = true
      try {
        // Traer recursos existentes
        const [resPagos, resNotifs, resDocs] = await Promise.all([
          apiClient.get('/pagos'),
          apiClient.get('/notificaciones'),
          apiClient.get('/documentos')
        ])

        // Mapear y conservar source + sourceId para posibles updates
        const pagos = resPagos.data.map(p => ({
          id: `p-${p.id}`,
          source: 'pago',
          sourceId: p.id,
          tipo: 'Pago',
          descripcion: `Pago de ${p.servicio}`,
          fecha: p.fecha,
          detalle: `Monto: S/ ${p.monto}`,
          leido: false // por defecto
        }))

        const notifs = resNotifs.data.map(n => ({
          id: `n-${n.id}`,
          source: 'notificacion',
          sourceId: n.id,
          tipo: 'Notificación',
          descripcion: n.mensaje,
          // si tuvieras fecha en notificaciones, úsala; si no, dejar fecha ficticia o null
          fecha: n.fecha || new Date().toISOString().slice(0, 10),
          detalle: n.leido ? 'Leído' : 'No leído',
          leido: !!n.leido
        }))

        const docs = resDocs.data.map(d => ({
          id: `d-${d.id}`,
          source: 'documento',
          sourceId: d.id,
          tipo: 'Documento',
          descripcion: `${d.tipo} (${d.estado})`,
          fecha: d.fecha || new Date().toISOString().slice(0, 10),
          detalle: `Número: ${d.numero}`,
          leido: false
        }))

        // Combinar y ordenar por fecha descendente (si fecha ausente, lo deja al final)
        const combinado = [...pagos, ...notifs, ...docs].sort((a, b) => {
          const da = a.fecha ? new Date(a.fecha) : new Date(0)
          const db = b.fecha ? new Date(b.fecha) : new Date(0)
          return db - da
        })

        actividades.value = combinado
      } catch (err) {
        console.error('Error al cargar historial:', err)
        error.value = 'No se pudo cargar el historial.'
      } finally {
        loading.value = false
      }
    }

    // Abrir modal y marcar como leído
    const abrirModal = async (actividad) => {
      // marcar localmente
      actividad.leido = true
      actividad.detalle = actividad.detalle || ''
      actividadSeleccionada.value = actividad
      modalVisible.value = true

      // Si viene de notificación, persistir en fake API
      try {
        if (actividad.source === 'notificacion' && actividad.sourceId) {
          await apiClient.patch(`/notificaciones/${actividad.sourceId}`, { leido: true })
        }
      } catch (err) {
        // Solo log, no bloqueamos la UI
        console.warn('No se pudo actualizar notificación como leída en la API:', err)
      }
    }

    const cerrarModal = () => {
      modalVisible.value = false
      actividadSeleccionada.value = null
    }

    // Filtrar por "nombre" => aquí usamos descripcion
    const actividadesFiltradas = computed(() => {
      const q = searchQuery.value.trim().toLowerCase()
      if (!q) return actividades.value
      return actividades.value.filter(a =>
          (a.descripcion || '').toLowerCase().includes(q)
      )
    })

    onMounted(cargarHistorial)

    return {
      actividades,
      actividadesFiltradas,
      loading,
      error,
      modalVisible,
      actividadSeleccionada,
      searchQuery,
      abrirModal,
      cerrarModal,
      cargarHistorial
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
      <h2 class="title"> Notificaciones de Actividades</h2>
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por nombre (ej. Metro, Recarga, licencia...)"
          class="search-input"
      />
    </div>

    <div v-if="loading" class="loading">Cargando historial...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else>
      <div v-if="actividadesFiltradas.length" class="timeline">
        <div
            v-for="actividad in actividadesFiltradas"
            :key="actividad.id"
            class="timeline-item"
            @click="abrirModal(actividad)"
        >
          <div class="timeline-icon" :class="{ unread: !actividad.leido }">
            {{ actividad.tipo === 'Pago' ? '💳' : actividad.tipo === 'Notificación' ? '🔔' : '📄' }}
          </div>

          <div class="timeline-content">
            <div class="timeline-header">
              <h3>{{ actividad.tipo }}</h3>
              <span class="fecha">{{ actividad.fecha }}</span>
            </div>
            <p class="descripcion">{{ actividad.descripcion }}</p>
            <span class="detalle">{{ actividad.detalle }}</span>
          </div>
        </div>
      </div>

      <p v-else class="no-results">No se encontraron resultados.</p>
    </div>

    <!-- Modal -->
    <div v-if="modalVisible" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-content">
        <h3>Detalles de la Actividad</h3>
        <p v-if="actividadSeleccionada"><strong>Tipo:</strong> {{ actividadSeleccionada.tipo }}</p>
        <p v-if="actividadSeleccionada"><strong>Descripción:</strong> {{ actividadSeleccionada.descripcion }}</p>
        <p v-if="actividadSeleccionada"><strong>Fecha:</strong> {{ actividadSeleccionada.fecha }}</p>
        <p v-if="actividadSeleccionada"><strong>Detalle:</strong> {{ actividadSeleccionada.detalle }}</p>
        <div class="modal-actions">
          <button class="btn-cerrar" @click="cerrarModal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-container {
  background: linear-gradient(135deg, #e0f2fe, #f0f9ff);

  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  margin-top: 1.5rem;
  font-family: 'Inter', sans-serif;
}

/* header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2563eb;
}

.search-input {
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  width: 320px;
  outline: none;
}

.search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 6px rgba(37, 99, 235, 0.15);
}

/* estados */
.loading,
.error,
.no-results {
  text-align: center;
  color: #475569;
  margin-top: 1.2rem;
}

/* timeline */
.timeline {
  position: relative;
  margin-left: 0.6rem;
  padding-left: 1rem;
  border-left: 3px solid #e6eefc;
}

.timeline-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.timeline-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.08);
}

.timeline-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #c7d2fe;
  color: #123;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.timeline-icon.unread {
  background: #2563eb;
  color: white;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.18);
}

.timeline-content {
  background: #f1f5ff;
  border: 1px solid #e6eefc;
  border-radius: 10px;
  padding: 0.85rem 1rem;
  flex: 1;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.timeline-header h3 {
  margin: 0;
  color: #1e3a8a;
  font-weight: 700;
  font-size: 1rem;
}

.fecha {
  color: #64748b;
  font-size: 0.9rem;
}

.descripcion {
  margin: 0.45rem 0 0.25rem 0;
  color: #334155;
}

.detalle {
  font-size: 0.9rem;
  color: #475569;
}

/* modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(3px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 1.6rem;
  width: 92%;
  max-width: 480px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
  color: #2563eb;
  margin-bottom: 0.6rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-cerrar {
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-weight: 600;
}

.btn-cerrar:hover {
  background: #16a34a;
}
</style>

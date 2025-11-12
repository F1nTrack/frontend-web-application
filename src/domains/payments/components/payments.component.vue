<script>
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/services/api.client.js'
import { Chart, registerables } from 'chart.js'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
Chart.register(...registerables)

export default {
  name: 'PaymentsComponent',
  setup() {
    const pagos = ref([])
    const loading = ref(true)
    const error = ref(null)
    const modalVisible = ref(false)
    const selectedPago = ref(null)
    const searchQuery = ref('')
    const statsVisible = ref(false)
    const chartInstance = ref(null)

    const cargarPagos = async () => {
      try {
        const response = await apiClient.get('/pagos')
        pagos.value = response.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      } catch (err) {
        console.error('Error al cargar pagos:', err)
        error.value = 'No se pudieron cargar los pagos.'
      } finally {
        loading.value = false
      }
    }

    const abrirModal = (pago) => {
      selectedPago.value = pago
      modalVisible.value = true
    }

    const cerrarModal = () => {
      modalVisible.value = false
      selectedPago.value = null
    }

    const abrirEstadisticas = () => {
      statsVisible.value = true
      setTimeout(generarGrafico, 100) // Espera a que se monte el canvas
    }

    const cerrarEstadisticas = () => {
      statsVisible.value = false
    }

    const generarGrafico = () => {
      const canvas = document.getElementById('graficoPagos')
      if (!canvas) return

      if (chartInstance.value) {
        chartInstance.value.destroy()
      }

      const dataServicios = {}
      pagos.value.forEach(p => {
        dataServicios[p.servicio] = (dataServicios[p.servicio] || 0) + p.monto
      })

      chartInstance.value = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: Object.keys(dataServicios),
          datasets: [
            {
              label: 'Monto total por servicio (S/)',
              data: Object.values(dataServicios),
              backgroundColor: '#2563eb',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
        },
      })
    }

    const descargarPNG = async () => {
      const canvas = document.getElementById('graficoPagos')
      const image = await html2canvas(canvas)
      const link = document.createElement('a')
      link.download = 'estadisticas.png'
      link.href = image.toDataURL('image/png')
      link.click()
    }

    const descargarPDF = async () => {
      const pdf = new jsPDF()
      const canvas = document.getElementById('graficoPagos')
      const imgData = canvas.toDataURL('image/png')
      pdf.text('Estadísticas de Pagos', 10, 10)
      pdf.addImage(imgData, 'PNG', 10, 20, 180, 100)
      pdf.save('estadisticas.pdf')
    }

    const pagosFiltrados = computed(() => {
      if (!searchQuery.value) return pagos.value
      return pagos.value.filter(p =>
          p.servicio.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const promedioMonto = computed(() => {
      if (!pagos.value.length) return 0
      const total = pagos.value.reduce((acc, p) => acc + p.monto, 0)
      return (total / pagos.value.length).toFixed(2)
    })

    onMounted(cargarPagos)

    return {
      pagos,
      pagosFiltrados,
      loading,
      error,
      modalVisible,
      selectedPago,
      searchQuery,
      statsVisible,
      promedioMonto,
      abrirModal,
      cerrarModal,
      abrirEstadisticas,
      cerrarEstadisticas,
      descargarPNG,
      descargarPDF,
    }
  },
}
</script>

<template>
  <div class="payments-container">
    <div class="header">
      <h2 class="title">💳 Historial de Pagos</h2>
      <div class="actions">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar por servicio..."
            class="search-input"
        />
        <button class="btn-stats" @click="abrirEstadisticas">📊 Ver estadísticas</button>
      </div>
    </div>

    <div v-if="loading" class="loading">Cargando pagos...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="payment-list">
      <div
          v-for="pago in pagosFiltrados"
          :key="pago.id"
          class="payment-item"
      >
        <div class="payment-icon">💰</div>

        <div class="payment-info">
          <div class="payment-header">
            <h3 class="servicio">{{ pago.servicio }}</h3>
            <span class="fecha">{{ pago.fecha }}</span>
          </div>

          <p class="monto">Monto: <strong>S/ {{ pago.monto }}</strong></p>

          <button class="btn-detalle" @click="abrirModal(pago)">Ver detalles</button>
        </div>
      </div>
    </div>

    <!-- Modal Detalle -->
    <div v-if="modalVisible" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-content">
        <h3>Detalles del pago</h3>
        <p><strong>Servicio:</strong> {{ selectedPago.servicio }}</p>
        <p><strong>Fecha:</strong> {{ selectedPago.fecha }}</p>
        <p><strong>Monto:</strong> S/ {{ selectedPago.monto }}</p>
        <button class="btn-cerrar" @click="cerrarModal">Cerrar</button>
      </div>
    </div>

    <!-- Modal Estadísticas -->
    <div v-if="statsVisible" class="modal-overlay" @click.self="cerrarEstadisticas">
      <div class="modal-content small">
        <h3>📊 Estadísticas</h3>
        <p><strong>Total de pagos:</strong> {{ pagos.length }}</p>
        <p><strong>Promedio de monto:</strong> S/ {{ promedioMonto }}</p>
        <canvas id="graficoPagos" width="350" height="200"></canvas>
        <div class="btns">
          <button @click="descargarPNG" class="btn-pdf">Descargar PNG</button>
          <button @click="descargarPDF" class="btn-pdf">Descargar PDF</button>
        </div>
        <button class="btn-cerrar" @click="cerrarEstadisticas">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payments-container {
  background: linear-gradient(135deg, #e0f2fe, #f0f9ff);

  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  margin-top: 2rem;
  font-family: 'Inter', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2563eb;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-input {
  padding: 0.6rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

.btn-stats {
  background: #22c55e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-stats:hover {
  background: #16a34a;
}

.payment-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1.5rem;
}

.payment-item {
  display: flex;
  align-items: flex-start;
  background: #f1f5ff;
  border: 1px solid #c7d2fe;
  border-radius: 12px;
  padding: 1rem 1.4rem;
  transition: transform 0.25s, box-shadow 0.25s;
}

.payment-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.2);
}

.payment-icon {
  font-size: 2rem;
  margin-right: 1rem;
  color: #2563eb;
}

.payment-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.payment-header {
  display: flex;
  justify-content: space-between;
}

.servicio {
  font-size: 1.2rem;
  color: #1e3a8a;
  font-weight: 600;
}

.fecha {
  color: #64748b;
  font-size: 0.95rem;
}

.monto {
  margin-top: 0.4rem;
  color: #1e293b;
}

.btn-detalle {
  align-self: flex-start;
  margin-top: 0.8rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  cursor: pointer;
}

.btn-detalle:hover {
  background: #1d4ed8;
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
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.modal-content.small {
  max-width: 500px;
}

.btns {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-pdf {
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.btn-pdf:hover {
  background: #1d4ed8;
}

.btn-cerrar {
  margin-top: 1.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
}
</style>

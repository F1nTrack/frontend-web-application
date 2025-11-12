<script setup>
import { ref, onMounted } from 'vue'
import { Line, Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js'
import NavBar from "../../shared/presentation/components/nav-bar.vue";
import BalanceCard from '../dashboard-context/components/BalanceCard.vue'
import DocumentsCard from '../dashboard-context/components/DocumentsCard.vue'
import NotificationsCard from '../dashboard-context/components/Notifications.vue'
import PendingPaymentsCard from '../dashboard-context/components/PendingPaymentsCard.vue'
import ProfileCard from '../dashboard-context/components/ProfileCard.vue'
import TransportCards from '../dashboard-context/components/TransportCards.vue'
import apiService from '../../services/api.service.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler
)

// Estado
const user = ref({})
const pagos = ref([])

// === Gráficos ===
const chartDataLine = ref({
  labels: [],
  datasets: [{
    label: 'Pagos mensuales (S/)',
    data: [],
    borderColor: '#2563eb',
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
    tension: 0.4,
    fill: true,
    pointRadius: 4,
  }]
})

const chartDataBar = ref({
  labels: [],
  datasets: [{
    label: 'Gastos por servicio',
    data: [],
    backgroundColor: [
      'rgba(37,99,235,0.7)',
      'rgba(16,185,129,0.7)',
      'rgba(234,179,8,0.7)',
      'rgba(239,68,68,0.7)',
      'rgba(168,85,247,0.7)',
      'rgba(34,197,94,0.7)',
      'rgba(245,158,11,0.7)',
    ],
    borderRadius: 10,
  }]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Permite controlar altura manualmente
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#334155'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#475569'
      },
      grid: {
        display: false
      }
    },
    y: {
      ticks: {
        color: '#475569'
      },
      grid: {
        color: 'rgba(0,0,0,0.05)'
      }
    }
  }
}

// === Descargar gráficos ===
const descargarGrafico = (id, formato = 'png') => {
  const canvas = document.getElementById(id)
  if (!canvas) return
  const enlace = document.createElement('a')
  enlace.download = `grafico-${id}.${formato}`
  enlace.href = canvas.toDataURL(`image/${formato}`)
  enlace.click()
}

// === Cargar datos ===
onMounted(async () => {
  try {
    const usuarioResp = await apiService.getUsuario(1)
    user.value = usuarioResp.data

    const pagosResp = await apiService.getPagosPorUsuario(1)
    pagos.value = pagosResp.data || [] // Asegura que no sea undefined

    // Procesar datos para los gráficos solo si hay pagos
    if (pagos.value.length > 0) {
      const meses = {}
      const categorias = {}
      pagos.value.forEach(p => {
        const fecha = new Date(p.fecha)
        if (isNaN(fecha.getTime())) return // Salta fechas inválidas
        const mes = fecha.toLocaleString('es-PE', { month: 'short' })
        meses[mes] = (meses[mes] || 0) + p.monto
        categorias[p.servicio] = (categorias[p.servicio] || 0) + p.monto
      })

      chartDataLine.value.labels = Object.keys(meses).sort() // Ordena meses
      chartDataLine.value.datasets[0].data = Object.values(meses)

      chartDataBar.value.labels = Object.keys(categorias)
      chartDataBar.value.datasets[0].data = Object.values(categorias)
    } else {
      // Datos de fallback para testing (comenta si usas API real)
      /*
      chartDataLine.value.labels = ['oct.', 'nov.']
      chartDataLine.value.datasets[0].data = [125.5, 44.9]
      chartDataBar.value.labels = ['Recarga Móvil', 'Metro', 'Lima Bus', 'Metropolitano', 'Netflix', 'Spotify', 'Gimnasio']
      chartDataBar.value.datasets[0].data = [35, 2, 3, 5.5, 29.9, 22.9, 90]
      */
    }
  } catch (error) {
    console.error("Error al cargar datos:", error)
    user.value = { nombre: 'Invitado' }
    // Datos de fallback en caso de error
    chartDataLine.value.labels = ['oct.', 'nov.']
    chartDataLine.value.datasets[0].data = [125.5, 44.9]
    chartDataBar.value.labels = ['Recarga Móvil', 'Metro']
    chartDataBar.value.datasets[0].data = [35, 2]
  }
})
</script>

<template>
  <nav-bar></nav-bar>
  <div class="dashboard">
    <header class="header">
      <div class="welcome">
        <br><br>
        <h2>👋 Bienvenido, {{ user.nombre }}</h2>
        <p>Resumen general de tu cuenta</p>
      </div>
    </header>
    <section class="main-grid">
      <!-- Balance -->
      <div class="full-width-card">
        <BalanceCard />
      </div>
      <!-- Documentos y pagos pendientes -->
      <div class="row">
        <DocumentsCard />
        <PendingPaymentsCard />
      </div>
      <!-- Doble gráfico en fila 50/50 -->
      <div class="charts-row">
        <div class="chart-card">
          <div class="chart-header">
            <h3>Evolución de tu balance</h3>
            <div class="actions">
              <button @click="descargarGrafico('lineChart', 'png')">🖼️ PNG</button>
              <!-- Nota: PDF requiere lib extra como jsPDF; por ahora solo PNG -->
            </div>
          </div>
          <div class="chart-container">
            <Line :key="chartDataLine.labels.length" id="lineChart" :data="chartDataLine" :options="chartOptions" />
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-header">
            <h3>Gastos por categoría</h3>
            <div class="actions">
              <button @click="descargarGrafico('barChart', 'png')">🖼️ PNG</button>
            </div>
          </div>
          <div class="chart-container">
            <Bar :key="chartDataBar.labels.length" id="barChart" :data="chartDataBar" :options="chartOptions" />
          </div>
        </div>
      </div>
      <!-- Notificaciones y perfil -->
      <div class="row">
        <NotificationsCard />
        <div class="right-column">
          <TransportCards />
          <ProfileCard />
        </div>
      </div>
    </section>
  </div>

</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  min-height: 100vh;
  padding-bottom: 50px;
}

/* Encabezado */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  background: linear-gradient(90deg, #2563eb, #1e40af);
  color: #fff;
  border-radius: 0 0 25px 25px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.welcome h2 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}

.welcome p {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  font-size: 1rem;
  color: #e2e8f0;
}

/* Layout general */
.main-grid {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 30px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}

.row > * {
  flex: 1 1 48%;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex: 1 1 48%;
}

/* Doble gráfico en fila exacta 50/50 */
.charts-row {
  display: flex;
  flex-wrap: nowrap; /* Evita wrap para mantener en fila */
  gap: 25px;
  width: 100%;
}

.chart-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
  flex: 1; /* Cada uno toma exactamente 50% del contenedor, menos gap */
  min-width: 0; /* Permite shrink si es necesario */
}

.chart-card:hover {
  transform: scale(1.01);
}

.chart-card h3 {
  margin-bottom: 15px;
  color: #1e3a8a;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.chart-container {
  position: relative;
  height: 300px; /* Altura fija para que los gráficos se vean */
  min-height: 250px; /* Mínimo en mobile */
  width: 100%;
}

.actions button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  margin-left: 6px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 0.875rem;
}

.actions button:hover {
  background: #1e40af;
}

/* Full width card (Balance) */
.full-width-card {
  width: 100%;
}

/* Responsive */
@media (max-width: 1024px) {
  .main-grid {
    padding: 20px;
    gap: 20px;
  }

  .header {
    padding: 30px 20px;
  }

  .welcome h2 {
    font-size: 1.75rem;
  }
}

@media (max-width: 768px) {
  .charts-row {
    flex-direction: column;
    flex-wrap: wrap; /* Permite stack en mobile */
  }

  .chart-card {
    flex: 1 1 100%; /* En mobile, cada uno ocupa 100% */
  }

  .row {
    flex-direction: column;
  }

  .row > *,
  .right-column > * {
    flex: 1 1 100%;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
    gap: 10px;
    padding: 20px;
  }

  .welcome h2 {
    font-size: 1.5rem;
  }

  .chart-container {
    height: 250px;
  }

  .actions {
    flex-wrap: wrap;
    gap: 5px;
  }

  .actions button {
    margin-left: 0;
    margin-bottom: 5px;
  }
}

@media (max-width: 480px) {
  .main-grid {
    padding: 15px;
    gap: 15px;
  }

  .header {
    padding: 15px;
  }

  .welcome h2 {
    font-size: 1.25rem;
  }

  .welcome p {
    font-size: 0.875rem;
  }

  .chart-container {
    height: 200px;
  }

  .chart-card {
    padding: 15px;
  }
}
</style>
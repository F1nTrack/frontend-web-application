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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: { color: '#334155' }
    }
  },
  scales: {
    x: {
      ticks: { color: '#475569' },
      grid: { display: false }
    },
    y: {
      ticks: { color: '#475569' },
      grid: { color: 'rgba(0,0,0,0.05)' }
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
    const sessionStr = localStorage.getItem('kapakid:user');
    let userId = 1;

    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      userId = session.id;
      user.value.nombre = session.nombre;
    }

    const usuarioResp = await apiService.getUsuario(userId);
    user.value = usuarioResp.data;

    const pagosResp = await apiService.getPagosPorUsuario(userId);
    pagos.value = pagosResp.data || [];

    if (pagos.value.length > 0) {
      const meses = {}
      const categorias = {}
      pagos.value.forEach(p => {
        const fecha = new Date(p.fecha)
        if (isNaN(fecha.getTime())) return
        const mes = fecha.toLocaleString('es-PE', { month: 'short' })
        meses[mes] = (meses[mes] || 0) + p.monto
        categorias[p.servicio] = (categorias[p.servicio] || 0) + p.monto
      })
      chartDataLine.value.labels = Object.keys(meses).sort()
      chartDataLine.value.datasets[0].data = Object.values(meses)

      chartDataBar.value.labels = Object.keys(categorias)
      chartDataBar.value.datasets[0].data = Object.values(categorias)
    }
  } catch (error) {
    console.error("Error al cargar datos:", error)
    user.value = { nombre: 'Invitado' }
  }
})
</script>

<template>
  <nav-bar></nav-bar>
  <div class="dashboard">
    <header class="header">
      <div class="welcome">
        <br><br>
        <h2>Bienvenido, {{ user.nombre }}</h2>
        <p>Resumen general de tu cuenta</p>
      </div>
    </header>
    <section class="main-grid">
      <div class="full-width-card">
        <BalanceCard />
      </div>
      <div class="row">
        <DocumentsCard />
        <PendingPaymentsCard />
      </div>
      <div class="charts-row">
        <div class="chart-card">
          <div class="chart-header">
            <h3>Evolución de tu balance</h3>
            <div class="actions">
              <button @click="descargarGrafico('lineChart', 'png')">🖼️ PNG</button>
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
/* Reset básico para el componente */
* {
  box-sizing: border-box;
}

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
  line-height: 1.2;
}

.welcome p {
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
  width: 100%;
  max-width: 1400px; /* Evita que se estire demasiado en pantallas gigantes */
  margin: 0 auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  width: 100%;
}

/* Cálculo exacto para 2 columnas con gap de 25px:
   50% del ancho - la mitad del gap (12.5px)
*/
.row > * {
  flex: 1 1 calc(50% - 12.5px);
  min-width: 300px; /* Evita que se aplasten demasiado antes del breakpoint */
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex: 1 1 calc(50% - 12.5px);
}

/* Charts Row */
.charts-row {
  display: flex;
  flex-wrap: nowrap; /* En escritorio se mantiene en línea */
  gap: 25px;
  width: 100%;
}

.chart-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
  flex: 1;
  min-width: 0; /* Vital para que ChartJS funcione bien en Flexbox */
  width: 100%;
}

.chart-card:hover {
  transform: translateY(-2px); /* Efecto sutil */
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap; /* Permite que el botón baje si el título es muy largo */
  gap: 10px;
}

.chart-card h3 {
  margin: 0;
  color: #1e3a8a;
  font-size: 1.1rem;
}

.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}

.actions button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 0.85rem;
}

.actions button:hover {
  background: #1e40af;
}

.full-width-card {
  width: 100%;
}

/* =========================================
   MEDIA QUERIES (RESPONSIVE)
   ========================================= */

/* Tablet (menor a 1024px) */
@media (max-width: 1024px) {
  .main-grid {
    padding: 20px;
    gap: 20px;
  }

  .header {
    padding: 30px 20px;
  }
}

/* Mobile y Tablet pequeña (menor a 768px) */
@media (max-width: 768px) {
  /* Rompemos la fila de gráficos para que sea columna */
  .charts-row {
    flex-direction: column;
  }

  /* Rompemos las filas generales */
  .row {
    flex-direction: column;
  }

  /* Forzamos que todo ocupe el 100% */
  .row > *,
  .right-column,
  .chart-card {
    flex: 1 1 100%;
    width: 100%;
    min-width: 100%; /* Asegura que ocupe todo el ancho */
  }

  /* Header centrado */
  .header {
    flex-direction: column;
    align-items: center; /* Centrar horizontalmente */
    text-align: center;
    gap: 15px;
  }

  .welcome {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .welcome h2 {
    font-size: 1.5rem;
    justify-content: center;
  }

  .welcome p {
    justify-content: center;
  }

  .chart-container {
    height: 250px; /* Un poco más bajo en móvil */
  }
}

/* Mobile pequeño (menor a 480px) */
@media (max-width: 480px) {
  .main-grid {
    padding: 15px;
    gap: 15px;
  }

  .header {
    padding: 20px 15px;
  }

  .welcome h2 {
    font-size: 1.3rem;
  }

  .chart-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .chart-container {
    height: 220px;
  }
}
</style>

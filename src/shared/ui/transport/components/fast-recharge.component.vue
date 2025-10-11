<script setup>
import { ref, onMounted } from 'vue'
import { apiFindDocumentByUserID, apiFindTransportCardBalance, apiPatchBalanceByDocumentID } from '../../../../domains/transport/infrastructure/http/documents.api.js'
import { apiCreatePayment } from '../../../../domains/transport/infrastructure/http/pagos.api.js'
import { TarjetaTransporte } from '../../../../domains/transport/domain/entities/tarjeta-transporte.js'
import { Pagos } from '../../../../domains/transport/domain/entities/pagos.js'
import { LocalSession } from '../../../../domains/auth/infrastructure/persistence/users.local.js'

import {useI18n} from "vue-i18n";
const { t } = useI18n();
// SVG azul para transporte
const svgBus = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
stroke-linecap="round" stroke-linejoin="round"
class="icon icon-tabler icons-tabler-outline icon-tabler-bus">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M6 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
<path d="M18 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
<path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />
<path d="M16 5l1.5 7l4.5 0" /><path d="M2 10l15 0" /><path d="M7 5l0 5" /><path d="M12 5l0 5" /></svg>`

const storedUser = LocalSession.get()
const userId = storedUser?.id ?? null

const tarjetas = ref([])
const tarjetaSeleccionada = ref(null)
const montoSeleccionado = ref(null)
const montoManual = ref('')
const loading = ref(true)
const error = ref(null)

const tiposValidos = ['Metropolitano', 'Lima Pass', 'Metro de Lima', 'Metropolitano Card']
const montosRapidos = [5, 10, 20, 30]

onMounted(async () => {
  if (!userId) {
    error.value = 'No se encontró usuario en sesión.'
    return
  }

  try {
    const documentos = await apiFindDocumentByUserID(userId)
    const docsFiltrados = documentos.filter(doc => tiposValidos.includes(doc.tipo))

    const tarjetasConSaldo = await Promise.all(
        docsFiltrados.map(async (doc) => {
          try {
            const balanceData = await apiFindTransportCardBalance(doc.id)
            const saldo = Number(balanceData.balance) || 0
            return {
              ...new TarjetaTransporte({ ...doc, saldo }),
              icon: svgBus,
              iconBgColor: '#DBEAFE',
              bgColor: '#EFF6FF',
              textColor: '#1E40AF'
            }
          } catch (err) {
            console.error(`Error al obtener saldo para documento ${doc.id}:`, err)
            return new TarjetaTransporte({ ...doc, saldo: 0 })
          }
        })
    )

    tarjetas.value = tarjetasConSaldo
  } catch (err) {
    console.error(err)
    error.value = 'Error al obtener las tarjetas.'
  } finally {
    loading.value = false
  }
})

function seleccionarTarjeta(id) {
  tarjetaSeleccionada.value = id
}

function seleccionarMonto(monto) {
  montoSeleccionado.value = monto
  montoManual.value = ''
}

async function recargar() {
  const monto = montoManual.value ? Number(montoManual.value) : montoSeleccionado.value
  if (!tarjetaSeleccionada.value) return alert('Selecciona una tarjeta.')
  if (!monto || monto <= 0 || monto > 30) return alert('Monto inválido.')

  const tarjeta = tarjetas.value.find(t => t.id === tarjetaSeleccionada.value)
  const nuevoSaldo = tarjeta.saldo + monto
  if (nuevoSaldo > 30) return alert('El saldo máximo permitido es 30.')

  try {
    await apiPatchBalanceByDocumentID(tarjeta.id, { balance: nuevoSaldo })
    await apiCreatePayment(
        new Pagos({
          id: Date.now(),
          usuarioId: userId,
          servicio: tarjeta.tipo,
          monto,
          fecha: new Date().toISOString().split('T')[0]
        })
    )

    tarjeta.saldo = nuevoSaldo
    alert(`Recarga exitosa: S/ ${monto.toFixed(2)}`)
    montoSeleccionado.value = null
    montoManual.value = ''
    tarjetaSeleccionada.value = null
  } catch (err) {
    console.error(err)
    alert('Error al procesar la recarga.')
  }
}
</script>

<template>
  <section class="fast-recharge">
    <h1 class="titulo">{{t('fast-recharge.title')}}</h1>
    <h3 class="subtitulo">{{t('fast-recharge.subtitle')}}</h3>

    <div v-if="loading">{{t('fast-recharge.load')}}...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <!-- Monto rápido -->
      <div class="montos-rapidos">
        <button
            v-for="m in montosRapidos"
            :key="m"
            @click="seleccionarMonto(m)"
            :class="{ activo: montoSeleccionado === m }"
        >
          S/ {{ m }}
        </button>
      </div>

      <!-- Monto manual -->
      <form @submit.prevent="recargar" class="form-recarga">
        <label for="monto">{{t('fast-recharge.manual')}} (S/):</label>
        <input
            id="monto"
            type="number"
            v-model="montoManual"
            placeholder="Ingresa monto"
            min="1"
            max="30"
        />
        <button type="submit" class="btn-recargar">{{t('fast-recharge.recharge')}}</button>
      </form>

      <!-- Tarjetas -->
      <div v-if="!tarjetas.length" class="no-cards">{{t('fast-recharge.recharge')}}.</div>
      <div v-else class="cards-container">
        <div
            v-for="tarjeta in tarjetas"
            :key="tarjeta.id"
            class="card"
            :class="{ seleccionada: tarjetaSeleccionada === tarjeta.id }"
            :style="{ backgroundColor: tarjeta.bgColor }"
            @click="seleccionarTarjeta(tarjeta.id)"
        >
          <div class="icon-container" :style="{ backgroundColor: tarjeta.iconBgColor }" v-html="tarjeta.icon"></div>
          <div class="details">
            <h3 :style="{ color: tarjeta.textColor }">{{ tarjeta.tipo }}</h3>
            <p>{{ tarjeta.numero }}</p>
            <span class="saldo">Saldo: S/ {{ tarjeta.saldo.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fast-recharge {
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.titulo {
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
}

.subtitulo {
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
}

.montos-rapidos {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.montos-rapidos button {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  background: #e5e7eb;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.montos-rapidos button.activo {
  background: #2563eb;
  color: white;
}

.form-recarga {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.form-recarga input {
  width: 80px;
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.btn-recargar {
  padding: 0.6rem 1.2rem;
  background: #1e40af;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-2px);
}

.card.seleccionada {
  border: 2px solid #2563eb;
}

.icon-container {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e40af;
}

.details h3 {
  margin: 0;
  font-weight: 600;
  font-size: 1.1rem;
}

.details p {
  margin: 0;
  color: #6b7280;
}

.saldo {
  display: block;
  margin-top: 0.2rem;
  font-weight: bold;
  color: #1e3a8a;
}

.no-cards {
  text-align: center;
  color: #9ca3af;
}
</style>

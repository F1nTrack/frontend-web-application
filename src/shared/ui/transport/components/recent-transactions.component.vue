<script setup>
import { ref, onMounted } from 'vue'
import { apiFindPaymentByUserID } from '../../../../domains/transport/infrastructure/http/pagos.api.js'
import { Pagos } from '../../../../domains/transport/domain/entities/pagos.js'
import { LocalSession } from '../../../../domains/auth/infrastructure/persistence/users.local.js'
import {useI18n} from "vue-i18n";
const { t } = useI18n();
// SVGs en constantes
const svgBus = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
stroke-linecap="round" stroke-linejoin="round"
class="icon icon-tabler icons-tabler-outline icon-tabler-bus">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M6 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
<path d="M18 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
<path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />
<path d="M16 5l1.5 7l4.5 0" /><path d="M2 10l15 0" /><path d="M7 5l0 5" /><path d="M12 5l0 5" /></svg>`

const svgRecarga = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
stroke-linecap="round" stroke-linejoin="round"
class="icon icon-tabler icons-tabler-outline icon-tabler-trending-up">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>`

const pagos = ref([])
const user = LocalSession.get()
const userId = user?.id || null

onMounted(async () => {
  if (!userId) return
  try {
    const list = await apiFindPaymentByUserID(userId)
    pagos.value = list.map(
        p => decoratePago(new Pagos(p))
    )
  } catch (err) {
    console.error('Error al obtener pagos:', err)
  }
})

// Decorador visual según el tipo de servicio
function decoratePago(pago) {
  const lower = pago.servicio.toLowerCase()
  if (lower.includes('recarga')) {
    return {
      ...pago,
      icon: svgRecarga,
      iconBgColor: '#C6F6D5', // verde claro
      bgColor: '#E6FFFA',
      amountColor: '#2F855A' // verde oscuro
    }
  }
  if ([ 'metropolitano', 'lima bus', 'metro'].some(s => lower.includes(s))) {
    return {
      ...pago,
      icon: svgBus,
      iconBgColor: '#BFDBFE', // azul claro
      bgColor: '#EFF6FF',
      amountColor: '#DC2626' // rojo
    }
  }
  // Por defecto
  return {
    ...pago,
    icon: svgBus,
    iconBgColor: '#E5E7EB',
    bgColor: '#F9FAFB',
    amountColor: '#374151'
  }
}
</script>

<template>
  <section class="recent-transactions">
    <h2 class="title">{{t('trans')}}</h2>

    <!-- Si hay pagos -->
    <div v-if="pagos.length" class="transactions-list">
      <div
          v-for="pago in pagos"
          :key="pago.id"
          class="transaction-item"
          :style="{ backgroundColor: pago.bgColor }"
      >
        <div class="transaction-info">
          <div
              class="icon-container"
              :style="{ backgroundColor: pago.iconBgColor }"
              v-html="pago.icon"
          ></div>
          <div class="details">
            <h4 class="servicio">{{ pago.servicio }}</h4>
            <p class="fecha">{{ pago.fecha }}</p>
          </div>
        </div>
        <div class="monto" :style="{ color: pago.amountColor }">
          S/ {{ pago.monto.toFixed(2) }}
        </div>
      </div>
    </div>

    <!-- Si no hay pagos -->
    <p v-else class="no-data">No se encontraron pagos recientes.</p>
  </section>
</template>

<style scoped>
.recent-transactions {
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.title {
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.transaction-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  transition: transform 0.2s ease;
}
.transaction-item:hover {
  transform: translateY(-2px);
}
.transaction-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.icon-container {
  width: 40px;
  height: 40px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1E40AF;
}
.details {
  display: flex;
  flex-direction: column;
}
.servicio {
  font-weight: 600;
  margin: 0;
}
.fecha {
  font-size: 0.85rem;
  color: #6B7280;
  margin: 0;
}
.monto {
  font-weight: bold;
  font-size: 1rem;
}
.no-data {
  text-align: center;
  color: #9CA3AF;
  margin-top: 1rem;
}
</style>
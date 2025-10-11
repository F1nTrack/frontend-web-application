<script setup>
import { ref, computed, onMounted } from 'vue';
import { apiFindDocumentByUserID, apiFindTransportCardBalance } from '../../../../domains/transport/infrastructure/http/documents.api.js';
import { TarjetaTransporte } from '../../../../domains/transport/domain/entities/tarjeta-transporte.js';
import {LocalSession} from '../../../../domains/auth/infrastructure/persistence/users.local.js';
import {useI18n} from "vue-i18n";
const { t } = useI18n();

//const userId = 1
// Recuperar el usuario almacenado
const storedUser = LocalSession.get();
// Validar y obtener su id
const userId = storedUser?.id ?? null;

console.log('ID del usuario actual:', userId);

const tarjetas = ref([]);
const loading = ref(true);
const error = ref(null);
const tiposTransporte = ['Metropolitano Card', 'Metro de Lima', 'Tarjeta Lima'];

// Computed properties
const totalSaldo = computed(() => tarjetas.value.reduce((acc, t) => acc + (t.saldo || 0), 0));
const totalTarjetas = computed(() => tarjetas.value.length);

onMounted(async () => {
  try {
    const documentos = await apiFindDocumentByUserID(userId);
    if (Array.isArray(documentos) && documentos.length) {
      const docsFiltrados = documentos.filter(doc => tiposTransporte.includes(doc.tipo));

      const tarjetasConSaldo = await Promise.all(
          docsFiltrados.map(async (doc) => {
            try {
              const balanceData = await apiFindTransportCardBalance(doc.id);
              const saldo = Number(balanceData.balance) || 0;
              return new TarjetaTransporte({ ...doc, saldo });
            } catch (err) {
              console.error(`Error al obtener saldo para documento ${doc.id}:`, err);
              return new TarjetaTransporte({ ...doc, saldo: 0 });
            }
          })
      );

      tarjetas.value = tarjetasConSaldo;
    } else {
      tarjetas.value = [];
    }
  } catch (err) {
    error.value = 'Error al obtener los documentos';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section>
    <h1 class="titulo">{{t('transport-card.title')}}</h1>
    <h3 class="subtitulo">{{t('transport-card.sub')}}</h3>

    <div v-if="loading">{{t('transport-card.load')}}</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <!-- Mini contenedores -->
      <div class="summary-container">
        <!-- Total Saldo -->
        <div class="summary-card celeste">
          <div class="icon-wrapper celeste-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
              <path d="M12 3v3m0 12v3" />
            </svg>
          </div>
          <div>
            <h3>S/ {{ totalSaldo.toFixed(2) }}</h3>
            <p>{{t('transport-card.total_balance')}}</p>
          </div>
        </div>

        <!-- Total Tarjetas -->
        <div class="summary-card verde">
          <div class="icon-wrapper verde-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
              <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
            </svg>
          </div>
          <div>
            <h3>{{ totalTarjetas }}</h3>
            <p>{{t('transport-card.active_cards')}}</p>
          </div>
        </div>
      </div>

      <!-- Tarjetas -->
      <div v-if="!tarjetas.length">{{t('transport-card.no_cards')}}.</div>
      <div v-else class="cards-container">
        <div v-for="tarjeta in tarjetas" :key="tarjeta.id" class="card">
          <!-- Header -->
          <header class="card-header">
            <div class="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M18 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />
                <path d="M16 5l1.5 7l4.5 0" />
                <path d="M2 10l15 0" />
                <path d="M7 5l0 5" />
                <path d="M12 5l0 5" />
              </svg>
            </div>

            <div class="header-info">
              <h3>{{ tarjeta.tipo }}</h3>
              <p class="codigo">{{ tarjeta.numero }}</p>
            </div>

            <span v-if="tarjeta.saldo < 10" class="saldo-bajo">{{t('transport-card.low_balance')}}</span>
          </header>

          <!-- Body -->
          <div class="card-body">
            <div class="saldo-info">
              <span>{{t('transport-card.actual_balance')}}</span>
              <strong>S/ {{ tarjeta.saldo?.toFixed(2) ?? '0.00' }}</strong>
            </div>

            <div class="saldo-bar">
              <div
                  class="saldo-fill"
                  :style="{ width: `${Math.min((tarjeta.saldo / 30) * 100, 100)}%` }"
              ></div>
            </div>
          </div>

          <!-- Footer -->
          <footer class="card-footer">
            <button class="recargar-btn">{{t('transport-card.recharge')}}</button>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 1.5rem;
}

h2 {
  margin-bottom: 1rem;
  color: #1f2937;
}

/* --- Mini contenedores --- */
.summary-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.summary-card {
  flex: 1 1 260px;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.icon-wrapper {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.celeste-icon {
  background: #dbeafe;
}

.verde-icon {
  background: #dcfce7;
}

.summary-card h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #1e3a8a;
}

.summary-card p {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}

/* --- Cards Grid --- */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.2rem;
}

/* --- Card --- */
.card {
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Header */
.card-header {
  display: flex;
  align-items: center;
  background: #2563eb;
  color: white;
  padding: 0.8rem 1rem;
  position: relative;
}

.icon-container {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5rem;
  border-radius: 10px;
  margin-right: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-info h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.header-info .codigo {
  font-size: 0.8rem;
  opacity: 0.9;
  margin-top: 2px;
}

.saldo-bajo {
  position: absolute;
  right: 1rem;
  top: 0.8rem;
  background: #facc15;
  color: #78350f;
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  font-weight: 600;
}

/* Body */
.card-body {
  padding: 1rem;
  flex-grow: 1;
}

.saldo-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  color: #111827;
  font-size: 0.95rem;
}

.saldo-bar {
  height: 10px;
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.saldo-fill {
  height: 100%;
  background: #16a34a;
  border-radius: 8px;
  transition: width 0.3s ease;
}

/* Footer */
.card-footer {
  padding: 0.8rem;
  border-top: 1px solid #e5e7eb;
}

.recargar-btn {
  width: 100%;
  background: #111827;
  color: #fff;
  font-weight: 600;
  padding: 0.7rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.recargar-btn:hover {
  background: #000;
}
.titulo {
  font-weight: 700;        /* Negrita */
  font-size: 1.8rem;       /* Más grande que el tamaño base */
  margin-bottom: 0.2rem;   /* Espacio pequeño debajo */
  color: #222;             /* Color oscuro elegante */
}

.subtitulo {
  font-size: 1rem;         /* Más pequeño que el título */
  color: #666;             /* Gris medio */
  margin-top: 0;           /* Elimina espacio extra encima */
}

</style>

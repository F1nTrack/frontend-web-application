<script setup>
import NavBar from '../../shared/presentation/components/nav-bar.vue'
import { useDocumentManagement } from './composables/useDocumentManagement'

const { searchTerm, summaryCards, filteredDocuments } = useDocumentManagement()
</script>

<template>
  <div class="documents-view">
    <nav-bar />

    <main class="documents-content">
      <header class="page-header">
        <div class="page-header__titles">
          <p class="breadcrumb">KapakID &gt; Gestión de Documentos</p>
          <h1>Gestión de Documentos</h1>
          <p class="subtitle">
            Administra tus documentos oficiales y verificables.
          </p>
        </div>
        <button class="add-document">Añadir Documento</button>
      </header>

      <section class="summary">
        <article
            v-for="card in summaryCards"
            :key="card.id"
            class="summary-card"
            :class="`summary-card--${card.accent}`"
        >
          <p class="summary-card__title">{{ card.title }}</p>
          <p class="summary-card__value">{{ card.value }}</p>
          <p class="summary-card__description">{{ card.description }}</p>
        </article>
      </section>

      <section class="documents-panel">
        <div class="documents-panel__header">
          <div>
            <h2>Mis Documentos</h2>
            <p class="hint">Lista completa de tus documentos oficiales.</p>
          </div>
          <div class="panel-actions">
            <input
                v-model="searchTerm"
                type="search"
                placeholder="Buscar documentos"
                class="search-input"
            />
          </div>
        </div>

        <div class="table-wrapper">
          <table>
            <thead>
            <tr>
              <th>Tipo de Documento</th>
              <th>Número</th>
              <th>Fecha de Emisión</th>
              <th>Fecha de Vencimiento</th>
              <th>Estado</th>
              <th class="actions-column">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="document in filteredDocuments" :key="document.id">
              <td class="doc-type">{{ document.type }}</td>
              <td>{{ document.number }}</td>
              <td>{{ document.issuedAt }}</td>
              <td>{{ document.expiresAt }}</td>
              <td>
                  <span class="status-badge" :class="`status-badge--${document.statusVariant}`">
                    {{ document.status }}
                  </span>
              </td>
              <td class="actions">
                <button class="link-button">Ver</button>
                <button class="link-button link-button--primary">Descargar</button>
              </td>
            </tr>
            <tr v-if="!filteredDocuments.length">
              <td colspan="6" class="empty-state">
                No encontramos documentos con ese criterio de búsqueda.
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.documents-view {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fb;
  font-family: 'Poppins', sans-serif;
  color: #26334d;
}

.documents-content {
  flex: 1;
  padding: 2.5rem 3rem 3rem 5rem;
  margin-left: 4.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.page-header__titles {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.breadcrumb {
  font-size: 0.85rem;
  color: #6f7d95;
}

.page-header h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: #1d293f;
}

.subtitle {
  margin: 0;
  color: #7c8ba1;
}

.add-document {
  background: linear-gradient(135deg, #5ed3c6, #3ca6ff);
  border: none;
  border-radius: 14px;
  color: #ffffff;
  font-weight: 600;
  padding: 0.75rem 1.8rem;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(60, 166, 255, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.add-document:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 34px rgba(60, 166, 255, 0.3);
}

.summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.summary-card {
  padding: 1.5rem;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 25px rgba(58, 74, 97, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.summary-card__title {
  font-size: 0.95rem;
  font-weight: 600;
}

.summary-card__value {
  font-size: 2.2rem;
  font-weight: 700;
}

.summary-card__description {
  margin: 0;
  color: #6f7d95;
  font-size: 0.9rem;
}

.summary-card--verified {
  border-left: 6px solid #16a34a;
}

.summary-card--expiring {
  border-left: 6px solid #f59e0b;
}

.summary-card--expired {
  border-left: 6px solid #ef4444;
}

.summary-card--supports {
  border-left: 6px solid #6366f1;
}

.documents-panel {
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 12px 30px rgba(58, 74, 97, 0.08);
}

.documents-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.documents-panel__header h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.hint {
  margin-top: 0.25rem;
  color: #7c8ba1;
  font-size: 0.92rem;
}

.panel-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #edf1f7;
}

th {
  font-weight: 600;
  color: #7c8ba1;
  font-size: 0.9rem;
}

tr:hover {
  background-color: #f9fbff;
}

.doc-type {
  font-weight: 600;
  color: #1d293f;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  text-transform: uppercase;
}

.status-badge--success {
  background-color: rgba(22, 163, 74, 0.12);
  color: #15803d;
}

.status-badge--warning {
  background-color: rgba(245, 158, 11, 0.12);
  color: #b45309;
}

.status-badge--danger {
  background-color: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
}

.actions-column {
  text-align: right;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.link-button {
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.link-button--primary {
  color: #0ea5e9;
}

.empty-state {
  text-align: center;
  padding: 2rem 1rem;
  color: #7c8ba1;
}

.search-input {
  padding: 0.6rem 1rem;
  border: 1px solid #dce3f1;
  border-radius: 12px;
  background-color: #f8faff;
  min-width: 220px;
}

.search-input:focus {
  outline: none;
  border-color: #3ca6ff;
  box-shadow: 0 0 0 3px rgba(60, 166, 255, 0.2);
}
</style>
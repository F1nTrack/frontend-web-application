<script setup>

import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import NavBar from "../../shared/presentation/components/nav-bar.vue";
import {
  Search,
  CalendarDays,
  CheckCircle2,
  Clock4,
  AlertTriangle,
  XCircle,
  Eye,
  Download,
  RefreshCcw,
  Share2
} from "lucide-vue-next";
import { useDocumentsStore } from "../documents/composables/useDocumentsStore.js";

const { t, locale } = useI18n();
const { documents, isLoading, error, statusGroups, ensureDocuments, addDocument } =
    useDocumentsStore();

const searchQuery = ref("");
const expirationFilter = ref("");
const activeStatus = ref("");
const isAdding = ref(false);
const newDocument = ref({
  type: "",
  number: "",
  issueDate: "",
  expirationDate: "",
  statusKey: "active"
});

onMounted(() => {
  ensureDocuments();
});

const statusStyles = {
  active: "status-active",
  expiring: "status-warning",
  expired: "status-expired",
  pending: "status-pending"
};

const statusLabels = computed(() => ({
  active: t("documentsView.status.active"),
  expiring: t("documentsView.status.expiring"),
  expired: t("documentsView.status.expired"),
  pending: t("documentsView.status.pending")
}));

const statusCards = computed(() => [
  {
    key: "active",
    label: t("documentsView.statusCards.active"),
    count: statusGroups.value.active ?? 0,
    icon: CheckCircle2,
    tone: "success"
  },
  {
    key: "expiring",
    label: t("documentsView.statusCards.expiring"),
    count: statusGroups.value.expiring ?? 0,
    icon: Clock4,
    tone: "warning"
  },
  {
    key: "expired",
    label: t("documentsView.statusCards.expired"),
    count: statusGroups.value.expired ?? 0,
    icon: AlertTriangle,
    tone: "danger"
  },
  {
    key: "pending",
    label: t("documentsView.statusCards.pending"),
    count: statusGroups.value.pending ?? 0,
    icon: XCircle,
    tone: "pending"
  }
]);

const documentsWithLabels = computed(() =>
    documents.value.map((document) => ({
      ...document,
      statusLabel: statusLabels.value[document.statusKey] ?? document.statusKey
    }))
);

const filteredDocuments = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return documentsWithLabels.value
      .filter((document) =>
          activeStatus.value ? document.statusKey === activeStatus.value : true
      )
      .filter((document) =>
          expirationFilter.value
              ? document.expirationDate === expirationFilter.value
              : true
      )
      .filter((document) => {
        if (!query) {
          return true;
        }

        return [
          document.type,
          document.number,
          document.statusLabel,
          formatDate(document.issueDate),
          formatDate(document.expirationDate)
        ]
            .join(" ")
            .toLowerCase()
            .includes(query);
      });
});

const searchPlaceholder = computed(() => t("documentsView.searchPlaceholder"));
const showClearFilters = computed(
    () => !!(searchQuery.value || expirationFilter.value || activeStatus.value)
);

function formatDate(value) {
  if (!value) {
    return "—";
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale.value, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(parsedDate);
}

const statusOptions = computed(() => [
  { value: "active", label: statusLabels.value.active },
  { value: "expiring", label: statusLabels.value.expiring },
  { value: "expired", label: statusLabels.value.expired },
  { value: "pending", label: statusLabels.value.pending }
]);

function selectStatus(statusKey) {
  activeStatus.value = activeStatus.value === statusKey ? "" : statusKey;
}

function clearFilters() {
  searchQuery.value = "";
  expirationFilter.value = "";
  activeStatus.value = "";
}

function resetForm() {
  newDocument.value = {
    type: "",
    number: "",
    issueDate: "",
    expirationDate: "",
    statusKey: "active"
  };
}

function handleAddDocument() {
  if (!newDocument.value.type.trim() || !newDocument.value.number.trim()) {
    return;
  }

  addDocument({
    type: newDocument.value.type.trim(),
    number: newDocument.value.number.trim(),
    issueDate: newDocument.value.issueDate,
    expirationDate: newDocument.value.expirationDate,
    statusKey: newDocument.value.statusKey
  });

  resetForm();
  isAdding.value = false;
}

function cancelAdd() {
  resetForm();
  isAdding.value = false;
}

function toggleAdd() {
  if (isAdding.value) {
    cancelAdd();
    return;
  }

  isAdding.value = true;
}
</script>




<template>
  <div class="documents-page">
    <nav-bar />
    <main class="content">
      <header class="page-header">
        <div>
          <p class="page-title">{{ t('documentsView.title') }}</p>
          <p class="page-subtitle">{{ t('documentsView.subtitle') }}</p>
        </div>
        <button
            class="add-document"
            type="button"
            :disabled="isLoading && !isAdding"
            @click="toggleAdd"
        >
          {{ isAdding ? t('documentsView.cancel') : t('documentsView.add') }}
        </button>
      </header>

      <section v-if="isAdding" class="add-form">
        <h2 class="form-title">{{ t('documentsView.formTitle') }}</h2>
        <form @submit.prevent="handleAddDocument">
          <div class="form-grid">
            <label>
              <span>{{ t('documentsView.type') }}</span>
              <input v-model="newDocument.type" type="text" required />
            </label>
            <label>
              <span>{{ t('documentsView.number') }}</span>
              <input v-model="newDocument.number" type="text" required />
            </label>
            <label>
              <span>{{ t('documentsView.issueDate') }}</span>
              <input v-model="newDocument.issueDate" type="date" />
            </label>
            <label>
              <span>{{ t('documentsView.expirationDate') }}</span>
              <input v-model="newDocument.expirationDate" type="date" />
            </label>
            <label>
              <span>{{ t('documentsView.status') }}</span>
              <select v-model="newDocument.statusKey">
                <option
                    v-for="option in statusOptions"
                    :key="option.value"
                    :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </label>
          </div>
          <div class="form-actions">
            <button type="button" class="secondary" @click="cancelAdd">
              {{ t('documentsView.cancel') }}
            </button>
            <button type="submit" class="primary">
              {{ t('documentsView.save') }}
            </button>
          </div>
        </form>
      </section>

      <section class="status-grid">
        <button
            v-for="card in statusCards"
            :key="card.key"
            type="button"
            class="status-card"
            :class="[card.tone, { active: activeStatus === card.key }]"
            :disabled="isLoading && !documents.length"
            @click="selectStatus(card.key)"
        >
          <component :is="card.icon" class="card-icon" size="24" />
          <div class="card-info">
            <span class="card-count">{{ isLoading ? '…' : card.count }}</span>
            <span class="card-label">{{ card.label }}</span>
          </div>
        </button>
      </section>

      <section class="toolbar">
        <div class="search-input">
          <Search class="search-icon" size="18" />
          <input
              v-model="searchQuery"
              type="text"
              :placeholder="searchPlaceholder"
          />
        </div>
        <div class="toolbar-actions">
          <label class="date-filter">
            <CalendarDays class="calendar-icon" size="18" />
            <input v-model="expirationFilter" type="date" />
          </label>
          <button
              v-if="showClearFilters"
              class="clear-filters"
              type="button"
              @click="clearFilters"
          >
            {{ t('documentsView.clearFilters') }}
          </button>
        </div>
      </section>

      <section class="table-card">
        <header class="table-header">
          <p class="table-title">
            {{ t('documentsView.tableTitle', { count: filteredDocuments.length }) }}
          </p>
          <p class="table-subtitle">{{ t('documentsView.tableSubtitle') }}</p>
        </header>

        <p v-if="error" class="error-banner">{{ t('documentsView.error') }}</p>

        <div class="table-wrapper" :class="{ 'is-loading': isLoading }">
          <div v-if="isLoading" class="table-loading">{{ t('common.loading') }}</div>
          <table v-else>
            <thead>
            <tr>
              <th>{{ t('documentsView.headers.type') }}</th>
              <th>{{ t('documentsView.headers.number') }}</th>
              <th>{{ t('documentsView.headers.issueDate') }}</th>
              <th>{{ t('documentsView.headers.expirationDate') }}</th>
              <th>{{ t('documentsView.headers.status') }}</th>
              <th>{{ t('documentsView.headers.actions') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="doc in filteredDocuments" :key="doc.id">
              <td>{{ doc.type }}</td>
              <td class="number">{{ doc.number }}</td>
              <td>{{ formatDate(doc.issueDate) }}</td>
              <td>{{ formatDate(doc.expirationDate) }}</td>
              <td>
                  <span class="status-pill" :class="statusStyles[doc.statusKey]">
                    {{ doc.statusLabel }}
                  </span>
              </td>
              <td>
                <div class="actions">
                  <button
                      class="icon-button"
                      type="button"
                      :title="t('documentsView.actions.view')"
                  >
                    <Eye size="18" />
                  </button>
                  <button
                      class="icon-button"
                      type="button"
                      :title="t('documentsView.actions.download')"
                  >
                    <Download size="18" />
                  </button>
                  <button
                      class="icon-button"
                      type="button"
                      :title="t('documentsView.actions.renew')"
                  >
                    <RefreshCcw size="18" />
                  </button>
                  <button
                      class="icon-button"
                      type="button"
                      :title="t('documentsView.actions.share')"
                  >
                    <Share2 size="18" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!filteredDocuments.length">
              <td class="empty-state" colspan="6">
                {{ t('documentsView.empty') }}
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
.documents-page {
  background: var(--bg-page);
  min-height: 100vh;
  padding-bottom: 40px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.page-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
}

.page-subtitle {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 15px;
}

.add-document {
  background: #0d9488;
  border-radius: 999px;
  padding: 0.65em 1.8em;
  border: none;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(13, 148, 136, 0.2);
  color: #ffffff;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.add-document:hover {
  background: #0f766e;
  box-shadow: 0 12px 32px rgba(13, 148, 136, 0.24);
}

.add-document:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.add-form {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 12px 40px rgba(9, 9, 55, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

.form-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.form-grid label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

.form-grid input,
.form-grid select {
  border-radius: 12px;
  border: 1px solid #d1d5db;
  padding: 10px 14px;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-grid input:focus,
.form-grid select:focus {
  outline: none;
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.form-actions .secondary,
.form-actions .primary {
  padding: 0.6em 1.6em;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.form-actions .secondary {
  background: #e5e7eb;
  color: #374151;
}

.form-actions .primary {
  background: #0d9488;
  color: #ffffff;
  box-shadow: 0 12px 30px rgba(13, 148, 136, 0.22);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.status-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 18px;
  border: 1px solid transparent;
  background: #fff;
  box-shadow: 0 12px 30px rgba(9, 9, 55, 0.04);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.status-card:disabled {
  cursor: default;
  opacity: 0.65;
}

.status-card:hover,
.status-card.active {
  transform: translateY(-3px);
  box-shadow: 0 18px 36px rgba(9, 9, 55, 0.1);
}

.status-card.success.active {
  border-color: #34d399;
}

.status-card.warning.active {
  border-color: #fbbf24;
}

.status-card.danger.active {
  border-color: #f87171;
}

.status-card.pending.active {
  border-color: #60a5fa;
}

.card-icon {
  padding: 12px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.04);
}

.status-card.success .card-icon {
  color: #10b981;
  background: rgba(16, 185, 129, 0.12);
}

.status-card.warning .card-icon {
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.14);
}

.status-card.danger .card-icon {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.14);
}

.status-card.pending .card-icon {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.14);
}

.card-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.card-count {
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
}

.card-label {
  font-size: 14px;
  color: #6b7280;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #fff;
  padding: 16px 20px;
  border-radius: 16px;
  box-shadow: 0 16px 32px rgba(9, 9, 55, 0.05);
}

.search-input {
  flex: 1 1 280px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.search-input input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  outline: none;
  color: #111827;
}

.search-icon {
  color: #94a3b8;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-filter {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.date-filter input {
  border: none;
  background: transparent;
  font-size: 15px;
  color: #0f172a;
  outline: none;
}

.calendar-icon {
  color: #64748b;
}

.clear-filters {
  background: transparent;
  color: #0f172a;
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 0.6em 1.4em;
  border-radius: 999px;
}

.table-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.06);
  overflow: hidden;
}

.error-banner {
  background: rgba(220, 38, 38, 0.08);
  color: #b91c1c;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  margin: 0 24px;
}

.table-header {
  padding: 24px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.table-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.table-subtitle {
  margin: 6px 0 0;
  color: #64748b;
  font-size: 14px;
}

.table-wrapper {
  overflow-x: auto;
}

.table-wrapper.is-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
}

.table-loading {
  padding: 32px 0;
  font-weight: 500;
  color: #6b7280;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

th,
td {
  padding: 18px 24px;
  text-align: left;
  font-size: 15px;
}

thead th {
  font-weight: 600;
  color: #475569;
  background: rgba(241, 245, 249, 0.6);
}

tbody tr {
  border-bottom: 1px solid rgba(226, 232, 240, 0.7);
  transition: background 0.2s ease;
}

tbody tr:hover {
  background: rgba(241, 245, 249, 0.6);
}

.number {
  letter-spacing: 0.5px;
  font-family: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco,
  Consolas, "Liberation Mono", "Courier New", monospace;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
}

.status-active {
  background: rgba(16, 185, 129, 0.12);
  color: #047857;
}

.status-warning {
  background: rgba(245, 158, 11, 0.16);
  color: #b45309;
}

.status-expired {
  background: rgba(239, 68, 68, 0.14);
  color: #b91c1c;
}

.status-pending {
  background: rgba(59, 130, 246, 0.14);
  color: #1d4ed8;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: #fff;
  color: #0f172a;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.icon-button:hover {
  transform: translateY(-2px);
  border-color: #0d9488;
  box-shadow: 0 10px 20px rgba(13, 148, 136, 0.15);
  color: #0d9488;
}

.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: #64748b;
  font-size: 15px;
}

@media (max-width: 768px) {
  .content {
    padding-top: 120px;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .add-document {
    width: 100%;
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-actions {
    width: 100%;
    justify-content: space-between;
  }

  .date-filter {
    flex: 1;
    justify-content: space-between;
  }

  .clear-filters {
    flex-shrink: 0;
  }
}

@media (max-width: 520px) {
  .status-grid {
    grid-template-columns: 1fr;
  }

  th,
  td {
    padding: 16px;
  }

  .actions {
    gap: 6px;
  }

  .icon-button {
    width: 32px;
    height: 32px;
  }
}
</style>




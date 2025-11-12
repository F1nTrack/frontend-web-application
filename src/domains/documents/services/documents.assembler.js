import { computed, ref } from "vue";
import apiService from "../../../services/api.service.js";

const documents = ref([]);
const isLoading = ref(false);
const error = ref(null);
const hasLoaded = ref(false);

const STATUS_MAP = {
    vigente: "active",
    verificado: "active",
    activo: "active",
    active: "active",
    "por vencer": "expiring",
    expiring: "expiring",
    expira: "expiring",
    vencido: "expired",
    expirado: "expired",
    expired: "expired",
    pendiente: "pending",
    pending: "pending"
};

function normalizeStatus(status) {
    if (!status) {
        return "pending";
    }

    const normalized = status.toString().trim().toLowerCase();
    return STATUS_MAP[normalized] ?? "pending";
}

function createId() {
    const globalCrypto = typeof globalThis !== "undefined" ? globalThis.crypto : null;
    if (globalCrypto?.randomUUID) {
        return globalCrypto.randomUUID();
    }

    return `doc-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

function mapDocument(document) {
    const normalized = {
        id: document.id ?? createId(),
        type: document.type ?? document.tipo ?? "",
        number: document.number ?? document.numero ?? "",
        issueDate: document.issueDate ?? document.fechaEmision ?? "",
        expirationDate: document.expirationDate ?? document.fechaVencimiento ?? "",
        statusKey: document.statusKey ?? normalizeStatus(document.status ?? document.estado),
        metadata: {
            rawStatus: document.status ?? document.estado ?? "",
            source: document
        }
    };

    return normalized;
}

async function fetchDocuments(userId = 1) {
    if (isLoading.value) {
        return;
    }

    isLoading.value = true;
    error.value = null;

    try {
        const response = await apiService.getDocumentosPorUsuario(userId);
        const payload = Array.isArray(response.data) ? response.data : [];
        documents.value = payload.map(mapDocument);
        hasLoaded.value = true;
    } catch (err) {
        error.value = err?.message ?? "unknown_error";
    } finally {
        isLoading.value = false;
    }
}

async function ensureDocuments(userId = 1) {
    if (hasLoaded.value || isLoading.value) {
        return;
    }

    await fetchDocuments(userId);
}

function addDocument(newDocument) {
    const document = mapDocument({ ...newDocument, id: newDocument.id });
    documents.value = [...documents.value, document];
}

const statusGroups = computed(() => {
    return documents.value.reduce(
        (acc, document) => {
            acc[document.statusKey] = (acc[document.statusKey] ?? 0) + 1;
            return acc;
        },
        { active: 0, expiring: 0, expired: 0, pending: 0 }
    );
});

export function useDocumentsStore() {
    return {
        documents,
        isLoading,
        error,
        hasLoaded,
        statusGroups,
        fetchDocuments,
        ensureDocuments,
        addDocument
    };
}
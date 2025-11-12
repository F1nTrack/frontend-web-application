import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://kapak-fake-api.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    // --- Usuarios ---
    getUsuario(id) {
        // GET /usuarios/1
        return apiClient.get(`/usuarios/${id}`);
    },

    // --- Documentos ---
    getDocumentosPorUsuario(usuarioId) {
        // GET /documentos?usuarioId=1
        return apiClient.get(`/documentos?usuarioId=${usuarioId}`);
    },

    // --- Pagos ---
    getPagosPorUsuario(usuarioId) {
        // GET /pagos?usuarioId=1
        return apiClient.get(`/pagos?usuarioId=${usuarioId}`);
    },

    // --- Notificaciones ---
    getNotificacionesPorUsuario(usuarioId) {
        // GET /notificaciones?usuarioId=1
        return apiClient.get(`/notificaciones?usuarioId=${usuarioId}`);
    },

    // --- Perfil ---
    getProfile() {
        // Simula un perfil de usuario, puedes adaptarlo según tu JSON
        return apiClient.get('/usuarios/1');
    }
};

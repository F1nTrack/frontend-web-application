import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:4000',
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

    // --- Profile (Ejemplo de endpoint simple) ---
    getProfile() {
        return apiClient.get('/profile');
    }

    // ...puedes agregar aquí las funciones para POST, PUT, DELETE (CRUD)
    // Ejemplo de un POST para crear un documento:
    // createDocumento(data) {
    //   return apiClient.post('/documentos', data);
    // }
};
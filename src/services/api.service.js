// Archivo: api.service.js (o como se llame)

// ⛔️ ELIMINADO: import axios from 'axios';
// 👇✨ AÑADIDO: Importamos nuestro cliente central
// (Ajusta la ruta './api.client.js' si están en carpetas diferentes)
import apiClient from './api.client.js';

// ⛔️ ELIMINADO: Toda la creación de 'apiClient'
/*
const apiClient = axios.create({
    baseURL: 'https://kapak-fake-api.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});
*/

// El resto de tu código queda EXACTAMENTE IGUAL
export default {
    // --- Usuarios ---
    getUsuario(id) {
        return apiClient.get(`/usuarios/${id}`);
    },

    // --- Documentos ---
    getDocumentosPorUsuario(usuarioId) {
        return apiClient.get(`/documentos?usuarioId=${usuarioId}`);
    },

    // --- Pagos ---
    getPagosPorUsuario(usuarioId) {
        return apiClient.get(`/pagos?usuarioId=${usuarioId}`);
    },

    // --- Notificaciones ---
    getNotificacionesPorUsuario(usuarioId) {
        return apiClient.get(`/notificaciones?usuarioId=${usuarioId}`);
    },

    // --- Perfil ---
    getProfile() {
        return apiClient.get('/usuarios/1');
    }
};
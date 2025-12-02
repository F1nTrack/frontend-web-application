// Archivo: dashboardService.js (o como se llame)

// ⛔️ ELIMINADO: import axios from 'axios';
// 👇✨ AÑADIDO: Importamos nuestro cliente central
// (Ajusta la ruta './api.client.js' si están en carpetas diferentes)
import apiClient from '@/services/api.client.js';

import { DashboardData } from '../model/datos.entity.js';

// ⛔️ ELIMINADO: Ya no necesitamos esta variable
// const API_URL = 'https://kapak-fake-api.onrender.com/dashboard';

export default {
    async getDashboardData() {
        try {
            // 👇✨ CAMBIADO: Usamos 'apiClient' y solo la ruta
            const response = await apiClient.get('/dashboard');

            return DashboardData.fromJSON(response.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error.message);
            return new DashboardData({});
        }
    }
};
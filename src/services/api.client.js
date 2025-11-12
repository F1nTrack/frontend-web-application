import axios from 'axios';

// 🔹 Configuración base
const API_BASE_URL = 'http://localhost:4000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 🔹 Interceptor para agregar token si existe
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user-token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔹 Manejo de errores global (opcional)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error en la petición:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;

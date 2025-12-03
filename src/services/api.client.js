import axios from 'axios';

const baseURL = 'https://protectx-backend-production-2845.up.railway.app/api';
console.log('API Base URL:', baseURL);

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

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

apiClient.interceptors.response.use(
    (response) => {
        if (typeof response.data === 'string') {
            try {
                response.data = JSON.parse(response.data);
            } catch (err) {
                console.error('Error parsing JSON:', err, response.data);
                return Promise.reject(new Error('Invalid JSON response from server'));
            }
        }
        return response;
    },
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;

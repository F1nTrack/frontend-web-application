import axios from 'axios';
import { DashboardData } from '../model/datos.entity.js';

const API_URL = 'https://kapak-fake-api.onrender.com/dashboard';

export default {
    async getDashboardData() {
        try {
            const response = await axios.get(API_URL);
            return DashboardData.fromJSON(response.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error.message);
            // Return empty DashboardData as fallback
            return new DashboardData({});
        }
    }
};
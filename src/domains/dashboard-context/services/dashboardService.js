import { http } from '../../../shared/services/httpClient.js';
import { DashboardData } from '../model/datos.entity.js';

export default {
    async getDashboardData() {
        try {
            // Obtener datos del usuario actual
            const user = JSON.parse(localStorage.getItem('kapakid:user') || '{}');
            if (!user.id) {
                throw new Error('No user logged in');
            }

            // Obtener datos relacionados con el usuario
            const [documentos, pagos, notificaciones] = await Promise.all([
                http.get(`/documentos?usuarioId=${user.id}`),
                http.get(`/pagos?usuarioId=${user.id}`),
                http.get(`/notificaciones?usuarioId=${user.id}`)
            ]);

            // Crear datos del dashboard
            const dashboardData = {
                documents: {
                    active: documentos.filter(doc => doc.estado === 'Verificado' || doc.estado === 'Vigente').length,
                    changeThisMonth: 0,
                    items: documentos
                },
                balance: {
                    currency: 'PEN',
                    total: 150.50,
                    type: 'primary'
                },
                pendingPayments: {
                    count: pagos.length,
                    note: 'Pagos pendientes',
                    items: pagos
                },
                profileCompletion: 85,
                transportCards: [
                    { type: 'Metropolitano', balance: 25.50, status: 'active' },
                    { type: 'Metro de Lima', balance: 12.00, status: 'active' }
                ],
                notifications: notificaciones
            };

            return DashboardData.fromJSON(dashboardData);
        } catch (error) {
            console.error('Error fetching dashboard data:', error.message);
            // Return empty DashboardData as fallback
            return new DashboardData({});
        }
    }
};
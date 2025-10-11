import {http} from '../../../../shared/services/httpClient.js';

export async function apiFindPaymentByUserID(userID) {
    const list = await http.get(`/pagos?usuarioId=${encodeURIComponent(userID)}`);
    return list
}

export async function apiCreatePayment(paymentData) {
    return http.post(`/pagos`, paymentData);
}


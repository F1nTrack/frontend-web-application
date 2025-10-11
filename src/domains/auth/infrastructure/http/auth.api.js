
import { http } from '../../../../shared/services/httpClient.js';


export async function apiFindUserByEmail(email) {
    const list = await http.get(`/usuarios?email=${encodeURIComponent(email)}`);
    return Array.isArray(list) && list.length ? list[0] : null;
}


export async function apiCreateUser(payload) {

    return http.post('/usuarios', payload);
}

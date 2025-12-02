import { http } from '@/shared/services/httpClient.js';

export async function loginUseCase({ email, password }) {
    // normalizar entradas
    const emailNorm = String(email || '').trim().toLowerCase();
    const passNorm  = String(password ?? '');
    const users = await http.get(`/usuarios?email=${encodeURIComponent(emailNorm)}`);

    if (!Array.isArray(users) || users.length === 0) {
        throw new Error('EMAIL_NOT_FOUND');
    }

    const user = users[0];
    if (String(user.password) !== passNorm) {
        throw new Error('INVALID_PASSWORD');
    }

    const session = { id: user.id, nombre: user.nombre, email: user.email };
    localStorage.setItem('kapakid:user', JSON.stringify(session));

    return true;
}

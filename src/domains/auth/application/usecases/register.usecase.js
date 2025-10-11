import { http } from '../../../../shared/services/httpClient.js';

async function findByEmail(email) {
    const emailNorm = String(email || '').trim().toLowerCase();
    const users = await http.get(`/usuarios?email=${encodeURIComponent(emailNorm)}`);
    return users?.[0];
}

export async function registerUseCase({ nombre, email, password }) {
    const exists = await findByEmail(email);
    if (exists) return false;

    const created = await http.post('/usuarios', {
        nombre: String(nombre || '').trim(),
        email : String(email  || '').trim().toLowerCase(),
        password: String(password ?? ''),
        premium: false,
    });

    localStorage.setItem('kapakid:user', JSON.stringify({
        id: created.id,
        nombre: created.nombre,
        email: created.email,
    }));

    return true;
}

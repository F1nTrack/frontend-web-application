import { http } from '../../../../shared/services/httpClient.js';

export async function loginUseCase({ email, password }) {
    try {
        const response = await http.post('/auth/login', {
            email: email,
            password: password
        });

        if (response.token && response.user) {
            localStorage.setItem('kapakid:token', response.token);
            localStorage.setItem('kapakid:user', JSON.stringify(response.user));
            return true;
        }

        return false;

    } catch (error) {
        console.error("Error en login:", error);
        throw new Error('INVALID_CREDENTIALS');
    }
}
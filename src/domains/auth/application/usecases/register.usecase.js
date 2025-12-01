import { http } from '../../../../shared/services/httpClient.js';

export async function registerUseCase({ nombre, email, password }) {
    try {

        await http.post('/auth/register', {
            nombre: nombre,
            email: email,
            password: password
        });

        return true;

    } catch (error) {
        console.error("Error en registro:", error);
        return false;
    }
}
const BASE = 'https://backend-fintrack-production-e37d.up.railway.app/api';

export const http = {
    async get(url) {
        // Agregamos headers para enviar el Token si existe
        const token = localStorage.getItem('kapakid:token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(BASE + url, { headers });
        if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
        return res.json();
    },

    async post(url, data) {
        const token = localStorage.getItem('kapakid:token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(BASE + url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        // Manejo de errores básico
        if (!res.ok) {
            const errorBody = await res.text();
            throw new Error(errorBody || `POST ${url} -> ${res.status}`);
        }
        return res.json();
    },

    async patch(url, data) {
        const token = localStorage.getItem('kapakid:token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(BASE + url, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`PATCH ${url} -> ${res.status}`);
        return res.json();
    },

    async delete(url) {
        const token = localStorage.getItem('kapakid:token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(BASE + url, {
            method: 'DELETE',
            headers: headers
        });
        if (!res.ok) throw new Error(`DELETE ${url} -> ${res.status}`);
        return res.json();
    },
};
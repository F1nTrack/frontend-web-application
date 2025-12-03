
const BASE = 'https://protectx-backend-production-2845.up.railway.app/api';

export const http = {
    async get(url) {
        const res = await fetch(BASE + url);
        if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
        return res.json();
    },
    async post(url, data) {
        const res = await fetch(BASE + url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`POST ${url} -> ${res.status}`);
        return res.json();
    },
    async patch(url, data) {
        const res = await fetch(BASE + url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`PATCH ${url} -> ${res.status}`);
        return res.json();
    },
    async delete(url) {
        const res = await fetch(BASE + url, { method: 'DELETE' });
        if (!res.ok) throw new Error(`DELETE ${url} -> ${res.status}`);
        return res.json();
    },
};

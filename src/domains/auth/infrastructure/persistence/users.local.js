const KEY = 'kapakid:user';

export class LocalSession {
    /** @param {any} user */
    static save(user) {
        localStorage.setItem(KEY, JSON.stringify(user));
    }

    /** @returns {any|null} */
    static get() {
        try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
        catch { return null; }
    }

    static clear() {
        localStorage.removeItem(KEY);
    }
}

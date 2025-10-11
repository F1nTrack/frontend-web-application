import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, '..', 'fixtures', 'db.json');

async function readDb() {
	try {
		const txt = await fs.readFile(dbFile, 'utf8');
		if (!txt || txt.trim() === '') return {};
		return JSON.parse(txt);
	} catch (err) {
		console.error('[api] readDb error:', err && err.stack ? err.stack : err);
		throw err;
	}
}

async function writeDb(obj) {
	try {
		await fs.writeFile(dbFile, JSON.stringify(obj, null, 2), 'utf8');
	} catch (err) {
		console.error('[api] writeDb error:', err && err.stack ? err.stack : err);
		throw err;
	}
}

export default async function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (req.method === 'OPTIONS') {
		res.statusCode = 204;
		res.end();
		return;
	}

	const base = req.url ? req.url.split('?')[0] : '/';

	try {
		const db = await readDb();

		// GET /usuarios
		if (req.method === 'GET' && (base === '/usuarios' || base === '/usuarios/')) {
			const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
			const email = url.searchParams.get('email');
			let usuarios = Array.isArray(db.usuarios) ? db.usuarios : [];
			if (email) {
				const decoded = decodeURIComponent(email);
				usuarios = usuarios.filter((u) => String(u.email).toLowerCase() === decoded.toLowerCase());
			}
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200;
			res.end(JSON.stringify(usuarios));
			return;
		}

		// POST /usuarios
		if (req.method === 'POST' && (base === '/usuarios' || base === '/usuarios/')) {
			const chunks = [];
			for await (const chunk of req) chunks.push(chunk);
			const bodyText = Buffer.concat(chunks).toString('utf8');
			let payload = {};
			try { payload = bodyText ? JSON.parse(bodyText) : {}; } catch (e) {
				res.statusCode = 400; res.end('Invalid JSON'); return;
			}

			const nombre = String(payload.nombre || '').trim();
			const email = String(payload.email || '').trim().toLowerCase();
			const password = String(payload.password ?? '');

			if (!email) { res.statusCode = 400; res.end('email required'); return; }

			const exists = Array.isArray(db.usuarios) ? db.usuarios.find((u) => String(u.email).toLowerCase() === email) : undefined;
			if (exists) { res.statusCode = 409; res.end('EMAIL_EXISTS'); return; }

			const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
			const newUser = { id, nombre, email, password, premium: !!payload.premium };
			db.usuarios = Array.isArray(db.usuarios) ? db.usuarios : [];
			db.usuarios.push(newUser);
			await writeDb(db);

			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 201;
			res.end(JSON.stringify(newUser));
			return;
		}

		// GET /usuarios/:id
		if (req.method === 'GET' && base.startsWith('/usuarios/')) {
			const id = base.replace('/usuarios/', '');
			const usuarios = Array.isArray(db.usuarios) ? db.usuarios : [];
			const user = usuarios.find((u) => String(u.id) === id);
			if (!user) { res.statusCode = 404; res.end('Not found'); return; }
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200; res.end(JSON.stringify(user)); return;
		}

		// root
		if (req.method === 'GET' && (base === '/' || base === '')) {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200; res.end(JSON.stringify(Object.keys(db))); return;
		}

		res.statusCode = 404; res.end('Not found');

	} catch (err) {
		console.error('[api] handler unexpected error:', err && err.stack ? err.stack : err);
		res.statusCode = 500; res.end('Internal Server Error');
	}
}
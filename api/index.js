const jsonServer = require('json-server');
const path = require('path');

// Create server and router using the fixtures file
const server = jsonServer.create();
const dbFile = path.join(__dirname, '..', 'fixtures', 'db.json');
const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults({
	noCors: false,
});

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
	// simple request logger for debugging on Vercel
	console.log(`[json-server] ${req.method} ${req.url}`);
	next();
});
server.use(router);

// Export a Node-compatible handler for Vercel serverless functions
module.exports = (req, res) => {
	try {
		server(req, res);
	} catch (err) {
		console.error('[api] handler error:', err && err.stack ? err.stack : err);
		res.statusCode = 500;
		res.end('Internal Server Error');
	}
};